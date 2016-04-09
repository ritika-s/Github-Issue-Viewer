var express = require('express');
var router = express.Router();
var github = require('octonode');
var client = github.client();

/* Issue Detail Page. */

router.get('/', function(req, res, next) {
  issue = req.param('issueNumber');
  if (issue == null) {issue = 1;}
  // console.log("calling ghissue.info function", issue);
  var ghissue = client.issue('npm/npm', issue);
  var issue_details={};
  // fetching issue details
  ghissue.info(function (err,b,h){
    if(err || !b || !h){
      res.status(500).send('Something broke while fetching data from Github! Try refreshing the page later.');
    }
    else {
      console.log(JSON.stringify(b));
      issue_details["number"] = b["number"];
      issue_details["state"] = b["state"];
      issue_details["labels"] = b["labels"];
      issue_details["user"] = b["user"]["login"];
      issue_details["avatar"] = b["user"]["avatar_url"];
      issue_details["body"] = b["body"];
      issue_details["title"] = b["title"];

      ghissue.comments(function (err, b, h) {
        if (err || !b || !h) {
          res.status(500).send('Something broke while fetching data from Github! Try refreshing the page later.');
        }
        else {
          issue_details["comments"] = b;
          //console.log(issue_details);
          res.render('issue', {issue_data: issue_details});
        }
      });
    }
  });

});
module.exports = router;
