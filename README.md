# Steps to create this project documented

Requirements:   git, node (at time of writing v5.9.0 , npm

## Setup

1. I'm going to use github to share my code.
	a. create this readme
	b. git init
	c. repo is in https://github.com/sgentile/codechallenge

2. Code will be run in 'dev' mode only to start - using webpack-dev-server - the 'api' will be simulated	 
	a. npm init
	b. add .gitignore
	c. add .babelrc   (will be using ES6 for our React setup)
	d. setup the webpack.config.js  -- comments inline
	e. add the karma.conf.js (todo - refactor common to a separate file to share with webpack - we need shared for things such as alias's that webpack provides)
	f. add the tests.webpack.js
	g. add the 'start' and 'build' options to the package.json scripts
	h. create the app folder...

3. install the packages via npm to dev and devDependencies

## Installation

At this point, we can run 
> npm install

## Building the app - core items include React, React-router, React-bootstrap

### Structure

__tests__
actions
components
libs
routes
stores
styles
index.jsx

I setup 'chunking' - the ability to make the initial app size smaller, typical usage would be to separate out the user experience from admin pages.   To do this - we implement the chunking inside the routes (see the webpack config as well)  see 'require.ensure'

Notes on Router - index-route.jsx:
'onEnter' lets us fetch data together with the loading of the app - similar to Angular's resolve function.

Actions - we could separate out another layer of 'services' invoked by the actions- for now, actions perform typical ajax calls
Stores - the state of the application is stored here


