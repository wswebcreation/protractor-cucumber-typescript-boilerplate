import { defineSupportCode } from 'cucumber';

defineSupportCode(({setDefaultTimeout}) => {
    setDefaultTimeout(60000);
});