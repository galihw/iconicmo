document.querySelectorAll('.btnDetail').forEach(item => {
    item.addEventListener('click', (e) => {
        let parent = e.target.parentNode.parentNode;

        let gambar = parent.querySelector('.card-img-top').src;
        let harga = parent.querySelector('.harga').innerHTML;
        let judul = parent.querySelector('.card-text').innerHTML;
        let deskripsi = parent.querySelector('.deskripsi') ? parent.querySelector('.deskripsi').innerHTML : '<i>tidak ada informasi yang tersedia</i>';

		// mengambil nomor di string gambar
		let hasil1 = gambar.charAt(gambar.length-6);
		let hasil2 = gambar[gambar.length-5];
		let no = 1*(hasil1+''+hasil2);
		if(hasil1=='s') no = 1*(hasil2);
		console.log(hasil1,hasil2,no);
		let gambar2 = 'images/orang'+no+'.jpg';
		
        let tombolModal = document.querySelector('.btnModal');
        tombolModal.click();

        document.querySelector('.modalTitle').innerHTML = judul;
        let image = document.createElement('img');
        image.src = gambar;
        image.classList.add('w-100');
        document.querySelector('.modalImage').innerHTML = '';
        document.querySelector('.modalImage').appendChild(image);
        let image2 = document.createElement('img');
        image2.src = gambar2;
        image2.classList.add('w-100');
        document.querySelector('.modalImage').appendChild(image2);
        document.querySelector('.modalDeskripsi').innerHTML = deskripsi;
        document.querySelector('.modalHarga').innerHTML = harga;

        const nohp = '6285714408830';
        let pesan = `https://api.whatsapp.com/send?phone=${nohp}&text=Halo Bang, saya mau pesan produk ini ${gambar}`;

        document.querySelector('.btnBeli').href = pesan;
    });
});