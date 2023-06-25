module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (body) => {
      console.log('message received', body.body);
      socket.broadcast.emit('message', {
        body: body.body,
        from: body.from,
      });
    } );
  })
};