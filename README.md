# Gitlab CI Build Monitor [![Build Status](https://travis-ci.org/austinmckinley/electron-gitlab-ci-monitor.svg?branch=master)](https://travis-ci.org/austinmckinley/electron-gitlab-ci-monitor)
See your team's build statuses at a glance.
![Monitor Screenshot](https://i.imgur.com/9uqgfzA.png)

## Getting Started
1. Install the app for your platform. Installers can be found under releases.
1. Write a configuration file, either on the machine running the build or hosted remotely.
1. Start the app, and set the location for your config file.

### Config file format:
```
{
    "apiToken": "your gitlab api token",
    "apiBaseUrl": "http://gitlab.com/api/v4",
    "refreshInterval": 10000, // times are in milliseconds
    "autoScrollInterval": 5000, // times are in milliseconds
    "projects": {
        "Page 1 Title": [{
            "displayName": "Account",
            "location": "development-team/account",
            "branches": ["staged", "master"] // defaults to all branches
        }, {
            "displayName": "Validation",
            "location": "development-team/validation"
        }],
        "Page 2 Title": [{
            "displayName": "Login",
            "location": "development-team/login"
        }]
    }
}
```

## Why Electron?
Most of the existing Gitlab CI monitor/dashboard apps are hostable web servers that hit 
Gitlab through browser requests. This works fine for teams that use gitlab.com; however,
enterprises that use self-hosted Gitlab instances might not have CORS enabled or behaving 
correctly. Using Electron instead of a pure web app opens up the option of using Node's HTTP 
libraries, avoiding the need to deal with CORS.

More importantly, it's nice to not have to stand up a server which has your Gitlab API token
just to get your team's builds showing up on a TV.
