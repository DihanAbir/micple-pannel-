const router = require('express').Router();

const { User, Room, Note, Mail, Notification, Group } = require('../../../../database/micple');
const { Media, Archive } = require('../../../../database/cloud');
const { Post, Comment } = require('../../../../database/posts');

router.put('/:uid/name', async (req, res) => {
  try {
    const { first, last } = req.body;
    await User.findByIdAndUpdate(req.params.uid, { $set: { name: [first, last] } });
    res.status(200).json({ message: 'Name changed successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
router.put('/:uid/parents', async (req, res) => {
  try {
    const { uid } = req.params;
    const { father, mother } = req.body;
    const user = await User.findById(uid).select('-_id family');
    if (!user) {
      return res.status(404).json({ message: 'No user found.' });
    }
    const family = user.family.map((item) => {
      if (item.relation === 'Father') {
        item.name = father;
      } else if (item.relation === 'Mother') {
        item.name = mother;
      }
      return item;
    });
    await User.findByIdAndUpdate(uid, { $set: { family: family } });
    res.status(200).json({ message: 'Name changed successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
router.put('/:uid/gender', async (req, res) => {
  try {
    const { gender } = req.body;
    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({ message: 'Invalid gender.' });
    }
    await User.findByIdAndUpdate(req.params.uid, { $set: { gender } });
    res.status(200).json({ message: 'Gender changed successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
router.put('/:uid/dob', async (req, res) => {
  try {
    const { dob } = req.body;
    await User.findByIdAndUpdate(req.params.uid, { $set: { dob: { date: dob } } });
    res.status(200).json({ message: 'DOB changed successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
router.put('/:uid/location', async (req, res) => {
  try {
    const { address, city, state, zip } = req.body;
    await User.findByIdAndUpdate(req.params.uid, {
      $set: {
        'location.current.address': address,
        'location.current.city': city,
        'location.current.state': state,
        'location.current.zip': zip,
      },
    });
    res.status(200).json({ message: 'Location changed successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
router.put('/:uid/identity', async (req, res) => {
  try {
    const { birth, nicnip, taxid } = req.body;
    await User.findByIdAndUpdate(req.params.uid, { $set: { identity: { birth, nicnip, taxid } } });
    res.status(200).json({ message: 'Identity changed successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
router.put('/:uid/username', async (req, res) => {
  try {
    const { username } = req.body;
    const un = username.trim();
    const user = await User.exists({ username: un });
    if (user) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    await User.findByIdAndUpdate(req.params.uid, { $set: { username: un } });
    res.status(200).json({ message: 'Username changed successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
router.put('/:uid/phone', async (req, res) => {
  try {
    const { phone } = req.body;
    const n = phone.trim();
    const user = await User.exists({ 'phone.number': n });
    if (user) {
      return res.status(400).json({ message: 'Phone number already exists.' });
    }
    await User.findByIdAndUpdate(req.params.uid, { $set: { 'phone.number': phone } });
    res.status(200).json({ message: 'Phone changed successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
router.delete('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    await Archive.deleteMany({ $or: [{ from: uid }, { to: uid }] });
    await Mail.deleteMany({ $or: [{ from: uid }, { to: uid }] });
    await Media.deleteMany({ user: uid });
    await Note.deleteMany({ user: uid });
    await Post.deleteMany({ user: uid });
    await Room.deleteMany({ users: uid, type: 'private' });
    await Comment.deleteMany({ user: uid });
    // await Room.updateMany({ users: uid }, {$pull: {users: uid}});
    await Notification.deleteMany({ user: uid });
    await Group.updateMany({ 'members.user': uid }, { $pull: { members: { user: uid } } });
    await User.updateMany({ 'friends.user': uid }, { $pull: { friends: { user: uid } } });
    await User.updateMany({ blocklist: uid }, { $pull: { blocklist: uid } });
    await User.findByIdAndDelete(uid);
    res.status(200).json({ message: 'User has been deleted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

module.exports = router;
