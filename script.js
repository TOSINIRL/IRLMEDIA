document.addEventListener('DOMContentLoaded', ()=>{
  const categoryBtns = document.querySelectorAll('.category-btn');
  const landingSection = document.querySelector('.banner');
  const categorySection = document.getElementById('categorySection');
  const backBtn = document.getElementById('backToLanding');
  const categoryTitle = document.getElementById('categoryTitle');
  const categoryDescription = document.getElementById('categoryDescription');
  const categoryLabel = document.getElementById('categoryLabel');
  const categoryPackName = document.getElementById('categoryPackName');
  const categoryBlurb = document.getElementById('categoryBlurb');
  const categoryDownloadBtn = document.getElementById('categoryDownloadBtn');
  const openModal = document.getElementById('open-waitlist');
  const closeModal = document.getElementById('close-waitlist');
  const modal = document.getElementById('waitlist-modal');
  const scrollButton = document.getElementById('scroll-to-packs');
  const SWITCH_DURATION_MS = 360;

  const packs = {
    celebrities: {
      label: 'Celebrities',
      title: 'Celebrity Cuts',
      description: 'A curated scenepack built for iconic covers and editorial storytelling.',
      downloadText: 'Download Celebrity Cut pack'
    },
    influencers: {
      label: 'Influencers',
      title: 'Influencer Edit',
      description: 'Scroll-stopping, social-first scene styles made for creator energy.',
      downloadText: 'Download Influencer Pack'
    },
    movies: {
      label: 'Movies',
      title: 'Movie Moment',
      description: 'Cinematic scene moods designed for dramatic impact and filmic style.',
      downloadText: 'Download Movie Pack'
    },
    shows: {
      label: 'Shows',
      title: 'Show Scenes',
      description: 'Story-driven vibes crafted for binge-ready series cover art.',
      downloadText: 'Download Show Scenes pack'
    }
  };

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

  function showCategoryView(categoryKey){
    const pack = packs[categoryKey];
    if (!pack) return;
    transitionViews(landingSection, categorySection);
    categoryTitle.textContent = `Choose the vibe you want to explore`;
    categoryDescription.textContent = `You selected ${pack.label}. Here is the dedicated pack for that mood.`;
    categoryLabel.textContent = pack.label;
    categoryPackName.textContent = pack.title;
    categoryBlurb.textContent = pack.description;
    categoryDownloadBtn.textContent = 'click here to download';
    categoryDownloadBtn.onclick = (e)=>{
      e.preventDefault();
      alert(`${pack.downloadText} ready.`);
    };
  }

  categoryBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const category = btn.dataset.category;
      showCategoryView(category);
    });
  });

  if (backBtn){
    backBtn.addEventListener('click', ()=>{
      transitionViews(categorySection, landingSection);
    });
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
});
