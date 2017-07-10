const w = window.innerWidth,h = window.innerHeight
class Shape  {
    div:any;
    constructor(public x:number,public y:number) {
    }
    define(color:string) {
        this.div = document.createElement('div')
        this.div.style.width = w/10
        this.div.style.height = w/10
        this.div.style.background = color
        this.div.style.position = 'absolute'
        this.div.style.left = this.x
        this.div.style.top = this.y
        document.body.appendChild(this.div)
    }
    update() {
        if(parseFloat(this.div.style.width) > 0) {
            this.div.style.width = parseFloat(this.div.style.width)- (w/50)
            this.div.style.height = parseFloat(this.div.style.height)- (w/50)
        }
    }
    stopped():boolean {
        return this.div.style.width <= 0
    }
}
class Square extends Shape {

}
class Circle extends Shape {
    define(color) {
        super.define(color)
        this.div.style.borderRadius = "50%"
    }
}
class Triangle extends Shape {
    define(color) {
        super.define(color)
        const border = `${w/20}px solid transparent`
        this.div.style.borderRight = border
        this.div.style.borderLeft = border
        this.div.style.borderBottom = `${w/10}px solid ${color}`
        this.div.style.width = 0
        this.div.style.height = 0
        this.div.style.background = 'transparent'
    }
}
