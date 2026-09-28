/* ===================================================
   1. LOGIKA LOADING PRELOADER (0% - 100%)
   =================================================== */
   document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const numberText = document.getElementById("preloader-num");
    const barFill = document.getElementById("preloader-bar");
  
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 7) + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (numberText) numberText.innerText = "100%";
        if (barFill) barFill.style.width = "100%";
  
        setTimeout(() => {
          if (preloader) preloader.classList.add("loaded");
        }, 200);
      } else {
        if (numberText) numberText.innerText = progress + "%";
        if (barFill) barFill.style.width = progress + "%";
      }
    }, 30);
  });
  
  /* ===================================================
     2. ENGINE SALJU TEBAL & BERLAPIS (HIGH CONTRAST)
     =================================================== */
  (function () {
    const canvas = document.getElementById("snow-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
  
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
  
    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  
    // Jumlah butir diperbanyak agar salju terlihat tebal
    const flakeCount = 135;
    const flakes = [];
  
    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3.5 + 1.2,        // Ukuran butiran bervariasi (tebal & berkedalaman)
        speedY: Math.random() * 0.001 + 0.2,  // Kecepatan jatuh salju
        speedX: Math.random() * 0.05 - 0.01,  // Efek ayunan angin kiri-kanan
        opacity: Math.random() * 0.03 + 0.09  // Opasitas tinggi agar putih salju menyala di background gelap
      });
    }
  
    function drawFlakes() {
      ctx.clearRect(0, 0, width, height);
  
      for (let i = 0; i < flakeCount; i++) {
        const f = flakes[i];
  
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.shadowBlur = f.r > 2.5 ? 6 : 2; // Butiran besar diberi pendaran cahaya (glow)
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
  
     
        f.y += f.speedY;
        f.x += f.speedX;
  
        if (f.y > height) {
          f.y = -10;
          f.x = Math.random() * width;
        }
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;
      }
  
      requestAnimationFrame(drawFlakes);
    }
  
    drawFlakes();
  })();