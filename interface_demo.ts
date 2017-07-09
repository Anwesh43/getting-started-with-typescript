interface Person {
    readonly name:string;
    readonly age:number;
}
function greet(p:Person){
    alert(`hello ${p.name} and age is ${p.age}`)
}
var p:Person = {name:"Ank",age:26}
greet(p)

interface PersonArray {
    [index:number]:Person;
}

function greetAllPersons(persons:PersonArray) {
    let personArray = persons as Array<Person>
    personArray.forEach((person:Person)=>{
        greet(person)
    })
}
greetAllPersons([{name:"An1",age:25},{name:"An2",age:26},{name:"An3",age:27},{name:"An4",age:28}])


interface PersonConstructor {
    new (name:string,age:number):Person
}
class PersonCreator implements Person {
    constructor(public name:string,public age:number) {
    }
}
function createPerson(creator:PersonConstructor,name:string,age:number) {
    var person:Person = new creator(name,age)
    alert(`person create by constructor has name ${person.name} and age is ${person.age}`)
}
createPerson(PersonCreator,"An",29)
