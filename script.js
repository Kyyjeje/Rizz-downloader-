// script.js
const introVideo = document.getElementById('introVideo');
const skipBtn = document.getElementById('skipIntroBtn');

function hideIntro() {
    introVideo.classList.add('hidden');
    document.getElementById('mainContent').style.display = 'block';
    setTimeout(() => { introVideo.style.display = 'none'; }, 800);
}

skipBtn.addEventListener('click', hideIntro);

const video = introVideo.querySelector('video');
video.addEventListener('ended', hideIntro);
setTimeout(hideIntro, 10000);

const toolsData = {
    downloader: [
        { id: 'instagram', icon: 'fa-brands fa-instagram', name: 'Instagram', desc: 'Download video & foto', badge: 'HD' },
        { id: 'tiktok', icon: 'fa-brands fa-tiktok', name: 'TikTok', desc: 'No watermark', badge: 'MP4' },
        { id: 'youtube', icon: 'fa-brands fa-youtube', name: 'YouTube', desc: 'Video & audio', badge: 'MP4/MP3' }
    ],
    maker: [
        { id: 'iqc', icon: 'fa-solid fa-image', name: 'IQC Generator', desc: 'Buat gambar IQC', badge: 'Custom' },
        { id: 'winquotes', icon: 'fa-brands fa-windows', name: 'Windows Quotes', desc: 'Quote ala Windows', badge: 'Meme' },
        { id: 'tanyaustadz', icon: 'fa-solid fa-user-tie', name: 'Tanya Ustadz', desc: 'Meme generator', badge: 'Lucu' },
        { id: 'sertifikat', icon: 'fa-solid fa-certificate', name: 'Sertifikat Tolol', desc: 'Buat sertifikat lucu', badge: 'New!' }
    ],
    tools: [
        { id: 'qr', icon: 'fa-solid fa-qrcode', name: 'QR Generator', desc: 'Buat QR code', badge: 'Instant' },
        { id: 'calc', icon: 'fa-solid fa-calculator', name: 'Calculator', desc: 'Hitung cepat', badge: 'Math' },
        { id: 'pwgen', icon: 'fa-solid fa-key', name: 'Password Gen', desc: 'Password aman', badge: 'Secure' },
        { id: 'morse', icon: 'fa-solid fa-broadcast', name: 'Morse Code', desc: 'Konversi morse', badge: 'Audio' },
        { id: 'removebg', icon: 'fa-solid fa-eraser', name: 'Remove BG', desc: 'Hapus background', badge: 'AI' },
        { id: 'enhancer', icon: 'fa-solid fa-magic', name: 'Image Enhancer', desc: 'Tingkatkan kualitas', badge: 'HD' },
        { id: 'brat', icon: 'fa-solid fa-font', name: 'BRAT Generator', desc: 'Buat teks gaya BRAT', badge: 'New!' },
        { id: 'fakeig', icon: 'fa-brands fa-instagram', name: 'Fake IG', desc: 'Generator fake Instagram', badge: 'New!' }
    ],
    external: [
        { id: 'fakeff', icon: 'fa-solid fa-fire', name: 'Fake FF', desc: 'Free Fire simulator', link: 'https://fakeff.netlify.app/' },
        { id: 'getcode', icon: 'fa-solid fa-code', name: 'Get Code HTML', desc: 'Extract & copy', link: 'https://kaze-extract.netlify.app/' },
        { id: 'zxvai', icon: 'fa-solid fa-robot', name: 'ZxVAI', desc: 'AI tools & APK', link: 'https://zxvaiapk.netlify.app/' },
        { id: 'fotolink', icon: 'fa-solid fa-image', name: 'Foto To Link', desc: 'Upload & share', link: 'https://pixvault-bykz.netlify.app/' }
    ]
};

const allTools = [
    ...toolsData.downloader,
    ...toolsData.maker,
    ...toolsData.tools,
    ...toolsData.external
];

function renderGrid(containerId, items, isExternal = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = items.map(item => {
        const clickAttr = isExternal || item.link ?
            `onclick="window.open('${item.link || '#'}','_blank')"` :
            `onclick="showTool('${item.id}')"`;
        return `
            <div class="tools-card" ${clickAttr}>
                <div class="icon"><i class="${item.icon}"></i></div>
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
                <div class="arrow"><i class="fas fa-arrow-right"></i></div>
            </div>
        `;
    }).join('');
}

function renderAll() {
    renderGrid('allGrid', allTools);
    renderGrid('downloaderGrid', toolsData.downloader);
    renderGrid('makerGrid', toolsData.maker);
    renderGrid('toolsGrid', toolsData.tools);
    renderGrid('externalGrid', toolsData.external, true);
}

const wrapper = document.getElementById('content-wrapper');
const tabs = document.querySelectorAll('.category-tab');
const searchInput = document.getElementById('searchInput');

function renderCategory(categoryKey) {
    const catMap = {
        all: { icon: 'fa-th-large', title: 'Semua Tools' },
        downloader: { icon: 'fa-download', title: 'Downloader' },
        maker: { icon: 'fa-wand-magic-sparkles', title: 'Maker' },
        tools: { icon: 'fa-screwdriver-wrench', title: 'Tools' },
        external: { icon: 'fa-link', title: 'External Tools' }
    };
    const c = catMap[categoryKey];
    if (!c) return;

    let items = [];
    let isExternal = false;
    if (categoryKey === 'all') items = allTools;
    else if (categoryKey === 'downloader') items = toolsData.downloader;
    else if (categoryKey === 'maker') items = toolsData.maker;
    else if (categoryKey === 'tools') items = toolsData.tools;
    else if (categoryKey === 'external') { items = toolsData.external; isExternal = true; }

    let html = `
        <div class="section-title">
            <i class="fas ${c.icon}" style="color:#ef4444;"></i> ${c.title}
            <span class="line"></span>
        </div>
        <div class="tools-grid" id="${categoryKey}Grid"></div>
    `;
    wrapper.innerHTML = html;

    const gridId = categoryKey + 'Grid';
    renderGrid(gridId, items, isExternal);

    tabs.forEach(t => {
        t.classList.remove('active');
        if (t.dataset.category === categoryKey) t.classList.add('active');
    });
}

function filterTools(query) {
    const allCards = document.querySelectorAll('.tools-card');
    allCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'flex' : 'none';
    });
}

searchInput.addEventListener('input', function() {
    const q = this.value.toLowerCase().trim();
    tabs.forEach(t => {
        const text = t.textContent.toLowerCase();
        t.style.display = text.includes(q) ? 'flex' : 'none';
    });
    filterTools(q);
});

document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); searchInput.focus(); }
});

const heroSection = document.getElementById('heroSection');
const searchWrapper = document.getElementById('searchWrapper');
const categorySection = document.getElementById('category-section');
const navHome = document.getElementById('navHome');
const navTools = document.getElementById('navTools');

function showHome() {
    heroSection.style.display = 'flex';
    searchWrapper.classList.remove('visible');
    categorySection.classList.remove('visible');
    navHome.classList.add('active');
    navTools.classList.remove('active');
    wrapper.innerHTML = '';
    tabs.forEach(t => t.classList.remove('active'));
}

function showTools() {
    heroSection.style.display = 'none';
    searchWrapper.classList.add('visible');
    categorySection.classList.add('visible');
    navTools.classList.add('active');
    navHome.classList.remove('active');
    if (!wrapper.innerHTML) renderCategory('all');
}

document.getElementById('btnStart').addEventListener('click', showTools);
navHome.addEventListener('click', e => { e.preventDefault(); showHome(); });
navTools.addEventListener('click', e => { e.preventDefault(); showTools(); });

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const cat = this.dataset.category;
        renderCategory(cat);
        searchInput.value = '';
        tabs.forEach(t => t.style.display = 'flex');
        const allCards = document.querySelectorAll('.tools-card');
        allCards.forEach(card => card.style.display = 'flex');
    });
});

function showTool(toolId) {
    const viewer = document.getElementById('toolViewer');
    const body = document.getElementById('toolViewerBody');
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';

    let tool = null;
    for (let cat of ['downloader', 'maker', 'tools']) {
        const found = toolsData[cat].find(t => t.id === toolId);
        if (found) { tool = found; break; }
    }
    if (!tool) { closeTool(); return; }

    switch (toolId) {
        case 'instagram': renderInstagram(body); break;
        case 'tiktok': renderTiktok(body); break;
        case 'youtube': renderYoutube(body); break;
        case 'iqc': renderIqc(body); break;
        case 'winquotes': renderWinquotes(body); break;
        case 'tanyaustadz': renderTanyaUstadz(body); break;
        case 'sertifikat': renderSertifikat(body); break;
        case 'qr': renderQr(body); break;
        case 'calc': renderCalc(body); break;
        case 'pwgen': renderPwgen(body); break;
        case 'morse': renderMorse(body); break;
        case 'removebg': renderRemovebg(body); break;
        case 'enhancer': renderEnhancer(body); break;
        case 'brat': renderBrat(body); break;
        case 'fakeig': renderFakeIg(body); break;
        default: closeTool();
    }
}

function closeTool() {
    document.getElementById('toolViewer').classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.getElementById('toolViewer').addEventListener('click', function(e) {
    if (e.target === this) closeTool();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeTool();
});

function renderInstagram(body) {
    body.innerHTML = `
        <h2><i class="fa-brands fa-instagram"></i> Instagram Downloader</h2>
        <p style="color:#b06a7a;font-size:13px;margin-bottom:12px;">Download video, Reels, atau foto dari Instagram.</p>
        <input type="text" id="instaUrl" class="v-input" placeholder="Tempel link Instagram...">
        <button class="v-btn" id="instaBtn"><i class="fas fa-download"></i> Ambil Media</button>
        <div id="instaResult"></div>
    `;
    document.getElementById('instaBtn').onclick = async () => {
        const url = document.getElementById('instaUrl').value.trim();
        const target = document.getElementById('instaResult');
        if (!url) return alert('Masukkan link Instagram!');
        target.innerHTML = `<div class="result-box"><i class="fas fa-spinner spin"></i><br>Memproses...</div>`;
        try {
            const res = await fetch(`https://api.nexray.eu.cc/downloader/instagram?url=${encodeURIComponent(url)}`);
            const data = await res.json();
            let dl = data.result?.[0]?.url || data.result?.url || data.url;
            if (dl) {
                target.innerHTML = `
                    <div class="result-box">
                        <video controls style="width:100%;border-radius:8px;" src="${dl}"></video>
                        <br><br>
                        <a href="${dl}" target="_blank" download style="text-decoration:none;">
                            <button class="v-btn" style="background:rgba(255,50,50,0.15);">Download</button>
                        </a>
                    </div>
                `;
            } else {
                target.innerHTML = `<div class="result-box" style="color:#ef4444;">Gagal ambil media.</div>`;
            }
        } catch (e) {
            target.innerHTML = `<div class="result-box" style="color:#ef4444;">Error: ${e.message}</div>`;
        }
    };
}

function renderTiktok(body) {
    body.innerHTML = `
        <h2><i class="fa-brands fa-tiktok"></i> TikTok Downloader</h2>
        <p style="color:#b06a7a;font-size:13px;margin-bottom:12px;">Download video TikTok tanpa watermark.</p>
        <input type="text" id="ttUrl" class="v-input" placeholder="Tempel link TikTok...">
        <button class="v-btn" id="ttBtn"><i class="fas fa-download"></i> Ekstrak</button>
        <div id="ttResult"></div>
    `;
    document.getElementById('ttBtn').onclick = async () => {
        const url = document.getElementById('ttUrl').value.trim();
        const target = document.getElementById('ttResult');
        if (!url) return alert('Masukkan URL!');
        target.innerHTML = `<div class="result-box"><i class="fas fa-spinner spin"></i> Memproses...</div>`;
        try {
            const res = await fetch('https://api-faa.my.id/faa/tiktok?url=' + encodeURIComponent(url));
            const data = await res.json();
            const video = data?.result?.data || data?.result?.video || data?.result?.url;
            if (video) {
                target.innerHTML = `
                    <div class="result-box">
                        <video controls style="width:100%;border-radius:8px;" src="${video}"></video>
                        <br><br>
                        <a href="${video}" target="_blank" style="text-decoration:none;">
                            <button class="v-btn" style="background:rgba(255,50,50,0.15);">Download</button>
                        </a>
                    </div>
                `;
            } else {
                target.innerHTML = `<div class="result-box">Gagal mengambil video.</div>`;
            }
        } catch (e) {
            target.innerHTML = `<div class="result-box">Error: ${e.message}</div>`;
        }
    };
}

function renderYoutube(body) {
    body.innerHTML = `
        <h2><i class="fa-brands fa-youtube"></i> YouTube Downloader</h2>
        <input type="text" id="ytUrl" class="v-input" placeholder="Tempel URL YouTube...">
        <select id="ytFormat" class="v-select" onchange="document.getElementById('resBox').style.display=this.value==='mp3'?'none':'block'">
            <option value="mp4">Video (MP4)</option>
            <option value="mp3">Audio (MP3)</option>
        </select>
        <div id="resBox">
            <select id="ytRes" class="v-select">
                <option value="360">360p</option>
                <option value="720" selected>720p</option>
                <option value="1080">1080p</option>
            </select>
        </div>
        <button class="v-btn" id="ytBtn"><i class="fas fa-play"></i> Proses</button>
        <div id="ytResult"></div>
    `;
    document.getElementById('ytBtn').onclick = async () => {
        const url = document.getElementById('ytUrl').value.trim();
        const fmt = document.getElementById('ytFormat').value;
        const resSel = document.getElementById('ytRes').value;
        const target = document.getElementById('ytResult');
        if (!url) return alert('Sertakan URL!');
        target.innerHTML = `<div class="result-box"><i class="fas fa-spinner spin"></i> Menghubungkan...</div>`;
        try {
            let apiUrl = fmt === 'mp3' ?
                `https://api.nexray.eu.cc/downloader/v1/ytmp3?url=${encodeURIComponent(url)}` :
                `https://api.nexray.eu.cc/downloader/ytmp4?url=${encodeURIComponent(url)}&resolusi=${resSel}`;
            const res = await fetch(apiUrl);
            const data = await res.json();
            if (data.status && data.result?.url) {
                let dl = data.result.url;
                let title = data.result.title || 'YouTube Media';
                target.innerHTML = `
                    <div class="result-box">
                        <p style="font-size:13px;font-weight:600;">${title}</p>
                        ${fmt === 'mp4' ? `<video controls style="width:100%;border-radius:8px;" src="${dl}"></video>` : `<audio controls style="width:100%;" src="${dl}"></audio>`}
                        <br><br>
                        <a href="${dl}" target="_blank" style="text-decoration:none;">
                            <button class="v-btn" style="background:rgba(255,50,50,0.15);">Download</button>
                        </a>
                    </div>
                `;
            } else {
                target.innerHTML = `<div class="result-box">Gagal memproses link YouTube.</div>`;
            }
        } catch (e) {
            target.innerHTML = `<div class="result-box">Error: ${e.message}</div>`;
        }
    };
}

function renderIqc(body) {
    let selectedProvider = 'Axis';
    let globalIqcBlob = '';
    body.innerHTML = `
        <h2><i class="fas fa-image"></i> IQC Generator</h2>
        <label style="color:#b06a7a;font-size:12px;display:block;margin-top:4px;">Pesan:</label>
        <input type="text" id="iqcText" class="v-input" value="Hai">
        <label style="color:#b06a7a;font-size:12px;display:block;margin-top:4px;">Pilih Operator:</label>
        <div class="provider-buttons" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:14px;">
            <button class="provider-btn active" onclick="setIqcProv(this,'Axis')" style="padding:8px;background:rgba(255,50,50,0.04);border:1px solid rgba(255,50,50,0.06);border-radius:10px;color:#8b7ab8;font-size:11px;font-weight:500;cursor:pointer;text-align:center;transition:all 0.2s;font-family:'Poppins',sans-serif;">Axis</button>
            <button class="provider-btn" onclick="setIqcProv(this,'Telkomsel')" style="padding:8px;background:rgba(255,50,50,0.04);border:1px solid rgba(255,50,50,0.06);border-radius:10px;color:#8b7ab8;font-size:11px;font-weight:500;cursor:pointer;text-align:center;transition:all 0.2s;font-family:'Poppins',sans-serif;">Telkomsel</button>
            <button class="provider-btn" onclick="setIqcProv(this,'Indosat')" style="padding:8px;background:rgba(255,50,50,0.04);border:1px solid rgba(255,50,50,0.06);border-radius:10px;color:#8b7ab8;font-size:11px;font-weight:500;cursor:pointer;text-align:center;transition:all 0.2s;font-family:'Poppins',sans-serif;">Indosat</button>
            <button class="provider-btn" onclick="setIqcProv(this,'XL')" style="padding:8px;background:rgba(255,50,50,0.04);border:1px solid rgba(255,50,50,0.06);border-radius:10px;color:#8b7ab8;font-size:11px;font-weight:500;cursor:pointer;text-align:center;transition:all 0.2s;font-family:'Poppins',sans-serif;">XL</button>
            <button class="provider-btn" onclick="setIqcProv(this,'Three')" style="padding:8px;background:rgba(255,50,50,0.04);border:1px solid rgba(255,50,50,0.06);border-radius:10px;color:#8b7ab8;font-size:11px;font-weight:500;cursor:pointer;text-align:center;transition:all 0.2s;font-family:'Poppins',sans-serif;">Three</button>
            <button class="provider-btn" onclick="setIqcProv(this,'Smartfren')" style="padding:8px;background:rgba(255,50,50,0.04);border:1px solid rgba(255,50,50,0.06);border-radius:10px;color:#8b7ab8;font-size:11px;font-weight:500;cursor:pointer;text-align:center;transition:all 0.2s;font-family:'Poppins',sans-serif;">Smartfren</button>
        </div>
        <div style="display:flex;gap:12px;">
            <div style="flex:1;"><label style="color:#b06a7a;font-size:12px;display:block;margin-top:4px;">Jam:</label><input type="number" id="iqcJam" class="v-input" value="12" min="0" max="23"></div>
            <div style="flex:1;"><label style="color:#b06a7a;font-size:12px;display:block;margin-top:4px;">Baterai (%):</label><input type="number" id="iqcBaterai" class="v-input" value="65" min="0" max="100"></div>
        </div>
        <button class="v-btn" id="iqcGenBtn">Generate</button>
        <div id="iqcResultDiv" style="display:none;">
            <div class="iqc-preview" style="background:rgba(0,0,0,0.4);border-radius:12px;min-height:140px;display:flex;align-items:center;justify-content:center;margin-top:12px;overflow:hidden;border:1px dashed rgba(255,50,50,0.08);" id="iqcPreviewBox"></div>
            <div class="btn-group" style="display:flex;gap:10px;margin-top:12px;">
                <button class="v-btn" id="iqcDlBtn" style="flex:1;">Download PNG</button>
                <button class="v-btn" id="iqcCopyBtn" style="flex:1;">Copy URL</button>
            </div>
        </div>
    `;
    window.setIqcProv = (btn, prov) => {
        document.querySelectorAll('.provider-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedProvider = prov;
    };
    document.getElementById('iqcGenBtn').onclick = async () 
