module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id);
    console.log('a user connected');
  })
};