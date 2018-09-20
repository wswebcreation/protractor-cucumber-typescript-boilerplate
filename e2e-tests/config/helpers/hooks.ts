import {defineSupportCode, HookScenarioResult} from 'cucumber';
import * as path from 'path';
import {browser} from 'protractor';
import {WriteStream, ensureDirSync, createWriteStream} from 'fs-extra';

defineSupportCode(({Before}) => {
    Before(()=>{
        console.log('*****Before***');
    });
});
