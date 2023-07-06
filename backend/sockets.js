const Chat = require('./models/chat.model');

module.exports = (io) => {
  let connectedUsers = [];

  io.on('connection', (socket) => {

    socket.on('client:join', (user) => {
      user.socketId = socket.id;
      user.socketDate = new Date(Date.now());

      connectedUsers.push(user);
      connectedUsers.sort((a, b) => a.socketDate - b.socketDate);
      connectedUsers.reverse();
      connectedUsers = connectedUsers.filter(((value, index, self) => self.findIndex((t) => t._id === value._id) === index ));

      if(connectedUsers.length > 2){
        socket.emit('server:messageError', {message: 'You are not allowed to send more messages'})
        socket.disconnet();
      }
    });

    socket.on('client:message', async (body) => {
      // Save to database
      const chat = new Chat({
        sender: body.userId,
        receiver: body.to,
        message: body.body,
      });

      // chat.save();

      // Find messages from database
      const messages = await Chat.find().or([
        { sender: body.userId, receiver: body.to },
        { sender: body.to, receiver: body.userId },
      ]);
      // Send to all clients

      const sender = connectedUsers.find((user) => user._id === body.userId);
      const receiver = connectedUsers.find((user) =>  user._id === body.to);
      if(sender && receiver){
        socket.broadcast.to(receiver.socketId).emit('server:message', {
          userId: sender._id,
          to: receiver._id,
          body: body.body,
          from: body.from,
        });
      }
    });

    // socket.on('client:disconnect', () => {
    //   // Eliminar el cliente desconectado de la lista de clientes
    //   connectedUsers = connectedUsers?.filter((user) => user?.socketId !== socket.id);
    //   console.log('a user disconnected');
    // });
  })
};