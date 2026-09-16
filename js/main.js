// Simulasi data.js dengan 277 Data Produk Kaos Sablon

//console.log(ardata[0][10])

const categories = [
	"Momen Keren", 
	"Wonderkid Euro 2024", 
	"Wonderkid Liga Inggris", 
	"Timnas Indonesia", 
	"Klub Eropa",
	"Lain-lain"
];
/*
const photoPool = [
	{ img1: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80", img2: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80" },
	{ img1: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80", img2: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80" },
	{ img1: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80", img2: "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&auto=format&fit=crop&q=80" },
	{ img1: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&auto=format&fit=crop&q=80", img2: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&auto=format&fit=crop&q=80" },
	{ img1: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=80", img2: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80" }
];

const bgColors = [
	"#f1f5f9", "#eff6ff", "#f0fdf4", "#fefce8", "#fff1f2", "#faf5ff", "#f0fdfa"
];
// Dynamic Generator 277 Produk
const adjectives = ["Urban", "Cyberpunk", "Minimalist", "Retro", "Japanese", "Abstract", "Vintage", "Monochrome", "Neon", "Overload", "Savage", "Aesthetic"];
const subjects = ["Vibes", "District", "Edition", "Graphic", "Art", "Culture", "Skull", "Typography", "Wave", "Spirit", "Legend", "Squad"];

*/
const productsData = [];
for (let i = 1; i <= 277; i++) {
	
	//const cat = categories[(i - 1) % categories.length];
	//const photos = photoPool[i % photoPool.length];
	//const price = 150000;
	//const formattedPrice = "Rp " + price.toLocaleString("id-ID");
	//const bgColor = bgColors[i % bgColors.length];
	var urutAr = 0;
	var urutKaos = 0;
	var InJudul = '';
	var InDeskripsi = '';
	var img1 = '';
	var img2 = '';
	var cat
	var photos
	var price
	var formattedPrice
	var bgColor
	if(i<14+1){		
		cat = categories[0];
		urutAr = 0;
		urutKaos = i-1;
	}else if(i<14+31+1){
		cat = categories[1];
		urutAr = 1;
		urutKaos = i-14-1;
	}else if(i<14+31+30+1){
		cat = categories[2];
		urutAr = 2;
		urutKaos = i-14-31-1;
	}else if(i<14+31+30+70+1){
		cat = categories[3];
		urutAr = 3;
		urutKaos = i-14-31-30-1;
	}else if(i<14+31+30+70+26+1){
		cat = categories[4];
		urutAr = 4;
		urutKaos = i-14-31-30-70-1;
	}else{
		cat = categories[5];
		urutAr = 5;
		urutKaos = i-14-31-30-70-26-1;
	}
	img1 = 'images/'+(urutAr+1)+'/'+ardata[urutAr][urutKaos].gambar1;
	img2 = 'images/'+(urutAr+1)+'/'+ardata[urutAr][urutKaos].gambar2;
	bgColor = ardata[urutAr][urutKaos].bg;
	InJudul = ardata[urutAr][urutKaos].judul;
	InDeskripsi = ardata[urutAr][urutKaos].deskripsi;
	price = ardata[urutAr][urutKaos].harga;
	//ubah jadi harga teks rupiah
	formattedPrice = "Rp " + price.toLocaleString("id-ID");

	productsData.push({
		id: i,
		//judul: `${cat} #${i}`,
		judul: InJudul,
		//deskripsi: `Kaos sablon bertema berbahan Cotton Combed 30s super halus. Cetakan DTF tajam warna awet, cocok untuk tampil stylish harian.`,
		deskripsi: InDeskripsi+`\nKaos sablon bertema berbahan Cotton Combed 30s super halus. Cetakan DTF tajam warna awet, cocok untuk tampil stylish harian.`,
		hargaRaw: price,
		harga: formattedPrice,
		//gambar1: photos.img1,
		//gambar2: photos.img2,
		gambar1: img1,
		gambar2: img2,
		warnaBackground: bgColor,
		kategori: cat
	});
}

/* STATE MANAGEMENT */
let currentFilteredProducts = [...productsData];
let currentPage = 1;
const itemsPerPage = 9;
let currentSelectedProduct = null;

window.onload = function() {
	renderCatalog();
};

/* MOBILE MENU TOGGLE LOGIC */
function toggleMobileMenu() {
	const navMenu = document.getElementById("navMenu");
	const backdrop = document.getElementById("navBackdrop");
	navMenu.classList.toggle("active");
	backdrop.classList.toggle("active");
}

function closeMobileMenu() {
	document.getElementById("navMenu").classList.remove("active");
	document.getElementById("navBackdrop").classList.remove("active");
	const subMenu = document.getElementById("productDropdown");
	if (subMenu) subMenu.classList.remove("mobile-open");
}

function toggleMobileDropdown(e) {
	if (window.innerWidth <= 768) {
		e.preventDefault();
		const dropdown = document.getElementById("productDropdown");
		dropdown.classList.toggle("mobile-open");
	}
}

/* RENDER KATALOG */
function renderCatalog() {
	const grid = document.getElementById("productGrid");
	grid.innerHTML = "";

	const totalItems = currentFilteredProducts.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
	
	if (currentPage > totalPages) currentPage = totalPages;
	if (currentPage < 1) currentPage = 1;

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const pageProducts = currentFilteredProducts.slice(startIndex, endIndex);

	if (pageProducts.length === 0) {
		grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 50px; color: var(--text-muted);">Tidak ada produk ditemukan dalam kategori ini.</div>`;
	} else {
		pageProducts.forEach(prod => {
			const card = document.createElement("div");
			card.className = "product-card";
			//card.style.backgroundColor = prod.warnaBackground;
			card.style.backgroundColor = '#F0F0F0';
			card.onclick = () => showDetail(prod.id);

			card.innerHTML = `
				<div class="card-image-box" style="background-color: ${prod.warnaBackground}"=>
					<img src="${prod.gambar1}" alt="${prod.judul}" loading="lazy">
					<span class="card-tag">${prod.kategori}</span>
				</div>
				<div class="card-body">
					<h3 class="card-title">${prod.judul}</h3>
					<p class="card-desc">${prod.deskripsi}</p>
					<div class="card-footer">
						<span class="card-price">${prod.harga}</span>
						<span class="card-btn">Detail & Beli</span>
					</div>
				</div>
			`;
			grid.appendChild(card);
		});
	}

	document.getElementById("pageIndicator").innerText = `Halaman ${currentPage} / ${totalPages}`;
	document.getElementById("prevPageBtn").disabled = currentPage === 1;
	document.getElementById("nextPageBtn").disabled = currentPage === totalPages || totalPages === 0;
	document.getElementById("totalItemsCount").innerText = `Menampilkan ${totalItems} Produk`;
}

/* FILTER KATEGORI */
function filterCategory(catName) {
	hideDetail();
	closeMobileMenu();
	const label = document.getElementById("activeCategoryLabel");
	
	if (catName === "Semua Produk") {
		currentFilteredProducts = [...productsData];
		label.innerText = "Kategori: Semua Produk";
	} else {
		currentFilteredProducts = productsData.filter(p => p.kategori === catName);
		label.innerText = `Kategori: ${catName}`;
	}

	currentPage = 1;
	renderCatalog();
	scrollToCatalog();
}

function changePage(direction) {
	currentPage += direction;
	renderCatalog();
	scrollToCatalog();
}

function scrollToCatalog() {
	document.getElementById("katalog").scrollIntoView({ behavior: 'smooth' });
}

function resetToHome(e) {
	e.preventDefault();
	filterCategory("Semua Produk");
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* SHOW DETAIL PRODUK */
function showDetail(productId) {
	const product = productsData.find(p => p.id === productId);
	if (!product) return;

	currentSelectedProduct = product;

	document.getElementById("katalog").style.display = "none";
	const detailSec = document.getElementById("rincianProduk");
	detailSec.style.display = "block";

	document.getElementById("detailCategory").innerText = product.kategori;
	document.getElementById("detailTitle").innerText = product.judul;
	document.getElementById("detailPrice").innerText = product.harga;
	document.getElementById("detailDescription").innerText = product.deskripsi;
	
	const mainImg = document.getElementById("detailMainImg");
	mainImg.src = product.gambar1;
	document.getElementById("detailMainBg").style.backgroundColor = product.warnaBackground;

	const thumb1 = document.getElementById("thumb1");
	const thumb2 = document.getElementById("thumb2");
	thumb1.src = product.gambar1;
	thumb2.src = product.gambar2;
	
	thumb1.className = "thumb-img active";
	thumb2.className = "thumb-img";

	detailSec.scrollIntoView({ behavior: 'smooth' });
}

function switchDetailImage(src, index) {
	document.getElementById("detailMainImg").src = src;
	const t1 = document.getElementById("thumb1");
	const t2 = document.getElementById("thumb2");
	
	if (index === 1) {
		t1.className = "thumb-img active";
		t2.className = "thumb-img";
	} else {
		t1.className = "thumb-img";
		t2.className = "thumb-img active";
	}
}

function hideDetail() {
	document.getElementById("rincianProduk").style.display = "none";
	document.getElementById("katalog").style.display = "block";
}

/* WHATSAPP ORDER INTEGRATION */
function buyViaWhatsApp() {
	if (!currentSelectedProduct) return;
	
	const nomorWA = "6287808378591";
	const pesan = `Halo iconicmo, saya ingin memesan kaos sablon berikut:\n\n` +
				  `📌 *Nama Produk:* ${currentSelectedProduct.judul}\n` +
				  `🏷️ *Kategori:* ${currentSelectedProduct.kategori}\n` +
				  `💰 *Harga:* ${currentSelectedProduct.harga}\n\n` +
				  `Mohon informasi mengenai ketersediaan stok & pilihan ukuran. Terima kasih!`;
	
	const encodedPesan = encodeURIComponent(pesan);
	const waUrl = `https://wa.me/${nomorWA}?text=${encodedPesan}`;
	
	window.open(waUrl, '_blank');
}