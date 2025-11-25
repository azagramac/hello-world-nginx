const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZあいうえおカキクケコ";
const size = 14;
const columns = Math.floor(canvas.width / size);
const drops = Array(columns).fill(1);

// Cargar imagen del Tux
const tux = new Image();
tux.src = "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg";
const tuxSize = 60;
let tuxX = canvas.width / 2;
let tuxY = canvas.height / 2;
let dx = 3;
let dy = 2;

function draw() {
    // Fondo semitransparente
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = size + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const x = i * size;
        const y = drops[i] * size;

        // Evitar dibujar sobre Tux
        if (!(x > tuxX - size && x < tuxX + tuxSize && y > tuxY - size && y < tuxY + tuxSize)) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));

            // Efecto de brillo: columnas aleatoriamente más claras
            ctx.fillStyle = Math.random() > 0.975 ? "#FFF" : "#0F0";
            ctx.fillText(text, x, y);
        }

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    // Dibujar Tux
    ctx.drawImage(tux, tuxX, tuxY, tuxSize, tuxSize);

    // Actualizar posición de Tux
    tuxX += dx;
    tuxY += dy;

    // Rebote en los bordes
    if (tuxX + tuxSize > canvas.width || tuxX < 0) dx = -dx;
    if (tuxY + tuxSize > canvas.height || tuxY < 0) dy = -dy;
}

// Ajustar canvas al redimensionar
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

setInterval(draw, 40);
