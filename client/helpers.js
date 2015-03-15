function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
};

Template.registerHelper("clerk_fetched_data" , function() {
    console.log("checking clerk data");
    var clerkData = Session.get("clerk_fetched_data");
    var result = "";
    if ( clerkData ) {
      console.log("found data");
      console.log(clerkData);
      if ( clerkData.bucket )
//        result = syntaxHighlight(JSON.stringify(clerkData.bucket,undefined,4));
        result = JSON.stringify(clerkData.bucket,undefined,4);
    }
    return result;
});

Template.registerHelper("clerk_fetched_metadata", function() {
    var clerkData = Session.get("clerk_fetched_data");
    var result = "";
    if ( clerkData ) {
//      result = syntaxHighlight(JSON.stringify(_.omit(clerkData,"bucket"),undefined,4)); // pretty print
      result = JSON.stringify(_.omit(clerkData,"bucket"),undefined,4); // pretty print
    }
    return result;
  });

