const router = require('express').Router();

const { Notice } = require('../../../../database/admin');

router.get('/', async (req, res) => {
  try {
    const notice = {};
    const data0 = await Notice.findOne({ show: true }).select('title date show').sort({ date: -1 });
    if (data0) {
      notice.id = data0._id;
      notice.show = data0.show;
      notice.date = data0.date;
      notice.title = data0.title;
    } else {
      const data1 = await Notice.findOne({}).select('title date show').sort({ date: -1 });
      if (data1) {
        notice.id = data1._id;
        notice.show = data1.show;
        notice.date = data1.date;
        notice.title = data1.title;
      }
    }
    res.status(200).json(notice);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.post('/', async (req, res) => {
  try {
    const {
      admin: { id },
      body: { date, title },
    } = req;
    await Notice.updateMany({}, { $set: { show: false } });
    await new Notice({
      admin: id,
      date,
      title,
    }).save();
    res.status(201).json({ message: 'Notice created.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
router.put('/', async (req, res) => {
  try {
    const { show } = req.body;
    if (show) {
      const data = await Notice.findOne({}).sort({ date: -1 });
      await data.updateOne({ $set: { show: true } });
    } else {
      await Notice.updateMany({}, { show: false });
    }
    res.status(200).json({ message: 'Done' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somethong went wrong' });
  }
});
router.get('/all', async (req, res) => {
  try {
    const data = await Notice.find({}).sort({ date: -1 }).select('date title show');
    const notices = [];
    for (const notice of data) {
      const i = {
        id: notice._id,
        date: notice.date,
        title: notice.title,
        show: notice.show,
      };
      notices.push(i);
    }
    res.status(200).json(notices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somethong went wrong' });
  }
});
router.put('/:nid', async (req, res) => {
  try {
    const {
      body: { show },
      params: { nid },
    } = req;
    await Notice.updateOne({ _id: nid }, { $set: { show } });
    await Notice.updateMany({ $nor: [{ _id: nid }] }, { $set: { show: false } });
    res.status(200).json({ message: 'Done' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somethong went wrong' });
  }
});
router.delete('/:nid', async (req, res) => {
  try {
    const { nid } = req.params;
    await Notice.deleteOne({ _id: nid });
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somethong went wrong' });
  }
});

module.exports = router;
