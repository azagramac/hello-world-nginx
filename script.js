const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caracteres Matrix
const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZあいうえおカキクケコ";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

// Inicializar drops
const drops = Array.from({ length: columns }, () => Math.random() * canvas.height / fontSize);

// Dibujar efecto Matrix
function drawMatrix() {
    // Fondo semitransparente para efecto suave
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Avance suave y reseteo aleatorio
        drops[i] = drops[i] + 0.5;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
    }
}

// Tux que rebota
const tux = document.getElementById("tux");
tux.style.position = "absolute";
tux.style.width = "100px";
tux.style.zIndex = 10;
tux.style.willChange = "transform";

let tuxX = Math.random() * (window.innerWidth - 100);
let tuxY = Math.random() * (window.innerHeight - 100);
let speedX = 2 + Math.random(); // velocidad X más suave
let speedY = 1.5 + Math.random(); // velocidad Y más suave

function moveTux() {
    tuxX += speedX;
    tuxY += speedY;

    if (tuxX + tux.width >= window.innerWidth || tuxX <= 0) speedX = -speedX;
    if (tuxY + tux.height >= window.innerHeight || tuxY <= 0) speedY = -speedY;

    tux.style.left = tuxX + "px";
    tux.style.top = tuxY + "px";
}

// Animación principal
function animate() {
    drawMatrix();
    moveTux();
    requestAnimationFrame(animate);
}

animate();

// Ajuste al redimensionar ventana
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
