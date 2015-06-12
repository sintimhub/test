Template.postItem.helpers({
	ownPost: function() {
    return this.userId === Meteor.userId();
  }
});

Template.postItem.events({
  'click .upvote': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});