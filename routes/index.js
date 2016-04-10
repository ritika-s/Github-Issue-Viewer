var express = require('express');
var github = require('octonode');
var client = github.client();
var ghrepo = client.repo('npm/npm');

var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
    new_page = req.param('pageNumber');
    if (new_page == null) {new_page = 1;}
    //console.log("calling ghrepo.issues function", new_page);
    ghrepo.issues(new_page,function (err,b,h){
        if(err || !b || !h){
            res.status(500).send('Something broke while fetching data from Github! Try refreshing the page later.');
        }
        else {
            res.render('index', {show_issues: b, header_info: h});
        }
    });
});

router.post('/', function(req, res, next) {
    new_page = req.body.pageNumber;
    ghrepo.issues(new_page, function (err,b,h){
        if(err || !b || !h){
            res.status(500).send('Something broke while fetching data from Github! Try refreshing the page later.');
        }
        else {
            res.render('index', {show_issues: b, header_info: h});
        }
    });
});

router.post('/issue', function(req, res, next) {
    issue = req.body.issueNumber;
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
                    res.render('issue', {issue_data: issue_details});
                }
            });
        }
    });

});

module.exports = router;