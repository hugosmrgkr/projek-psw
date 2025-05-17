import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JangkaWaktuSewaFormAdd = () => {
  
  const [formData, setFormData] = useState({
    idJenisJangkaWaktu: '',
    jangkaWaktuSewa: '',
    keterangan: '',
    isDefault: false
  });
  
  const [jenisList, setJenisList] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Ambil data jenis jangka waktu dari API Laravel
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/jenis-jangka-waktu')
      .then(res => {
        setJenisList(res.data.data); // Pastikan struktur response sesuai dengan ini
      })
      .catch(err => {
        console.error('Gagal mengambil data jenis jangka waktu:', err);
        showNotification('error', 'Gagal memuat data jenis jangka waktu');
      });
  }, []);
  
  // Function untuk menampilkan notifikasi
  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message
    });
    
    // Sembunyikan notifikasi setelah 5 detik
    setTimeout(() => {
      setNotification({
        show: false,
        type: '',
        message: ''
      });
    }, 5000);
  };
  
  // Kirim form ke API Laravel
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const data = {
      idJenisJangkaWaktu: formData.idJenisJangkaWaktu,
      jangkaWaktuSewa: formData.jangkaWaktuSewa,
      keterangan: formData.keterangan || '',
      isDefault: formData.isDefault,
    };
    
    axios.post('http://localhost:8000/api/jangka-waktu-sewa', data)
      .then(response => {
        console.log('Data berhasil ditambahkan', response);
        showNotification('success', 'Data berhasil disimpan!');
        // Reset form setelah berhasil
        setFormData({
          idJenisJangkaWaktu: '',
          jangkaWaktuSewa: '',
          keterangan: '',
          isDefault: false
        });
      })
      .catch(error => {
        console.error('Gagal menambahkan data:', error);
        showNotification('error', 'Gagal menyimpan data. Silakan coba lagi.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handler untuk kembali ke halaman sebelumnya
  const handleBack = () => {
    window.history.back(); // Menggunakan history API standar untuk navigasi kembali
  };
  
  return (
    <div className="jangka-waktu-container">
      {/* Notifikasi */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="header">
        <button onClick={handleBack} className="btn btn-back">
          <span className="back-icon">←</span> Kembali
        </button>
        <h2 className="form-title">Tambah Jenis Jangka Waktu</h2>
      </div>
      <div className="form-divider"></div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jenisJangkaWaktu">Jenis Jangka Waktu</label>
          <select
            id="jenisJangkaWaktu"
            value={formData.idJenisJangkaWaktu}
            onChange={(e) => setFormData({ ...formData, idJenisJangkaWaktu: e.target.value })}
            required
            className="form-control"
          >
            <option value="">Pilih Jenis Jangka Waktu</option>
            {jenisList.map(jenis => (
              <option key={jenis.idJenisJangkaWaktu} value={jenis.idJenisJangkaWaktu}>
                {jenis.jenisJangkaWaktu}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="jangkaWaktuSewa">Jangka Waktu Sewa</label>
          <input
            type="text"
            id="jangkaWaktuSewa"
            value={formData.jangkaWaktuSewa}
            onChange={(e) => setFormData({ ...formData, jangkaWaktuSewa: e.target.value })}
            placeholder="Contoh: 1 Bulan / 12 Minggu"
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="keterangan">Keterangan</label>
          <textarea
            id="keterangan"
            value={formData.keterangan}
            onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
            placeholder="Masukkan keterangan"
            className="form-control"
          />
        </div>
        
        <div className="form-group checkbox-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
            />
            <span className="checkbox-text">Default?</span>
          </label>
        </div>
        
        <div className="form-buttons">
          <button type="button" onClick={handleBack} className="btn btn-cancel">Batal</button>
          <button type="submit" disabled={isLoading} className="btn btn-save">
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JangkaWaktuSewaFormAdd;