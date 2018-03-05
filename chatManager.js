var mongoose = require('mongoose');
var Chat = require('./models/chatModel.js');


mongoose.connect('mongodb://127.0.0.1:27017/mydb');
const db = mongoose.connection;
db.on('error',()=>{
    console.error('Connection error ');
});

db.once('open',()=>{
    console.log('Connected to MongoDB');
});


const save_chat = function (chat) {  
  console.log(chat);  
  var data = new Chat({  
      from: chat.from,  
      clientId: chat.clientId,  
      message: chat.message  
  });  
  data.save(function (err, fluffy) {  
      if (err) {  
          return console.error(err);  
      }  
  });  
};  

const get_history = function (callback) {  
  Chat.find(function (err, chats) {  
      if (err) return console.error(err);  
      console.log(chats);  
      return callback(chats);  
  });  
}; 

module.exports = { saveChat: save_chat, getHistory: get_history };  