// GANTI dengan URL Web App dari Google Apps Script Anda!
const scriptURL = 'https://script.google.com/macros/s/AKfycbxV9uldsI06OiXLzKyFm9IaBxWfkd56eLtJs7LPxTxFpQMZ-OtNA5zCsQ_9zQ_zaQrZMg/exec;'

const form = document.getElementById('attendanceForm');
const btn = document.getElementById('submitBtn');
const msg = document.getElementById('message');

// Set tanggal otomatis ke hari ini
document.getElementById('tanggal').valueAsDate = new Date();

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Efek Loading
    btn.disabled = true;
    btn.innerText = "SEDANG MENGIRIM...";
    
    const payload = {
        tanggal: document.getElementById('tanggal').value,
        nama: document.getElementById('nama').value,
        kelas: document.getElementById('kelas').value,
        status: document.getElementById('status').value,
        materi: document.getElementById('materi').value
    };

    // Menggunakan Fetch API untuk mengirim data
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Penting untuk bypass CORS Google Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(() => {
        showStatus("DATA BERHASIL DIINPUT! ✅", "success");
        form.reset();
        document.getElementById('tanggal').valueAsDate = new Date();
    })
    .catch(error => {
        showStatus("GAGAL MENGIRIM! ❌", "error");
        console.error('Error!', error.message);
    })
    .finally(() => {
        btn.disabled = false;
        btn.innerText = "KIRIM KE CLOUD ⚡";
    });
});

function showStatus(text, type) {
    msg.innerText = text;
    msg.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
    
    if (type === "success") {
        msg.classList.add('bg-green-100', 'text-green-700');
    } else {
        msg.classList.add('bg-red-100', 'text-red-700');
    }
    
    // Hilangkan pesan setelah 5 detik
    setTimeout(() => msg.classList.add('hidden'), 5000);
}
