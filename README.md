# protractor-cucumber-typescript-boilerplate

> **NOTE:**<br>
> This project is not maintained anymore, the code is as is.

A boilerplate for starting a Protractor test setup with CucumberJS and TypeScript

## What it can do
With this protractor-cucumber-typescript boilerplate you can easily start a testproject. With this boilerplate you get:

* working configuration out of the box for **CucumberJS 3.x**
    * for CucumberJS 1.x support see [here](https://github.com/wswebcreation/protractor-cucumber-typescript-boilerplate/tree/1.1.0) and the [CHANGELOG](./CHANGELOG.md#2.0.0) for the migration steps)
    * for CucumberJS 2.x support see [here](https://github.com/wswebcreation/protractor-cucumber-typescript-boilerplate/tree/2.x) and the [CHANGELOG](./CHANGELOG.md#3.0.0) for the migration steps)
* feature and step-file examples about how to use
* no need to compile TypeScript testfiles before running
* automatically making screenshots on failed steps (you can adjust the filename to whatever you want, it's just a simple setup)
* **NEW:** an easy setup for using nice reporting provided by [protractor-multiple-cucumber-html-reporter-plugin](https://github.com/wswebcreation/protractor-multiple-cucumber-html-reporter-plugin)
* **NEW:** a configuration to automatically rerun flaky tests with [protractor-flake](https://github.com/NickTomlin/protractor-flake). This can be run with `npm run flake` and will check the logging for failed feature files before protractor exists

It supports and provides:

* [protractor](https://github.com/angular/protractor) version 5.1.2
* [cucumberjs](https://github.com/cucumber/cucumber-js/) **NEW version 3.x.x support!**
    * for CucumberJS 1.x support see [here](https://github.com/wswebcreation/protractor-cucumber-typescript-boilerplate/tree/1.1.0)
    * for CucumberJS 2.x support see [here](https://github.com/wswebcreation/protractor-cucumber-typescript-boilerplate/tree/2.x)
* [typescript](https://github.com/Microsoft/TypeScript) version 2.5.x
* [protractor-multiple-cucumber-html-reporter-plugin](https://github.com/wswebcreation/protractor-multiple-cucumber-html-reporter-plugin) version ^1.1.0
* [protractor-flake](https://github.com/NickTomlin/protractor-flake) version ^3.0.0

![Snapshot - Report](./assets/multiple-cucumber-html-reporter.jpg "Snapshot - Report")

And a lot more, see the [`package.json`](package.json)

> This boilerplate is just to give you an initial setup, not how you should code / structure your projects. If you have some tips / beter examples feel free to create a PR

## How to use
### To see how this works

- do a `git clone` of this project
- go to the root of the project and execute `npm install`
- to get the tests running make sure you have a local `webdriver-manager` running (`directConnect` from protractor has some issues)

Then there are 3 ways to run tests:

1. Run 1 or multiple featurefiles. This can be done with `npm run e2e -- --feature=example` or `npm run e2e -- --feature= example,playground`. Only provide the name of the featurefile(s) without the `.feature`
2. Run a specific tagged test(s) / featurefile(s). This can be done with `npm run e2e -- --tags=@tagName`. Please check the [docs](https://docs.cucumber.io/tag-expressions/) about how to use tags
3. Run all the available featurefiles. This can be done with `npm run e2e`

> **If you want to run tests and  nd after failure only rerun the failed ones, then use `npm run flake` to run it with `protractor-flake`**

### Implement it in your project
Just copy this to your project. Copy all the `dev-dependencies` to your projects `package.json` and do a new `npm install` of your project.
You can use whatever taksrunner you want to run the tests.

## CucumberJS compiles on-the-fly
With the provided setup in the [`protractor.shared.conf.js`](/e2e-tests/config/protractor.shared.conf.js) you don't need to compile the TypeScript files before you run them. It will be done automatically for you with the `compiler` in the `cucumberOpts`.

```
cucumberOpts: {
	compiler: "ts:ts-node/register",
	require: [..],
	format: 'pretty',
	tags: ''
}
```

### Compile error
When there is a compile error it is thrown like below.

	> protractor-cucumber-typescript-boilerplate@0.1.0 e2e.local /Users/wswebcreation/protractor-cucumber-typescript-boilerplate
	> protractor e2e-tests/config/protractor.e2e.conf.js

	(node:67283) DeprecationWarning: os.tmpDir() is deprecated. Use os.tmpdir() instead.
	[09:39:12] I/launcher - Running 1 instances of WebDriver
	[09:39:12] I/local - Starting selenium standalone server...
	[09:39:13] I/local - Selenium standalone server started at http://192.168.1.11:56329/wd/hub
	[09:39:15] E/launcher - Error: TSError: ⨯ Unable to compile TypeScript
	e2e-tests/features/example.steps.ts (51,51): The return type of an async function or method must be the global Promise<T> type. (1064)
	    at getOutput (/Users/wswebcreation/protractor-cucumber-typescript-boilerplate/node_modules/ts-node/src/index.ts:312:15)
	    at /Users/wswebcreation/protractor-cucumber-typescript-boilerplate/node_modules/ts-node/src/index.ts:343:16
	    at Object.compile (/Users/wswebcreation//protractor-cucumber-typescript-boilerplate/node_modules/ts-node/src/index.ts:459:19)
	    at Module.m._compile (/Users/wswebcreation/protractor-cucumber-typescript-boilerplate/node_modules/ts-node/src/index.ts:395:43)
	    at Module._extensions..js (module.js:580:10)
	    at Object.require.extensions.(anonymous function) [as .ts] (/Users/wswebcreation/protractor-cucumber-typescript-boilerplate/node_modules/ts-node/src/index.ts:398:12)
	    at Module.load (module.js:488:32)
	    at tryModuleLoad (module.js:447:12)
	    at Function.Module._load (module.js:439:3)
	    at Module.require (module.js:498:17)
	[09:39:15] E/launcher - Process exited with error code 100

	npm ERR! Darwin 16.4.0
	npm ERR! argv "/Users/wswebcreation/.nvm/versions/node/v7.5.0/bin/node" "/Users/wswebcreation/.nvm/versions/node/v7.5.0/bin/npm" "run" "e2e.local"
	npm ERR! node v7.5.0
	npm ERR! npm  v4.1.2
	npm ERR! code ELIFECYCLE
	npm ERR! protractor-cucumber-typescript-boilerplate@0.1.0 e2e.local: `protractor e2e-tests/config/protractor.e2e.conf.js`
	npm ERR! Exit status 100
	npm ERR!
	npm ERR! Failed at the protractor-cucumber-typescript-boilerplate@0.1.0 e2e.local script 'protractor e2e-tests/config/protractor.e2e.conf.js'.
	npm ERR! Make sure you have the latest version of node.js and npm installed.
	npm ERR! If you do, this is most likely a problem with the protractor-cucumber-typescript-boilerplate package,
	npm ERR! not with npm itself.
	npm ERR! Tell the author that this fails on your system:
	npm ERR!     protractor e2e-tests/config/protractor.e2e.conf.js
	npm ERR! You can get information on how to open an issue for this project with:
	npm ERR!     npm bugs protractor-cucumber-typescript-boilerplate
	npm ERR! Or if that isn't available, you can get their info via:
	npm ERR!     npm owner ls protractor-cucumber-typescript-boilerplate
	npm ERR! There is likely additional logging output above.

	npm ERR! Please include the following file with any support request:
	npm ERR!     /Users/wswebcreation/protractor-cucumber-typescript-boilerplate/npm-debug.log

## When you don't have a `*.steps` file
When you created a `*.feature`-file you can start running the tests and it will throw an output like below.
See the [`example.steps.ts`](/e2e-tests/features/example.steps.ts) for the implementation.

> Advice is not to use the `callback`'s, just use `promises`.

    @example @happy-flow @angular
	Feature: Angular homepage

	  @example @happy-flow @angular @visitor @julie
	  Scenario: As a visitor I want to be greeted
	  ? Given I visit the Angular homepage
	  ? Given I submit the name "Julie"
	  ? Then I am greeted as "Hello Julie!"

	  @example @happy-flow @angular @todo @count @validate
	  Scenario: Validate todo list
	  ? Given I visit the Angular homepage
	  ? Given I count 2 todo's
	  ? Then the last todo should hold "build an AngularJS app"

	  @example @happy-flow @angular @todo @count @add
	  Scenario: Add a todo
	  ? Given I visit the Angular homepage
	  ? Given I add the todo "write a protractor test"
	  ? Then I should have 3 todo's
	  ? And the last todo should hold "write a protractor test"

	Warnings:

	1) Scenario: As a visitor I want to be greeted - e2e-tests/features/example.feature:8
	   Step: Given I visit the Angular homepage - e2e-tests/features/example.feature:5
	   Message:
	     Undefined. Implement with the following snippet:

	       Given('I visit the Angular homepage', function (callback) {
	         // Write code here that turns the phrase above into concrete actions
	         callback(null, 'pending');
	       });

	2) Scenario: As a visitor I want to be greeted - e2e-tests/features/example.feature:8
	   Step: Given I submit the name "Julie" - e2e-tests/features/example.feature:9
	   Message:
	     Undefined. Implement with the following snippet:

	       Given('I submit the name {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
	         // Write code here that turns the phrase above into concrete actions
	         callback(null, 'pending');
	       });

	3) Scenario: As a visitor I want to be greeted - e2e-tests/features/example.feature:8
	   Step: Then I am greeted as "Hello Julie!" - e2e-tests/features/example.feature:10
	   Message:
	     Undefined. Implement with the following snippet:

	       Then('I am greeted as {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
	         // Write code here that turns the phrase above into concrete actions
	         callback(null, 'pending');
	       });

	4) Scenario: Validate todo list - e2e-tests/features/example.feature:13
	   Step: Given I visit the Angular homepage - e2e-tests/features/example.feature:5
	   Message:
	     Undefined. Implement with the following snippet:

	       Given('I visit the Angular homepage', function (callback) {
	         // Write code here that turns the phrase above into concrete actions
	         callback(null, 'pending');
	       });

	5) Scenario: Validate todo list - e2e-tests/features/example.feature:13
	   Step: Given I count 2 todo's - e2e-tests/features/example.feature:14
	   Message:
	     Undefined. Implement with the following snippet:

	       Given('I count {int} todo\'s', function (int, callback) {
	         // Write code here that turns the phrase above into concrete actions
	         callback(null, 'pending');
	       });

	6) Scenario: Validate todo list - e2e-tests/features/example.feature:13
	   Step: Then the last todo should hold "build an AngularJS app" - e2e-tests/features/example.feature:15
	   Message:
	     Undefined. Implement with the following snippet:

	       Then('the last todo should hold {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
	         // Write code here that turns the phrase above into concrete actions
	         callback(null, 'pending');
	       });

	7) Scenario: Add a todo - e2e-tests/features/example.feature:18
	   Step: Given I visit the Angular homepage - e2e-tests/features/example.feature:5
	   Message:
	     Undefined. Implement with the following snippet:

	       Given('I visit the Angular homepage', function (callback) {
	         // Write code here that turns the phrase above into concrete actions
	         callback(null, 'pending');
	       });

	8) Scenario: Add a todo - e2e-tests/features/example.feature:18
	   Step: Given I add the todo "write a protractor test" - e2e-tests/features/example.feature:19
	   Message:
	     Undefined. Implement with the following snippet:

	       Given('I add the todo {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
	         // Write code here that turns the phrase above into concrete actions
	         callback(null, 'pending');
	       });

	9) Scenario: Add a todo - e2e-tests/features/example.feature:18
	   Step: Then I should have 3 todo's - e2e-tests/features/example.feature:20
	   Message:
	     Undefined. Implement with the following snippet:

	       Then('I should have {int} todo\'s', function (int, callback) {
	         // Write code here that turns the phrase above into concrete actions
	         callback(null, 'pending');
	       });

	10) Scenario: Add a todo - e2e-tests/features/example.feature:18
	    Step: And the last todo should hold "write a protractor test" - e2e-tests/features/example.feature:21
	    Message:
	      Undefined. Implement with the following snippet:

	        Then('the last todo should hold {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
	          // Write code here that turns the phrase above into concrete actions
	          callback(null, 'pending');
	        });

	3 scenarios (3 undefined)
	10 steps (10 undefined)
	0m00.002s
	[08:18:54] I/launcher - 0 instance(s) of WebDriver still running
	[08:18:54] I/launcher - chrome #01 passed


	==============================================================================================
	    Multiple Cucumber HTML report generated in:

	    /Users/wswebcreation/protractor-cucumber-typescript-boilerplate/.tmp/report/index.html

	    Tnx for using Multiple Cucumber HTML report

	    Grtz wswebcreation
	==============================================================================================

## When tests succeed
When tests succeed you will see the following

	@example @happy-flow @angular
	Feature: Angular homepage

	  @example @happy-flow @angular @visitor @julie
	  Scenario: As a visitor I want to be greeted
	  ✔ Given I visit the Angular homepage
	  ✔ Given I submit the name "Julie"
	  ✔ Then I am greeted as "Hello Julie!"

	  @example @happy-flow @angular @todo @count @validate
	  Scenario: Validate todo list
	  ✔ Given I visit the Angular homepage
	  ✔ Given I count 2 todo's
	  ✔ Then the last todo should hold "build an AngularJS app"

	  @example @happy-flow @angular @todo @count @add
	  Scenario: Add a todo
	  ✔ Given I visit the Angular homepage
	  ✔ Given I add the todo "write a protractor test"
	  ✔ Then I should have 3 todo's
	  ✔ And the last todo should hold "write a protractor test"

	3 scenarios (3 passed)
	10 steps (10 passed)
	0m09.857s
	[08:16:28] I/launcher - 0 instance(s) of WebDriver still running
	[08:16:28] I/launcher - chrome #01 passed


	==============================================================================================
	    Multiple Cucumber HTML report generated in:

	    /Users/wswebcreation/protractor-cucumber-typescript-boilerplate/.tmp/report/index.html

	    Tnx for using Multiple Cucumber HTML report

	    Grtz wswebcreation
	==============================================================================================


# Contribution
If you like to add some extra info, nice packages or have some improvements, feel free to add a PR.


Grtz,

wswebcreation
