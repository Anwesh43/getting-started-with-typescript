class GenericContainer<T> {
    curr:T;
    add:(a:T,b:T)=>T
}
var numberContainer:GenericContainer<number> = new GenericContainer<number>()
numberContainer.curr = 1
numberContainer.add = (a:number,b:number)=>a+b
alert(numberContainer.curr)
alert(numberContainer.add(10,20))
