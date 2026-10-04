// ---------- Data ----------
const GAMES = [
 {id:'valorant',n:'Valorant',r:9.1,t:'Shooter,Tactical,Multiplayer',img:'Valorant.png',shots:['Valorant.png','Valorant1.jpg','Valorant2.jpg'],y:2020,dev:'Riot Games',pf:'PC',d:'5v5 tactical shooter yang memadukan tembakan presisi dengan kemampuan unik tiap agent. Pasang strategi, pegang site, dan menangkan ronde.'},
 {id:'cs2',n:'Counter-Strike 2',r:9.0,t:'Shooter,Competitive,Multiplayer',img:'Cs2.png',shots:['Cs2.png','Cs21.jpg','Cs221.jpg'],y:2023,dev:'Valve',pf:'PC (Steam)',d:'Shooter kompetitif berbasis ronde: tim teroris menanam bom, tim counter-terrorist menjinakkannya. Tiap peluru dan granat berarti.'},
 {id:'ark',n:'ARK: Survival',r:8.3,t:'Survival,Open World,Co-op',img:'Ark.jpg',shots:['Ark.jpg','ark1.jpg','Ark2.jpg'],y:2017,dev:'Studio Wildcard',pf:'PC • Console',d:'Bertahan hidup di dunia prasejarah: jinakkan dinosaurus, bangun markas, dan hadapi alam yang keras.'},
 {id:'terraria',n:'Terraria',r:9.4,t:'Sandbox,Adventure,Co-op',img:'Terraria.jpg',shots:['Terraria.jpg','Terraria1.jpg','Terraria2.jpg'],y:2011,dev:'Re-Logic',pf:'PC • Console • Mobile',d:'Petualangan 2D penuh aksi: gali, bangun, buat peralatan, dan kalahkan boss bersama teman.'},
 {id:'minecraft',n:'Minecraft',r:9.5,t:'Sandbox,Creative,Multiplayer',img:'Minecraft.jpg',shots:['Minecraft.jpg','Minecraft1.jpg','Minecraft2.jpg'],y:2011,dev:'Mojang Studios',pf:'PC • Console • Mobile',d:'Dunia blok tanpa batas untuk menambang, meracik, dan membangun apa saja, sendiri atau bersama teman.'},
 {id:'dbd',n:'Dead by Daylight',r:8.2,t:'Horror,Asymmetric,Multiplayer',img:'Dbd.jpg',shots:['Dbd.jpg','Dbd1.jpg','Dbd2.jpg'],y:2016,dev:'Behaviour Interactive',pf:'PC • Console • Mobile',d:'Horor asimetris: satu pembunuh memburu empat survivor yang harus memperbaiki generator dan kabur.'},
 {id:'peak',n:'Peak',r:8.8,t:'Co-op,Climbing,Multiplayer',img:'Peak.jpg',shots:['Peak.jpg','Peak1.jpg','Peak2.jpg'], y:2025,dev:'Aggro Crab & Landfall',pf:'PC (Steam)',d:'Game co-op mendaki gunung berbahaya. Bekerja samalah dengan teman agar sampai ke puncak.'},
 {id:'rust',n:'Rust',r:8.4,t:'Survival,Open World,Multiplayer',img:'Rust.png',shots:['RusT.jpg','Rust1.jpg','Rust2.jpg'],y:2018,dev:'Facepunch Studios',pf:'PC • Console',d:'Survival multiplayer: kumpulkan sumber daya, bangun markas, dan bertahan dari pemain lain.'},
 {id:'gta',n:'GTA V',r:9.3,t:'Action,Open World,Crime',img:'GTA V.png',shots:['GTA V.png','GTA V1.jpg','GTA V2.jpg'],y:2013,dev:'Rockstar Games',pf:'PC • Console',d:'Aksi dunia terbuka di Los Santos dengan tiga karakter utama yang bisa dimainkan bergantian.'},
 {id:'cod',n:'Call of Duty: Warzone',r:8.5,t:'Shooter,Military,Multiplayer',img:'Call of Duty.jpg',shots:['Call of Duty.jpg','Call of Duty1.jpg','Call of Duty 3.jpg'],y:2026,dev:'Infinity Ward',pf:'PC • PS5 • Xbox • Switch 2',d:'Shooter militer cepat dengan kampanye, multiplayer, dan mode ekstraksi DMZ.'},
 {id:'meccha',n:'Meccha Chameleon',r:9.2,t:'Party,Multiplayer,Hide & Seek',img:'Meccha.jpg',shots:['Meccha.jpg','Meccha1.jpg','Meccha2.jpg'],y:2026,dev:'LEMORION',pf:'PC (Steam) • Switch 2',d:'Petak umpet dengan twist: Hider mengecat tubuh putihnya agar menyatu dengan latar, Seeker harus menemukan mereka sebelum waktu habis. Main bareng teman atau masuk server terbuka (2–10 pemain).'}
].map(g => ({...g, g:g.t.split(',')[0], tags:g.t.split(','), img:g.img || `covers/cover_${g.id}.svg`}));
const GENRES = ['All','Shooter','Survival','Sandbox','Action','Co-op','Horror','Party'];
const STATUS = ['Playing','Completed','Wishlist'];
const DEFAULT_LIB = {valorant:'Playing',cs2:'Playing',minecraft:'Completed',rust:'Wishlist',terraria:'Completed',dbd:'Playing',peak:'Wishlist',gta:'Completed'};

// ---------- State (library tersimpan di localStorage) ----------
let lib; try { lib = JSON.parse(localStorage.getItem('gh_lib')) || {...DEFAULT_LIB}; } catch { lib = {...DEFAULT_LIB}; }
const save = () => { try { localStorage.setItem('gh_lib', JSON.stringify(lib)); } catch {} };
const S = {q:'', genre:'All', sort:'rating', tab:'All'};
const $ = s => document.querySelector(s), app = $('#app');
const find = id => GAMES.find(g => g.id === id);

// ---------- Components ----------
const card = (g, status) => `<a class="card" href="#/game/${g.id}"><div class="img"><img src="${g.img}" alt="Sampul ${g.n}" loading="lazy">${status ? `<button class="badge b-${status}" data-cycle="${g.id}" title="Ganti status">${status}</button>` : ''}</div><div class="body"><h3>${g.n}</h3><div class="meta"><span class="rt">${g.r.toFixed(1)}</span><span class="pill">${g.g}</span></div></div></a>`;
const emptyMsg = t => `<div class="empty"><h2>${t[0]}</h2><p>${t[1]}</p></div>`;

// ---------- Views ----------
const views = {
 home() {
  const f = find('meccha'), top = ['valorant','cs2','minecraft','gta'].map(find);
  return `<section class="hero"><div><h1>DISCOVER YOUR<br>NEXT FAVORITE GAME</h1><p class="sub">Find games, save favorites, and build your personal library.</p>
  <div class="acts"><a class="btn p" href="#/explore">Explore Games</a><a class="btn" href="#/library">My Library</a></div>
  <div class="stats"><div><b>${GAMES.length}</b><span>Games</span></div><div><b>120K</b><span>Players</span></div><div><b>4.8</b><span>Avg. Rating</span></div></div></div>
  <a class="feat" href="#/game/${f.id}"><img src="${f.img}" alt="Sampul ${f.n}"><span class="tag">FEATURED GAME</span><div class="in"><div><h3>${f.n}</h3><p>Party • Hide &amp; Seek • 2026</p></div><span class="btn a">View Game</span></div></a></section>
  <div class="sec"><h2>Trending Games</h2><a href="#/explore">View all</a></div><div class="grid">${top.map(g => card(g)).join('')}</div>`;
 },
 explore() {
  return `<div class="head"><div><h1>Explore Games</h1><p class="muted">Search, filter, and sort your games.</p></div></div>
  <div class="bar"><input id="q" type="search" placeholder="Search games..." value="${S.q}" aria-label="Cari game"><select id="sort" aria-label="Urutkan"><option value="rating">Sort by: Top Rated</option><option value="name">Sort by: Name A–Z</option><option value="new">Sort by: Newest</option></select></div>
  <div class="chips" id="chips">${GENRES.map(x => `<button class="chip ${x === S.genre ? 'on' : ''}" data-genre="${x}">${x}</button>`).join('')}<span class="count" id="count"></span></div>
  <div class="grid" id="grid"></div>`;
 },
 game(id) {
  const g = find(id); if (!g) return emptyMsg(['Game tidak ditemukan', 'Kembali ke Explore untuk memilih game lain.']);
  const rel = GAMES.filter(x => x.id !== id).sort((a, b) => (b.g === g.g) - (a.g === g.g)).slice(0, 4), inLib = lib[id];
  const th = [['1','50% 50%'],['1.9','10% 55%'],['1.9','95% 35%']], pics = (g.shots || []).slice(0, 3);
  const thumbs = (pics.length ? pics.map(p => [p, 1, '50% 50%']) : th.map(t => [g.img, t[0], t[1]]))
    .map((t, i) => `<button class="${i ? '' : 'on'}" data-th="${i}" data-src="${pics.length ? t[0] : ''}" aria-label="Gambar ${i + 1}"><img src="${t[0]}" alt="" style="--z:${t[1]};--o:${t[2]}"></button>`).join('');
  return `<a class="back" href="#/explore">← Back to Explore</a><section class="det"><div><img class="cov" id="cov" src="${pics[0] || g.img}" alt="Sampul ${g.n}">
  <div class="thumbs">${thumbs}</div></div>
  <div><h1>${g.n}</h1><p class="rt" style="margin:12px 0;font-size:20px">${g.r.toFixed(1)} / 10</p>
  <div class="chips">${g.tags.map(x => `<span class="chip">${x}</span>`).join('')}</div>
  <div class="acts2"><button class="btn p" id="addBtn" data-add="${id}">${inLib ? '✓ In Library (' + inLib + ')' : '+ Add to Library'}</button><button class="btn heart" id="fav" aria-label="Favorit" aria-pressed="false">♡</button></div>
  <div class="lbl">DESCRIPTION</div><p>${g.d}</p><div class="lbl">INFORMATION</div>
  <div class="info"><div><span>Developer</span><b>${g.dev}</b></div><div><span>Release</span><b>${g.y}</b></div><div><span>Platform</span><b>${g.pf}</b></div></div></div></section>
  <div class="sec"><h2>You may also like</h2></div><div class="rel">${rel.map(x => `<a href="#/game/${x.id}"><img src="${x.img}" alt=""><div><b>${x.n}</b><span class="rt">${x.r.toFixed(1)}</span> <span class="muted">${x.g}</span></div></a>`).join('')}</div>`;
 },
 library() {
  const n = k => k === 'All' ? Object.keys(lib).length : Object.values(lib).filter(v => v === k).length;
  return `<div class="head"><div><h1>My Library</h1><p class="muted">${n('All')} games in your collection</p></div><a class="btn p" href="#/explore">+ Add Game</a></div>
  <div class="chips">${['All', ...STATUS].map(k => `<button class="chip ${k === S.tab ? 'on' : ''}" data-tab="${k}">${k} ${n(k)}</button>`).join('')}</div>
  <div class="grid">${GAMES.filter(g => lib[g.id] && (S.tab === 'All' || lib[g.id] === S.tab)).map(g => card(g, lib[g.id])).join('') || emptyMsg(['Belum ada game di sini', 'Buka Explore dan tambahkan game ke library kamu.'])}</div>`;
 }
};
// ---------- Explore grid (dirender terpisah agar input tidak kehilangan fokus) ----------
function drawGrid() {
  const q = S.q.trim().toLowerCase();
  const list = GAMES.filter(g => (S.genre === 'All' || g.tags.includes(S.genre)) && (!q || g.n.toLowerCase().includes(q) || g.tags.join(' ').toLowerCase().includes(q)))
    .sort((a, b) => S.sort === 'name' ? a.n.localeCompare(b.n) : S.sort === 'new' ? b.y - a.y : b.r - a.r);
  $('#grid').innerHTML = list.map(g => card(g)).join('') || emptyMsg(['Game tidak ditemukan', 'Coba kata kunci atau filter lain.']);
  $('#count').textContent = `${list.length} games found`;
}

// ---------- Router ----------
function route() {
  const [, page = 'home', arg] = location.hash.split('/');
  const name = views[page] ? page : 'home';
  app.innerHTML = views[name](arg);
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === (name === 'game' ? 'explore' : name)));
  if (name === 'explore') { $('#sort').value = S.sort; drawGrid(); }
  document.title = name === 'game' && find(arg) ? `${find(arg).n} • GameHub` : 'GameHub';
  window.scrollTo(0, 0);
}

// ---------- Events ----------
document.addEventListener('click', e => {
  const c = e.target.closest('[data-cycle],[data-genre],[data-tab],[data-add],[data-th],#fav');
  if (!c) return;
  if (c.dataset.cycle) { e.preventDefault(); lib[c.dataset.cycle] = STATUS[(STATUS.indexOf(lib[c.dataset.cycle]) + 1) % 3]; save(); route(); }
  else if (c.dataset.genre) { S.genre = c.dataset.genre; document.querySelectorAll('[data-genre]').forEach(b => b.classList.toggle('on', b === c)); drawGrid(); }
  else if (c.dataset.tab) { S.tab = c.dataset.tab; route(); }
  else if (c.dataset.add) { const id = c.dataset.add; lib[id] ? delete lib[id] : lib[id] = 'Playing'; save(); route(); }
  else if (c.dataset.th) { const t = c.querySelector('img'), cov = $('#cov'); document.querySelectorAll('.thumbs button').forEach(b => b.classList.toggle('on', b === c)); if (c.dataset.src) { cov.src = c.dataset.src; cov.style.objectPosition = '50% 50%'; } else cov.style.objectPosition = t.style.getPropertyValue('--o'); }
  else if (c.id === 'fav') { const on = c.getAttribute('aria-pressed') !== 'true'; c.setAttribute('aria-pressed', on); c.textContent = on ? '♥' : '♡'; }
});
document.addEventListener('input', e => {
  if (e.target.id === 'q') { S.q = e.target.value; drawGrid(); }
  if (e.target.id === 'sort') { S.sort = e.target.value; drawGrid(); }
});
$('#navSearch').addEventListener('submit', e => { e.preventDefault(); S.q = $('#navQ').value; S.genre = 'All'; location.hash === '#/explore' ? route() : location.hash = '#/explore'; });
window.addEventListener('hashchange', route);
route();

