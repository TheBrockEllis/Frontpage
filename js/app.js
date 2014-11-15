App = Ember.Application.create();

App.Student = Ember.Object.extend({
    FirstName: null,
    LastName: null,
    ID: null,

    FullName: function(){
        return this.get('FirstName') + ' ' + this.get('LastName');
    }.property('FirstName', 'LastName'),

    PhotoURL: function(){
        //var url = "https://app.sycamoreeducation.com/api/v1/Students/" + this.get('ID')

        return "https://app.sycamoreeducation.com/School/1002/Student/" + this.get("ID") + "/";
    }
});

App.Router.map(function() {
  this.resource("index", { path: "/" }, function(){
    this.resource("student", { path: ":firstname" }, function(){
      this.resource("homework");
      this.resource("grades");
      this.resource("missing");
    });
  });
  this.resource("about");
  this.resource("login");
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    //return students;
    var url = "https://app.sycamoreeducation.com/api/v1/Family/647150/Students";
    return Ember.$.getJSON(url);
  }
});

//redirect uri's cannot have hashes in them, which caused issues
/*App.LoginRoute = Ember.Route.extend({
  beforeModel: function(){
    $.getScript("js/oauth.js");
  }
});*/

App.StudentRoute = Ember.Route.extend({
  //model: function(params){
  //  return students.findBy('FirstName', params.firstname);
  //},
  beforeModel: function(){
    this.transitionTo('grades');
  }
});

App.GradesRoute = Ember.Route.extend({
    beforeModel: function() {
      // Assume the 'loading' class displays an overlay with a loading animation
      Ember.$('.spinner').css("display", "block");
    }, 
    model: function(){
      var url = "https://app.sycamoreeducation.com/api/v1/Student/614085/Grades";
      var grades = [];
      //return Ember.$.getJSON(url);
      return Ember.$.getJSON(url).then(function(data){
        $.each(data, function(index, obj){
          var grade = {};
          $.each(obj, function(key, value){
            grade[key.toLowerCase()] = value;
          });
          grades.push(grade);
        });
        //console.log(grades);
        return grades;
      });
    },
    afterModel: function() {
      Ember.$('.spinner').css("display", "none");
    }
});

App.HomeworkRoute = Ember.Route.extend({
    beforeModel: function() {
      // Assume the 'loading' class displays an overlay with a loading animation
      Ember.$('.spinner').css("display", "block");
    }, 
    model: function(){  
      var url = "https://app.sycamoreeducation.com/api/v1/Student/614085/Homework";
      var homework = [];
      //return Ember.$.getJSON(url);
      return Ember.$.getJSON(url).then(function(data){
        $.each(data, function(index, obj){
          var assignment = {};
          $.each(obj, function(key, value){
            assignment[key.toLowerCase()] = value;
          });
          homework.push(assignment);
        });
        //console.log(homework);
        return homework;
    })
  },
  afterModel: function() {
    Ember.$('.spinner').css("display", "none");
  }
})

App.MissingRoute = Ember.Route.extend({
    beforeModel: function() {
      // Assume the 'loading' class displays an overlay with a loading animation
      Ember.$('.spinner').css("display", "block");
    }, 
    model: function(){
      var url = "https://app.sycamoreeducation.com/api/v1/Student/614085/Missing";
      var missing = [];
      //return Ember.$.getJSON(url);
      return Ember.$.getJSON(url).then(function(data){
        $.each(data, function(index, obj){
          var assignment = {};
          $.each(obj, function(key, value){
            assignment[key.toLowerCase()] = value;
          });
          missing.push(assignment);
        });
        //console.log(grades);
        return missing;
      });
    },
    afterModel: function() {
      Ember.$('.spinner').css("display", "none");
    }
});

$.ajaxSetup({
   'beforeSend': function(xhr) {           
      //var access_token = localStorage.getItem("sycamore_auth");
      var access_token = "dcc460446ecc8d5f5ae896caf7623155";
      xhr.setRequestHeader('Authorization', 'Bearer '+access_token);
    }
});
