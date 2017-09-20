var friends = require("../data/friends");

module.exports = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req, res) {

    //push form data to friends.js
    friends.push(req.body);
    var differenceArray = [];

    console.log(req.body);
    console.log(friends);

    for (i = 0; i < friends.length - 1; i++) {
      var diff = 0;
      for (j = 0; j < 10; j++) {
        diff += Math.abs(friends[i].scores[j] - req.body.scores[j]);
      }
      differenceArray.push(diff);
    }

    var min = Math.min(...differenceArray);
    var matchId = differenceArray.indexOf(min);

    res.json({
      name: friends[matchId].name,
      photo: friends[matchId].photo
    });
  });
};