class Person {
    constructor(private name:String,private age:Number) {

    }
    toString():String {
        return `My name is ${this.name} and age is ${this.age} years old`
    }
}
class Greeter {
    constructor(private p:Person) {

    }
    greet() {
        alert(this.p)
    }
}
var greeter:Greeter = new Greeter(new Person("An",23))
greeter.greet()
