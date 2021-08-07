const router = require("express").Router();
const multiparty = require("connect-multiparty")();

const {
  generate,
  removeFile,
  saveFile,
} = require("../../../../cloud/functions");
const { Frontad } = require("../../../../database/admin");
const { Media } = require("../../../../database/cloud");

router.get("/:side", async (req, res) => {
  // console.log(`req.params`, );
  try {
    const { side } = req.params;
    if (!["left", "right", "top"].includes(side)) {
      return res.status(400).json({ message: "Invalid request." });
    }
    const data = await Frontad.find({ side: side }).populate(
      "image",
      "_id name",
      Media
    );
    // console.log(`data`, data);
    const ads = [];

    data.map((ad) => {
      console.log(`image`, req.params, ad.image.name);
      ads.push({
        id: ad._id,
        image: generate(ad.image.name, ad.image._id, { h: 75 }),
        link: ad.link,
        date: ad.date,
        title: ad.title,
      });
    });

    // for (const ad of data) {
    // }
    // for (const ad of data) {
    //   console.log(`image`, ad.image.name);
    //   ads.push({
    //     id: ad._id,
    //     image: generate(ad.image.name, ad.image._id, { h: 75 }),
    //     link: ad.link,
    //     date: ad.date,
    //     title: ad.title,
    //   });
    // }
    res.status(200).json(ads);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong." });
  }
});

router.post("/:side", multiparty, async (req, res) => {
  try {
    const {
      body: { link, date, title },
      admin: { id },
      files,
      params: { side },
    } = req;

    // console.log(`side`, req.body);

    if (!["left", "right", "top"].includes(side)) {
      return res.status(400).json({ message: "Invalid request." });
    }
    const [{ fileName }] = await saveFile(files);

    const media = await new Media({
      date,
      name: fileName,
      privacy: "private",
      title: "",
      type: files.image.type,
      user: id,
    }).save();

    const newAd = new Frontad({ date, link, title, image: media._id, side });
    const ad = await newAd.save();
    res.status(200).json({
      id: ad._id,
      link,
      image: generate(fileName, media._id, { h: 75 }),
      date: date,
      title,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong." });
  }
});

router.put("/:adId", multiparty, async (req, res) => {
  try {
    const {
      params: { adId },
      body: { date, link, title },
      files,
      admin: { id },
    } = req;
    const data = { date, link, title };
    let old;
    if (files.image) {
      old = await Frontad.findById(adId)
        .select("-_id image")
        .populate("image", "name", Media);
      const [{ fileName }] = await saveFile(files);
      const media = await new Media({
        date,
        name: fileName,
        privacy: "private",
        title: "",
        type: files.image.type,
        user: id,
      }).save();
      data.image = media._id;
    }
    const newData = await Frontad.findByIdAndUpdate(
      adId,
      { $set: data },
      { new: true }
    ).populate("image", "name", Media);
    if (old) {
      removeFile(old.image.name);
      await Media.findByIdAndDelete(old.image._id);
    }
    res.status(200).json({
      id: newData._id,
      link,
      image: generate(newData.image.name, newData.image._id, { h: 75 }),
      date,
      title,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong." });
  }
});

router.delete("/:adId", async (req, res) => {
  try {
    const {
      params: { adId },
    } = req;
    const ad = await Frontad.findById(adId).select("-_id image");
    const media = await Media.findById(ad.image).select("-_id name");
    removeFile(media.name);
    await Media.findByIdAndDelete(ad.image);
    await Frontad.findByIdAndDelete(adId);
    res.status(200).json({ message: "Ad deletion successful" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong." });
  }
});

module.exports = router;
