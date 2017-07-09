interface Person {
    readonly name:string;
    readonly age:number;
}
function greet(p:Person){
    alert(`hello ${p.name} and age is ${p.age}`)
}
var p:Person = {name:"Ank",age:26}
greet(p)
