let mouseX = 0
let mouseY = 0
let screenLocation = 0
let screenHeight = document.body.scrollHeight - window.innerHeight;
let percentage = 0;
let moveArr = document.getElementsByClassName("move");


document.addEventListener("mousemove",updateMouse);
document.addEventListener("scroll",updateLocation);


function updateMouse(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
    // for(i = 0; i < moveArr.length; i++){
    //     moveArr[i].style.transform = "translate(" + scale(mouseX,0,window.innerWidth,30,-30) + "%," 
    //     + scale(mouseY,0,window.innerHeight,30,-30) + "%)"
    // }
    if(scale(mouseX - 20,0,window.innerWidth,0,100)  > 5 && scale(mouseX - 20,0,window.innerWidth,0,100)  < 95){
        // document.getElementById("MyBall").style.left = scale(mouseX - 20,0,window.innerWidth,0,100) +"%";
        // document.getElementById("MyBall").style.left = "calc((100%/3)/2 - 20px)"
        // document.getElementById("MyBall").style.left = "calc((100%/2) - 20px)"
        // document.getElementById("MyBall").style.left = "calc((100% - (100%/3/2)) - 20px)"
    }
}



function updateLocation(){
   screenLocation = window.scrollY;

   percentage = (screenLocation/screenHeight) * 100
   document.getElementById("movingLine").style.transform = "translate("+ (percentage - 100) + "%,0%)";
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function detect(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        alert("Website currently is not optimize for Mobile device");
    }
}

(function () {
    $(window).scroll(function() {
        var a = $(this).scrollTop() + $(this).innerHeight();
        $(".effect, .moveLeft, .moveRight").each(function() { // container must have class name effect to work
            var b = $(this).offset().top;
            if (a - 250> b && $(this).css("opacity") == 0) {
                $(this).css("transform", "none");
                $(this).animate({
                    "opacity": 1
                }, 750);
            }
        });
    }).scroll();
})();
