var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Room = mongoose.model('Room');
var User = mongoose.model('User');
var jwt = require('express-jwt');

var auth = jwt({
  'userProperty': 'payload',
  'secret': 'secret'
});

router.post('/post', auth, function(req,res){
  var review = new Review(req.body);
  review.created = new Date();
  review.user = req.payload.id;
  review.save(function(err, result){
    if (err) return res.status(500).send({
            err: "Server Error"
      });
      if (!result) return res.status(400).send({
            err: "Could not add review"
      });
      var reviewId = result._id;
      Room.update({_id: review.room }, {$push: { 
            reviews:{
          _id: result._id
            }
        }}, function(err, room) {
          User.update({_id: review.user }, {$push: { 
              reviews:{
                _id: reviewId
              }
          }}, function(err, result) {
            console.log(review);
             res.send(review);
          });
    });
    });
});
router.get('/:id', function(req, res){
  Review.findOne({_id: req.params.id})
  .exec(function(err, result){
    if(err) return res.status(500).send({err: "The server is having issues."});
    if(!result) return res.status(400).send({err: "Could not return the room."});
      res.send(result);
    });
  });
router.delete('/delete/:id', auth, function(req, res){
  Review.remove({_id:req.params.id})
  .exec(function(err, result){
    if(err) return res.status(500).send({err: "The server is having issues."});
    if(!result) return res.status(400).send({err: "Could not delete room."});
    res.send();
  });
});
router.put('/edit/:id', auth, function(req, res){
  Review.update({_id:req.params.id}, req.body)
  .exec(function(err, result){
    if(err) return res.status(500).send({err: "The server is having issues."});
    if(!result) return res.status(400).send({err: "Could not edit the review."});
    res.send();
  });
});

//replies
router.post('/reply', auth, function(req,res){
  var reply = req.body;
  reply.created = new Date();
  reply.user = req.payload.id;
  reply.username = req.payload.username;
  Review.update({_id: reply.review},
    {$push: {replies:  reply}} )
  .exec(function(err, result){
    if(err) return res.status(500).send({err: "The server is having issues."});
    if(!result) return res.status(400).send({err: "Could not push the reply."});
    res.send(reply);
  });
});

module.exports = router;