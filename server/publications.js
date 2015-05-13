Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('contents', function() {
  return Contents.find();
});
