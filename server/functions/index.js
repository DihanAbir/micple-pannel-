const { User } = require('../../../database/micple');
const { getProfileAvatar } = require('./media');

function getIP(ip) {
  return ip === '::ffff:127.0.0.1' ? '95.217.16.84' : ip;
}
function getProfile(id) {
  return new Promise(async (resolve, reject) => {
    try {
      let profile;
      const user = await User.findById(id).select('_id name username gender verified approved rejected banned');
      if (!user) {
        reject('No profile found.');
      }
      const avatar = await getProfileAvatar(user._id, 100);
      profile = {
        id: user._id,
        name: user.name,
        username: user.username,
        gender: user.gender,
        avatar,
        approved: user.approved,
        banned: user.banned,
        rejected: user.rejected,
      };
      if (user.verified) {
        profile.verified = user.verified;
      }
      resolve(profile);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getProfile,
  getIP,
};
