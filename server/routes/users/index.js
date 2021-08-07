const router = require('express').Router();
const { compare, hash } = require('bcryptjs');

const { getProfileAvatar } = require('../../functions/media');
const { generate } = require('../../../../cloud/functions');
const countriesAPI = require('../../data/countries.json');
const { passwordTest } = require('../../functions/test');
const { User } = require('../../../../database/micple');
const { Media } = require('../../../../database/cloud');

router.get('/', async (req, res) => {
  try {
    const counts = { total: 0, approved: 0, pending: 0, banned: 0, rejected: 0 };
    const codes = await User.find().distinct('location.current.country');
    counts.total = await User.countDocuments();
    counts.approved = await User.countDocuments({ approved: true, banned: false, rejected: false });
    counts.pending = await User.countDocuments({ banned: false, approved: false, rejected: false });
    counts.banned = await User.countDocuments({ banned: true, approved: true, rejected: false });
    counts.rejected = await User.countDocuments({ rejected: true, approved: false, banned: false });
    counts.verified = await User.countDocuments({ verified: true });
    const countries = codes.map((item) => ({
      name: countriesAPI[item].name,
      value: item,
    }));
    res.status(200).json({ counts, countries });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.post('/', async (req, res) => {
  try {
    const {
      date: { start, end },
      country,
      status,
      username,
      sortBy,
      page,
    } = req.body;
    const query = {};
    if (status === 'pending') {
      query.banned = false;
      query.approved = false;
      query.rejected = false;
    }
    if (status === 'approved') {
      query.approved = true;
      query.rejected = false;
      query.banned = false;
    }
    if (status === 'banned') {
      query.banned = true;
      query.approved = true;
      query.rejected = false;
    }
    if (status === 'rejected') {
      query.rejected = true;
      query.approved = false;
      query.banned = false;
    }
    if (status === 'verified') {
      query.verified = true;
    }
    if (!!country) {
      query['location.current.country'] = country;
    }
    if (!!username) {
      query.username = new RegExp(username, 'i');
    }
    if (!!start && !!end) {
      query['devices.reg.date'] = { $gt: new Date(start), $lt: new Date(end) };
    }
    const options = {
      page: 1,
      limit: 10,
      offset: (page - 1) * 10,
      sort: {},
      select: 'name username gender approved banned rejected verified avatar location.current.country',
    };
    if (sortBy === 'a2z') {
      options.sort.username = 1;
    } else if (sortBy === 'z2a') {
      options.sort.username = -1;
    } else if (sortBy === 'oldest') {
      options.sort['devices.reg.date'] = 1;
    } else if (sortBy === 'newest') {
      options.sort['devices.reg.date'] = -1;
    }
    const { docs, totalDocs } = await User.paginate(query, options);
    const users = [];
    for (const user of docs) {
      const avatar = await getProfileAvatar(user._id);
      users.push({
        id: user._id,
        name: user.name,
        username: user.username,
        approved: user.approved,
        rejected: user.rejected,
        verified: user.verified,
        banned: user.banned,
        avatar,
        gender: user.gender,
        country: countriesAPI[user.location.current.country].name,
      });
    }
    res.status(200).json({
      users,
      total: totalDocs,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'No user found.', users: [] });
  }
});
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .select('name username approved banned rejected verified dob.date gender identity location.current family phone.number hash')
      .populate('avatar', '_id name', Media)
      .populate('cover', '_id name', Media);
    if (!user) {
      return res.status(404).json({ message: 'No user found.' });
    }
    const data = {
      id: user._id,
      name: user.name,
      username: user.username,
      password: user.hash,
      gender: user.gender,
      dob: user.dob.date,
      avatar: user.avatar ? generate(user.avatar.name, user.avatar._id, req.admin.id, { h: 256 }) : '',
      phone: user.phone.number,
      rejected: user.rejected,
      banned: user.banned,
      approved: user.approved,
      verified: user.verified,
      location: {
        address: user.location.current.address,
        city: user.location.current.city,
        state: user.location.current.state,
        zip: user.location.current.zip,
        country: countriesAPI[user.location.current.country].name,
      },
      identity: user.identity,
      parents: {
        father: user.family.find((i) => i.relation === 'Father').name,
        mother: user.family.find((i) => i.relation === 'Mother').name,
      },
    };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'User not found.' });
  }
});
router.put('/:userId/status', async (req, res) => {
  try {
    const {
      body: { name, value },
      params: { userId },
    } = req;
    await User.findByIdAndUpdate(userId, { $set: { [name]: value } });
    res.status(201).json({ message: 'User updated successfully.' });
  } catch (error) {
    console.log(error);
    res.status(304).json({ message: 'Not modified.' });
  }
});
router.put('/:userId/password', async (req, res) => {
  try {
    const {
      params: { userId },
      body: { password, newPassword, confirmPassword },
    } = req;
    if (newPassword !== confirmPassword || !passwordTest(newPassword)) {
      return res.status(401).json({ message: 'Create a matching & valid password.' });
    }
    const user = await User.findById(userId).select('password requests.password');
    const result = await compare(password, user.password);
    if (!result) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }
    const passHash = await hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { $set: { password: passHash, hash: password } });
    res.status(200).json({ mesage: 'Password has been changed successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
