# Github-Issue-Viewer
This is Github Issue Viewer, a nodejs + express + jade app. It picks up Issue data from Github through octonode npm module.

Demo available [here](https://mighty-dusk-86837.herokuapp.com/). (using Heroku)

Design -
  * The first page is the 'Default Page'.
  * You'll see a sticky header to the top which encloses - 
    - 'Vine Web Coding Challenge' in Vine's green color
    - 'Github Issue Viewer' in h1
    - The cute logos to the right of the above headings
    - The buttons 'first', 'prev', 'next' and 'last'
    - When you're on the first page the 'first' and 'prev' buttons will not show up. Also, when you're on the last page the 'next' and 'last' buttons won't show up.
  * Next is the long beautiful list of issues -
    - You'll see the Issue number e.g. '# 12289' in h3
    - Issue Title in h3
    - User's name and Avatar to the right
    - The first 140 characters of the issue body ending on a clean line or word.  :)
    - Issue Labels, with a styling with dashed border and color same as color of the label from the Github API. 
    - When you scroll over an issue, it colors the background-color as azure. (Just to make it pretty)
  * When you click on any of the issue on the 'Default Page', the 'Issue Details' page opens up.
  * The 'Issue Details' page shows the selected Issue in detail -
   - Issue's state to the top right i.e. 'open', 'closed.
   - Issue Labels, with a styling with dashed border and color same as color of the label from the Github API. 
   - You'll see the Issue number e.g. '# 12289' in h3
   - Issue Title in h3
   - User's name and Avatar to the right 
   - The complete summary of issue - with issue body & comments from other users.
   - Clicking on usernames would open up the corresponding github page for the same comment.
  
Engineering - 
 * To set up this app, please clone this repository and run npm install. This will install all the packages required to run this app. 
 * I'm using octonode - which is a library for nodejs to access the github v3 api
 * In the index.js , we use 'ghrepo.issues' to pull first 30 issues from the API. [Please refer octonode documentation]
   - If there's an error while fetching results, it sends a status '500' and shows on the page 'Something broke while fetching data from Github! Try refreshing the page later.'
   - If successful in fetching results, it sends the variables show_issues and header_info
   - These variables are accessed on Jade Template to show each issue in the div#issuelist 
   - Clicking on the buttons 'first', 'prev', 'next' or 'last' will shoot a call to the default page with pageNumber parameter.
   - Clicking on any of the issue calls the function requestIssue(number), runs the code on issue.js and renders through issue.jade
 * The index.jade file renders the information from variables show_issues and header_info.
   - imports the template from layout.jade
   - for parsing through the file to get page numbers for 'first', 'next', 'pre' and 'last'
   - requestSubstring function to return a clean substring of the body
 * File issue.js 
   - 'ghissue.info' to fetch the issue information
   - 'ghissue.comments' to fetch comments. [Please refer octonode documentation]
   - If there's an error while fetching results, it sends a status '500' and shows on the page 'Something broke while fetching data from Github! Try refreshing the page later.'
   - We collect all the information as an object and pass it to issue.jade as issue_data.
 * File issue.jade
   - imports the template from layout.jade
   - shows the issue details page with all the information i.e. issue number, state, labels, title, reporting user, avatar, detailed summary and comments.
   
   

 
