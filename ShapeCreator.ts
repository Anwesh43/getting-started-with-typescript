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
var shape:Shape = new Shape(100,100)
shape.define('yellowgreen')
