const canvas = document.querySelector("#clock");
let x, y = 0;
const deg = (Math.PI * 2) / 60;

function draw() {
    if (!canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    // 获取当前时间 时分秒
    const time = new Date();
    const second = time.getSeconds();
    const minute = time.getMinutes();
    const hour = time.getHours();
    const radius = canvas.clientWidth / 2 - 20;
    // 清除canvas整个区域
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // 保存 入栈
    // 栈是一种后进先出的数据结构
    ctx.save();

    // 绘制表框线
    ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2)
    ctx.beginPath();
    ctx.strokeStyle = "#999";
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // 绘制刻度
    ctx.strokeStyle = "#999"
    for (let i = 1; i <= 60; i++) {
        ctx.beginPath();
        ctx.rotate(deg);
        ctx.lineWidth = i % 5 ? 1 : 5;
        ctx.moveTo(0, radius - 50);
        ctx.lineTo(0, radius - 30);
        ctx.stroke();
    }
    // 绘制文本
    ctx.textAlign = "center";
    // 注意Baseline的l是小写
    ctx.textBaseline = "middle";
    for (let i = 1; i <= 12; i++) {
        ctx.beginPath();
        ctx.font = "18px Arial";
        x = (radius - 10) * Math.sin(deg * i * 5);
        y = -(radius - 10) * Math.cos(deg * i * 5);
        ctx.fillStyle = "#FFF"
        ctx.fillText(i, x, y);
    }

    // 绘制中心点
    ctx.save();
    ctx.fillStyle = "#999";
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 绘制时分秒针
    ctx.save();
    ctx.rotate(Math.PI);

    // 时针
    ctx.save();
    ctx.beginPath();
    ctx.rotate(deg * hour * 5 + (deg * minute) / 12 );
    ctx.moveTo(0, 0);
    ctx.lineTo(0, radius - 50);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();

    // 分针
    ctx.save();
    ctx.beginPath();
    ctx.rotate(deg * minute + (second * deg) / 60);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, radius - 30);
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // 秒针   避免秒针被时分覆盖
    ctx.save();
    ctx.beginPath();
    ctx.rotate(deg * second);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, radius - 20);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();


    ctx.restore();
    ctx.restore();
    window.requestAnimationFrame(draw);
}

draw();
