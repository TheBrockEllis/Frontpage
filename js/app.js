App = Ember.Application.create();

App.Router.map(function() {
  this.resource("index", { path: "/" }, function(){
    this.resource("student", { path: ":firstname" }, function(){
      this.resource("homework");
      this.resource("grades");
      this.resource("missing");
    });
  });
  this.resource("about");
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return students;
  }
});

App.StudentRoute = Ember.Route.extend({
  model: function(params){
    return students.findBy('firstname', params.firstname);
  },
  afterModel: function(){
    this.transitionTo('grades');
  }
});

var students = [
  {
    id: '1',
    firstname: "Ansleigh",
    lastname: "Ellis",
    age: '2',
    grade: "K"
  },
  {
    id: '2',
    firstname: "Mason",
    lastname: "Ellis",
    age: '0',
    grade: '0'
  }
];
