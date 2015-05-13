Template.postPage.helpers({
  contents: function() {
    return Contents.find({postId: this._id});
  }
});
