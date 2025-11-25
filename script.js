const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZあいうえおカキクケコ";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }, () => 1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.08)"; // efecto estela a 0
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i] = drops[i] * fontSize > canvas.height && Math.random() > 0.975 ? 0 : drops[i] + 1;
    }
}

// Rebote mas fluido
const tux = document.getElementById("tux");
let tuxX = Math.random() * (window.innerWidth - 100);
let tuxY = Math.random() * (window.innerHeight - 100);
let speedX = 6 + Math.random() * 4; // más velocidad
let speedY = 5 + Math.random() * 4;

tux.style.position = "absolute";
tux.style.width = "100px";
tux.style.zIndex = 10; // para que quede encima del canvas

function moveTux() {
    tuxX += speedX;
    tuxY += speedY;

    if (tuxX + tux.width >= window.innerWidth || tuxX <= 0) speedX = -speedX;
    if (tuxY + tux.height >= window.innerHeight || tuxY <= 0) speedY = -speedY;

    tux.style.left = tuxX + "px";
    tux.style.top = tuxY + "px";
}

// Animacion sin doble refresco
function animate() {
    drawMatrix();
    moveTux();
    requestAnimationFrame(animate);
}

animate();
