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