(() => {
  const W = 480;
  const H = 360;
  const SCALE = 2;
  const FRAME_MS = 1000 / 30;

  const TILE_ROWS = [
    "11111", "11111", "11111", "11111", "11111", "01110", "00100", "00200", "00000", "00000",
    "00000", "01110", "11111", "11111", "11111", "11110", "11100", "01000", "02000", "00000",
    "00000", "00000", "00111", "01111", "11111", "01110", "00100", "00200", "00000", "00000",
    "00000", "00020", "00000", "00000", "00000", "02000", "00000", "00000", "00000", "00200",
    "00000", "00000", "00000", "00100", "01110", "11111", "01010", "11111", "11111", "10101",
    "11111", "11111", "01010", "01110", "01110", "00100", "00100", "00200", "00000", "00000",
    "00000", "11111", "01110", "00200", "00000", "00000", "00000", "01000", "02000", "00000",
    "00000", "00000", "00010", "00020", "00000", "00000", "00000", "10000", "20000", "00000",
    "00000", "00000", "01000", "02000", "00000", "00000", "00000", "00001", "00002", "00000",
    "00000", "00000", "01110", "01110", "11110", "11100", "11000", "20000", "00000", "00000",
    "00000", "01110", "01110", "01111", "00111", "00011", "00002", "00000", "00000", "00000",
    "00020", "00000", "00000", "00000", "00200", "00000", "00000", "00000", "02000", "00000",
    "00000", "00000", "20000", "00000", "00000", "00000", "01210", "00000", "12121", "00000",
    "01210", "00000", "00000", "00000", "00100", "11111", "11111", "11011", "01111", "11111",
    "11011", "10001", "11011", "11111", "01110", "00100", "10101", "11111", "00100", "00100",
    "00100", "00100", "01100", "11100", "11000", "11000", "11100", "01110", "00110", "00011",
    "00011", "00011", "00011", "00110", "00110", "00100", "00200", "00000", "00000", "00000",
    "20102", "00000", "00000", "00000", "00200", "00000", "00000", "00000", "02020", "00000",
    "00000", "00000", "00200", "00000", "00000", "00000", "02020", "00000", "00000", "00000",
    "20002", "00000", "00000", "00000", "00200", "00000", "00000", "00000", "00100", "00100",
    "00100", "00200", "00000", "00000", "00000", "11011", "11111", "11111", "10101", "11111",
    "11111", "11011", "11111", "11111", "01110", "00100", "00200", "00000", "00000", "00000",
    "20000", "00000", "00000", "00000", "00002", "00000", "00000", "00000", "20000", "00000",
    "00000", "00000", "00200", "00000", "00000", "00000", "10001", "11011", "11111", "01110",
    "00100", "01110", "01110", "11011", "11011", "20002", "00000", "00000", "00000", "01000",
    "01100", "01100", "00110", "00020", "00000", "00000", "00000", "00010", "00110", "01110",
    "01100", "02000", "00000", "00000", "00000", "01010", "11111", "11111", "11111", "11111",
    "00111", "11111", "11111", "11111", "11100", "11111", "11111", "11111", "00011", "11111",
    "11111", "11111", "11000", "11111", "11111", "11111", "00001", "11111", "11111", "11111",
    "10000", "11111", "11111", "01110", "00100", "00200", "00000", "00000", "00200", "02020",
    "20202", "02020", "00200", "20002", "02020", "20202", "02020", "00200", "00000", "00000",
    "00000", "00200", "00000", "02020", "00202", "00020", "00002", "00000", "02020", "00200",
    "00000", "02020", "20200", "02000", "20000", "00000", "00000", "00100", "01110", "01120",
    "01110", "01110", "02110", "00000", "01110", "01110", "01210", "01110", "01120", "01110",
    "01110", "00000", "01110", "01110", "01110", "00200", "00000", "00000", "00000", "21112",
    "22221", "22221", "21111", "12221", "12221", "21112", "00000", "11111", "02020", "00000",
    "00000", "00000", "00100", "00100", "00100", "00100", "001"
  ];
  const TILES = TILE_ROWS.join('');
  const CHARS = 'abcdefghijklmnopqrstuvwxyz1234567890-.,?!×★% ';
  const FONT = [
    "21122132123212133233", "111311313122123232231323", "3121211212232332",
    "11131323233232212111", "1113113112321333", "111311311222",
    "311111131323233222323233", "111331331232", "113113332123",
    "1131212323131312", "111331121233", "11131333",
    "1311112323313133", "131111333331", "1113133333313111",
    "1113113131323212", "111311311323313232232233", "11313122221222331113",
    "31212112123232232313", "11312123", "111313333331",
    "11232331", "1113132121333331", "11331331",
    "112222312223", "113131131333", "122121231333",
    "1221213232131333", "11313122123232232313", "111212322123",
    "31111112123232232313", "31111113133333323212", "121111313123",
    "11131333333131111232", "32121211113131333313", "11131333333131111331",
    "1232", "1313", "2223",
    "12111131313232222323", "21222323", "22332332",
    "21131332321212333321", "1112122121111331333232232333", " "
  ];

  const canvas = document.getElementById('stage');
  const ctx = canvas.getContext('2d');
  const overlay = document.getElementById('overlay');
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;

  const backdrop = new Image();
  backdrop.src = 'assets/backdrop.png';
  backdrop.addEventListener('load', penClear);

  const bgm = new Audio('assets/bgm.wav');
  const dead = new Audio('assets/dead.wav');
  bgm.preload = 'auto';
  dead.preload = 'auto';

  const COLOR_LINE = 0xffffffff;
  const COLOR_FILL_PAD = 0xffffffff;
  const COLOR_LINE_PAD = 0xffff2a9d;
  const COLOR_RED = 0xffffe94a;
  const COLOR_GRAY = 0xffffffff;
  const COLOR_ORANGE = 0xffffd23f;

  const v = {};
  const mouse = { x: 0, down: false };
  const keys = { left: false, right: false, space: false };

  const pen = { down: false, x: 0, y: 0, size: 1, hue: 66.66, sat: 100, bri: 100, shade: 50, rgb: { r: 255, g: 136, b: 0 } };

  function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, n));
  }

  function mod(n, m) {
    let r = n % m;
    if (r / m < 0) r += m;
    return r;
  }

  function hsvToRgb(h, s, vv) {
    h = h % 360;
    if (h < 0) h += 360;
    s = clamp(s, 0, 1);
    vv = clamp(vv, 0, 1);
    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = vv * (1 - s);
    const q = vv * (1 - s * f);
    const t = vv * (1 - s * (1 - f));
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 0: r = vv; g = t; b = p; break;
      case 1: r = q; g = vv; b = p; break;
      case 2: r = p; g = vv; b = t; break;
      case 3: r = p; g = q; b = vv; break;
      case 4: r = t; g = p; b = vv; break;
      case 5: r = vv; g = p; b = q; break;
    }
    return { r: Math.floor(r * 255), g: Math.floor(g * 255), b: Math.floor(b * 255) };
  }

  function rgbToHsv(c) {
    const r = c.r / 255;
    const g = c.g / 255;
    const b = c.b / 255;
    const x = Math.min(r, g, b);
    const vv = Math.max(r, g, b);
    let h = 0;
    let s = 0;
    if (x !== vv) {
      const f = r === x ? g - b : g === x ? b - r : r - g;
      const i = r === x ? 3 : g === x ? 5 : 1;
      h = ((i - f / (vv - x)) * 60) % 360;
      s = (vv - x) / vv;
    }
    return { h, s, v: vv };
  }

  function mixRgb(a, b, t) {
    if (t <= 0) return a;
    if (t >= 1) return b;
    return { r: (1 - t) * a.r + t * b.r, g: (1 - t) * a.g + t * b.g, b: (1 - t) * a.b + t * b.b };
  }

  function decimalToRgb(n) {
    const a = (n >> 24) & 0xff;
    return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff, a: a > 0 ? a : 255 };
  }

  function updatePenRgb() {
    pen.rgb = hsvToRgb((pen.hue * 360) / 100, pen.sat / 100, pen.bri / 100);
  }

  function setPenColorToColor(n) {
    const hsv = rgbToHsv(decimalToRgb(n));
    pen.hue = (hsv.h / 360) * 100;
    pen.sat = hsv.s * 100;
    pen.bri = hsv.v * 100;
    pen.shade = pen.bri / 2;
    updatePenRgb();
  }

  function legacyUpdatePenColor() {
    let rgb = hsvToRgb((pen.hue * 360) / 100, 1, 1);
    const shade = pen.shade > 100 ? 200 - pen.shade : pen.shade;
    if (shade < 50) {
      rgb = mixRgb({ r: 0, g: 0, b: 0 }, rgb, (10 + shade) / 60);
    } else {
      rgb = mixRgb(rgb, { r: 255, g: 255, b: 255 }, (shade - 50) / 60);
    }
    const hsv = rgbToHsv(rgb);
    pen.hue = (100 * hsv.h) / 360;
    pen.sat = 100 * hsv.s;
    pen.bri = 100 * hsv.v;
    updatePenRgb();
  }

  function setPenHue(value) {
    pen.hue = mod(value / 2, 100);
    legacyUpdatePenColor();
  }

  function setPenShade(value) {
    let s = value % 200;
    if (s < 0) s += 200;
    pen.shade = s;
    legacyUpdatePenColor();
  }

  function setPenSize(n) {
    pen.size = clamp(n, 1, 1200);
  }

  function penCss() {
    return 'rgb(' + pen.rgb.r + ',' + pen.rgb.g + ',' + pen.rgb.b + ')';
  }

  function penClear() {
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    if (backdrop.complete && backdrop.naturalWidth > 0) {
      ctx.drawImage(backdrop, 0, 0, W, H);
    } else {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#05010f');
      g.addColorStop(1, '#2a0a4a');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }
  }

  function drawDot(x, y) {
    ctx.fillStyle = penCss();
    ctx.beginPath();
    ctx.arc(x + W / 2, H / 2 - y, pen.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawLine(x0, y0, x1, y1) {
    ctx.strokeStyle = penCss();
    ctx.lineWidth = pen.size;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x0 + W / 2, H / 2 - y0);
    ctx.lineTo(x1 + W / 2, H / 2 - y1);
    ctx.stroke();
  }

  function goTo(x, y) {
    const nx = clamp(x, -465, 465);
    const ny = clamp(y, -345, 345);
    const ox = pen.x;
    const oy = pen.y;
    pen.x = nx;
    pen.y = ny;
    if (pen.down) drawLine(ox, oy, nx, ny);
  }

  function penDown() {
    pen.down = true;
    drawDot(pen.x, pen.y);
  }

  function penUp() {
    pen.down = false;
  }

  function tileAt(index) {
    if (index < 1 || index > TILES.length) return -1;
    return TILES.charCodeAt(index - 1) - 48;
  }

  function rainbowColor(col, row) {
    const rgb = hsvToRgb(mod(row * 22 + col * 40 - v.frames * 3, 360), 0.85, 1);
    return (0xff << 24) | (rgb.r << 16) | (rgb.g << 8) | rgb.b;
  }

  function drawQuad(x1, y1, x2, y2, x3, x4, pattern, fillColor) {
    if (pattern !== 1 && pattern !== 2) return;
    setPenColorToColor(pattern === 1 ? fillColor : COLOR_FILL_PAD);
    for (let i = 0; i < 9; i++) {
      const t = i / 8;
      goTo(x2 + (x1 - x2) * t, y2 + (y1 - y2) * t);
      setPenSize((360 - pen.y) / 60);
      penDown();
      goTo(x3 + (x4 - x3) * t, pen.y);
      penUp();
    }
    setPenColorToColor(pattern === 2 ? COLOR_LINE_PAD : COLOR_LINE);
    setPenSize((360 - y1) / 54);
    goTo(x1, y1);
    penDown();
    goTo(x2, y2);
    goTo(x3, y2);
    goTo(x4, y1);
    goTo(x1, y1);
    penUp();
  }

  function drawTile(col, row, tile) {
    const deg = 180 / Math.PI;
    const top = Math.atan(v.sense + (row - v.z) * (v.sense / 2)) * deg * v.look - 180;
    const bottom = Math.atan(v.sense / 2 + (row - v.z) * (v.sense / 2)) * deg * v.look - 180;
    const topMid = (col - 3 - v.x * (1 / 100)) * (360 - top) * v.width;
    const bottomMid = (col - 3 - v.x * (1 / 100)) * (360 - bottom) * v.width;
    drawQuad(
      topMid + ((360 - top) * v.width) / -2,
      top + v.sway,
      bottomMid + ((360 - bottom) * v.width) / -2,
      bottom + v.sway,
      bottomMid + ((360 - bottom) * v.width) / 2,
      topMid + ((360 - top) * v.width) / 2,
      tile,
      rainbowColor(col, row)
    );
  }

  function drawTiles() {
    let a = Math.floor(v.z * 5) - 15;
    for (let i = 0; i < 85; i++) {
      a += 1;
      const m = mod(a, 5);
      const col = m + (m === 0 ? 5 : 0);
      const row = Math.ceil(a / 5);
      drawTile(col, row, tileAt(a));
    }
  }

  function updateBallX() {
    if (v.mode === 0) {
      v.x += (mouse.x - v.x) * 0.9;
    } else {
      v.osareta = 0;
      if (keys.right) v.side += 0.333;
      else if (keys.left) v.side += -0.333;
      v.x = v.side * 50 - 150;
    }
  }

  function drawBall() {
    updateBallX();
    goTo(v.x, -100 + v.sway + (192 - 3 * ((v.jump - 8) * (v.jump - 8))));
    setPenShade(22);
    setPenSize(90);
    setPenHue(0);
    penDown();
    penUp();
    for (let i = 0; i < 45; i++) {
      goTo(pen.x + Math.random() * 0.5, pen.y);
      goTo(pen.x, pen.y + Math.random() * 0.5);
      setPenShade(pen.shade + 1);
      setPenSize(pen.size - 2);
      penDown();
      penUp();
    }
  }

  function drawFallBall() {
    goTo(v.x, -100 - v.fall);
    setPenShade(22);
    setPenSize(90 - v.fall);
    setPenHue(0);
    penDown();
    penUp();
  }

  function drawText(text, x, y, size, color) {
    setPenSize(size);
    setPenColorToColor(color);
    const chars = Array.from(text.toLowerCase());
    for (let n = 0; n < chars.length; n++) {
      const idx = CHARS.indexOf(chars[n]);
      if (idx < 0) continue;
      const s = FONT[idx];
      const count = Math.round(s.length / 4);
      for (let k = 1; k <= count; k++) {
        const x1 = Number(s[k * 4 - 4]);
        const y1 = Number(s[k * 4 - 3]);
        const x2 = Number(s[k * 4 - 2]);
        const y2 = Number(s[k * 4 - 1]);
        goTo(x + (x1 - 2) * (size * 2) + n * (size * 6), y + (y1 - 2) * (size * -2));
        penDown();
        goTo(x + (x2 - 2) * (size * 2) + n * (size * 6), y + (y2 - 2) * (size * -2));
        penUp();
      }
    }
  }

  function judge() {
    if (v.jump > 0) v.jump += -1;
    if (!(v.jump > 0)) {
      if (v.x > -125 && !(v.x > 125)) {
        const index = (Math.ceil(v.z) - 2) * 5 + (Math.floor((v.x + 125) / 50) + 1);
        const t = tileAt(index);
        if (t === 0) v.dead = 1;
        if (t === 2) v.jump = 16;
      } else {
        v.dead = 1;
      }
    }
  }

  function timeText() {
    drawText('time ' + (v.frames / 30).toFixed(2), -225, 150, 4, COLOR_GRAY);
  }

  function percentText() {
    drawText(Math.floor((v.z * 100) / 366) + '%', 140, 150, 5, COLOR_GRAY);
    timeText();
  }

  function waitingFrame() {
    penClear();
    drawTiles();
    drawBall();
    v.sway = v.sway * -1;
    drawText('click to start', -200, 1, 5, COLOR_RED);
    if (v.showTime) timeText();
  }

  function chooseMode() {
    if (mouse.down) {
      v.mode = 0;
    } else {
      v.mode = 1;
      v.side = (v.x + 150) / 50;
    }
  }

  const historyPanel = document.getElementById('history');
  const historyList = document.getElementById('history-list');
  const historyBest = document.getElementById('history-best');
  let records = [];

  function renderHistory() {
    historyList.innerHTML = '';
    if (records.length === 0) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.style.listStyle = 'none';
      li.textContent = 'まだ記録がありません';
      historyList.appendChild(li);
      historyBest.textContent = '';
      return;
    }
    const best = Math.max.apply(null, records.map((r) => r.frames || 0));
    records.forEach((r) => {
      const li = document.createElement('li');
      if (r.frames === best) li.className = 'best';
      li.textContent = (r.frames / 30).toFixed(2) + ' 秒　' + r.percent + '%' + (r.won ? ' クリア' : '');
      historyList.appendChild(li);
    });
    historyBest.textContent = '最高: ' + (best / 30).toFixed(2) + ' 秒';
  }

  function addRecord(won) {
    if (!(v.frames > 0)) return;
    records.push({ frames: v.frames, percent: won ? 100 : Math.min(99, Math.floor((v.z * 100) / 366)), won: won });
    if (records.length > 100) records.shift();
    renderHistory();
  }

  function playSound(audio) {
    audio.currentTime = 0;
    const p = audio.play();
    if (p && p.catch) p.catch(() => {});
  }

  function stopAllSounds() {
    bgm.pause();
    bgm.currentTime = 0;
    dead.pause();
    dead.currentTime = 0;
  }

  function initVariables() {
    v.x = -240;
    v.z = 2;
    v.look = 5;
    v.sense = 0.4;
    v.width = 0.2;
    v.speed = 0.25;
    v.sway = 0;
    v.side = 3.666;
    v.osareta = 0;
    v.mode = 0;
    v.dead = 0;
    v.fall = 0;
    v.jump = 0;
    v.frames = 0;
    v.showTime = false;
    pen.down = false;
    pen.x = 0;
    pen.y = 0;
  }

  function* program() {
    v.mode = 0;
    v.z = 2;
    v.dead = 0;
    v.fall = 0;
    v.jump = 0;
    penClear();
    while (mouse.down) {
      waitingFrame();
      yield;
    }
    while (!(mouse.down || keys.space)) {
      waitingFrame();
      yield;
    }
    chooseMode();
    v.frames = 0;
    v.showTime = true;
    playSound(bgm);
    while (!(v.z > 366)) {
      penClear();
      drawTiles();
      judge();
      if (v.dead === 1) {
        addRecord(false);
        stopAllSounds();
        playSound(dead);
        for (let i = 0; i < 30; i++) {
          v.fall += 5;
          penClear();
          drawFallBall();
          drawTiles();
          percentText();
          yield;
        }
        v.fall = 0;
        v.dead = 0;
        v.z = 2;
        while (!(mouse.down || keys.space)) {
          waitingFrame();
          yield;
        }
        chooseMode();
        v.frames = 0;
        playSound(bgm);
      }
      drawBall();
      percentText();
      v.speed = 0.25;
      v.z += v.speed;
      v.frames += 1;
      v.sway = v.sway * -1;
      yield;
    }
    addRecord(true);
    penClear();
    drawText('100%', 140, 150, 5, COLOR_GRAY);
    timeText();
    drawText('you won!', -100, 1, 5, COLOR_ORANGE);
  }

  let gen = null;
  let last = 0;
  let acc = 0;

  function unlockAudio() {
    [bgm, dead].forEach((a) => {
      a.muted = true;
      const p = a.play();
      const done = () => {
        a.pause();
        a.currentTime = 0;
        a.muted = false;
      };
      if (p && p.then) p.then(done, done);
      else done();
    });
  }

  function start() {
    stopAllSounds();
    initVariables();
    overlay.classList.add('hidden');
    gen = program();
    acc = FRAME_MS;
    last = performance.now();
  }

  function stop() {
    gen = null;
    stopAllSounds();
  }

  function loop(now) {
    requestAnimationFrame(loop);
    if (!gen) return;
    acc += Math.min(now - last, 250);
    last = now;
    if (acc >= FRAME_MS) {
      acc -= FRAME_MS;
      if (acc > FRAME_MS * 4) acc = 0;
      const r = gen.next();
      if (r.done) gen = null;
    }
  }

  function updateMouse(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = clamp(((e.clientX - rect.left) / rect.width) * W - W / 2, -W / 2, W / 2);
  }

  canvas.addEventListener('pointerdown', (e) => {
    updateMouse(e);
    mouse.down = true;
  });
  window.addEventListener('pointermove', updateMouse);
  window.addEventListener('pointerup', () => {
    mouse.down = false;
  });
  window.addEventListener('pointercancel', () => {
    mouse.down = false;
  });

  function setKey(e, state) {
    let hit = true;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = state;
    else if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = state;
    else if (e.code === 'Space') keys.space = state;
    else hit = false;
    if (hit && gen) e.preventDefault();
  }

  window.addEventListener('keydown', (e) => setKey(e, true));
  window.addEventListener('keyup', (e) => setKey(e, false));
  window.addEventListener('blur', () => {
    keys.left = false;
    keys.right = false;
    keys.space = false;
    mouse.down = false;
  });

  document.getElementById('flag').addEventListener('click', () => {
    unlockAudio();
    start();
  });
  document.getElementById('stop').addEventListener('click', stop);
  overlay.addEventListener('click', () => {
    unlockAudio();
    start();
  });

  document.getElementById('times').addEventListener('click', () => {
    renderHistory();
    historyPanel.classList.toggle('hidden');
  });
  document.getElementById('history-close').addEventListener('click', () => {
    historyPanel.classList.add('hidden');
  });
  document.getElementById('history-clear').addEventListener('click', () => {
    records = [];
    renderHistory();
  });
  historyPanel.addEventListener('pointerdown', (e) => e.stopPropagation());

  renderHistory();
  initVariables();
  penClear();
  requestAnimationFrame(loop);
})();
