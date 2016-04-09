var express = require('express');
var github = require('octonode');
var client = github.client();
var ghrepo = client.repo('npm/npm');

var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
    new_page = req.param('pageNumber');
    if (new_page == null) {new_page = 1;}
    console.log("calling ghrepo.issues function", new_page);
    ghrepo.issues(new_page,function (err,b,h){
        if(err || !b || !h){
            res.status(500).send('Something broke while fetching data from Github! Try refreshing the page later.');
        }
        else {
            res.render('index', {show_issues: b, header_info: h});
        }
    });
});

module.exports = router;