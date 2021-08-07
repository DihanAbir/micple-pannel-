const router = require('express').Router();

const { User, Group, Note, Work, Education } = require('../../../../database/micple');
const { getProfileAvatar, getProfileCover } = require('../../functions/media');
const { generate } = require('../../../../cloud/functions');
const { Media } = require('../../../../database/cloud');
const { Post } = require('../../../../database/posts');
const countries = require('../../data/countries.json');

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('_id name username gender verified locker');
    if (!user) {
      res.status(404).json({ message: 'Profile not found.' });
    } else {
      const avatar = await getProfileAvatar(user._id, 256);
      const cover = await getProfileCover(user._id);
      const profile = {
        ...cover,
        id: user._id,
        name: user.name,
        username: user.username,
        gender: user.gender,
        verified: user.verified,
        avatar,
        locker: user.locker,
      };
      res.status(200).json(profile);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
router.get('/timeline/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { offset } = req.query;
    const user = await User.findOne({ username }).select('_id');
    const query = { place: user._id };
    const options = {
      sort: { date: -1 },
      populate: [
        { path: 'user', select: 'name username gender', model: User },
        { path: 'media', select: 'type name', model: Media },
      ],
      lean: true,
      offset: offset || 0,
      limit: 10,
    };
    const { docs, totalDocs } = await Post.paginate(query, options);
    const posts = [];
    for (const post of docs) {
      const avatar = await getProfileAvatar(post.user._id, 50);
      let status = '';
      if (!!post.status) {
        switch (post.status) {
          case 'avatar':
            status = 'updated profile photo.';
            break;
          case 'cover':
            status = 'updated cover photo.';
            break;
          default:
            status = null;
            break;
        }
      }
      const reacts = {};
      reacts['angry'] = Object.keys(post.reactions || {}).filter((key) => post.reactions[key] === 'angry').length;
      reacts['haha'] = Object.keys(post.reactions || {}).filter((key) => post.reactions[key] === 'haha').length;
      reacts['like'] = Object.keys(post.reactions || {}).filter((key) => post.reactions[key] === 'like').length;
      reacts['love'] = Object.keys(post.reactions || {}).filter((key) => post.reactions[key] === 'love').length;
      reacts['sad'] = Object.keys(post.reactions || {}).filter((key) => post.reactions[key] === 'sad').length;
      reacts['wow'] = Object.keys(post.reactions || {}).filter((key) => post.reactions[key] === 'wow').length;
      const p = {
        id: post._id,
        date: post.date,
        contents: post.contents,
        privacy: post.privacy,
        totalComments: post.comments.length,
        rejected: post.rejected,
        comments: [],
        reacts,
        media: post.media.map((mda) => ({
          id: mda._id,
          type: mda.type.split('/')[0],
          url: generate(mda.name, mda._id, req.admin.id, { h: 540 }),
        })),
        user: {
          id: post.user._id,
          username: post.user.username,
          name: post.user.name,
          avatar,
          gender: post.user.gender,
          verified: post.user.verified,
        },
        shares: post.shares.length,
        status,
        place: post.place,
      };
      posts.push(p);
    }
    res.status(200).json({ posts, total: totalDocs });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Something went wrong.' });
  }
});
router.get('/about/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select('gender works educations dob phone location family relation locker website')
      .populate([
        {
          path: 'works',
          select: 'group employer position detail privacy',
          model: Work,
          populate: {
            path: 'group',
            select: 'name avatar',
            model: Group,
            populate: {
              path: 'avatar',
              select: 'name',
              model: Media,
            },
          },
        },
        {
          path: 'educations',
          select: 'group name department degree privacy detail type',
          model: Education,
          populate: {
            path: 'group',
            select: 'name avatar',
            model: Group,
            populate: {
              path: 'avatar',
              select: 'name',
              model: Media,
            },
          },
        },
      ]);
    const about = {
      gender: user.gender,
      dob: user.dob,
      location: {
        ...user.location.current,
        country: countries[user.location.current.country || 'US'].name,
      },
      relation: user.relation,
      phone: user.phone,
      works: [],
      educations: {
        schools: [],
        colleges: [],
        universities: [],
      },
    };
    if (user.website.name) {
    }

    for (const w of user.works) {
      const em = {};
      if (w.group) {
        em.group = {
          id: w.group._id,
          name: w.group.name,
          avatar: w.group.avatar ? generate(w.group.avatar.name, w.group.avatar._id, req.admin.id, { h: 100 }) : '',
        };
      }
      about.works.push({
        ...em,
        id: w._id,
        privacy: w.privacy,
        employer: w.employer,
        position: w.position,
        detail: w.detail,
      });
    }

    for (const i of user.educations) {
      const ins = {
        id: i._id,
        privacy: i.privacy,
        name: i.name,
        department: i.department,
        degree: i.degree,
        detail: i.detail,
      };
      switch (i.type) {
        case 'S':
          about.educations.schools.push(ins);
          break;
        case 'C':
          about.educations.colleges.push(ins);
          break;
        case 'U':
          about.educations.universities.push(ins);
          break;
        default:
          break;
      }
    }

    about.family = [];
    for (const f of user.family) {
      about.family.push({ id: f._id, name: f.name, relation: f.relation, privacy: f.privacy });
    }
    res.status(200).json(about);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'User not found.' });
  }
});
router.get('/friends/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select('-_id friends')
      .populate('friends.user', '_id username name gender verified', User);
    if (!user) {
      return res.status(200).json({ message: 'No user found.' });
    }
    const friends = [];
    for (const friend of user.friends) {
      if (friend.user && friend.status === 'active') {
        const avatar = await getProfileAvatar(friend.user._id, 100);
        const profile = {
          id: friend.user._id,
          name: friend.user.name,
          username: friend.user.username,
          gender: friend.user.gender,
          avatar,
          verified: friend.user.verified,
        };
        friends.push(profile);
      }
    }
    res.status(200).json({ friends, counts: friends.length });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'User not found.' });
  }
});
router.get('/media/:username/:name', async (req, res) => {
  try {
    const { username, name } = req.params;
    const user = await User.findOne({ username }).select('_id');
    if (!user) {
      res.status(404).json({ message: 'No user found.' });
    }
    const type = name === 'photo' ? /^image\// : name === 'audio' ? /^audio\// : /^video\//;
    const query = { user: user._id, place: user._id, type };
    const counts = await Media.countDocuments(query);
    const media = await Media.find(query).select('_id name privacy title date duration').sort({ date: -1 });
    const items = [];
    for (const item of media) {
      const post = await Post.findOne({ media: item._id }).select('_id');
      items.push({
        id: item._id,
        url: generate(item.name, item._id, req.admin.id, name === 'photo' ? { h: 169, w: 300 } : {}),
        privacy: item.privacy,
        title: item.title,
        date: item.date,
        duration: item.duration,
        post: post._id,
      });
    }
    res.status(200).json({ counts, media: items });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Something went wrong.' });
  }
});
router.get('/groups/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('_id');
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
    } else {
      const data = await Group.find({ 'members.user': user._id }).select('_id name date privacy avatar members');
      const groups = [];
      for (const group of data) {
        const data = {
          id: group._id,
          name: group.name,
          date: group.date,
          privacy: group.privacy,
          avatar: group.avatar ? generate(group.avatar.name, group.avatar._id, req.admin.id, { h: 100, w: 100 }) : '',
          members: group.members.length || 0,
          ppd: 0,
        };
        groups.push(data);
      }
      res.status(200).json({
        groups,
        counts: data.length,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'No groups.' });
  }
});
router.get('/notes/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const query = { username };
    const { _id } = await User.findOne(query).select('_id');
    const counts = await Note.countDocuments({ user: _id });
    const data = await Note.find({ user: _id }).select('date title privacy');
    const notes = [];
    for (const note of data) {
      const n = {
        id: note._id,
        date: note.date,
        title: note.title,
        privacy: note.privacy,
      };
      notes.push(n);
    }
    res.status(200).json({
      notes,
      counts,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'No Notes.' });
  }
});
router.get('/notes/:username/:noteId', async (req, res) => {
  try {
    const { username, noteId } = req.params;
    const user = await User.findOne({ username }).select('_id');
    const data = await Note.findOne({ user: user._id, _id: noteId }).select('_id title date note privacy');
    const note = { id: data._id, date: data.date, title: data.title, note: data.note, privacy: data.privacy };
    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.get('/activities/:username', (req, res) => {
  res.status(200).json([]);
});

module.exports = router;
