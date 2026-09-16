// --- Passcode Lock Screen Functionality ---
const CORRECT_PASSCODE = "1329"; // Set your custom code here

function checkPasscode() {
  const input = document.getElementById("passcodeInput").value;
  const lockScreen = document.getElementById("lockScreen");
  const errorMsg = document.getElementById("errorMessage");

  if (input === CORRECT_PASSCODE) {
    lockScreen.style.opacity = "0";
    setTimeout(() => {
      lockScreen.style.display = "none";
    }, 500);
  } else {
    errorMsg.innerText = "Oops! Wrong passcode, try again ❤️";
    document.getElementById("passcodeInput").value = "";
  }
}

// Enable pressing 'Enter' key to trigger unlock
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("passcodeInput");
  if (inputField) {
    inputField.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        checkPasscode();
      }
    });
  }
});
function openModal(src, captionText) {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImg");
  const caption = document.getElementById("modalCaption");

  modal.style.display = "flex";
  modalImg.src = src;
  caption.innerText = captionText;
}

function closeModal() {
  document.getElementById("photoModal").style.display = "none";
}
// --- Full Album Modal Control ---
function openAlbum() {
  document.getElementById("albumModal").style.display = "block";
}

function closeAlbum() {
  document.getElementById("albumModal").style.display = "none";
}

// --- Floating Hearts Background Animation ---
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = height + 20;
    this.size = Math.random() * 12 + 8;
    this.speed = Math.random() * 1.5 + 0.8;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.color = `rgba(224, 122, 95, ${this.opacity})`;
    this.swing = Math.random() * 2;
    this.swingSpeed = Math.random() * 0.02 + 0.01;
  }

  update() {
    this.y -= this.speed;
    this.swing += this.swingSpeed;
    this.x += Math.sin(this.swing) * 0.5;

    if (this.y < -20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
    ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
    ctx.fill();
    ctx.restore();
  }
}

const hearts = Array.from({ length: 25 }, () => new Heart());

function animate() {
  ctx.clearRect(0, 0, width, height);
  hearts.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animate);
}

animate();

function populateAlbum() {
  const albumGrid = document.getElementById("albumGrid");
  const totalPhotos = 27;
  console.log("Loading album photos...");

  if (albumGrid && albumGrid.children.length === 0) {
    for (let i = 1; i <= totalPhotos; i++) {
      const card = document.createElement("div");
      card.className = "album-card";
      
      // Make the card clickable to open the photo in full size
      card.onclick = () => openModal(`images/photo${i}.jpg`, `Memory #${i}`);

      const img = document.createElement("img");
      img.src = `images/photo${i}.jpg`;
      img.alt = `Memory ${i}`;

      card.appendChild(img);
      albumGrid.appendChild(card);
    }
  }
}
// Open modal and load images
function openAlbum() {
  populateAlbum();
  document.getElementById("albumModal").style.display = "block";
}

// Close modal
function closeAlbum() {
  document.getElementById("albumModal").style.display = "none";
}