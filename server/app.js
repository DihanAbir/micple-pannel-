const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");

const { isAuth } = require("./middlewares");

const reportsRoutes = require("./routes/reports");
const profileRoutes = require("./routes/profile");
const noticeRoutes = require("./routes/notice");
const adminRoutes = require("./routes/admin");
const usersRoutes = require("./routes/users");
const roomsRoutes = require("./routes/rooms");
const mailRoutes = require("./routes/mails");
const editRoutes = require("./routes/edit");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const adsRoutes = require("./routes/ads");

const app = express();

const publicFolder = path.join(__dirname, "..", "admin", "build");

app.use(cors());
app.use(bodyParser.json());
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicFolder));

app.use("/ap/auth", authRoutes);
app.use("/ap/admin", isAuth, adminRoutes);
app.use("/ap/users", isAuth, usersRoutes);
app.use("/ap/rooms", isAuth, roomsRoutes);
app.use("/ap/mails", isAuth, mailRoutes);
app.use("/ap/profile", isAuth, profileRoutes);
app.use("/ap/edit", isAuth, editRoutes);
app.use("/ap/post", isAuth, postRoutes);
app.use("/ap/sponsors", isAuth, adsRoutes);
app.use("/ap/reports", isAuth, reportsRoutes);
app.use("/ap/notice", isAuth, noticeRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(publicFolder, "index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Request not found." });
});

module.exports = app;
