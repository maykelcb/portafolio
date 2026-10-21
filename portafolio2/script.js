/* ═══════════════════════════════════════════════
   PORTAFOLIO 2: KINETIC EDITORIAL SCRIPT
   Interactive Data Engine & Audio Feedback
   ═══════════════════════════════════════════════ */

// ─── 1. Audio Synthesizer (Web Audio API) ─────
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playBlip(freq = 840, duration = 0.03, type = 'sine') {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  playClick() {
    this.playBlip(980, 0.04, 'triangle');
  }

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    this.playBlip(587, 0.08, 'sine');
    setTimeout(() => this.playBlip(880, 0.12, 'sine'), 60);
  }
}

const sfx = new SoundFX();

// ─── 2. DOM Ready Initializations ───────────────
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initAudioToggle();
  initRoleRotator();
  initBackgroundCanvas();
  initCodeSandbox();
  initSparklineMonitor();
  initCopyActions();
  initTransmissionForm();
  initNavDeck();
});

// ─── 3. Live UTC Telemetry Clock ───────────────
function initClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const hrs = String(now.getUTCHours()).padStart(2, '0');
    const mins = String(now.getUTCMinutes()).padStart(2, '0');
    const secs = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `UTC ${hrs}:${mins}:${secs}`;
  }
  update();
  setInterval(update, 1000);
}

// ─── 4. Audio Feedback Toggle ──────────────────
function initAudioToggle() {
  const toggleBtn = document.getElementById('audioToggle');
  const icon = document.getElementById('audioIcon');
  const label = toggleBtn ? toggleBtn.querySelector('.audio-label') : null;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sfx.init();
      sfx.enabled = !sfx.enabled;

      if (sfx.enabled) {
        toggleBtn.classList.add('active');
        if (icon) icon.className = 'fas fa-volume-high';
        if (label) label.textContent = 'FX: ON';
        sfx.playSuccess();
        showHudToast('Audio feedback activado');
      } else {
        toggleBtn.classList.remove('active');
        if (icon) icon.className = 'fas fa-volume-xmark';
        if (label) label.textContent = 'FX: OFF';
        showHudToast('Audio feedback silenciado');
      }
    });
  }

  // Bind subtle sounds to interactive buttons
  document.querySelectorAll('button, .primary-action-btn, .secondary-action-btn, .case-btn-main').forEach(el => {
    el.addEventListener('mouseenter', () => sfx.playBlip(720, 0.02));
    el.addEventListener('click', () => sfx.playClick());
  });
}

// ─── 5. Role Matrix Text Rotator ────────────────
function initRoleRotator() {
  const rotatorEl = document.getElementById('roleRotator');
  if (!rotatorEl) return;

  const roles = [
    'DATA ANALYST',
    'SYSTEMS ENGINEER',
    'BI DEVELOPER',
    'SQL SPECIALIST',
    'ANALYTICS BUILDER'
  ];
  let index = 0;

  setInterval(() => {
    rotatorEl.style.opacity = '0';
    rotatorEl.style.transform = 'translateY(-4px)';

    setTimeout(() => {
      index = (index + 1) % roles.length;
      rotatorEl.textContent = roles[index];
      rotatorEl.style.opacity = '1';
      rotatorEl.style.transform = 'translateY(0)';
      sfx.playBlip(1100, 0.015);
    }, 200);
  }, 3400);

  rotatorEl.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
}

// ─── 6. Background Data Grid Canvas ────────────
function initBackgroundCanvas() {
  const canvas = document.getElementById('gridCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodes = [];
  const count = Math.floor((width * height) / 28000);

  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: 1 + Math.random() * 1.5
    });
  }

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connected constellation lines
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.x += a.vx;
      a.y += a.vy;

      if (a.x < 0 || a.x > width) a.vx *= -1;
      if (a.y < 0 || a.y > height) a.vy *= -1;

      // Link to nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0, 245, 160, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Link to cursor
      const cdx = a.x - mouse.x;
      const cdy = a.y - mouse.y;
      const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
      if (cdist < 140) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(0, 216, 246, ${0.25 * (1 - cdist / 140)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Node point
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(240, 244, 248, 0.4)';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }
  draw();
}

// ─── 7. Interactive Code Sandbox REPL ──────────
const codeSnippets = {
  sql: {
    meta: 'QUERY RUNNER // BUFFER 0x48F',
    status: 'STATUS: 200 OK',
    log: 'EXECUTION TIME: 4.2ms | ROWS: 14,280 PROCESSED',
    code: `<span class="c-comment">-- Consulta de rendimiento analítico</span>
<span class="c-keyword">SELECT</span> 
    kpi.NombreIndicador,
    <span class="c-func">SUM</span>(met.ValorReal) <span class="c-keyword">AS</span> MetricaTotal,
    <span class="c-func">ROUND</span>(<span class="c-func">AVG</span>(met.Eficiencia), <span class="c-number">2</span>) <span class="c-keyword">AS</span> RatioCumplimiento
<span class="c-keyword">FROM</span> Fact_Operaciones met
<span class="c-keyword">INNER JOIN</span> Dim_Indicadores kpi <span class="c-keyword">ON</span> met.IndicadorID = kpi.ID
<span class="c-keyword">WHERE</span> met.Fecha >= <span class="c-string">'2026-01-01'</span>
<span class="c-keyword">GROUP BY</span> kpi.NombreIndicador
<span class="c-keyword">ORDER BY</span> MetricaTotal <span class="c-keyword">DESC</span>;`
  },
  powerbi: {
    meta: 'DAX ENGINE // EVALUATION CONTEXT',
    status: 'DAX COMPILER: OK',
    log: 'CALCULATED MEASURE RENDERED // ENGINE: VERTIPAQ',
    code: `<span class="c-comment">// Métrica DAX para Variación YTD con Time Intelligence</span>
Ventas_YTD = 
<span class="c-keyword">VAR</span> FechaMax = <span class="c-func">MAX</span>(Dim_Calendario[Fecha])
<span class="c-keyword">RETURN</span>
    <span class="c-func">CALCULATE</span>(
        <span class="c-func">SUM</span>(Fact_Ventas[MontoTotal]),
        <span class="c-func">DATESYTD</span>(Dim_Calendario[Fecha]),
        Dim_Calendario[Fecha] <= FechaMax
    )`
  },
  python: {
    meta: 'PYTHON 3.11 // PANDAS PIPELINE',
    status: 'KERNEL: IDLE',
    log: 'DATAFRAME SHAPE: (52400, 18) | ANOMALIES: 0',
    code: `<span class="c-comment"># Pipeline de limpieza y detección de anomalías</span>
<span class="c-keyword">import</span> pandas <span class="c-keyword">as</span> pd
<span class="c-keyword">import</span> numpy <span class="c-keyword">as</span> np

df = pd.<span class="c-func">read_parquet</span>(<span class="c-string">'telemetry_stream.parquet'</span>)
df[<span class="c-string">'kpi_ratio'</span>] = df[<span class="c-string">'revenue'</span>] / df[<span class="c-string">'operational_cost'</span>]

<span class="c-comment"># Segmentación por percentil estadístico</span>
resumen = df.<span class="c-func">groupby</span>(<span class="c-string">'region'</span>).<span class="c-func">agg</span>({
    <span class="c-string">'kpi_ratio'</span>: [<span class="c-string">'mean'</span>, <span class="c-string">'std'</span>],
    <span class="c-string">'revenue'</span>: <span class="c-string">'sum'</span>
})`
  },
  excel: {
    meta: 'POWER QUERY // M-CODE SCRIPT',
    status: 'M-PARSER: SUCCESS',
    log: 'EXTRACT & TRANSFORM // 8 SOURCES MERGED',
    code: `<span class="c-comment">// Transformación automatizada Power Query M</span>
<span class="c-keyword">let</span>
    Origen = Excel.CurrentWorkbook(){[Name=<span class="c-string">"RawData"</span>]}[Content],
    TiposCambiados = Table.TransformColumnTypes(Origen, {{<span class="c-string">"Fecha"</span>, <span class="c-keyword">type</span> date}, {<span class="c-string">"Monto"</span>, <span class="c-keyword">type</span> number}}),
    Filtrado = Table.SelectRows(TiposCambiados, <span class="c-keyword">each</span> [Monto] > <span class="c-number">0</span>)
<span class="c-keyword">in</span>
    Filtrado`
  },
  csharp: {
    meta: '.NET 8 // REPOSITORY PATTERN',
    status: 'BUILD SUCCEEDED // 0 WARNINGS',
    log: 'THREAD POOL: OPTIMIZED | ASYNC TASK COMPLETED',
    code: `<span class="c-comment">// Implementación del repositorio transaccional</span>
<span class="c-keyword">public async</span> Task<IEnumerable<ReporteDTO>> <span class="c-func">GetIndicadoresAsync</span>(DateTime corte)
{
    <span class="c-keyword">return await</span> _dbContext.Operaciones
        .<span class="c-func">Where</span>(o => o.Activo && o.FechaRegistro >= corte)
        .<span class="c-func">Select</span>(o => <span class="c-keyword">new</span> ReporteDTO {
            Id = o.Id,
            Total = o.RacionesDistribuidas,
            Comedor = o.Comedor.Nombre
        })
        .<span class="c-func">ToListAsync</span>();
}`
  },
  javascript: {
    meta: 'JS V8 // ASYNC STREAM PROCESSOR',
    status: 'PROMISE RESOLVED',
    log: 'PAYLOAD RECEIVED // 180ms LATENCY',
    code: `<span class="c-comment">// Consumo asíncrono y transformación de métricas</span>
<span class="c-keyword">async function</span> <span class="c-func">fetchTelemetry</span>(endpoint) {
  <span class="c-keyword">const</span> res = <span class="c-keyword">await</span> <span class="c-func">fetch</span>(endpoint);
  <span class="c-keyword">const</span> data = <span class="c-keyword">await</span> res.<span class="c-func">json</span>();
  <span class="c-keyword">return</span> data.map(kpi => ({
    label: kpi.name,
    score: (kpi.actual / kpi.target) * <span class="c-number">100</span>
  }));
}`
  },
  git: {
    meta: 'GIT CLI // BRANCH WORKFLOW',
    status: 'WORKING TREE CLEAN',
    log: 'ORIGIN/MAIN SYNCHRONIZED // PUSH VERIFIED',
    code: `<span class="c-comment"># Flujo de trabajo convencional & auditoría</span>
$ git checkout -b feat/data-pipeline-integration
$ git add src/analytics/models/*.sql
$ git commit -m <span class="c-string">"feat(analytics): implementar métricas DAX y modelo relacional"</span>
$ git push origin feat/data-pipeline-integration`
  },
  scrum: {
    meta: 'SCRUM AGILE // SPRINT VELOCITY',
    status: 'SPRINT 14: ON TRACK',
    log: 'BURNDOWN VELOCITY: 92% | SPRINT GOAL: ACHIEVED',
    code: `<span class="c-comment">// Métricas de Sprint & Gestión Ágil</span>
Sprint_Health = {
    SprintNumber: <span class="c-number">14</span>,
    StoryPointsCommitted: <span class="c-number">48</span>,
    StoryPointsDelivered: <span class="c-number">46</span>,
    VelocityRatio: <span class="c-string">"95.8%"</span>,
    RetrospectiveActionItems: [<span class="c-string">"Continuous Code Review"</span>, <span class="c-string">"Automated ETL"</span>]
};`
  }
};

function initCodeSandbox() {
  const keys = document.querySelectorAll('.skill-key');
  const codeSnippet = document.getElementById('codeSnippet');
  const queryStatus = document.getElementById('queryStatus');
  const terminalLog = document.getElementById('terminalLog');
  const screenMeta = document.querySelector('.meta-label');

  keys.forEach(btn => {
    btn.addEventListener('click', () => {
      keys.forEach(k => k.classList.remove('active'));
      btn.classList.add('active');

      const skillKey = btn.getAttribute('data-skill');
      const data = codeSnippets[skillKey];

      if (data && codeSnippet) {
        sfx.playClick();

        codeSnippet.style.opacity = '0';
        setTimeout(() => {
          codeSnippet.innerHTML = `<code>${data.code}</code>`;
          if (queryStatus) queryStatus.textContent = data.status;
          if (terminalLog) terminalLog.textContent = data.log;
          if (screenMeta) screenMeta.textContent = data.meta;
          codeSnippet.style.opacity = '1';
        }, 120);
      }
    });
  });
}

// ─── 8. Sparkline Monitor Fluctuation ──────────
function initSparklineMonitor() {
  const sparklineVal = document.getElementById('sparklineVal');
  if (!sparklineVal) return;

  setInterval(() => {
    const randomVal = (97.8 + Math.random() * 1.8).toFixed(1);
    sparklineVal.textContent = `${randomVal}%`;
  }, 2800);
}

// ─── 9. HUD Toast & Copy Actions ───────────────
function showHudToast(message) {
  const toast = document.getElementById('hudToast');
  const toastMsg = document.getElementById('hudToastMsg');
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 2800);
}

function initCopyActions() {
  const emailStr = 'Maykelcb095@gmail.com';

  const heroBtn = document.getElementById('heroCopyEmail');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailStr).then(() => {
        sfx.playSuccess();
        showHudToast('Email Maykelcb095@gmail.com copiado al portapapeles');
      });
    });
  }

  const dispatchBtn = document.getElementById('btnCopyDispatchEmail');
  if (dispatchBtn) {
    dispatchBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailStr).then(() => {
        sfx.playSuccess();
        showHudToast('Email copiado al portapapeles');
      });
    });
  }
}

// ─── 10. Transmission Form ─────────────────────
function initTransmissionForm() {
  const form = document.getElementById('transmissionForm');
  const btn = document.getElementById('btnTransmit');

  if (form && btn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sfx.playSuccess();

      const origHtml = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span>TRANSMITIENDO PAQUETE...</span> <i class="fas fa-spinner fa-spin"></i>';

      setTimeout(() => {
        btn.innerHTML = '<span>TRANSMISIÓN COMPLETADA (200 OK)</span> <i class="fas fa-check"></i>';
        btn.style.background = '#10b981';
        showHudToast('Transmisión exitosa. Respuesta en camino.');
        form.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = origHtml;
          btn.style.background = '';
        }, 3600);
      }, 1400);
    });
  }
}

// ─── 11. Nav Deck Active Highlighting ──────────
function initNavDeck() {
  const sections = document.querySelectorAll('.screen-block');
  const links = document.querySelectorAll('.deck-link');
  const toggle = document.getElementById('deckMenuToggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      sfx.playClick();
    });
  }

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-nav') === current) {
        link.classList.add('active');
      }
    });
  });
}
