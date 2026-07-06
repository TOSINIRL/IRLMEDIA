document.addEventListener('DOMContentLoaded', ()=>{
  // Tabs filter
  const tabs = document.querySelectorAll('.tab');
  const cards = Array.from(document.querySelectorAll('.card'));
  tabs.forEach(t=>t.addEventListener('click', ()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const filter = t.dataset.filter;
    cards.forEach(card=>{
      if(filter==='all' || card.dataset.type===filter) card.style.display = '';
      else card.style.display = 'none';
    })
  }))

  // Modal
  const modal = document.getElementById('waitlist-modal');
  const open = document.getElementById('open-waitlist');
  const close = document.getElementById('close-waitlist');
  open.addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','false') })
  close.addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','true') })
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true') })

  // Waitlist form (demo: store locally)
  const form = document.getElementById('waitlist-form');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const entry = { email: data.get('email'), category: data.get('category'), note: data.get('note'), ts: Date.now() };
    const existing = JSON.parse(localStorage.getItem('irl_waitlist')||'[]');
    existing.push(entry);
    localStorage.setItem('irl_waitlist', JSON.stringify(existing));
    alert('Thanks — you\'re on the waitlist. We will email when the pack is available.');
    form.reset();
    modal.setAttribute('aria-hidden','true');
  })

  // Populate download-row from cards
  const downloadRow = document.getElementById('download-row');
  cards.forEach(card=>{
    const title = card.querySelector('h3').textContent;
    const a = document.createElement('a');
    a.className = 'btn';
    a.textContent = 'click here to download';
    a.href = '#';
    a.addEventListener('click', (e)=>{ e.preventDefault(); alert('Download placeholder for '+title) });
    const item = document.createElement('div');
    item.style.margin='6px';
    item.appendChild(document.createTextNode(title+' '));
    item.appendChild(a);
    downloadRow.appendChild(item);
  })
})
