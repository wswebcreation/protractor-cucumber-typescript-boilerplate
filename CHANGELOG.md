<a name="3.0.1"></a>
# 3.0.1

## Fixes
- Update the dependencies. The update fixes and issue that the empty tags causing an `Error: empty stack` error due. The cause lies in an update in CucumberJS version [3.0.4](https://github.com/cucumber/cucumber-js/blob/master/CHANGELOG.md#304-2017-10-04). 
The issue has been fixed with [this PR](https://github.com/protractor-cucumber-framework/protractor-cucumber-framework/pull/114) on protractor-cucumber-framework
- `npm run flake` didn't work due to a missing dependency. This has been fixed.

## Dependencies:

### Update
- `protractor-cucumber-framework` to 4.1.1

<a name="3.0.0"></a>
# 3.0.0

## Changes to the boilerplate

- Cleaned up the `protractor.shared.conf.js`:
    - remove the `cucumberOpts.format: 'pretty'`, because it was removed by CucumberJS
    - added `cucumberOpts.format: 'json:.tmp/results.json'` to nicely integrate with the new report plugin
    - added `protractor-multiple-cucumber-html-reporter-plugin` to simplify generating and using CucumberJS reports
    - added use of tags from the command line
    - added removing of the `.tmp/`-folder when starting so no double reports are madew
- fix issue with using this boilerplate with Angular-Cli. It threw the below error.

```shell
Unhandled rejection TSError: X Unable to compile TypeScript
\chai-imports.ts (3:5) : Cannot redeclare block-scoped variable 'chai'
```


- Remove the `reporter.ts`-hook because CucumberJS 3 removed the `registerListener` which was used to manipulate and save the JSON-report file
- In CucumberJS version 3 the `HookScenarioResult` has been brought down from an object with all the feature / scenario / step data in it to a bare minimum. Because `@types/cucumber` is not compatible with CucumberJS 3 I've extended the `HookScenarioResult` in the `after.scenario.ts` with the new interface

```js
interface TestCase extends HookScenarioResult {
    sourceLocation: ({
        uri: string;
        line: number
    });
    result: ({
        duration: number;
        status: string
    });
}
```

- added the script `npm run flake`. This will run protractor through `protractor-flake` so if a test(s) is flaky, the failed featurefiles will be rerun for a second time.
- added Travis CI

## Dependencies:

### Added
- `protractor-multiple-cucumber-html-reporter-plugin`
- `protractor-flake`

### Update
- `protractor-cucumber-framework` to 4.0.7
- `cucumber` to 3.0.1
- `@types/chai` to 4.0.4
- `@types/chai-as-promised` to 7.1.0
- `@types/cucumber` to 2.0.3
- `@types/fs-extra` to 4.0.2
- `chai` to 4.1.2
- `chai-as-promised` to 7.1.1
- `fs-extra` to 4.0.1
- `ts-node` to 3.3.0
- `tslint` to 5.7.0
- `typescript` to 2.5.2
- `yargs` to 8.0.2

### Remove
- `jsonfile`
- `multiple-cucumber-html-reporter`

<a name="2.0.0"></a>
# 2.0.0

## Changes

### Update support code library interface
Instead of exporting a function and calling methods on `this`, import the cucumber module and call `defineSupportCode`

```javascript
// 1.3.x
module.exports = function () {
    this.setDefaultTimeout(10000);
    this.Given(/^a step$/, () => {});
};

// 2.x.x
import { defineSupportCode } from "cucumber";

defineSupportCode(({Given, setDefaultTimeout}) => {
    setDefaultTimeout(10000);
    Given(/^a step$/, () => {});
});
```

### Typings
Hooks now receive a `scenarioResult` instead of the `scenario`, this means that the typings have become different

```javascript
// 1.3.x
this.After(function (scenario: HookScenario): Promise<void> {
    return Promise.resolve();
}

// 2.x.x
this.After(function (scenarioResult:HookScenarioResult): Promise<void>{
    return Promise.resolve();
});
```

### Removed `isFailed()`
The `isFailed()` method has been removed from the `scenarioResult: HookScenarioResult` in comparison to `scenario: HookScenario`

```javascript
// 1.3.x
this.After(function (scenario: HookScenario): void {
    // logs scenario.isFailed() = true / false
    console.log('scenario.isFailed() = ', scenario.isFailed());
}

// 2.x.x
this.After(function (scenarioResult: HookScenarioResult): void {
    // logs scenario.status = '{string} status'
    console.log('scenarioResult.status = ', scenarioResult.status);

    // Changed to
    console.log('scenario failed = ', scenarioResult.status === 'failed');
});
```

### Attach
The `attach` function used for adding attachments moved from the API `scenario` object to `world`. It is thus now available in step definitions without saving a reference to the scenario.

```javascript
// 1.3.0
this.After(function (scenario): void {
  scenario.attach(new Buffer([137, 80, 78, 71]), 'image/png')
});

// 2.0.0
this.After(function (): void {
  this.attach(new Buffer([137, 80, 78, 71]), 'image/png');
});
```

Because `attach` now needs to be passed to the `world` constructor I needed to create a `World` interface that could be used in the `saveFailedScenarioScreenshot()` method

```javascript
interface World {
    'attach': ((arg1: string | Buffer, arg2: string) => void)
}
```

## Dependencies:

### Update
- `protractor-cucumber-framework` to 3.1.0
- `cucumber` to 2.2.0
- `@types/cucumbe` to 2.0.1
- `@types/chai` to 3.5.2
- `@types/fs-extra` to 3.0.2
- `fs-extra` to 3.0.1
- `tslint` to 5.2.0
- `typescript` to 2.3.2
- `yargs` to 8.0.1

### Remove
- `ts-flow`


<a name="1.1.0"></a>
# 1.1.0

## Features
- Add reporting


<a name="1.0.0"></a>
# 1.0.0

## Features

- Initial version
