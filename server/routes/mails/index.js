const router = require('express').Router();
const UserAgent = require('express-useragent');
const geoip = require('geoip-lite');

const { generate, generateArch } = require('../../../../cloud/functions');
const { Media, Archive } = require('../../../../database/cloud');
const { Mail, User } = require('../../../../database/micple');
const { Mailus } = require('../../../../database/admin');
const { getProfile } = require('../../functions');
const { getIP } = require('../../functions');

router.get('/counts', async (req, res) => {
  try {
    const counts = { total: 0, answered: 0, unanswered: 0 };
    counts.total = await Mailus.countDocuments();
    counts.answered = await Mailus.countDocuments({ mails: { $elemMatch: { answered: true } } });
    counts.unanswered = await Mailus.countDocuments({ mails: { $elemMatch: { answered: false } } });
    res.status(200).json(counts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Semething went wrong.' });
  }
});
router.get('/', async (req, res) => {
  try {
    const {
      date: { start, end },
      status,
      // username,
      sortBy,
      page,
    } = req.query;
    const query = {};
    if (status === 'answered') {
      query.mails = { $elemMatch: { answered: true } };
    }
    if (status === 'unanswered') {
      query.mails = { $elemMatch: { answered: false } };
    }
    if (!!start && !!end) {
      query['mails.date'] = { $gt: new Date(start), $lt: new Date(end) };
    }
    const options = {
      page,
      limit: 10,
      offset: (page - 1) * 10,
      sort: { date: -1 },
      populate: [
        { path: 'mails.image', select: 'name', model: Media },
        { path: 'mails.file', select: 'name', model: Archive },
        { path: 'user', select: 'username', model: User },
      ],
    };
    if (sortBy === 'a2z') {
      options.sort.user.username = 1;
    } else if (sortBy === 'z2a') {
      options.sort.user.username = -1;
    }
    const { docs, totalDocs } = await Mailus.paginate({}, options);
    const boxes = [];
    for (const box of docs) {
      let user;
      if (box.user) {
        user = await getProfile(box.user._id);
      }
      const mails = [];
      for (const mail of box.mails) {
        const { country, city, ll } = geoip.lookup(getIP(mail.from.ip));
        const { platform, browser } = UserAgent.parse(mail.from.agent);
        const data = {
          id: mail._id,
          message: mail.message,
          seen: mail.seen,
          answered: mail.answered,
          date: mail.date,
          location: {
            country,
            city,
            lat: ll[0],
            lon: ll[1],
          },
          ip: mail.from.ip,
          agent: {
            platform,
            browser,
          },
        };
        if (mail.image) {
          data.image = generate(mail.image.name, mail.image._id, req.admin.id, { h: 200 });
        }
        if (mail.file) {
          data.file = generateArch(mail.file._id, mail.file.name, req.admin.id);
        }
        mails.push(data);
      }
      boxes.push({
        id: box._id,
        date: box.date,
        user,
        mails: mails.sort((a, b) => b.date - a.date),
      });
    }
    res.status(200).json({ boxes, total: totalDocs });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Something went wrong.' });
  }
});
router.post('/', async (req, res) => {
  try {
    const {
      body: { date, username, subject, message },
    } = req;
    const user = await User.findOne({ username }).select('_id');
    if (!user) {
      return res.status(404).json({ message: 'No user found with the username.' });
    }
    const newMail = new Mail({
      date,
      to: user._id,
      subject,
      message,
      agent: req.headers['user-agent'],
      // ip: req.ip,
      ip : req.headers['x-real-ip'],

      support: true,
    });
    await newMail.save();
    res.status(201).json({ message: 'Mail is sent successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.put('/:boxId', async (req, res) => {
  try {
    const {
      body: { id },
      params: { boxId },
    } = req;
    await Mailus.findOneAndUpdate({ _id: boxId, mails: { $elemMatch: { _id: id } } }, { $set: { 'mails.$.answered': true } });
    res.status(200).json({ message: 'Successfull.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.delete('/:mailId', async (req, res) => {
  try {
    const {
      params: { mailId },
    } = req;
    await Mailus.findByIdAndDelete(mailId);
    res.status(200).json({ message: 'Deletion successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Wrong.' });
  }
});

module.exports = router;
