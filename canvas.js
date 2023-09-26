const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight 

const c = canvas.getContext("2d")

const mouse = {
    x: undefined,
    y: undefined
}
 
const maxRadius = 40
const colorArray = [
    "#2C3E50",
    "#E74C3C",
    "#ECF0F1",
    "#3498DB",
    "#2980B9"
];

window.addEventListener("mousemove" , function(event) {
    mouse.x = event.x
    mouse.y = event.y 
});

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight 
    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.minRadius = radius;
    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = "blue"
        c.fillStyle = this.color
        c.fill()
    }
    this.update = function () {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx 
        } 
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy= -this.dy
        }
        this.x += this.dx
        this.y += this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50){
                if(this.radius < maxRadius) {
                    this.radius += 1;
                }
        }else if(this.radius > this.minRadius) {
            this.radius -=1;
        }

        this.draw()
    }
}

let circleArray = [];
function init () {
    circleArray = [];
    for(let i = 0; i < 800; i ++) {
        let radius = Math.random() * 3 + 1; 
        let x = Math.random() * (innerWidth - radius *2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius 
        let dx = (Math.random() - 0.5) * 4
        let dy = (Math.random() - 0.5) * 4 
        circleArray.push(new Circle(x, y, dx, dy, radius)) 
    }
}


function animated() {
    requestAnimationFrame(animated) 
    c.clearRect(0, 0, innerWidth, innerHeight)
     for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update()
     }
    
}
init();
animated()  