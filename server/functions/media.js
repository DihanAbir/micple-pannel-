const { generate } = require('../../../cloud/functions');
const { Media } = require('../../../database/cloud');

function getProfileAvatar(userId, size) {
  return new Promise((res, rej) => {
    Media.findOne({ user: userId, place: userId, status: 'avatar' })
      .sort({ date: -1 })
      .then((media) => {
        if (media) {
          res(generate(media.name, media._id, userId, { w: size, h: size }));
        } else {
          res('');
        }
      })
      .catch(console.log);
  });
}
function getProfileCover(userId, width = 980) {
  return new Promise(async (res) => {
    try {
      const media = await Media.findOne({ user: userId, place: userId, status: 'cover' }).sort({ date: -1 }).select('name offset');
      res({ cover: generate(media.name, media._id, userId, { w: width }), offset: media.offset });
    } catch (error) {
      res({ cover: '', offset: 0 });
    }
  });
}

module.exports = {
  getProfileAvatar,
  getProfileCover,
};
