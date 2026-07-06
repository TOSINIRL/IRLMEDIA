document.addEventListener('DOMContentLoaded', ()=>{
  const tabs = document.querySelectorAll('.tab');
  const cards = Array.from(document.querySelectorAll('.card'));
  const downloadRow = document.getElementById('download-row');
  const modal = document.getElementById('waitlist-modal');
  const openModal = document.getElementById('open-waitlist');
  const closeModal = document.getElementById('close-waitlist');
  const scrollButton = document.getElementById('scroll-to-packs');

  tabs.forEach(t=>t.addEventListener('click', ()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const filter = t.dataset.filter;
    cards.forEach(card=>{
      card.style.display = filter === 'all' || card.dataset.type === filter ? '' : 'none';
    });
  }));

  function toggleModal(open){
    modal.setAttribute('aria-hidden', open ? 'false' : 'true');
  }
  openModal.addEventListener('click', ()=>toggleModal(true));
  closeModal.addEventListener('click', ()=>toggleModal(false));
  modal.addEventListener('click', (e)=>{ if(e.target===modal) toggleModal(false) });

  const form = document.getElementById('waitlist-form');
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

  cards.forEach(card=>{
    const title = card.querySelector('h3').textContent;
    const item = document.createElement('div');
    item.className = 'download-item';
    item.innerHTML = `<p>${title}</p><a href="#" class="btn">click here to download</a>`;
    const link = item.querySelector('a');
    link.addEventListener('click', (e)=>{
      e.preventDefault();
      alert(`Download placeholder for ${title}`);
    });
    downloadRow.appendChild(item);
  });

  if(scrollButton){
    scrollButton.addEventListener('click', ()=>{
      document.querySelector('#packs').scrollIntoView({ behavior:'smooth', block:'start' });
    });
  }
});
