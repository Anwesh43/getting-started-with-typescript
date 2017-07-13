const w = window.innerWidth,h = window.innerHeight
class BasicSwitch {
    color:string;
    img:any;
    dir:number = 0;
    scale:number=0;
    constructor(color) {
        this.color = color
        this.img = document.createElement('img')
    }
    stopped() {
        return this.dir == 0
    }
    draw() {
        const canvas = document.createElement('canvas')
        canvas.width = w/7
        canvas.height = w/12
        const context = canvas.getContext('2d')
        context.fillStyle = this.color
        context.beginPath()
        context.arc(w/7*(this.scale)+w/24,w/24,w/24,0,2*Math.PI)
        context.fill()
        context.fillStyle = 'gray'
        this.defineSwitchShape(context)
        context.fillStyle = this.color
        this.defineSwitchShape(context)
        this.img.src = canvas.toDataURL()
    }
    defineSwitchShape(context) {
        context.beginPath()
        context.arc(w/20,w/24,w/30,Math.PI/2,Math.PI)
        context.lineTo(w/7-w/20,w/30-w/24)
        context.arc(w/7-w/20,w/24,Math.PI,3*Math.PI/2)
        context.lineTo(w/7-w/20,w/30+w/24)
        context.fill()
    }
    update() {
        this.scale += this.dir * 0.2
        if(this.scale > 1) {
            this.dir = 0
            this.scale = 1
        }
        if(this.scale < 0) {
            this.scale = 0
            this.dir = 0
        }
    }
    startUpdating() {
        if(this.dir == 0) {
            this.dir = 1
        }
    }
    attachClick() {
        this.img.onmousedown = (event) => {
            this.startUpdating()
            const interval = setInterval(()=>{
                this.update()
                if(this.stopped() == true) {
                    clearInterval(interval)
                }
            },50)
        }
    }
}
const basicSwitch = new BasicSwitch('#3f51b5')
basicSwitch.draw()
basicSwitch.attachClick()
