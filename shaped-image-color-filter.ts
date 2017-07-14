const w = window.innerWidth,h = window.innerHeight,size = Math.min(w,h)/5
class StateContainer {
    scale:number = 0;
    dir:number = 0;
    update() {
        this.scale += 0.2*this.dir
        if(this.scale > 1) {
            this.scale = 0
            this.dir = 0
        }
        if(this.scale < 0) {
            this.dir = 0
            this.scale = 0
        }
    }
    startUpdating() {
        if(this.scale <= 0) {
            this.dir = 1
        }
        if(this.scale >= 1) {
            this.dir = -1
        }
    }
    stopped():boolean {
        return this.dir == 0
    }
}
class ShapedImage {
    stateContainer:StateContainer = new StateContainer();
    img:any = document.createElement('img')
    image:any;
    color:string = "#212121"
    isloaded:boolean = false;
    handleCb:(ShapedImage)=>void;
    constructor(src,color) {
        this.initImgElement(src)
        this.color = color
    }
    initImgElement(src) {
        document.body.appendChild(this.img)
        this.img.onmousedown = (event) => {
            this.stateContainer.startUpdating()
            if(this.handleCb && this.handleCb != null) {
                this.handleCb(this)
            }
        }
        this.image = new Image()
        this.image.src = src
        this.image.onload = ()=> {
            this.isloaded = true
        }
    }
    defineShape(context) {

    }
    draw(context) {
        context.beginPath()
        this.defineShape(context)
        context.clip()
        context.drawImage(this.image,0,0,size,size*(this.image.height)/(this.image.width))
        context.save()
        context.translate(size/2,size/2)
        context.scale(this.stateContainer.scale,this.stateContainer.scale)
        context.fillStyle = this.color
        context.globalAlpha = 0.5
        context.fillRect(-size/2,-size/2,size,size)
        context.restore()
    }
    render() {
        if(this.isloaded == true) {
            const canvas = document.createElement('canvas')
            canvas.width = size
            canvas.height = size
            const context = canvas.getContext('2d')
            this.draw(context)
            this.img.src = canvas.toDataURL()
        }
        else {
            this.render()
        }
    }
    update() {
        this.stateContainer.update()
    }
    stopped():boolean {
      return this.stateContainer.stopped()
    }
}
class ShapedImageEngine {
    shapes:Array<ShapedImage> = [];
    addShape(shape:ShapedImage) {
        shape.handleCb = this.startAnimation
        shape.render()
    }
    startAnimation(shape) {
        shape.startUpdating()
        this.shapes.push(shape)
        if(this.shapes.length == 1) {
            const interval = setInterval(()=>{
                this.shapes.forEach((shape,index)=>{
                    shape.render()
                    shape.update()
                    if(shape.stopped() == true) {
                        this.shapes.splice(index,1)
                        if(this.shapes.length == 0) {
                            clearInterval(interval)
                        }
                    }
                })
            },50)
        }
    }
}
