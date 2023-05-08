const express = require('express')
const app = express()
const vsts = require('azure-devops-node-api')

var bodyParser = require('body-parser')

const collectionURL = process.env.COLLECTIONURL
const token = process.env.TOKEN

var authHandler = vsts.getPersonalAccessTokenHandler(token)
var connection = new vsts.WebApi(collectionURL, authHandler)

var vstsGit = connection.getGitApi().then(
  vstsGit => {
    vstsGit.createPullRequestStatus(prStatus, repoId, pullRequestId).then(result => {
      console.log(result);
    },
    error => {
      console.log(error);
    })
  },
  error => {
    console.log(error);
  }
);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  var repoId = req.body.resource.repository.id
  var pullRequestId = req.body.resource.pullRequestId
  var title = req.body.resource.title

  var prStatus = {
    "state": "succeeded",
    "description": "Ready for review",
    "targetUrl": "https://visulastudio.microsoft.com",
    "context": {
      "name": "wip-checker",
      "genre": "continuous-integration"
    }
  }

  if (title.includes("WIP")) {
    prStatus.state = "pending"
    prStatus.description = "Work in progress"
  }

  vstsGit.createPullRequestStatus(prStatus, repoId, pullRequestId).then( result => {
    console.log(result)
  })

  res.send('Received the POST')
})

app.use(bodyParser.json())

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

