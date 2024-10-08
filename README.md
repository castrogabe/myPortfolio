# portfolio

# 1st Commit-Create React App, layout

. node -v (v18.20.2) // nvm use v18 //
. npx create-react-app frontend
. delete some files:
. App.css
. App.test.css
. Delete contents of index.css
. logo.svg
. setupTests.js
. App.js delete contents:
. import logo from "./logo.svg";
. import "./App.css";
. App.js: import React from "react"; > added
. .gitignore frontend > update with .env

FRONTEND

. {}package.json | npm i:
bootstrap,
react-axios,
bootstrap,
react-bootstrap,
react-helmet,
react-router-bootstrap,
react-router-dom
react-toastify,
typewriter-effect

WARNING:
.env > GENERATE_SOURCEMAP=false (root)
npm install --save-dev @babel/plugin-transform-private-property-in-object
npm install --save-dev @babel/plugin-proposal-private-property-in-object

CREATE HOME PAGE WITH REACT FUNCTIONAL COMPONENTS:
#########################################

// rfc <= this is the one we are using in the lessons
import react from 'react';

export default function Home () {
Return {

<div>Home</Home>
}
};

##########################################

Accounts needed
Canva: https://www.canva.com/ we will use this to create our logo and jumbotron
Express: https://expressjs.com/ we will use to build our backend API application
Mongodb: https://www.mongodb.com/ to save and retrieve data from the database
JWT: https://jwt.io/ for user auth
Nodemailer: https://nodemailer.com/usage/using-gmail/ to email the customer’s purchase receipt, shipping confirmation, respond to questions from contact form
Git: https://github.com for version control
Render: https://render.com/ to host our application online

folder: components
Header.js > added
Footer.js > added
BottomFooter.js > added

folder: pages
About.js > added
Home.js > added
Portfolio.js > added

App.js > updated

.steps for second commit, ect: Open new terminal or command prompt in VSCode

1. git add . (space between add .)
2. git status (shows staged files ready to commit in green)
3. git commit -m "2nd Commit add static data and steps for second commit" (I copy and paste this)
4. git status (tells us that everything is committed "working tree clean" on main branch)
5. git push

GIT 1st Commit
Now you can check repository for updated code.

# 2nd Commit-Home/Jumbotron, About, Portfolio, WebDesign

FRONTEND
folder: components
Jumbotron.js > added

folder: pages
About.js > updated
Home.js > updated & Jumbotron
Portfolio.js > updated
WebDesign.js > updated

# 3rd Commit-Home/Jumbotron, About, Portfolio, WebDesign

FRONTEND
folder: components
Jumbotron.js > added

folder: pages
About.js > updated
Home.js > updated & Jumbotron
Portfolio.js > updated
WebDesign.js > updated
MernRender.js > added

.steps for second commit, ect: Open new terminal or command prompt in VSCode

1. git add . (space between add .)
2. git status (shows staged files ready to commit in green)
3. git commit -m "2nd Commit add static data and steps for second commit" (I copy and paste this)
4. git status (tells us that everything is committed "working tree clean" on main branch)
5. git push

GIT 1st Commit
Now you can check repository for updated code.

# 4th Commit-backend MongoDB, Portfolio Static Data

Terminal: mkdir backend (Root of portfolio)
cd backend > npm init -y creates {}package.json
Create MongoDB connection string
https://www.mongodb.com/ to save and retrieve data from the database

BACKEND
folder: models
userModel.js > added
websiteModel.js > added

folder: routes
seedRoutes.js > added

data.js > added (website data)
server.js > added
.env.example > added

FRONTEND
folder: public
images > added images

folder: components
WebsiteCard > added

folder: pages
Portfolio.js > updated

utils.js > added for error handling
GIT 4th Commit

# 5th Commit-Admin Login

BACKEND
folder: models
websiteModel > updated for url link

folder: routes
userRoutes > added

data.js > updated with url link
server.js > updated
utils.js > added

FRONTEND
folder: components
(new folder in components) forms
Signin.js > added (forms)
Signup.js > added (forms)
AdminRoute.js > added
Header.js > updated for admin (dropdown)
.Website Dashboard
.Users
.Websites
.Messages
BottomFooter.js > updated

App.js > updated
index.js > updated with StoreProvider
index.html > updated with font-awesome
Store.js > added
GIT 5th Commit
