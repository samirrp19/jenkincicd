let mediaRecorder, renderCanvas, renderCtx, recordedChunks = [];
let cursorX = 0, cursorY = 0, clickEffects = [];
let renderLoop, dpr = window.devicePixelRatio || 1;

// 🖱️ Track cursor
document.addEventListener('mousemove', e => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

// 💥 Track clicks
document.addEventListener('click', e => {
  clickEffects.push({ x: e.clientX, y: e.clientY, time: Date.now() });
});

function startRecording() {
  console.log("🎥 Starting canvas recording...");

  renderCanvas = document.createElement('canvas');
  renderCanvas.width = window.innerWidth * dpr;
  renderCanvas.height = window.innerHeight * dpr;
  renderCanvas.style.display = 'none';
  document.body.appendChild(renderCanvas);

  renderCtx = renderCanvas.getContext('2d', { willReadFrequently: true });
  renderCtx.scale(dpr, dpr); // 🧠 Scale for retina/high-DPI screens

  const stream = renderCanvas.captureStream(10); // 10 FPS
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
  recordedChunks = [];

  mediaRecorder.ondataavailable = e => e.data.size > 0 && recordedChunks.push(e.data);
  mediaRecorder.onstop = () => {
    cancelAnimationFrame(renderLoop);
    renderCanvas.remove();

    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    console.log("✅ Recording complete, sending blob...");
    window.parent.postMessage({ type: 'recording-complete', blob }, '*');
  };

  const drawFrame = () => {
    html2canvas(document.body, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    }).then(snapshot => {
      renderCtx.clearRect(0, 0, renderCanvas.width, renderCanvas.height);
      renderCtx.drawImage(snapshot, 0, 0, window.innerWidth, window.innerHeight);

      // 🎯 Draw red cursor
      renderCtx.beginPath();
      renderCtx.arc(cursorX, cursorY, 6, 0, 2 * Math.PI);
      renderCtx.fillStyle = 'red';
      renderCtx.fill();

      // 💥 Click effects (300ms lifespan)
      const now = Date.now();
      clickEffects = clickEffects.filter(c => now - c.time < 300);
      clickEffects.forEach(({ x, y }) => {
        renderCtx.beginPath();
        renderCtx.arc(x, y, 10, 0, 2 * Math.PI);
        renderCtx.strokeStyle = 'blue';
        renderCtx.lineWidth = 2;
        renderCtx.stroke();
      });

      // 🕒 Timestamp watermark
      renderCtx.font = '12px monospace';
      renderCtx.fillStyle = 'white';
      renderCtx.fillText(new Date().toLocaleTimeString(), 10, 20);
    }).catch(err => {
      console.error("🖼️ html2canvas error:", err);
    });

    renderLoop = requestAnimationFrame(drawFrame);
  };

  drawFrame();
  mediaRecorder.start(100);
}

function stopRecording() {
  console.log("🛑 Stopping recording...");
  if (mediaRecorder?.state === 'recording') {
    mediaRecorder.stop();
  }
}

function captureScreenshot() {
  console.log("📸 Capturing screenshot...");

  html2canvas(document.body, {
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
  }).then((canvas) => {
    canvas.toBlob((blob) => {
      if (blob) {
        console.log("📸 Screenshot blob ready, sending to parent...");
        window.parent.postMessage({ type: 'screenshot-captured', blob }, '*');
      }
    });
  }).catch(err => {
    console.error("❌ Screenshot capture failed:", err);
  });
}

// 🎬 Add to postMessage handler
window.addEventListener('message', (e) => {
  const action = e.data?.action;
  if (action === 'start-recording') startRecording();
  if (action === 'stop-recording') stopRecording();
  if (action === 'capture-screenshot') captureScreenshot();
});
