const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { Mailus, Chatus, Admin } = require('../../../../database/admin');
const { User, Report } = require('../../../../database/micple');

router.get('/counts', async (req, res) => {
  try {
    const mails = await Mailus.find({ mails: { $elemMatch: { answered: false } } }).select('_id');
    const rooms = await Chatus.find({ messages: { $elemMatch: { seen: false } } }).select('_id');
    const reports = await Report.find({ answered: false }).select('_id');
    const users = await User.find({ approved: false }).select('_id');
    const data = {
      mails: mails.map((i) => i._id),
      messages: rooms.map((i) => i._id),
      reports: reports.map((i) => i._id),
      users: users.map((i) => i._id),
    };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.put('/edit', async (req, res) => {
  try {
    const {
      admin: { id },
      body: { username, password, newPassword, cNewPassword },
    } = req;
    if (!username || !password) {
      return res.status(400).json({ message: 'Not enough content.' });
    }
    const data = {
      username,
    };
    if (!!newPassword || !!cNewPassword) {
      if (newPassword !== cNewPassword) {
        return res.status(400).json({ message: 'Password did not match.' });
      } else if (newPassword.length < 8 || newPassword.length > 32) {
        return res.status(400).json({ message: 'Password length should be in between 8 & 32.' });
      } else {
        data.password = await bcrypt.hash(newPassword, 10);
      }
    }
    const admin = await Admin.findById(id).select('-_id password');
    if (!admin) {
      return res.status(401).json({ message: 'Something went wrong.' });
    }
    const result = await bcrypt.compare(password, admin.password);
    if (!result) {
      return res.status(401).json({ message: 'Wrong password.' });
    }
    await Admin.findByIdAndUpdate(id, { $set: data });
    res.status(200).json({ message: 'Update successful.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
