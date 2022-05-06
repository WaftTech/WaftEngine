# WaftEngine (MERN Stack Engine)

[WaftEngine](https://waftengine.org) is an open source platform for developers to create enterprise level web application in MERN stack. This platform already contains components like user management, roles management, module management, access management, content management with production ready setup which helps developers to develop their application in minimum cost.

[![Gitter](https://badges.gitter.im/waftengine/community.svg)](https://gitter.im/waftengine/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Features

WaftEngine core features include:

- User Manage and Login flow
- Role Manage
- Module Manage with Access level Definition
- Access Management associated with roles
- Email Template and settings
- Media Manage and server side processing
- Error handling and log Management
- Authentication and Authorization
- Content Management
- State Management using redux
- Development ready setup
- Production ready setup

Since anything in our codebase can be extended, overwritten, or installed as a package, you may also develop, scale, and customize anything on our platform.

## Installation

- `git clone <this_url> && cd <repo_name>`
- install npm on client and server
  - `cd client`
  - `npm install`
  - `cd ../server`
  - `npm install`
- Import Default data into MongoDB server from `database` folder
  - `cd ../database`
  -  `run 'mongorestore' to import all BSON/json files`
- Configure Server
  - Create `.env` file in `server`
  - Update `.env` file with `MONGODB_URI=mongodb://localhost:27017/waft-engine` 
- Running the application in development mode
  - Development Mode (Client only): `cd client` then `npm run start` then open `http://localhost:5051` in a browser
  - Development Mode (Server only): `cd server` then `npm run start` then open `http://localhost:5050` in a browser
- Default Credentials : Email : admin@waftengine.org , Password : Test@1234
- For more [Getting started](https://waftengine.org/documentation/2019-7-1-getting-started-with-waftengine)

## Get involved

Read documentation & tutorials

- [Developer Documentation](https://waftengine.org/documentation/2019-6-16-introduction-to-waftengine)
- [Architecture](https://waftengine.org/architecture)

## Backers 

[Become a backer](https://opencollective.com/waftengine) and show your support to our open source project on [our site](https://waftengine.org).

<a href="https://opencollective.com/waftengine"><img src="https://opencollective.com/waftengine/tiers/backers.svg?limit=30&button=false&avatarHeight=46&width=750"></a>

## Sponsor

Does your company use WaftEngine? Ask your manager or marketing team if your company would be interested in supporting our project. Support will allow the maintainers to dedicate more time for maintenance and new features for everyone. Also, your company's logo will show [on GitHub](https://github.com/WaftTech/WaftEngine#readme) and on [our site](https://waftengine.org/) - who doesn't want a little extra exposure? [Here's the info](https://opencollective.com/waftengine).

## Get help & contact the team

- [WaftEngine Gitter Chat](https://gitter.im/waftengine/community)
- Report security vulnerabilities to <mailto:hello@wafttech.com>.
- [Bug Post and Feature Request](https://github.com/WaftTech/WaftEngine/issues)

## Contribute

:star: Star us on GitHub — it helps!

We love your pull requests! Check out our [`Good First Issue`](https://github.com/WaftTech/WaftEngine/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) and [`Help Wanted`](https://github.com/WaftTech/WaftEngine/issues?q=label%3A%22help+wanted%22) tags for good issues to tackle.

### License

Copyright © [The MIT License (MIT)](./LICENSE.md)
