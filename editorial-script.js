const archive = [
  {
    id: 1,
    title: 'ARCHITECTURAL DRAPERY & RAW TEXTURES',
    look: 'STRUCTURED TRENCH IN CHARCOAL WOOL',
    narrative: 'A study in restrained proportion, tactile wools, and sculptural silhouettes. Crafted in limited quantities between Tokyo and Milan.',
    edition: '24 / 100',
    material: 'Merino / Silk',
    labels: ['Wool', 'Structured', 'Tailored'],
    swatch: 'linear-gradient(135deg, #20242d 0%, #8a7a6d 100%)',
    hero: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    detail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80',
    alt: 'Model wearing a structured trench in charcoal wool'
  },
  {
    id: 2,
    title: 'ARCHITECTURAL DRAPERY & RAW TEXTURES',
    look: 'ASYMMETRICAL DRAPED SILK COLUMN',
    narrative: 'Sculpted movement with a softened edge—liquid tailoring, quiet volume, and a silk finish that catches the light in deliberate folds.',
    edition: '09 / 100',
    material: 'Silk / Satin',
    labels: ['Silk', 'Fluid', 'Column'],
    swatch: 'linear-gradient(135deg, #d8cbb2 0%, #8e7c69 100%)',
    hero: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    detail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    alt: 'Woman in motion wearing a draped asymmetrical silk column silhouette'
  },
  {
    id: 3,
    title: 'ARCHITECTURAL DRAPERY & RAW TEXTURES',
    look: 'SCULPTED OVERSIZED LEATHER COAT',
    narrative: 'A sharper gesture in the edit: limestone neutrals, exaggerated structure, and a leather volume that bridges utility with couture precision.',
    edition: '17 / 100',
    material: 'Leather / Wool',
    labels: ['Leather', 'Utility', 'Sculptural'],
    swatch: 'linear-gradient(135deg, #3d342f 0%, #b28767 100%)',
    hero: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
    detail: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80',
    alt: 'Close portrait of model in a sculpted oversized leather coat'
  },
  {
    id: 4,
    title: 'ARCHITECTURAL DRAPERY & RAW TEXTURES',
    look: 'MINIMALIST CASHMERE HIGH-NECK TUNIC',
    narrative: 'The quietest note in the archive, balancing purity of line with elevated softness—cashmere in a tonal language of restraint.',
    edition: '32 / 100',
    material: 'Cashmere / Cotton',
    labels: ['Cashmere', 'Minimal', 'Refined'],
    swatch: 'linear-gradient(135deg, #e2d9d1 0%, #8f8a87 100%)',
    hero: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    detail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
    alt: 'Model wearing a minimalist cashmere high-neck tunic in tonal neutrals'
  }
];

const body = document.body;
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const mainImage = document.getElementById('mainImage');
const storyImage = document.getElementById('storyImage');
const heroTitle = document.getElementById('heroTitle');
const heroNarrative = document.getElementById('heroNarrative');
const editionStamp = document.getElementById('editionStamp');
const materialStamp = document.getElementById('materialStamp');
const storyIndex = document.getElementById('storyIndex');
const storyLabels = document.getElementById('storyLabels');
const storyNumber = document.getElementById('storyNumber');
const issueMeta = document.getElementById('issueMeta');
const archiveCurrent = document.getElementById('archiveCurrent');
const detailSwatch = document.getElementById('detailSwatch');
const imageStage = document.querySelector('.image-stage');
const thumbList = document.getElementById('thumbList');
const prevButton = document.querySelector('.archive-arrow.prev');
const nextButton = document.querySelector('.archive-arrow.next');

let currentIndex = 0;

const updateCursor = (event) => {
  if (!cursorDot || !cursorRing) return;
  const { clientX, clientY } = event;
  cursorDot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
  cursorRing.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
};

const addCursorInteraction = () => {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  body.classList.add('cursor-visible');
  window.addEventListener('pointermove', updateCursor);

  const interactiveItems = document.querySelectorAll('.magnetic, .thumb, .nav-link, .archive-arrow, .ghost-button, .cta-button, .icon-button, .cart-button, .lang-toggle');

  interactiveItems.forEach((item) => {
    item.addEventListener('pointerenter', () => cursorRing.classList.add('is-active'));
    item.addEventListener('pointerleave', () => cursorRing.classList.remove('is-active'));
  });
};

const applyMagneticMotion = () => {
  const magneticItems = document.querySelectorAll('.magnetic');

  magneticItems.forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const rect = item.getBoundingClientRect();
      const offsetX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const offsetY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      item.style.transform = `translate3d(${offsetX * 10}px, ${offsetY * 10}px, 0)`;
    });

    item.addEventListener('pointerleave', () => {
      item.style.transform = 'translate3d(0, 0, 0)';
    });
  });
};

const renderThumbs = () => {
  thumbList.innerHTML = archive.map((entry, index) => `
    <button
      class="thumb magnetic ${index === currentIndex ? 'is-active' : ''}"
      type="button"
      data-index="${index}"
      aria-label="View archive look ${String(index + 1).padStart(2, '0')}"
    >
      <img src="${entry.thumb}" alt="${entry.look}" />
      <span>${String(index + 1).padStart(2, '0')}</span>
    </button>
  `).join('');

  thumbList.querySelectorAll('.thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      currentIndex = Number(thumb.dataset.index);
      updateArchiveView();
    });
  });
};

const updateArchiveView = () => {
  const item = archive[currentIndex];

  if (!item) return;

  imageStage.classList.add('is-transitioning');

  window.setTimeout(() => {
    mainImage.src = item.hero;
    mainImage.alt = item.alt;
    storyImage.src = item.detail;
    storyImage.alt = item.look;
    heroTitle.textContent = item.title;
    heroNarrative.textContent = item.narrative;
    editionStamp.textContent = item.edition;
    materialStamp.textContent = item.material;
    storyIndex.textContent = `${String(item.id).padStart(2, '0')} / ARCHIVE`;
    storyNumber.textContent = item.look;
    issueMeta.textContent = `AUTUMN/WINTER ARCHIVE — EDITION ${item.edition.replace(' / ', '/')}`;
    archiveCurrent.textContent = String(item.id).padStart(2, '0');
    detailSwatch.style.background = item.swatch;
    storyLabels.innerHTML = item.labels.map((label) => `<span>${label}</span>`).join('');

    renderThumbs();

    window.setTimeout(() => {
      imageStage.classList.remove('is-transitioning');
    }, 240);
  }, 160);
};

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + archive.length) % archive.length;
  updateArchiveView();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % archive.length;
  updateArchiveView();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % archive.length;
    updateArchiveView();
  }

  if (event.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + archive.length) % archive.length;
    updateArchiveView();
  }
});

addCursorInteraction();
applyMagneticMotion();
updateArchiveView();
