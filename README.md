# Steps to create this project documented

## Installation

Requirements:   git, node (at time of writing v5.9.0 , npm, karma, Chrome

Before running any commands
> npm install

To start the web server locally and run the app
> npm start

To run a build - ()creates a dist folder)
> npm build

The tests...

Might need Karma globally...
> npm install karma -g

To run the tests
> npm test




## How I set this up...

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

## Building the app

core items include React, React-router, React-bootstrap

### Structure

__tests__

actions

components

libs

routes

stores

styles

index.jsx

I setup 'chunking' - the ability to make the initial app size smaller, typical usage would be to separate out the user experience from admin pages.   To do this - we implement the chunking inside the routes (see the webpack config as well)  see 'require.ensure'.

Typically I use chunking to separate out large parts of the application and speed up performance, in this case it's purely academic since I'm literally using 'one page/route'

Notes on Router - index-route.jsx:
'onEnter' lets us fetch data together with the loading of the app - similar to Angular's resolve function.

Actions - we could separate out another layer of 'services' invoked by the actions- for now, actions perform typical ajax calls
Stores - the state of the application is stored here

### Flow

Application flow will be as folows:

The user will come to the website, it will prompt for the users name.  If the user's name starts with 'A/a' then the will receive a 10% discount.  Since I've going strictly client side in this assignment, I decided to put the Flux architecture to use (which in this app is way overkill, but I wanted to show the patterns) - however, once benefit is the ability to cache 'stores' - so I cache the EmployeeStore to localStorage.

Input of the user name creates the employee - the benefit cost and paycheck amounts are calculated in the EmployeeStore.  Ability to add a dependent (as well as remove one) will recalculate cost and produce a new pay cost schedule.

In order to separate out each area of the page, I've broken it down into several components.

The data flows from the Route -> EmployeeAction -> EmployeeStore -> Employee.   All actions inside the Employee and it's sub components invoke the EmployeeAction which sends the data one way back through the components.

Some components uses 'local state' but merely to capture data (ie. the employee name).

The Employee component is broken down into several smaller components:

AddEmployee

BenefitSummary

AddDependents

Dependents

PayChecks



