Router.route(//this.options.uiPath, 
  "/",
  function () {
    this.render(//this.options.uiTemplate
      "home");
  });

Router.route(//this.options.uiPath, 
  "/home",
  function () {
    this.redirect("/");
  });

