var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');
var jwt = require('express-jwt');

var auth = jwt({
  'userProperty': 'payload',
  'secret': 'secret'
});

router.post('/post', auth, function(req,res){
  var message = new Message(req.body);
  message.body[0].created = new Date();
  message.body[0].sender = req.payload.id;
  message.isdeleted = false;
  message.user1 = req.payload.id;
  message.save(function(err, result){
    if (err) return res.status(500).send({
            err: "Server Error"
      });
      if (!result) return res.status(400).send({
            err: "Could not create message"
      });
        var id = result._id;
        User.update({_id: message.user1}, {$push: {
          messages: {_id: id}
        }}, function(err, result){
        User.update({_id: message.user2}, {$push: {
          messages: {_id: id}
        }}, function(err, result){
          res.send(); 
        });
      });
  
    });
});
router.get('/:id', auth, function(req,res){
  var id = req.params.id;
  Message.find({
  $or : [ { user1 : id }, {user2:id} ] 
     })
  .populate({
    path: 'user1',
    model: 'User',
    select : 'name image'
  }).populate({
    path: 'user2',
    model: 'User',
    select : 'name image'
  })
  .exec(function(err, result){
    if(err) return res.status(500).send({err: "The server is having issues."});
    if(!result) return res.status(400).send({err: "Could not get the messages."});
      res.send(result);
    });
});
// router.delete('/delete/:id', auth, function(req, res){
//   Review.remove({_id:req.params.id})
//   .exec(function(err, result){
//     if(err) return res.status(500).send({err: "The server is having issues."});
//     if(!result) return res.status(400).send({err: "Could not delete room."});
//     res.send();
//   });
// });

//Message replies
router.post('/reply', auth, function(req, res){
  var message = req.body;
  message.created = new Date();
  message.sender = req.payload.id;
  var id = message.body;
  delete message.body;
  console.log(message);
  
  Message.update({_id: id},
    {$push: {body:  message}} )
  .exec(function(err, result){
    if(err) return res.status(500).send({err: "The server is having issues."});
    if(!result) return res.status(400).send({err: "Could not push the reply."});
    res.send(message);
  });
});

module.exports = router;