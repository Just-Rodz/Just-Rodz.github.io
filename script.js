/**
 * JUST-RODZ // THIRD WORLDS AESTHETIC ARCHIVE
 * Inspired by thirdworlds.net (Death Grips Official Archive)
 * Interactive Controller • Modal Lightbox • Directory Filter • Telemetry
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. ARCHIVAL CATALOG DATASET
  // =========================================================================
  const ARCHIVE_ITEMS = [
    {
      id: "JR-01",
      title: "SURREAL FROG // METAMORPHOSIS",
      file: "1.frog (1).png",
      category: "COMPOSITING / TEXTURE",
      size: "5.48 MB",
      format: "PNG (Lossless)",
      dpi: "300 DPI",
      dimensions: "3840 x 2160 (4K UHD)",
      date: "2026-09-30",
      checksum: "e8b2f901a4c98e217d05f32b9",
      description: "Organic texture blending study utilizing high-frequency displacement, atmospheric depth haze, and specular surface tension balancing."
    },
    {
      id: "JR-02",
      title: "AQUATIC LIFE // BIOLUMINESCENCE",
      file: "2. fish.png",
      category: "COLOR GRADING / LUMINESCENCE",
      size: "948 KB",
      format: "PNG (Lossless)",
      dpi: "300 DPI",
      dimensions: "2560 x 1440 (QHD)",
      date: "2026-09-30",
      checksum: "4f73a110cb8e3902df5518b0a",
      description: "Subsurface luminescence exploration with inverted dynamic curves, underwater caustic scattering, and deep-spectrum cyan saturation."
    },
    {
      id: "JR-03",
      title: "SILHOUETTE // MONOCHROME FORM",
      file: "3. figure.png",
      category: "CHIAROSCURO / FORM",
      size: "840 KB",
      format: "PNG (Lossless)",
      dpi: "300 DPI",
      dimensions: "2048 x 2048 (1:1)",
      date: "2026-09-30",
      checksum: "7c992e541f876d2039aa827b5",
      description: "Chiaroscuro study isolating negative space, edge threshold compression, and silhouette density against a void background."
    },
    {
      id: "JR-04",
      title: "HECTOR // ENTITY SPECIMEN",
      file: "4. hector.png",
      category: "CHARACTER / SCULPTING",
      size: "8.05 MB",
      format: "PNG (Lossless)",
      dpi: "300 DPI",
      dimensions: "4096 x 2304",
      date: "2026-09-30",
      checksum: "91e3d085fa4b12c87103ceef7",
      description: "High-density digital asset study examining specular shading, synthetic skin grain, and brutalist color temperature."
    },
    {
      id: "JR-05",
      title: "CANDLE // OBLIVION RADIANCE",
      file: "5. candle.png",
      category: "ATMOSPHERE / VOLUMETRIC",
      size: "7.42 MB",
      format: "PNG (Lossless)",
      dpi: "300 DPI",
      dimensions: "3840 x 2160",
      date: "2026-09-30",
      checksum: "b0561e93ca780df2217c98e4d",
      description: "Volumetric light decay modeling the thermal dispersion of single-point incandescent illumination swallowed by absolute black."
    },
    {
      id: "JR-06",
      title: "ACRO // TEMPORAL VELOCITY",
      file: "6. acro.png",
      category: "MOTION / COMPOSITING",
      size: "7.53 MB",
      format: "PNG (Lossless)",
      dpi: "300 DPI",
      dimensions: "3840 x 2160",
      date: "2026-09-30",
      checksum: "39ac6709d2e411b980af4556c",
      description: "Multi-exposure shutter simulation analyzing kinetic trajectory, directional motion blur, and edge persistence across frames."
    },
    {
      id: "JR-00",
      title: "SYSTEM LAB DEMO // CALIBRATION",
      file: "images/demo.png",
      category: "BENCHMARK / METRICS",
      size: "1.2 MB",
      format: "PNG (Lossless)",
      dpi: "300 DPI",
      dimensions: "1920 x 1080 (FHD)",
      date: "2026-11-09",
      checksum: "d18290fbb6721ca947382eec1",
      description: "Pipeline calibration target used for measuring dynamic range compression, pixel alignment, and browser gamut rendering."
    }
  ];

  let currentItemIndex = 0;

  // =========================================================================
  // 2. LIVE UTC SYSTEM CLOCK
  // =========================================================================
  const liveClockEl = document.getElementById('liveClock');
  if (liveClockEl) {
    const updateClock = () => {
      const now = new Date();
      liveClockEl.textContent = now.toISOString().replace('T', ' // ').substring(0, 22) + 'Z';
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  // =========================================================================
  // 3. SOUND SYNTHESIZER (WEB AUDIO API)
  // =========================================================================
  let audioContext = null;
  let audioEnabled = false;

  const initAudio = () => {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
  };

  const playClickSound = (freq = 800, duration = 0.03, type = 'square') => {
    if (!audioEnabled) return;
    initAudio();
    if (!audioContext) return;
    
    try {
      if (audioContext.state === 'suspended') audioContext.resume();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + duration);
      
      gain.gain.setValueAtTime(0.04, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  };

  // Attach subtle click feedback to brutalist controls
  document.querySelectorAll('a, button, .catalog-card-image-wrap').forEach(el => {
    el.addEventListener('mouseenter', () => playClickSound(1200, 0.015, 'sine'));
    el.addEventListener('click', () => playClickSound(440, 0.04, 'square'));
  });

  const audioToggleBtn = document.getElementById('audioToggleBtn');
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      initAudio();
      audioToggleBtn.textContent = audioEnabled ? '[ AUDIO: ON ]' : '[ AUDIO: OFF ]';
      audioToggleBtn.classList.toggle('active', audioEnabled);
      showToast(audioEnabled ? 'Tactile Web Audio initialized' : 'Audio muted');
    });
  }

  // =========================================================================
  // 4. CRT SCANLINE & NEGATIVE INVERT TOGGLES
  // =========================================================================
  const crtToggleBtn = document.getElementById('crtToggleBtn');
  if (crtToggleBtn) {
    const savedCRT = localStorage.getItem('just_rodz_crt');
    if (savedCRT === 'true') {
      document.body.classList.add('crt-active');
      crtToggleBtn.textContent = '[ CRT: ON ]';
      crtToggleBtn.classList.add('active');
    }

    crtToggleBtn.addEventListener('click', () => {
      const isActive = document.body.classList.toggle('crt-active');
      crtToggleBtn.textContent = isActive ? '[ CRT: ON ]' : '[ CRT: OFF ]';
      crtToggleBtn.classList.toggle('active', isActive);
      localStorage.setItem('just_rodz_crt', isActive.toString());
      showToast(isActive ? 'CRT Scanline Filter Active' : 'CRT Filter Disabled');
    });
  }

  const invertToggleBtn = document.getElementById('invertToggleBtn');
  if (invertToggleBtn) {
    let isInverted = false;
    invertToggleBtn.addEventListener('click', () => {
      isInverted = !isInverted;
      document.documentElement.style.filter = isInverted ? 'invert(1) hue-rotate(180deg)' : 'none';
      invertToggleBtn.classList.toggle('active', isInverted);
      invertToggleBtn.textContent = isInverted ? '[ INVERT: ON ]' : '[ INVERT ]';
    });
  }

  // =========================================================================
  // 5. TOAST NOTIFICATION UTILITY
  // =========================================================================
  const toastEl = document.getElementById('brutalistToast');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = `> ${message}`;
    toastEl.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('visible');
    }, 2800);
  }

  // =========================================================================
  // 6. MODAL DOSSIER / FULL ARTWORK INSPECTOR
  // =========================================================================
  const modal = document.getElementById('dossierModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalCode = document.getElementById('modalCode');
  const modalMetaFile = document.getElementById('modalMetaFile');
  const modalMetaSize = document.getElementById('modalMetaSize');
  const modalMetaFormat = document.getElementById('modalMetaFormat');
  const modalMetaDim = document.getElementById('modalMetaDim');
  const modalMetaChecksum = document.getElementById('modalMetaChecksum');
  const modalDesc = document.getElementById('modalDesc');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalPrevBtn = document.getElementById('modalPrevBtn');
  const modalNextBtn = document.getElementById('modalNextBtn');

  const openModal = (index) => {
    if (index < 0) index = ARCHIVE_ITEMS.length - 1;
    if (index >= ARCHIVE_ITEMS.length) index = 0;
    currentItemIndex = index;
    const item = ARCHIVE_ITEMS[currentItemIndex];

    if (modalImg) {
      modalImg.src = item.file;
      modalImg.alt = item.title;
    }
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalCode) modalCode.textContent = `CATALOG ID // ${item.id} • ${item.category}`;
    if (modalMetaFile) modalMetaFile.textContent = item.file;
    if (modalMetaSize) modalMetaSize.textContent = item.size;
    if (modalMetaFormat) modalMetaFormat.textContent = item.format;
    if (modalMetaDim) modalMetaDim.textContent = item.dimensions;
    if (modalMetaChecksum) modalMetaChecksum.textContent = item.checksum;
    if (modalDesc) modalDesc.textContent = item.description;
    
    if (modalDownloadBtn) {
      modalDownloadBtn.href = item.file;
      modalDownloadBtn.setAttribute('download', item.file);
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalPrevBtn) modalPrevBtn.addEventListener('click', () => openModal(currentItemIndex - 1));
  if (modalNextBtn) modalNextBtn.addEventListener('click', () => openModal(currentItemIndex + 1));

  // Close on backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') openModal(currentItemIndex - 1);
    if (e.key === 'ArrowRight') openModal(currentItemIndex + 1);
  });

  // Attach openModal to all catalog cards and inspect triggers
  document.querySelectorAll('[data-inspect-id]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const itemId = trigger.getAttribute('data-inspect-id');
      const idx = ARCHIVE_ITEMS.findIndex(item => item.id === itemId);
      if (idx !== -1) openModal(idx);
    });
  });

  // =========================================================================
  // 7. DIRECTORY SEARCH / LIVE FILTER
  // =========================================================================
  const dirSearchInput = document.getElementById('dirSearchInput');
  const dirTableBody = document.getElementById('dirTableBody');

  if (dirSearchInput && dirTableBody) {
    dirSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const rows = dirTableBody.querySelectorAll('tr');
      let matchCount = 0;

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query)) {
          row.style.display = '';
          matchCount++;
        } else {
          row.style.display = 'none';
        }
      });

      const dirCounter = document.getElementById('dirCounter');
      if (dirCounter) {
        dirCounter.textContent = `${matchCount} OBJECTS LISTED`;
      }
    });
  }

  // =========================================================================
  // 8. DEPLOY COMMANDS COPY BUTTON
  // =========================================================================
  const copyDeployBtn = document.getElementById('copyDeployBtn');
  const deployTerminalCode = document.getElementById('deployTerminalCode');

  if (copyDeployBtn && deployTerminalCode) {
    copyDeployBtn.addEventListener('click', async () => {
      const rawText = deployTerminalCode.innerText || deployTerminalCode.textContent;
      try {
        await navigator.clipboard.writeText(rawText);
        showToast('DEPLOY COMMANDS COPIED TO CLIPBOARD');
        copyDeployBtn.textContent = '[ COPIED ]';
        setTimeout(() => {
          copyDeployBtn.textContent = '[ COPY COMMANDS ]';
        }, 2200);
      } catch (err) {
        showToast('CLIPBOARD ACCESS FAILED');
      }
    });
  }

  // =========================================================================
  // 9. DYNAMIC UPTIME DISPLAY
  // =========================================================================
  const uptimeEl = document.getElementById('serverUptime');
  if (uptimeEl) {
    const startTime = Date.now();
    setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const hrs = String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0');
      const mins = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
      const secs = String(elapsedSeconds % 60).padStart(2, '0');
      uptimeEl.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);
  }

});
