Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'body', 'title').length > 0);
  }
});


Posts.deny({
  update: function(userId, post,fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.body;
  }
});


validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a headline";
  if (!post.body)
    errors.body =  "Please fill in a Content";
  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      body: String
    });

    var errors = validatePost(postAttributes);
    if (errors.title || errors.body)
      throw new Meteor.Error('invalid-post', "You must set a title and Content for your post")

var postWithSameLink = Posts.findOne({body: postAttributes.body});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }


    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});
