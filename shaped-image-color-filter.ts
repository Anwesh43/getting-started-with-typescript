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
    constructor() {
        this.initImgElement()
    }
    initImgElement() {
        document.body.appendChild(this.img)
        this.img.onmousedown = (event) => {
            this.stateContainer.startUpdating()
        }
    }
    draw(context) {

    }
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const context = canvas.getContext('2d')
        this.draw(context)
        this.img.src = canvas.toDataURL()
    }
    update() {
        this.stateContainer.update()
    }
    stopped():boolean {
      return this.stateContainer.stopped()
    }
}
