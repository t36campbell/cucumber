import { When, Then } from '@cucumber/cucumber';

When('the greeter says hello', function () {
  return 'hello'
});

const then = (expectedResponse) => {
  return expectedResponse == 'hello'
}

Then('I should have heard {string}', then);