const socketIo = require('socket.io');
const http = require('http');

const { verifyAdminToken } = require('../../shared/tokens');
const { Mailus, Chatus } = require('../../database/admin');
const { Report, User } = require('../../database/micple');
const app = require('./app');

const server = http.createServer(app);

const io = socketIo(server, { origins: '*:*' });

const sockets = new Set();

io.use(async (socket, next) => {
  try {
    const { token } = socket.handshake.query;
    if (!token || token === 'null') {
      return;
    }
    const admin = verifyAdminToken(token);
    if (admin) {
      socket.admin = admin;
      sockets.add(socket.id);
      next();
    }
    io.emit('404', 404);
  } catch (error) {
    console.log(error);
  }
}).on('connection', async (socket) => {
  socket.on('disconnect', () => {
    sockets.delete(socket.id);
  });
});

Mailus.watch().on('change', async (change) => {
  const data = await Mailus.find({ mails: { $elemMatch: { answered: false } } }).select('_id');
  const ids = data.map((i) => i._id);
  io.emit('update_count', { name: 'mails', ids });
});
Chatus.watch().on('change', async (change) => {
  const data = await Chatus.find({ messages: { $elemMatch: { seen: false } } }).select('_id');
  const ids = data.map((i) => i._id);
  io.emit('update_count', { name: 'messages', ids });
});
Report.watch().on('change', async (change) => {
  const data = await Report.find({ answered: false }).select('_id');
  const ids = data.map((i) => i._id);
  io.emit('update_count', { name: 'reports', ids });
});
User.watch().on('change', async (change) => {
  const data = await User.find({ approved: false }).select('_id');
  const ids = data.map((i) => i._id);
  io.emit('update_count', { name: 'users', ids });
});

module.exports = server;
