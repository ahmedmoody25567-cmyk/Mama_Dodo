/* --- Canvas Animation: Falling Petals & Hearts --- */
const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const items = ['🌸', '🌹', '❤️', '💖', '✨', '💕', '🌷'];
const particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = -20;
    this.size = Math.random() * 20 + 14;
    this.speedY = Math.random() * 1.8 + 0.8;
    this.speedX = Math.random() * 1.5 - 0.75;
    this.char = items[Math.floor(Math.random() * items.length)];
    this.rotation = Math.random() * 360;
    this.rotSpeed = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.7 + 0.3;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotSpeed;

    if (this.y > height + 20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.char, 0, 0);
    ctx.restore();
  }
}

for (let i = 0; i < 35; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

/* --- Interactive Click Floating Hearts --- */
window.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.closest('.btn') || e.target.closest('.flip-card')) return;
  
  const pop = document.createElement('div');
  pop.innerText = ['❤️', '💖', '🌹', '✨'][Math.floor(Math.random() * 4)];
  pop.style.position = 'fixed';
  pop.style.left = e.clientX + 'px';
  pop.style.top = e.clientY + 'px';
  pop.style.fontSize = '28px';
  pop.style.pointerEvents = 'none';
  pop.style.zIndex = '999';
  pop.style.transition = 'all 1s ease-out';
  document.body.appendChild(pop);

  setTimeout(() => {
    pop.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -100px) scale(1.4)`;
    pop.style.opacity = '0';
  }, 20);

  setTimeout(() => pop.remove(), 1050);
});

/* --- Surprise Confetti & Modal --- */
function triggerSurprise() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff4b72', '#ff85a2', '#f7d070', '#ffffff']
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff4b72', '#ff85a2', '#f7d070', '#ffffff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

/* --- Wishes Generator --- */
const wishes = [
  "اللهم اشرح صدر Mama Dodo ويسر أمرها وأسعد قلبها بنور رضاك 🤲❤️",
  "يا رب يجعل العافية والصحة والسعادة لباسك الدائم يا أمي الغالية ✨🌸",
  "اللهم ابعد عن Mama Hoda كل هم وحزن واملأ أيامها بالخير والضحكات 🎉🌹",
  "يا رب تحفظ لينّا Mama Dodo وتخليها المُنورة حياتنا وبركة كل أيامنا ❤️",
  "ربنا يجعل ابتسامتك الصافية عريضة ودايمة ومفارقاكيش أبداً يا عسل 🌷✨"
];

function generateWish() {
  const wishBox = document.getElementById('wishText');
  const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
  wishBox.style.opacity = 0;
  setTimeout(() => {
    wishBox.innerText = randomWish;
    wishBox.style.opacity = 1;
  }, 200);

  confetti({
    particleCount: 20,
    spread: 60,
    origin: { y: 0.7 }
  });
}

/* --- Rose Garden Counter --- */
let count = 3;
function addRose() {
  count++;
  const roseDisplay = document.getElementById('roseDisplay');
  const roseCount = document.getElementById('roseCount');
  
  roseDisplay.innerText += '🌹';
  roseCount.innerText = `عدد الورود المهداة: ${count} وردة`;

  confetti({
    particleCount: 15,
    spread: 40,
    origin: { y: 0.8 },
    colors: ['#ff0055', '#ff4b72']
  });
}
