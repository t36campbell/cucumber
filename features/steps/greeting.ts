import { binding, given, when, then } from "cucumber-tsflow";

@binding()
class Greeter {

  greeting = ''

  @when('the greeter says {string}')
  public greeterSays(greeting: string): void {
    this.greeting = greeting
  }
  
  @then('I should have heard {string}')
  public hear(greeting: string): void {
    // assert.equal(this.greeting, greeting)
  }
}

export = Greeter;