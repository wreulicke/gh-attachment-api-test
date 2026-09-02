# gh-attachment-api-test

Currently, this does not work because the GitHub API does not support uploads by github actions and github app tokens. This is a test repository to check if the GitHub API supports uploads by github actions and github app tokens.
See https://github.com/cli/cli/issues/14309.

It works in local.

```
GH_TOKEN=$(gh auth token) REPOSITORY_ID=1354758744 node test.js
```
