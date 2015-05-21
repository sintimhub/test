Template.postSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

   

    var post = {
      body: $(e.target).find('[name=body]').val(),
      title: $(e.target).find('[name=title]').val(),
    };


     Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      if (result.postExists)
        throwError('This has already been posted');


      Router.go('postPage', {_id: result._id});  
    });
  }
});

   
