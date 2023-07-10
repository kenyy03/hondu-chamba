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
      
    if( connectedUsers.length === 2){
      emitChats(connectedUsers);
    }
    });

    const emitChats = async (users) => {
      let messages = [];
      const sender = users[0];
      const receiver = users[1];
      try {
        
        messages = await Chat.find().or([
          { sender: sender._id, receiver: receiver._id },
          { sender: receiver._id, receiver: sender._id },
        ]).populate('sender receiver');
  
        socket.emit('server:loadChats', messages);
      }catch (error) {
        console.error(error);
        socket.emit('server:loadChats', messages)
      }
    };

    socket.on('client:message', async (body) => {
      // Save to database
      const chat = new Chat({
        sender: body.userId,
        receiver: body.to,
        message: body.body,
      });

      await chat.save();

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