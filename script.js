const tabs = document.querySelectorAll('[data-tab]');
const panels = document.querySelectorAll('[data-tab-panel]');
const modal = document.querySelector('.modal');
const openModalButtons = document.querySelectorAll('[data-open-modal]');
const closeModalButton = document.querySelector('[data-close-modal]');
const downloadArea = document.querySelector('.download-area');
const siteLoader = document.querySelector('[data-site-loader]');
const body = document.body;

let loaderHidden = false;
const initTime = performance.now();

const hideLoader = () => {
  if (!siteLoader || loaderHidden) return;
  loaderHidden = true;
  const minDuration = 1800;
  const wait = Math.max(0, minDuration - (performance.now() - initTime));

  window.setTimeout(() => {
    siteLoader.classList.add('is-leaving');
    window.setTimeout(() => {
      siteLoader.remove();
      body.classList.remove('is-loading');
    }, 620);
  }, wait);
};

if (siteLoader) {
  body.classList.add('is-loading');
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader, { once: true });
  }
  // Safety fallback so loader never gets stuck.
  window.setTimeout(hideLoader, 4200);
}

const showPanel = (panelName) => {
  panels.forEach((panel) => {
    const isActive = panel.dataset.tabPanel === panelName;
    panel.classList.toggle('hidden', !isActive);
    panel.classList.toggle('view-enter', isActive);
    panel.classList.remove('view-exit');
  });

  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === panelName;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });
};

const openModal = () => {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    showPanel(tab.dataset.tab);
  });
});

openModalButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});

closeModalButton?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

document.querySelectorAll('[data-scroll-to]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.scrollTo);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

if ('IntersectionObserver' in window && downloadArea) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        downloadArea.classList.add('is-visible');
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(downloadArea);
} else if (downloadArea) {
  downloadArea.classList.add('is-visible');
}

requestAnimationFrame(() => {
  body.classList.add('is-ready');
  showPanel('celebs');
});

const categoryButtons = document.querySelectorAll('[data-category-filter]');
const categoryCards = document.querySelectorAll('.page-two-card[data-category]');

const showCategory = (category) => {
  categoryCards.forEach((card) => {
    const shouldShow = category === 'all' || card.dataset.category === category;
    card.classList.toggle('is-hidden', !shouldShow);
  });

  categoryButtons.forEach((button) => {
    const isActive = button.dataset.categoryFilter === category;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
};

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showCategory(button.dataset.categoryFilter);
  });
});
