// GANTI dengan URL Web App dari Google Apps Script Anda
const scriptURL = 'https://script.google.com/macros/s/AKfycbztBI3DmdYClVVAdV6MlIbsU84hyxlVKZoWI9H7ZVs15DlvfOeKZK2xCrwbuOv4pmUF/exec';

const form = document.getElementById('absensiForm');
const btn = document.getElementById('btnSubmit');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Matikan tombol agar tidak terjadi double-input
    btn.disabled = true;
    btn.innerText = "Memproses...";

    // Mengambil Waktu Saat Ini secara Otomatis
    const sekarang = new Date();
    
    // Format Hari (Senin, Selasa, dst)
    const hari = sekarang.toLocaleDateString('id-ID', { weekday: 'long' });
    
    // Format Tanggal Lengkap (2 Februari 2026)
    const tanggalFull = sekarang.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    const formData = new FormData(form);
    formData.append('hari', hari);
    formData.append('tanggal', tanggalFull);

    // Kirim data ke Google Sheets
    fetch(scriptURL, { method: 'POST', body: formData})
        .then(response => {
            alert("Absensi Berhasil! Data sudah tersimpan di Google Sheets.");
            btn.disabled = false;
            btn.innerText = "Kirim Kehadiran";
            form.reset(); // Kosongkan form kembali
        })
        .catch(error => {
            alert("Terjadi kesalahan koneksi: " + error.message);
            btn.disabled = false;
            btn.innerText = "Kirim Kehadiran";
        });
});

const scriptURL = 'MASUKKAN_URL_WEB_APP_ANDA_DISINI';
const form = document.getElementById('absensiForm');
const btn = document.getElementById('btnSubmit');
const selectKelas = document.getElementById('kelas');

// --- LOGIKA GENERATOR KELAS NEPTUNUS ---
const tingkatan = ['X', 'XI', 'XII'];
const jumlahKelas = 11;

tingkatan.forEach(tingkat => {
    for (let i = 1; i <= jumlahKelas; i++) {
        const opsi = document.createElement('option');
        const namaKelas = `${tingkat}-${i}`;
        opsi.value = namaKelas;
        opsi.text = namaKelas;
        selectKelas.appendChild(opsi);
    }
});
// ---------------------------------------

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerText = "Memproses...";

    const sekarang = new Date();
    const hari = sekarang.toLocaleDateString('id-ID', { weekday: 'long' });
    const tanggalFull = sekarang.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    const formData = new FormData(form);
    formData.append('hari', hari);
    formData.append('tanggal', tanggalFull);

    fetch(scriptURL, { method: 'POST', body: formData})
        .then(response => {
            alert("Absensi Berhasil! Data sudah tersimpan rapi.");
            btn.disabled = false;
            btn.innerText = "Kirim Kehadiran";
            form.reset();
        })
        .catch(error => {
            alert("Kesalahan: " + error.message);
            btn.disabled = false;
            btn.innerText = "Kirim Kehadiran";
        });
});
