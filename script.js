<canvas id="matrix"></canvas>

<script>
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let width, height, columns, drops = [];
const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZあいうえおカキクケコ";
const fontSize = 16;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    columns = Math.floor(width / fontSize);
    drops = Array.from({ length: columns }, () => ({
        y: Math.random() * height,
        speed: 2 + Math.random() * 4
    }));
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((drop, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drop.y * fontSize;

        ctx.fillText(text, x, y);

        drop.y += drop.speed;
        if (y > height && Math.random() > 0.985) {
            drop.y = 0;
            drop.speed = 2 + Math.random() * 4;
        }
    });

    requestAnimationFrame(draw);
}

draw();
</script>
