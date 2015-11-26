// helpers
Template.clerkLatestKey.helpers( {
  clerk_key: function() {
    console.log("checking clerk key");
    return Session.get("clerk_key");
  }
});

//events
Template.clerkLatestKey.events({
  'click button' : function(event) {
    console.log("fetch " + Session.get("clerk_key"));

    Clerk.fetch(Session.get("clerk_key"), function(error,data) {
      if (!error) {
        console.log("fetched data");
        console.log(data);
        //Session.set("clerk_fecthed_data",data);
      }
      else {
        console.log(error);
      }
    });
  }
});
                                 
Template.clerkDataForm.events({
  'submit form': function (event) {
    event.preventDefault();
    //      event.stopPropagation();

    var text = event.target.dataToStore.value;

    // call API to get token for data
    if ( text.length > 0 ) {
      var data = JSON.parse(text);
      var cb = function(error, result) {
        var key = result;
        if ( key ) {
          console.log("callback got key" + key);
          Session.set("private_clerk_key",key);
        }
      };
      if  ( ! data ) {
        data = {"data": text};
      }
      Clerk.store(data, cb);
      // Clear form
      event.target.dataToStore.value = "";
      
    }

    // Prevent default form submit
    return false;
  }
});