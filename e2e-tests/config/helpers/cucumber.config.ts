import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({setDefaultTimeout}) {
    setDefaultTimeout(10000);
});