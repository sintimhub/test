Template.postSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

   

    var post = {
      body: $(e.target).find('[name=body]').val(),
      title: $(e.target).find('[name=title]').val(),
    };

    post._id = Posts.insert(post);
    Router.go('postPage', post);
    body:$body.val();
  }

 });