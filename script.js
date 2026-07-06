document.addEventListener('DOMContentLoaded', ()=>{
  const siteLoader = document.querySelector('[data-site-loader]');
  const body = document.body;
  let loaderHidden = false;
  const initTime = performance.now();

  const hideLoader = ()=>{
    if (!siteLoader || loaderHidden) return;
    loaderHidden = true;
    const minDuration = 1800;
    const wait = Math.max(0, minDuration - (performance.now() - initTime));

    window.setTimeout(()=>{
      siteLoader.classList.add('is-leaving');
      window.setTimeout(()=>{
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
    // Safety fallback so loader cannot get stuck.
    window.setTimeout(hideLoader, 4200);
  }

  const categoryBtns = document.querySelectorAll('.category-btn');
  const landingSection = document.querySelector('.banner');
  const categorySection = document.getElementById('categorySection');
  const backBtn = document.getElementById('backToLanding');
  const categoryTitle = document.getElementById('categoryTitle');
  const categoryDescription = document.getElementById('categoryDescription');
  const categoryTabs = document.querySelectorAll('#categoryTabs .tab');
  const categoryGrid = document.getElementById('categoryGrid');
  const openModal = document.getElementById('open-waitlist');
  const closeModal = document.getElementById('close-waitlist');
  const modal = document.getElementById('waitlist-modal');
  const scrollButton = document.getElementById('scroll-to-packs');
  const quickDownloadBtns = document.querySelectorAll('.quick-download-btn');
  const downloadAreas = document.querySelectorAll('.download-area');
  const SWITCH_DURATION_MS = 360;

  window.requestAnimationFrame(()=>{
    document.body.classList.add('is-ready');
  });

  const packs = {
    celebrities: {
      label: 'Celebrities',
      title: 'Celebrity Scenepacks',
      description: 'A curated scenepack built for iconic covers and editorial storytelling.',
      route: 'celebrities',
      swatchClass: 'celebrities'
    },
    influencers: {
      label: 'Influencers',
      title: 'Influencer Scenepacks',
      description: 'Scroll-stopping, social-first scene styles made for creator energy.',
      route: 'influencers',
      swatchClass: 'influencers'
    },
    movies: {
      label: 'Movies',
      title: 'Movie Scenepacks',
      description: 'Cinematic scene moods designed for dramatic impact and filmic style.',
      route: 'movies',
      swatchClass: 'movies'
    },
    shows: {
      label: 'Shows',
      title: 'Show Scenepacks',
      description: 'Story-driven vibes crafted for binge-ready series cover art.',
      route: 'shows',
      swatchClass: 'shows'
    }
  };

  const categoryKeys = Object.keys(packs);

  function parseCategoryFromHash(hashValue){
    if (!hashValue || !hashValue.startsWith('#category-')) return 'all';
    const key = hashValue.replace('#category-', '');
    return categoryKeys.includes(key) ? key : 'all';
  }

  function setActiveTab(filterKey){
    categoryTabs.forEach((tab)=>{
      const isActive = tab.dataset.filter === filterKey;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function renderCategoryGrid(filterKey = 'all'){
    if (!categoryGrid) return;
    const cardsToShow = filterKey === 'all'
      ? categoryKeys
      : categoryKeys.filter((key)=>key === filterKey);

    categoryGrid.innerHTML = cardsToShow.map((key)=>{
      const pack = packs[key];
      return `
        <article class="card category-card-item" data-category="${key}">
          <div class="category-thumb ${pack.swatchClass}" aria-hidden="true"></div>
          <div class="card-copy">
            <h3>${pack.title}</h3>
            <p class="tags">${pack.label}</p>
          </div>
          <div class="card-actions">
            <button class="btn primary see-more-btn" data-category="${pack.route}">Click here to see more</button>
            <button class="btn ghost preview-btn" data-category="${pack.route}">Preview</button>
          </div>
        </article>
      `;
    }).join('');

    if (categoryTitle) {
      categoryTitle.textContent = filterKey === 'all'
        ? 'Choose the vibe you want to explore'
        : `${packs[filterKey].label} scenepacks`;
    }

    if (categoryDescription) {
      categoryDescription.textContent = filterKey === 'all'
        ? 'Tap any category to filter the scenepack grid below. Each card includes a quick action.'
        : `Showing ${packs[filterKey].label} only. Click another tab or Back to see all vibes again.`;
    }

    setActiveTab(filterKey);
  }

  function ensureCategoryView(withTransition = true){
    if (!landingSection || !categorySection) return;
    if (categorySection.classList.contains('hidden')) {
      if (withTransition) {
        transitionViews(landingSection, categorySection);
      } else {
        landingSection.classList.add('hidden');
        categorySection.classList.remove('hidden');
      }
    }
  }

  function showCategoryView(categoryKey, withTransition = true){
    const safeKey = categoryKeys.includes(categoryKey) ? categoryKey : 'all';
    ensureCategoryView(withTransition);
    renderCategoryGrid(safeKey);

    const nextHash = safeKey === 'all' ? '#category-all' : `#category-${safeKey}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }

  function transitionViews(fromEl, toEl){
    if (!fromEl || !toEl) return;
    fromEl.classList.remove('view-enter');
    fromEl.classList.add('view-exit');

    window.setTimeout(()=>{
      fromEl.classList.add('hidden');
      fromEl.classList.remove('view-exit');

      toEl.classList.remove('hidden');
      toEl.classList.remove('view-exit');
      toEl.classList.add('view-enter');

      window.setTimeout(()=>{
        toEl.classList.remove('view-enter');
      }, SWITCH_DURATION_MS);
    }, SWITCH_DURATION_MS);
  }

  categoryBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const category = btn.dataset.category;
      showCategoryView(category, true);
    });
  });

  categoryTabs.forEach((tab)=>{
    tab.addEventListener('click', ()=>{
      const filterKey = tab.dataset.filter || 'all';
      showCategoryView(filterKey, false);
    });
  });

  if (categoryGrid) {
    categoryGrid.addEventListener('click', (event)=>{
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const seeMoreBtn = target.closest('.see-more-btn');
      if (seeMoreBtn instanceof HTMLElement) {
        const key = seeMoreBtn.dataset.category || 'all';
        showCategoryView(key, false);
        return;
      }

      const previewBtn = target.closest('.preview-btn');
      if (previewBtn instanceof HTMLElement) {
        const key = previewBtn.dataset.category || 'all';
        const pack = packs[key];
        if (pack) {
          alert(`Preview placeholder for ${pack.title}`);
        }
      }
    });
  }

  if (backBtn){
    backBtn.addEventListener('click', ()=>{
      transitionViews(categorySection, landingSection);
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    });
  }

  if (window.location.hash.startsWith('#category-')) {
    showCategoryView(parseCategoryFromHash(window.location.hash), false);
  } else {
    renderCategoryGrid('all');
  }

  function toggleModal(open){
    if (modal) {
      modal.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
  }

  if (openModal && closeModal && modal) {
    openModal.addEventListener('click', ()=>toggleModal(true));
    closeModal.addEventListener('click', ()=>toggleModal(false));
    modal.addEventListener('click', (e)=>{ if(e.target===modal) toggleModal(false) });
  }

  const form = document.getElementById('waitlist-form');
  if (form) {
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const entry = {
        email: data.get('email'),
        category: data.get('category'),
        note: data.get('note'),
        createdAt: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('irl_waitlist')||'[]');
      localStorage.setItem('irl_waitlist', JSON.stringify([...existing, entry]));
      alert('Thanks — you are now on the waitlist.');
      form.reset();
      toggleModal(false);
    });
  }

  if(scrollButton){
    scrollButton.addEventListener('click', ()=>{
      const target = document.querySelector('.chips-row');
      if (target) target.scrollIntoView({ behavior:'smooth', block:'center' });
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    downloadAreas.forEach((area)=>observer.observe(area));
  } else {
    downloadAreas.forEach((area)=>area.classList.add('is-visible'));
  }

  if (!downloadAreas.length) {
    return;
  }

  quickDownloadBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
      const pack = btn.dataset.pack || 'ScenePack';
      alert(`Download placeholder for ${pack}`);
    });
  });
});
