window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx =canvas.getContext('2d');
    var drawing = false;
    var startLocation = {
        'x': 0,
        'y': 0
    }
    var useRubber = false;
    var rubber = document.getElementById('rubber');
    //初始化
    init();
    function init() {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
    }
    window.onresize = function() {
        init();
    }
    //画圆
    function drawCircle(x,y,radius,color='red') {
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
    }
    //画线
    function drawLine(x,y,color='red') {
        ctx.beginPath();
        ctx.moveTo(startLocation.x,startLocation.y);
        ctx.lineTo(x,y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
    }

    //擦去图画
    function clearPic(x,y) {
        ctx.clearRect(x,y,10,10);
    }

    //使用橡皮
    rubber.onclick = function() {
        useRubber = !useRubber;
    }

    //监听用户鼠标事件
    listenMouse(canvas);
    function listenMouse(canvas) {   
        canvas.onmousedown = function(e) {
            console.log(e)
            var x = e.clientX;
            var y = e.clientY;
            if (useRubber) {
                clearPic(x,y)
            } else {
                drawing = true;   
                startLocation.x = x;
                startLocation.y = y;
            }  
        }
        canvas.onmouseup = function(e) {
            drawing = false;
        }
        canvas.onmousemove = function(e) {
            var x = e.clientX;
            var y = e.clientY;
            if (useRubber) {
                clearPic(x,y);
                return false;
            } 
            if (drawing) {  
                drawLine(x,y);
                startLocation.x = x;
                startLocation.y = y;
            }      
        }
    }
}
