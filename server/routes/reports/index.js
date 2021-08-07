const router = require('express').Router();

const { Report } = require('../../../../database/micple');
const { getProfile } = require('../../functions');

router.get('/', async (req, res) => {
  try {
    const { docs, totalDocs } = await Report.paginate({}, { sort: { date: -1 } });
    const reports = [];
    for (const r of docs) {
      const data = {
        id: r._id,
        date: r.date,
        from: await getProfile(r.from),
        to: await getProfile(r.to),
        title: r.title,
        detail: r.detail,
      };
      reports.push(data);
    }
    res.status(200).json({ reports, total: totalDocs });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Something went wrong.' });
  }
});
router.put('/:id', async (req, res) => {
  try {
    await Report.findByIdAndUpdate(req.params.id, { $set: { answered: true } });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Something went wrong.' });
  }
});
router.delete('/:report', async (req, res) => {
  try {
    const { report } = req.params;
    await Report.deleteOne({ _id: report });
    res.status(200).json({ message: 'Report deleted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
