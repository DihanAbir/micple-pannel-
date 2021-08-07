const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { signAdminToken } = require('../../../../shared/tokens');
const { Admin } = require('../../../../database/admin');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username }).select('name username password');


    if (!admin) {
      res.status(401).json({ message: 'Invalid credentials.' });
    } else if (!bcrypt.compareSync(password, admin.password)) {
      res.status(401).json({ message: 'Invalid credentials.' });
    } else {
      const token = signAdminToken({ id: admin._id, username: admin.username, type: 'admin' });
      res
        .cookie('t', token)
        .status(200)
        .json({
          token,
          admin: {
            id: admin._id,
            name: admin.name,
            username: admin.username,
          },
        });
    }
  } catch (error) {
    console.log(error);
    res.status(406).json({ message: 'Something went wrong.' });
  }
});
router.get('/logout', (req, res) => {
  res.cookie('t', null).status(200).json('Logged out.');
});

module.exports = router;
