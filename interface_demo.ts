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
