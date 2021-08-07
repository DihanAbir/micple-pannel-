const router = require('express').Router();
const UserAgent = require('express-useragent');
const geoip = require('geoip-lite');

const { Chatus } = require('../../../../database/admin');
const { User } = require('../../../../database/micple');
const { getProfile } = require('../../functions');
const { getIP } = require('../../functions');

router.get('/counts', async (req, res) => {
  try {
    const counts = { total: 0, seen: 0, unseen: 0, users: 0, guests: 0 };
    counts.total = await Chatus.countDocuments();
    counts.seen = await Chatus.countDocuments({ messages: { $elemMatch: { seen: true } } });
    counts.unseen = await Chatus.countDocuments({ messages: { $elemMatch: { seen: false } } });
    counts.users = await Chatus.countDocuments({ user: { $ne: null } });
    counts.guests = await Chatus.countDocuments({ user: { $eq: null } });
    res.status(200).json(counts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.get('/', async (req, res) => {
  try {
    const {
      date: { start, end },
      status,
      username,
      sortBy,
      page,
    } = req.query;
    const query = {};
    if (status === 'unseen') {
      query.messages = { $elemMatch: { seen: false } };
    }
    if (status === 'seen') {
      query.messages = { $elemMatch: { seen: true } };
    }
    if (status === 'users') {
      query.user = { $ne: null };
    }
    if (status === 'guests') {
      query.user = { $eq: null };
    }
    if (!!username) {
      query['from.ip'] = new RegExp(username, 'i');
    }
    if (!!start && !!end) {
      query.date = { $gt: new Date(start), $lt: new Date(end) };
    }
    const options = {
      page,
      limit: 10,
      offset: (page - 1) * 10,
      sort: {},
      populate: [{ path: 'user', select: '_id username', model: User }],
    };
    if (sortBy === 'oldest') {
      options.sort.date = 1;
    } else if (sortBy === 'newest') {
      options.sort.date = -1;
    }
    const { docs, totalDocs } = await Chatus.paginate(query, options);
    const rooms = [];
    for (const item of docs) {
      const { country, city, ll } = geoip.lookup(getIP(item.from.ip));
      const { platform, browser } = UserAgent.parse(item.from.agent);
      let user;
      if (item.user) {
        user = await getProfile(item.user);
      }
      rooms.push({
        id: item._id,
        messages: item.messages.map((i) => ({
          client: i.client,
          message: i.message,
          date: i.date,
          seen: i.seen,
        })),
        date: item.date,
        device: {
          platform,
          browser,
        },
        location: {
          country,
          city,
          lat: ll[0],
          lon: ll[1],
        },
        user,
        ip: item.from.ip,
      });
    }
    res.status(200).json({ rooms, total: totalDocs });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Something went wrong.' });
  }
});
router.put('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    await Chatus.findByIdAndUpdate(roomId, { $set: { 'messages.$[].seen': true } });
    res.status(200).json({ message: 'Successfull.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.delete('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    await Chatus.findByIdAndDelete(roomId);
    res.status(200).json({ message: 'Deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
