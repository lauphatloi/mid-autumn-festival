/**
 * TẾT TRUNG THU - YAMAHA TOWN NAM TIẾN LANDING PAGE
 * Interactive Features, Sequence Replay, Ambient Synthesizer & Canvas Particles
 */

(function () {
  'use strict';

  // DOM Elements
  const festivalStage = document.getElementById('festivalStage');
  const btnReplay = document.getElementById('btnReplay');
  const btnMusic = document.getElementById('btnMusic');
  const musicText = document.getElementById('musicText');
  const iconMusic = document.getElementById('iconMusic');
  const btnToggleChars = document.getElementById('btnToggleCharacters');
  const charChiHang = document.getElementById('charChiHang');
  const charChuCuoi = document.getElementById('charChuCuoi');
  const thoNgoc = document.getElementById('thoNgoc');
  const rabbitDialogue = document.getElementById('rabbitDialogue');
  const btnOpenRegister = document.getElementById('btnOpenRegister');
  const registerModal = document.getElementById('registerModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const registerForm = document.getElementById('registerForm');
  const successBox = document.getElementById('successBox');
  const giftToast = document.getElementById('giftToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastDesc = document.getElementById('toastDesc');
  const particleCanvas = document.getElementById('particleCanvas');

  // Mooncakes
  const cake1 = document.getElementById('cake1');
  const cake2 = document.getElementById('cake2');
  const cake3 = document.getElementById('cake3');

  // Countdown Elements
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  /* ==========================================================================
     1. STAGGERED ENTRANCE REPLAY ENGINE
     ========================================================================== */
  function replayEntrance() {
    const animatedElements = festivalStage.querySelectorAll('[class*="anim-phase-"]');
    
    // Remove animation classes
    animatedElements.forEach((el) => {
      const classList = Array.from(el.classList);
      classList.forEach((cls) => {
        if (cls.startsWith('anim-phase-')) {
          el.dataset.animClass = cls;
          el.classList.remove(cls);
        }
      });
    });

    // Force single browser reflow
    void festivalStage.offsetWidth;

    // Restore animation classes to trigger silky sequence
    requestAnimationFrame(() => {
      animatedElements.forEach((el) => {
        if (el.dataset.animClass) {
          el.classList.add(el.dataset.animClass);
        }
      });
    });

    // Show toast notice
    showToast('Đang phát lại hiệu ứng!', 'Thưởng thức chuỗi xuất hiện mượt mà từng chi tiết ✨');
  }

  if (btnReplay) {
    btnReplay.addEventListener('click', replayEntrance);
  }

  /* ==========================================================================
     2. COUNTDOWN TIMER TO TẾT TRUNG THU
     ========================================================================== */
  // Target: Set to Mid-Autumn Festival night
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);
  targetDate.setHours(18, 0, 0, 0);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      if (cdSecs) cdSecs.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(minutes).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ==========================================================================
     3. INTERACTIVE MOONCAKES & RABBIT DELIGHTS
     ========================================================================== */
  let toastTimeout = null;

  function showToast(title, message, icon = '🥮') {
    if (!giftToast) return;
    const iconEl = giftToast.querySelector('.gift-toast-icon');
    if (iconEl) iconEl.textContent = icon;
    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = message;

    giftToast.classList.add('active');
    playTone(523.25, 0.15, 'triangle'); // C5 chime

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      giftToast.classList.remove('active');
    }, 4500);
  }

  if (cake1) {
    cake1.addEventListener('click', () => {
      showToast('Bánh Trăng Vàng Thập Cẩm!', 'Bạn vừa nhặt được Hộp Bánh Thượng Hạng tại cung đường trăng! Bấm Đăng ký để nhận quà nhé.', '🥮');
    });
  }

  if (cake2) {
    cake2.addEventListener('click', () => {
      showToast('Bánh Hạt Sen Trứng Muối!', 'Voucher bảo dưỡng xe Yamaha 300.000đ đã được thêm vào giỏ quà của bạn!', '🎁');
    });
  }

  if (cake3) {
    cake3.addEventListener('click', () => {
      showToast('Bánh Đậu Xanh Hoàng Kim!', 'Quà tặng Lồng Đèn Phát Sáng Yamaha đang chờ bé cưng của bạn!', '🏮');
    });
  }

  // Rabbit dialogue click
  const rabbitPhrases = [
    '🐰 Thỏ Ngọc chào bạn! Chúc một mùa Trung Thu tràn đầy phúc lộc!',
    '🌙 Trăng rằm tháng Tám sáng nhất, ghé Yamaha Nam Tiến rước lộc to nha!',
    '🥮 Bánh ngon, trà thơm, xe đẹp đang chờ đón bạn cùng gia đình!',
    '🏮 Đừng quên bấm Đăng Ký để nhận ngay hộp bánh trung thu miễn phí!'
  ];
  let phraseIdx = 0;

  if (thoNgoc) {
    thoNgoc.addEventListener('click', () => {
      phraseIdx = (phraseIdx + 1) % rabbitPhrases.length;
      if (rabbitDialogue) {
        const textSpan = rabbitDialogue.querySelector('span');
        if (textSpan) textSpan.textContent = rabbitPhrases[phraseIdx];
        rabbitDialogue.classList.add('show-bubble');
        playTone(659.25, 0.2, 'sine'); // E5 chime
        setTimeout(() => {
          rabbitDialogue.classList.remove('show-bubble');
        }, 3500);
      }
    });
  }

  /* ==========================================================================
     4. CHARACTERS TOGGLE
     ========================================================================== */
  if (btnToggleChars) {
    let charsVisible = true;
    btnToggleChars.addEventListener('click', () => {
      charsVisible = !charsVisible;
      if (charChiHang) charChiHang.style.display = charsVisible ? 'block' : 'none';
      if (charChuCuoi) charChuCuoi.style.display = charsVisible ? 'block' : 'none';
      btnToggleChars.style.opacity = charsVisible ? '1' : '0.6';
    });
  }

  /* ==========================================================================
     5. MODAL FORM INTERACTION
     ========================================================================== */
  function openModal() {
    if (registerModal) {
      registerModal.classList.add('active');
      registerModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (registerModal) {
      registerModal.classList.remove('active');
      registerModal.setAttribute('aria-hidden', 'true');
    }
  }

  window.closeModal = closeModal;

  if (btnOpenRegister) {
    btnOpenRegister.addEventListener('click', openModal);
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeModal);
  }

  if (registerModal) {
    registerModal.addEventListener('click', (e) => {
      if (e.target === registerModal) closeModal();
    });
  }

  window.submitForm = function () {
    const name = document.getElementById('txtName').value;
    const phone = document.getElementById('txtPhone').value;

    if (registerForm) registerForm.style.display = 'none';
    if (successBox) successBox.style.display = 'block';

    triggerConfetti();
    playTone(880, 0.3, 'sine'); // A5 fanfare
    setTimeout(() => playTone(1046.5, 0.4, 'sine'), 150); // C6 fanfare
  };

  /* ==========================================================================
     6. AMBIENT MID-AUTUMN MUSIC SYNTHESIZER (WEB AUDIO API)
     Zero-latency, royalty-free pentatonic chime melody
     ========================================================================== */
  let audioCtx = null;
  let isPlayingMusic = false;
  let musicTimer = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration = 0.3, type = 'sine') {
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context policy
    }
  }

  // Traditional Pentatonic Scale Frequencies (C4, D4, E4, G4, A4, C5, D5, E5, G5)
  const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];

  function playAmbientNote() {
    if (!isPlayingMusic) return;
    const note = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
    playTone(note, 1.8, 'sine');

    const nextDelay = 800 + Math.random() * 1400;
    musicTimer = setTimeout(playAmbientNote, nextDelay);
  }

  if (btnMusic) {
    btnMusic.addEventListener('click', () => {
      initAudio();
      isPlayingMusic = !isPlayingMusic;

      if (isPlayingMusic) {
        musicText.textContent = 'Âm nhạc: Bật 🎶';
        btnMusic.style.borderColor = 'var(--color-gold)';
        playAmbientNote();
      } else {
        musicText.textContent = 'Âm nhạc: Tắt';
        btnMusic.style.borderColor = 'rgba(255, 220, 100, 0.35)';
        if (musicTimer) clearTimeout(musicTimer);
      }
    });
  }

  /* ==========================================================================
     7. CONFETTI CELEBRATION EFFECT
     ========================================================================== */
  function triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ffd700', '#ff4b2b', '#ff416c', '#00d2ff', '#9b51e0', '#ffffff'];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    let frames = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frames++;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.vr;
        p.opacity = Math.max(0, 1 - frames / 120);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      });

      if (frames < 120) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(animate);
  }

  /* ==========================================================================
     8. AMBIENT STARRY CANVAS PARTICLES
     ========================================================================== */
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let width = (particleCanvas.width = window.innerWidth);
    let height = (particleCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = particleCanvas.width = window.innerWidth;
      height = particleCanvas.height = window.innerHeight;
    });

    const numStars = 35;
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.015 + 0.005,
        driftX: (Math.random() - 0.5) * 0.2,
        driftY: -Math.random() * 0.25 - 0.05
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;

        s.x += s.driftX;
        s.y += s.driftY;

        if (s.y < 0) s.y = height;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 235, 150, ${Math.max(0, Math.min(1, s.alpha * 0.8))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffeaa7';
        ctx.fill();
      });

      requestAnimationFrame(renderParticles);
    }

    requestAnimationFrame(renderParticles);
  }

  console.log('🌕 Đêm Hội Trăng Rằm - Yamaha Town Nam Tiến loaded smoothly!');
})();
