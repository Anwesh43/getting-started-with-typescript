const w = window.innerWidth,h = window.innerHeight
class BasicSwitch {
    color:string;
    img:any;
    dir:number = 0;
    scale:number=0;
    onselect:()=>void;
    onunselect:()=>void;
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
        canvas.height = w/20
        const ch = canvas.height
        const context = canvas.getContext('2d')
        context.fillStyle = this.color
        context.fillStyle = 'gray'
        this.defineSwitchShape(context,ch)
        context.fillStyle = this.color
        context.save()
        context.beginPath()
        context.rect(0,0,(w/7)*this.scale,ch)
        context.clip()
        this.defineSwitchShape(context,ch)
        context.restore()
        context.beginPath()
        context.arc((w/7-w/20)*(this.scale)+ch/2,ch/2,ch/2,0,2*Math.PI)
        context.fill()
        this.img.src = canvas.toDataURL()
    }
    defineSwitchShape(context,ch) {
        context.beginPath()
        context.arc(w/20,ch/2,ch/3,Math.PI/2,3*Math.PI/2)
        context.lineTo(w/7-w/20,ch/6)
        context.arc(w/7-w/20,ch/2,ch/3,3*Math.PI/2,5*Math.PI/2)
        context.lineTo(w/20,5*ch/6)
        context.fill()
    }
    update() {
        this.scale += this.dir * 0.1
        if(this.scale > 1) {
            this.dir = 0
            this.scale = 1
            if(this.onselect) {
                this.onselect()
            }
        }
        if(this.scale < 0) {
            this.scale = 0
            this.dir = 0
            if(this.onunselect) {
                this.onunselect()
            }
        }
    }
    startUpdating() {
        if(this.dir == 0) {
            if(this.scale <= 0) {
                this.dir = 1
            }
            if(this.scale >= 1) {
                this.dir = -1
            }
            console.log("started")
        }
    }
    attachClick() {
        document.body.appendChild(this.img)
        this.img.onmousedown = (event) => {
            console.log(event)
            this.startUpdating()
            const interval = setInterval(()=>{
                console.log(this.dir)
                this.draw()
                this.update()
                if(this.stopped() == true) {
                    this.dir = 0
                    clearInterval(interval)
                    this.draw()
                    console.log("stopped")
                }
            },50)
        }
    }
}
const basicSwitch = new BasicSwitch('#3f51b5')
basicSwitch.draw()
basicSwitch.attachClick()
basicSwitch.onselect = () => {
    alert("selected")
}
basicSwitch.onunselect = () => {
    alert("unselected")
}
