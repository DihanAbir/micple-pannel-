const { verifyAdminToken } = require('../../../shared/tokens');
const { Admin } = require('../../../database/admin');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authentication.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'There is no authorization token.' });
    }
    const admin = verifyAdminToken(token);
    const exist = await Admin.exists({ _id: admin.id });
    if (!exist) {
      return res.status(401).json({ message: 'No admin found.', type: 'nouser' });
    }
    req.admin = admin;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Authentication failed.' });
  }
};
