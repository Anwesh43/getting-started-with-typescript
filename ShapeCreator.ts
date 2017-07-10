const w = window.innerWidth,h = window.innerHeight
class Shape  {
    div:any;
    scale:number = 1
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
          this.div.style.transform = `scaleX(${this.scale})scaleY(${this.scale})`
          this.scale -=0.1
    }
    stopped():boolean {
        return this.scale <= 0
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
        this.div.style.width = 0
        this.div.style.height = 0
        this.div.style.background = 'transparent'
        this.defineBorders()
        this.div.style.borderBottomStyle = 'solid'
        this.div.style.borderBottomColor = color
    }
    defineBorders() {
        const border = `${w/20*this.scale}px solid transparent`
        this.div.style.borderRight = border
        this.div.style.borderLeft = border
        this.div.style.borderBottomWidth = `${(w/10)*this.scale}px`
    }
    update() {
        super.update()
        this.defineBorders()
    }
}
class ShapeFactory {
    static color:string = '#f44336'
    static num:number = 0
    static createShapes(x:number,y:number):Shape {
        var shape:Shape = new Square(x,y)
        switch(ShapeFactory.num %3) {
            case 1:
               shape = new Circle(x,y)
               break
            case 2:
               shape = new Triangle(x,y)
               break
            default:
               break
        }
        shape.define(ShapeFactory.color)
        ShapeFactory.num++
        return shape
    }
}
class ShapeRunner {
    shapes:Array<Shape> = []
    animated:boolean = false
    interval:number
    createShape(x:number,y:number) {
        this.shapes.push(ShapeFactory.createShapes(x,y))
    }
    start() {
        if(this.animated == false) {
            this.interval = setInterval(()=>{
                this.shapes.forEach((shape,index)=>{
                    shape.update()
                    if(shape.stopped() == true) {
                        this.shapes.splice(index,1)
                    }
                })
            },50)
        }
    }
    stop() {
        if(this.animated == true) {
            clearInterval(this.interval)
        }
    }
}
var shapeRunner:ShapeRunner = new ShapeRunner()
shapeRunner.start()
window.onmousedown = (event:any) => {
    const x = event.offsetX,y = event.offsetY
    shapeRunner.createShape(x,y)
}
