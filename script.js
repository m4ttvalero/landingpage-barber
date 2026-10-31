/* ==========================================================================
   BLACKSTEEL BARBER CLUB — script.js
   Projeto de portfólio · Studio MV
   --------------------------------------------------------------------------
   ► TUDO O QUE É EDITÁVEL ESTÁ NA PRIMEIRA PARTE DESTE ARQUIVO (CONFIGURAÇÃO).
   ► A segunda parte (LÓGICA) só precisa ser mexida para mudar comportamentos.
   ========================================================================== */

"use strict";

/* ==========================================================================
   1. CONFIGURAÇÃO EDITÁVEL
   ========================================================================== */

/* Número do WhatsApp (somente dígitos: país + DDD + número).
   ⚠ NÚMEROINVÁLIDO DE DEMONSTRAÇÃO — substitua pelo número real do cliente.
   Não use DDD nem número que possa existir. */
const WHATSAPP_NUMBER = "5500000000000";

/* Link da assinatura do rodapé ("Site desenvolvido por Studio MV").
   Placeholder até informar o endereço verdadeiro. */
const STUDIO_LINK = "https://example.com/studio-mv";

// ⚠ Placeholders — substitua pelos perfis reais do cliente quando disponíveis.
const SOCIALS = [
  { name: "Instagram", url: "https://example.com/instagram", icon: "instagram" },
  { name: "Facebook", url: "https://example.com/facebook", icon: "facebook" },
  { name: "YouTube", url: "https://example.com/youtube", icon: "youtube" },
];

/* Dados do negócio. O endereço é FICTÍCIO (demonstrativo). */
const BUSINESS = {
  addressLines: [
    "Rua Exemplo Demonstrativo, 000",
    "Bairro Fictício — Cidade Modelo / UF",
    "CEP 00000-000",
  ],
  /* Link do botão "Abrir no mapa". Placeholder — substitua pelo link real do local.
     Ex.: 'https://maps.app.goo.gl/XXXX' ou um link de mapa do cliente. */
  mapsUrl: "https://example.com/mapa-demonstrativo",
  whatsappGreeting: "Olá, BLACKSTEEL! Gostaria de tirar uma dúvida.",
};

/* Horário de funcionamento. Índice = dia da semana (0 = domingo … 6 = sábado).
   Use open/close no formato "HH:MM". Para dia fechado: open: null, close: null. */
const HOURS = [
  { label: "Domingo", open: null, close: null },
  { label: "Segunda-feira", open: "09:00", close: "19:00" },
  { label: "Terça-feira", open: "09:00", close: "19:00" },
  { label: "Quarta-feira", open: "09:00", close: "19:00" },
  { label: "Quinta-feira", open: "09:00", close: "20:00" },
  { label: "Sexta-feira", open: "09:00", close: "20:00" },
  { label: "Sábado", open: "09:00", close: "17:00" },
];

/* Intervalo entre os horários oferecidos no agendamento (minutos). */
const SLOT_STEP_MINUTES = 30;
/* Antecedência mínima para pedidos no mesmo dia (minutos). */
const MIN_NOTICE_MINUTES = 60;

/* ⚠ Para trocar as ilustrações SVG das seções hero, sobre, profissionais e
   galeria por fotos reais do cliente, substitua os blocos <svg> em index.html
   (hero-media, about-media) e os dados GALLERY/PROFESSIONALS abaixo por imagens
   próprias. Mantenha alt/aria-label descritivos e sem rostos reais. */

/* Categorias dos serviços (usadas no filtro). */
const SERVICE_CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "cabelo", label: "Cabelo" },
  { id: "barba", label: "Barba e rosto" },
  { id: "combo", label: "Combo" },
];

/* Serviços. price = valor em reais (FICTÍCIO). duration = minutos. */
const SERVICES = [
  {
    id: "corte-masculino",
    name: "Corte masculino",
    category: "cabelo",
    icon: "scissors",
    duration: 45,
    price: 55,
    description:
      "Corte na tesoura e máquina, finalizado de acordo com o seu estilo e o formato do rosto.",
  },
  {
    id: "corte-degrade",
    name: "Corte degradê",
    category: "cabelo",
    icon: "fade",
    duration: 60,
    price: 65,
    description:
      "Transições suaves e bem definidas, do baixo ao alto, com acabamento marcado.",
  },
  {
    id: "barba",
    name: "Barba",
    category: "barba",
    icon: "beard",
    duration: 40,
    price: 45,
    description:
      "Modelagem, alinhamento e hidratação, com toalha quente e navalha.",
  },
  {
    id: "corte-barba",
    name: "Corte + barba",
    category: "combo",
    icon: "combo",
    duration: 90,
    price: 95,
    description:
      "O combo completo: corte e barba na mesma visita, com atenção total do início ao fim.",
  },
  {
    id: "acabamento",
    name: "Acabamento",
    category: "cabelo",
    icon: "razor",
    duration: 20,
    price: 25,
    description:
      "Contornos, pezinho e nuca na navalha para manter o corte sempre alinhado.",
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha",
    category: "barba",
    icon: "brow",
    duration: 20,
    price: 20,
    description:
      "Limpeza e alinhamento discretos, respeitando o desenho natural.",
  },
];

/* Profissionais (fictícios). initials = monograma do avatar (sem foto real). */
const PROFESSIONALS = [
  {
    id: "marcelo",
    name: "Marcelo Souza",
    initials: "MS",
    role: "Degradês e cortes modernos",
    bio: "Especialista em transições limpas e cortes atuais. Gosta de ouvir antes de começar e de sugerir ajustes que combinem com o seu dia a dia.",
    tags: ["Degradê", "Tesoura", "Estilo moderno"],
  },
  {
    id: "bruno",
    name: "Bruno Pereira",
    initials: "BP",
    role: "Barba e navalha",
    bio: "Foco em barbas bem desenhadas e acabamento na navalha. Atendimento calmo, com atenção ao conforto durante todo o serviço.",
    tags: ["Barba", "Navalha", "Toalha quente"],
  },
  {
    id: "ricardo",
    name: "Ricardo Alves",
    initials: "RA",
    role: "Clássicos e acabamento",
    bio: "Curte o corte clássico bem executado e os detalhes que fazem diferença: contornos, nuca e finalização.",
    tags: ["Clássicos", "Acabamento", "Finalização"],
  },
];

/* Galeria. category: 'cortes' | 'barbas' | 'ambiente'.
   Cada item usa uma ilustração SVG temática (sem fotos de pessoas). */
const GALLERY_CATEGORIES = [
  { id: "all", label: "Tudo" },
  { id: "cortes", label: "Cortes" },
  { id: "barbas", label: "Barbas" },
  { id: "ambiente", label: "Ambiente" },
];
const GALLERY = [
  {
    id: "gal-corte-1",
    category: "cortes",
    illustration: "scissors",
    caption: "Corte masculino — ilustração temática",
    alt: "Ilustração de tesoura de barbearia sobre fundo grafite",
  },
  {
    id: "gal-barba-1",
    category: "barbas",
    illustration: "razor",
    caption: "Barba e navalha — ilustração temática",
    alt: "Ilustração de navalha de barbear sobre fundo grafite",
  },
  {
    id: "gal-ambiente-1",
    category: "ambiente",
    illustration: "chair",
    caption: "Ambiente da barbearia — ilustração temática",
    alt: "Ilustração de cadeira de barbeiro sobre fundo grafite",
  },
  {
    id: "gal-corte-2",
    category: "cortes",
    illustration: "comb",
    caption: "Corte e penteado — ilustração temática",
    alt: "Ilustração de pente de barbearia sobre fundo grafite",
  },
  {
    id: "gal-barba-2",
    category: "barbas",
    illustration: "brush",
    caption: "Barba bem tratada — ilustração temática",
    alt: "Ilustração de pincel de barba sobre fundo grafite",
  },
  {
    id: "gal-ambiente-2",
    category: "ambiente",
    illustration: "mirror",
    caption: "Espelho e estação — ilustração temática",
    alt: "Ilustração de espelho de barbearia sobre fundo grafite",
  },
  {
    id: "gal-barba-3",
    category: "barbas",
    illustration: "scissors",
    caption: "Acabamento de barba — ilustração temática",
    alt: "Ilustração de tesoura sobre fundo grafite",
  },
  {
    id: "gal-ambiente-3",
    category: "ambiente",
    illustration: "chair",
    caption: "Estação de atendimento — ilustração temática",
    alt: "Ilustração de cadeira de barbeiro sobre fundo grafite",
  },
  {
    id: "gal-corte-3",
    category: "cortes",
    illustration: "razor",
    caption: "Corte com navalha — ilustração temática",
    alt: "Ilustração de navalha sobre fundo grafite",
  },
];

/* Diferenciais — descrevem a proposta da casa, sem afirmações comprovadas. */
const PERKS = [
  {
    icon: "chat",
    title: "Atendimento personalizado",
    text: "Conversamos antes de começar para entender o resultado que você procura.",
  },
  {
    icon: "eye",
    title: "Atenção aos detalhes",
    text: "Contornos, simetria e finalização recebem o cuidado que merecem.",
  },
  {
    icon: "chair",
    title: "Ambiente confortável",
    text: "Um espaço pensado para você relaxar enquanto cuidamos do visual.",
  },
  {
    icon: "star",
    title: "Profissionais especializados",
    text: "Cada barbeiro tem uma área de foco, para você escolher quem combina com o que precisa.",
  },
];

/* ==========================================================================
   2. ÍCONES (SVG inline)
   ========================================================================== */

const S =
  'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  scissors: `<svg viewBox="0 0 24 24" ${S}><circle cx="6" cy="6" r="2.6"/><circle cx="6" cy="18" r="2.6"/><path d="M8 7.6 20 17M8 16.4 20 7"/></svg>`,
  fade: `<svg viewBox="0 0 24 24" ${S}><path d="M4 20V10a8 8 0 0 1 16 0v10"/><path d="M4 15h16M4 18h16M8 12h8" opacity=".6"/></svg>`,
  beard: `<svg viewBox="0 0 24 24" ${S}><path d="M5 9c0 6 2 11 7 11s7-5 7-11"/><path d="M5 9c1-4 4-6 7-6s6 2 7 6"/><path d="M9.5 14c1.5 1 3.5 1 5 0"/></svg>`,
  combo: `<svg viewBox="0 0 24 24" ${S}><path d="M4 8c0-3 3-5 6-5M4 8v3M20 8c0-3-3-5-6-5"/><path d="M6 13c0 4 2 8 6 8s6-4 6-8"/><path d="M9 12 18 4M9 4l9 8" opacity=".7"/></svg>`,
  razor: `<svg viewBox="0 0 24 24" ${S}><path d="M3 15 15 5l6 4-12 10z"/><path d="M12 8l5 3.5"/></svg>`,
  brow: `<svg viewBox="0 0 24 24" ${S}><path d="M3 13c3-5 9-6 18-3"/><path d="M6 17c3-2 7-2 12-1" opacity=".6"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" ${S}><path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" ${S}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`,
  chair: `<svg viewBox="0 0 24 24" ${S}><path d="M7 3h10v8H7zM5 11h14v4H5zM12 15v4M8 21h8"/></svg>`,
  star: `<svg viewBox="0 0 24 24" ${S}><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" ${S}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" ${S}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor"/></svg>`,
};

/* ==========================================================================
   3. UTILITÁRIOS
   ========================================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const formatPrice = (value) => brl.format(value);

const pad = (n) => String(n).padStart(2, "0");
const toISODate = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISODate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const timeToMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const minutesToTime = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;

const formatLongDate = (date) =>
  new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

const findService = (id) => SERVICES.find((s) => s.id === id);
const findPro = (id) => PROFESSIONALS.find((p) => p.id === id);

const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/* Se uma imagem falhar, mostra um bloco elegante em vez de "imagem quebrada". */
document.addEventListener(
  "error",
  (e) => {
    const el = e.target;
    if (!(el instanceof HTMLImageElement) || el.dataset.failed) return;
    el.dataset.failed = "true";
    el.removeAttribute("srcset");
    el.alt = el.alt || "";
    el.classList.add("img-failed");
    el.parentElement && el.parentElement.classList.add("has-failed-img");
  },
  true,
);

/* ==========================================================================
   4. RENDERIZAÇÃO DOS CONTEÚDOS
   ========================================================================== */

function renderFilters(container, categories, onChange) {
  container.innerHTML = categories
    .map(
      (c, i) =>
        `<button type="button" class="chip" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`,
    )
    .join("");
  container.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    $$("[data-filter]", container).forEach((b) =>
      b.setAttribute("aria-pressed", String(b === btn)),
    );
    onChange(btn.dataset.filter);
  });
}

/* ---- Serviços ---- */
function renderServices(filter = "all") {
  const grid = $("#service-grid");
  const list = SERVICES.filter(
    (s) => filter === "all" || s.category === filter,
  );
  grid.innerHTML = list
    .map(
      (s) => `
    <article class="service-card" data-id="${s.id}">
      <div class="service-icon" aria-hidden="true">${ICONS[s.icon] || ICONS.scissors}</div>
      <h3>${s.name}</h3>
      <p>${s.description}</p>
      <dl class="service-meta">
        <div><dt>Duração</dt><dd>~${s.duration} min</dd></div>
        <div><dt>Valor*</dt><dd class="price">${formatPrice(s.price)}</dd></div>
      </dl>
      <button type="button" class="btn btn-outline btn-block" data-book-service="${s.id}">Agendar ${s.name.toLowerCase()}</button>
    </article>`,
    )
    .join("");
}

/* ---- Profissionais ---- */
function renderTeam() {
  $("#team-grid").innerHTML = PROFESSIONALS.map(
    (p) => `
    <article class="pro-card reveal">
      <div class="pro-photo">
        <div class="pro-avatar" aria-label="Avatar de ${p.name}">
          <span class="pro-initials">${p.initials}</span>
        </div>
      </div>
      <div class="pro-body">
        <p class="pro-role">${p.role}</p>
        <h3>${p.name}</h3>
        <p>${p.bio}</p>
        <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
        <button type="button" class="btn btn-outline btn-block" data-book-pro="${p.id}">Agendar com ${p.name.split(" ")[0]}</button>
      </div>
    </article>`,
  ).join("");
}

/* ---- Galeria ---- */
let galleryVisible = [];
/* SVG de ilustração por tipo de item da galeria (sem fotos de pessoas). */
function gallerySVG(type) {
  const base =
    '<svg viewBox="0 0 640 800" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block;background:#17181b;">' +
    '<rect width="640" height="800" fill="#17181b" />' +
    '<circle cx="320" cy="400" r="260" fill="#b8975a" fill-opacity="0.12" />' +
    '<g stroke="#b8975a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.85">';
  const parts = {
    scissors:
      '<path d="M320 200l-60-60M320 200l-40-80M260 140l-15 15M280 120l-15 15"/><circle cx="260" cy="140" r="5" />',
    razor:
      '<path d="M320 180l45-10M320 180l10-60M365 170l-10 60"/><path d="M355 110l-8 30" opacity="0.6" />',
    chair:
      '<path d="M280 260h80v140h-80zM280 260l-25 50M360 260l25 50M280 400h80"/><circle cx="320" cy="440" r="16" stroke-width="3" />',
    comb:
      '<path d="M320 180l-10-50M-10-50l-8 50" transform="translate(320,180)"/><path d="M320 180l-8 0M314 164l-8 0M314 148l-8 0M314 132l-8 0" opacity="0.7" />',
    brush:
      '<path d="M320 200l0-50M320 200l-15 15M320 200l15 15"/><path d="M305 215l-20 5M335 215l20 5" stroke-width="6" stroke-linecap="round" opacity="0.5" />',
    mirror:
      '<rect x="280" y="160" width="80" height="120" rx="8" fill="none" stroke="#b8975a" stroke-width="4"/><path d="M320 280l0-120M280 160l80 0M280 280l80 0" opacity="0.6" />',
  };
  return base + (parts[type] || parts.scissors) + '</g></svg>';
}

function renderGallery(filter = "all") {
  const grid = $("#gallery-grid");
  galleryVisible = GALLERY.filter(
    (g) => filter === "all" || g.category === filter,
  );
  grid.innerHTML = galleryVisible
    .map(
      (g, i) => `
    <figure class="gallery-item">
      <button type="button" data-lb-index="${i}" aria-label="Ampliar ilustração: ${g.alt}">
        <div class="gallery-media" style="background:#17181b;">${gallerySVG(g.illustration)}</div>
        <span class="gallery-zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.2-4.2M11 8.5v5M8.5 11h5"/></svg>
        </span>
      </button>
      <figcaption class="gallery-caption">${g.caption}</figcaption>
    </figure>`,
    )
    .join("");
}

/* ---- Diferenciais ---- */
function renderPerks() {
  $("#perks-grid").innerHTML = PERKS.map(
    (p) => `
    <article class="perk reveal">
      <div class="perk-icon" aria-hidden="true">${ICONS[p.icon]}</div>
      <h3>${p.title}</h3>
      <p>${p.text}</p>
    </article>`,
  ).join("");
}

/* ---- Contato, horários e rodapé ---- */
function renderContact() {
  $("#address-block").innerHTML = BUSINESS.addressLines
    .map((l) => `<span>${l}</span>`)
    .join("");
  $("#btn-maps").href = BUSINESS.mapsUrl;
  $("#btn-whats").href = whatsappLink(BUSINESS.whatsappGreeting);

  const today = new Date().getDay();
  $("#hours-table tbody").innerHTML = HOURS.map(
    (h, i) => `
    <tr class="${i === today ? "is-today" : ""}"${i === today ? ' aria-current="date"' : ""}>
      <th scope="row">${h.label}${i === today ? ' <span class="today-pill">hoje</span>' : ""}</th>
      <td>${h.open ? `${h.open} – ${h.close}` : '<span class="closed">Fechado</span>'}</td>
    </tr>`,
  ).join("");

  updateOpenStatus();
}

function updateOpenStatus() {
  const el = $("#open-status");
  const now = new Date();
  const h = HOURS[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();
  const open =
    h.open && mins >= timeToMinutes(h.open) && mins < timeToMinutes(h.close);
  el.textContent = open
    ? `Aberto agora · fecha às ${h.close}`
    : "Fechado no momento";
  el.classList.toggle("is-open", Boolean(open));
}

function renderFooter() {
  $("#year").textContent = new Date().getFullYear();
  $("#studio-link").href = STUDIO_LINK;

  $("#footer-services").innerHTML = SERVICES.map(
    (s) =>
      `<li><a href="#servicos" data-book-service="${s.id}">${s.name}</a></li>`,
  ).join("");

  /* Agrupa dias consecutivos com o mesmo horário (Seg–Qua, etc.). */
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups = [];
  order.forEach((d) => {
    const h = HOURS[d];
    const key = h.open ? `${h.open}–${h.close}` : "Fechado";
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.days.push(h.label.slice(0, 3));
    else groups.push({ key, days: [h.label.slice(0, 3)] });
  });
  $("#footer-hours").innerHTML = groups
    .map((g) => {
      const range =
        g.days.length > 1
          ? `${g.days[0]} a ${g.days[g.days.length - 1]}`
          : g.days[0];
      return `<li><span>${range}</span><span>${g.key}</span></li>`;
    })
    .join("");

  $("#socials").innerHTML = SOCIALS.map(
    (s) => `
    <li><a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name} (abre em nova aba)">${ICONS[s.icon] || ""}</a></li>`,
  ).join("");
}

/* ==========================================================================
   5. AGENDAMENTO
   ========================================================================== */

const form = $("#booking-form");
const fields = {
  name: $("#bk-name"),
  service: $("#bk-service"),
  pro: $("#bk-pro"),
  date: $("#bk-date"),
  notes: $("#bk-notes"),
};
const slotsBox = $("#slots");
let selectedTime = "";

function setupBookingForm() {
  fields.service.innerHTML =
    '<option value="">Selecione um serviço</option>' +
    SERVICES.map(
      (s) =>
        `<option value="${s.id}">${s.name} — ${formatPrice(s.price)} · ~${s.duration} min</option>`,
    ).join("");

  fields.pro.innerHTML =
    '<option value="">Selecione um profissional</option>' +
    '<option value="any">Sem preferência</option>' +
    PROFESSIONALS.map(
      (p) => `<option value="${p.id}">${p.name} — ${p.role}</option>`,
    ).join("");

  const today = new Date();
  fields.date.min = toISODate(today);
  const max = new Date(today);
  max.setDate(max.getDate() + 60);
  fields.date.max = toISODate(max);

  ["change", "input"].forEach((evt) =>
    form.addEventListener(evt, (e) => {
      if (e.target === fields.service || e.target === fields.date) {
        selectedTime = "";
        renderSlots();
      }
      clearError(e.target.name || e.target.id);
      updateSummary();
    }),
  );

  slotsBox.addEventListener("change", (e) => {
    if (e.target.name === "time") {
      selectedTime = e.target.value;
      clearError("time");
      updateSummary();
    }
  });

  form.addEventListener("submit", onSubmit);
  renderSlots();
  updateSummary();
}

function renderSlots() {
  const iso = fields.date.value;
  const hint = $("#date-hint");
  hint.textContent = "";
  hint.classList.remove("is-warn");

  if (!iso) {
    slotsBox.innerHTML =
      '<p class="slots-empty">Escolha uma data para ver os horários.</p>';
    return;
  }

  const date = parseISODate(iso);
  const day = HOURS[date.getDay()];
  if (!day.open) {
    hint.textContent = `Fechamos ${day.label.toLowerCase().includes("feira") ? "na" : "no"} ${day.label.toLowerCase()}. Escolha outra data.`;
    hint.classList.add("is-warn");
    slotsBox.innerHTML = '<p class="slots-empty">Sem horários neste dia.</p>';
    return;
  }

  hint.textContent = `${day.label}: ${day.open} às ${day.close}`;

  const service = findService(fields.service.value);
  const duration = service ? service.duration : SLOT_STEP_MINUTES;
  const open = timeToMinutes(day.open);
  const close = timeToMinutes(day.close);

  const now = new Date();
  const isToday = iso === toISODate(now);
  const earliest = isToday
    ? now.getHours() * 60 + now.getMinutes() + MIN_NOTICE_MINUTES
    : 0;

  const slots = [];
  for (let t = open; t + duration <= close; t += SLOT_STEP_MINUTES) {
    if (t >= earliest) slots.push(t);
  }

  if (!slots.length) {
    slotsBox.innerHTML =
      '<p class="slots-empty">Não há mais horários para este dia. Escolha outra data.</p>';
    return;
  }

  slotsBox.innerHTML = slots
    .map((t) => {
      const v = minutesToTime(t);
      return `<label class="slot"><input type="radio" name="time" value="${v}"><span>${v}</span></label>`;
    })
    .join("");
}

function currentSelection() {
  const service = findService(fields.service.value);
  const proId = fields.pro.value;
  const pro = proId === "any" ? { name: "Sem preferência" } : findPro(proId);
  const date = fields.date.value ? parseISODate(fields.date.value) : null;
  return {
    service,
    pro,
    date,
    time: selectedTime,
    name: fields.name.value.trim(),
    notes: fields.notes.value.trim(),
  };
}

function updateSummary() {
  const { service, pro, date, time } = currentSelection();
  const rows = [
    [
      "Serviço",
      service ? `${service.name} · ${formatPrice(service.price)}` : "—",
    ],
    ["Profissional", pro ? pro.name : "—"],
    ["Data", date ? formatLongDate(date) : "—"],
    ["Horário", time || "—"],
  ];
  $("#summary").innerHTML = `
    <h3>Resumo do pedido</h3>
    <dl>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
}

/* Erros de validação */
function showError(key, message) {
  const el = $(`#err-${key}`);
  if (el) el.textContent = message;
  const input = key === "time" ? null : fields[key];
  if (input) input.setAttribute("aria-invalid", "true");
}
function clearError(key) {
  const el = $(`#err-${key}`);
  if (el) el.textContent = "";
  const input = fields[key];
  if (input) input.removeAttribute("aria-invalid");
}

function validate() {
  const { service, pro, date, time, name } = currentSelection();
  let firstInvalid = null;
  const fail = (key, msg, focusEl) => {
    showError(key, msg);
    firstInvalid = firstInvalid || focusEl;
  };

  ["name", "service", "pro", "date", "time"].forEach(clearError);

  if (name.length < 2)
    fail("name", "Informe seu nome (mínimo 2 letras).", fields.name);
  if (!service) fail("service", "Selecione um serviço.", fields.service);
  if (!pro)
    fail("pro", 'Selecione um profissional ou "Sem preferência".', fields.pro);

  if (!fields.date.value) {
    fail("date", "Escolha uma data.", fields.date);
  } else {
    const todayStart = parseISODate(toISODate(new Date()));
    if (date < todayStart)
      fail("date", "Escolha uma data a partir de hoje.", fields.date);
    else if (!HOURS[date.getDay()].open)
      fail(
        "date",
        "A barbearia fecha neste dia. Escolha outra data.",
        fields.date,
      );
  }

  if (!time)
    fail(
      "time",
      "Selecione um horário de preferência.",
      $('input[name="time"]') || fields.date,
    );

  return firstInvalid;
}

function buildMessage() {
  const { service, pro, date, time, name, notes } = currentSelection();
  const lines = [
    "Olá, BLACKSTEEL Barber Club! Gostaria de *solicitar* um agendamento:",
    "",
    `• Nome: ${name}`,
    `• Serviço: ${service.name} (~${service.duration} min · ${formatPrice(service.price)})`,
    `• Profissional: ${pro.name}`,
    `• Data: ${formatLongDate(date)}`,
    `• Horário desejado: ${time}`,
  ];
  if (notes) lines.push(`• Observações: ${notes}`);
  lines.push(
    "",
    "⚠ Este é apenas um *pedido* feito pelo site: o horário ainda NÃO está confirmado.",
    "Aguardo o retorno de vocês para confirmar a disponibilidade. Obrigado!",
  );
  return lines.join("\n");
}

function onSubmit(e) {
  e.preventDefault();
  const firstInvalid = validate();
  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  const url = whatsappLink(buildMessage());
  const win = window.open(url, "_blank", "noopener");
  const foot = $("#form-foot");
  foot.innerHTML = `Abrimos o WhatsApp com a sua mensagem. Seu horário só estará reservado após a confirmação da barbearia.
    Se nada abriu, <a href="${url}" target="_blank" rel="noopener noreferrer">clique aqui para abrir o WhatsApp</a>.`;
  foot.classList.add("is-sent");
  if (!win) {
    /* pop-up bloqueado: o link acima serve de alternativa */
  }
}

/* Atalhos "Agendar" nos cartões */
function bookService(id) {
  if (id && findService(id)) fields.service.value = id;
  selectedTime = "";
  renderSlots();
  updateSummary();
  goToBooking(
    fields.pro.value ? (fields.date.value ? null : fields.date) : fields.pro,
  );
}
function bookPro(id) {
  if (id && findPro(id)) fields.pro.value = id;
  updateSummary();
  goToBooking(
    fields.service.value
      ? fields.date.value
        ? null
        : fields.date
      : fields.service,
  );
}
function goToBooking(focusEl) {
  $("#agendar").scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  const target = fields.name.value.trim() ? focusEl : fields.name;
  if (target)
    setTimeout(
      () => target.focus({ preventScroll: true }),
      prefersReducedMotion() ? 0 : 500,
    );
}

document.addEventListener("click", (e) => {
  const s = e.target.closest("[data-book-service]");
  if (s) {
    e.preventDefault();
    bookService(s.dataset.bookService);
    closeMenu();
    return;
  }
  const p = e.target.closest("[data-book-pro]");
  if (p) {
    e.preventDefault();
    bookPro(p.dataset.bookPro);
  }
});

/* ==========================================================================
   6. LIGHTBOX (galeria ampliada)
   ========================================================================== */

const lb = {
  root: $("#lightbox"),
  img: $("#lb-img"),
  caption: $("#lb-caption"),
  count: $("#lb-count"),
  index: 0,
  opener: null,
};

function lbShow(index) {
  const n = galleryVisible.length;
  lb.index = (index + n) % n;
  const item = galleryVisible[lb.index];
  lb.root.classList.remove("is-loading");
  lb.img.innerHTML = gallerySVG(item.illustration);
  lb.img.setAttribute("aria-label", item.alt);
  lb.caption.textContent = item.caption;
  lb.count.textContent = `${lb.index + 1} / ${n}`;
}

function lbOpen(index, opener) {
  lb.opener = opener || document.activeElement;
  lb.root.hidden = false;
  document.body.classList.add("no-scroll");
  lbShow(index);
  requestAnimationFrame(() => lb.root.classList.add("is-open"));
  $(".lb-close", lb.root).focus();
}

function lbClose() {
  lb.root.classList.remove("is-open");
  const done = () => {
    lb.root.hidden = true;
    document.body.classList.remove("no-scroll");
    lb.img.innerHTML = "";
    lb.img.removeAttribute("aria-label");
    if (lb.opener && document.contains(lb.opener)) lb.opener.focus();
  };
  prefersReducedMotion() ? done() : setTimeout(done, 220);
}

function setupLightbox() {
  $("#gallery-grid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lb-index]");
    if (btn) lbOpen(Number(btn.dataset.lbIndex), btn);
  });

  $(".lb-close", lb.root).addEventListener("click", lbClose);
  $(".lb-prev", lb.root).addEventListener("click", () => lbShow(lb.index - 1));
  $(".lb-next", lb.root).addEventListener("click", () => lbShow(lb.index + 1));

  lb.root.addEventListener("click", (e) => {
    if (e.target === lb.root || e.target.classList.contains("lb-figure"))
      lbClose();
  });

  document.addEventListener("keydown", (e) => {
    if (lb.root.hidden) return;
    if (e.key === "Escape") lbClose();
    else if (e.key === "ArrowLeft") lbShow(lb.index - 1);
    else if (e.key === "ArrowRight") lbShow(lb.index + 1);
    else if (e.key === "Tab") {
      /* Mantém o foco dentro do diálogo */
      const f = $$("button", lb.root);
      const first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* Gesto de deslizar no celular */
  let startX = 0;
  lb.root.addEventListener(
    "touchstart",
    (e) => {
      startX = e.changedTouches[0].clientX;
    },
    { passive: true },
  );
  lb.root.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) lbShow(lb.index + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );
}

/* ==========================================================================
   7. CABEÇALHO, MENU MOBILE, NAVEGAÇÃO E ANIMAÇÕES
   ========================================================================== */

const header = $(".site-header");
const menuToggle = $(".menu-toggle");
const menu = $("#menu");

function openMenu() {
  menu.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Fechar menu");
  document.body.classList.add("no-scroll");
}
function closeMenu() {
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("no-scroll");
}

function setupHeader() {
  menuToggle.addEventListener("click", () => {
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
  });
  menu.addEventListener("click", () => {
    // Fecha o menu ao clicar em um link ou ao tocar no fundo/overlay (mobile e tablets)
    closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });
  window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });

  const onScroll = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Destaca o link da seção visível */
  const links = $$("[data-nav]");
  const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const sections = Array.from(map.keys())
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((a) => a.removeAttribute("aria-current"));
          const a = map.get(en.target.id);
          if (a) a.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => io.observe(s));
}

function setupReveal() {
  const targets = $$(".reveal");
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  targets.forEach((t, i) => {
    t.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(t);
  });
}

/* ==========================================================================
   8. INICIALIZAÇÃO
   ========================================================================== */

function init() {
  renderFilters($("#service-filters"), SERVICE_CATEGORIES, renderServices);
  renderServices();
  renderTeam();
  renderFilters($("#gallery-filters"), GALLERY_CATEGORIES, renderGallery);
  renderGallery();
  renderPerks();
  renderContact();
  renderFooter();

  setupBookingForm();
  setupLightbox();
  setupHeader();
  setupReveal();

  setInterval(updateOpenStatus, 60 * 1000);
}

init();
