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

}
