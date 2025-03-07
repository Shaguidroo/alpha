var canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let margin = 30;

// Crear líneas con diferentes parámetros
let lines = [
    { x0: margin, y0: margin, x1: margin, y1: margin, x2: margin, y2: margin, margin: 30, speed: 2, right: true, down: false },
    { x0: margin, y0: margin + 50, x1: margin, y1: margin + 50, x2: margin, y2: margin + 50, margin: 50, speed: 3, right: true, down: false },
    { x0: margin, y0: margin + 100, x1: margin, y1: margin + 100, x2: margin, y2: margin + 100, margin: 70, speed: 4, right: true, down: false }
];

// Función para ajustar el tamaño del lienzo y actualizar las líneas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    lines.forEach(line => {
        line.x0 = line.margin;
        line.y0 = line.margin;
        line.x1 = line.margin;
        line.y1 = line.margin;
        line.x2 = line.margin;
        line.y2 = line.margin;
    });
}

window.addEventListener('resize', resizeCanvas);

// Función para actualizar la posición de cada línea
function updateLine(line) {
    if (line.right) {
        if (!line.down) {
            line.x1 = line.x0;
            line.y1 = line.y2;
            line.x2 += line.speed;
            if (line.x2 - line.x0 >= canvas.height - 2 * line.margin) {
                line.x0 += line.speed;
            } else if (line.y0 > line.margin) {
                line.y0 -= line.speed;
            }
            if (line.x2 >= canvas.width - line.margin) {
                line.down = true;
            }
        } else {
            line.x1 = line.x2;
            line.y1 = line.y0;
            line.y2 += line.speed;
            line.x0 += line.speed;
            if (line.y2 >= canvas.height - line.margin) {
                line.right = false;
                line.down = false;
            }
        }
    } else {
        if (!line.down) {
            line.x1 = line.x0;
            line.y1 = line.y2;
            line.x2 -= line.speed;
            if (line.x0 - line.x2 >= canvas.height - 2 * line.margin) {
                line.x0 -= line.speed;
            } else {
                line.y0 += line.speed;
            }
            if (line.x2 <= line.margin) {
                line.down = true;
            }
        } else {
            line.x1 = line.x2;
            line.y1 = line.y0;
            line.x0 -= line.speed;
            line.y2 -= line.speed;
            if (line.y2 <= line.margin) {
                line.right = true;
                line.down = false;
            }
        }
    }
}

// Función de animación principal
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x0, line.y0);
        ctx.lineTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 4;
        ctx.stroke();

        updateLine(line);
    });

    requestAnimationFrame(animate);
}

// Iniciar la animación
animate();
