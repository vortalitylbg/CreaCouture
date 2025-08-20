// Affichage des avis
fetch('data/avis.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('reviews-grid');
    data.forEach(avis => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <h3>${avis.nom}</h3>
        <div class="stars">${'★'.repeat(avis.note)}${'☆'.repeat(5 - avis.note)}</div>
        <p>${avis.texte}</p>
        <div class="date">${avis.date}</div>
      `;
      grid.appendChild(card);
    });
  });

// Gestion du formulaire (localStorage pour test)
document.getElementById('review-form').addEventListener('submit', e => {
  e.preventDefault();
  const nom = document.getElementById('name').value;
  const texte = document.getElementById('message').value;
  const note = document.querySelector('input[name="star"]:checked')?.value;
  if(!nom || !texte || !note) return;

  // Pour GitHub Pages, on ne peut pas écrire dans JSON, donc on stocke temporairement dans localStorage
  const newAvis = { nom, texte, note: parseInt(note), date: new Date().toISOString().split('T')[0] };
  let avis = JSON.parse(localStorage.getItem('avis')) || [];
  avis.push(newAvis);
  localStorage.setItem('avis', JSON.stringify(avis));
  document.querySelector('.form-message').textContent = "Merci ! Votre avis a été ajouté.";
  document.getElementById('review-form').reset();

  // Rafraîchir affichage
  const grid = document.getElementById('reviews-grid');
  grid.innerHTML = '';
  avis.forEach(avis => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <h3>${avis.nom}</h3>
      <div class="stars">${'★'.repeat(avis.note)}${'☆'.repeat(5 - avis.note)}</div>
      <p>${avis.texte}</p>
      <div class="date">${avis.date}</div>
    `;
    grid.appendChild(card);
  });
});
