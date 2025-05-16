import React, { useState } from 'react';

const WajibRetribusiFormEdit = ({ data, onClose }) => {
  const [form, setForm] = useState({ ...data });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mocking API request for demo
    setTimeout(() => {
      alert("Data berhasil diperbarui.");
      onClose();
    }, 500);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="title-container">
          <div className="blue-line"></div>
          <h2>Tambah Peruntukan Sewa</h2>
        </div>
      </div>
      
      <div className="form-content">
        <p className="form-instruction">Silakan isi formulir di bawah ini untuk menambahkan peruntukan sewa baru.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>NIK <span className="required">*</span></label>
            <input 
              type="text" 
              name="NIK" 
              placeholder="Masukkan NIK" 
              value={form.NIK || ''} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Nama Wajib Retribusi <span className="required">*</span></label>
            <input 
              type="text" 
              name="namaWajibRetribusi" 
              placeholder="Masukkan nama wajib retribusi" 
              value={form.namaWajibRetribusi || ''} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Pekerjaan <span className="required">*</span></label>
            <input 
              type="text" 
              name="pekerjaan" 
              placeholder="Masukkan pekerjaan" 
              value={form.pekerjaan || ''} 
              onChange={handleChange} 
              required 
            />
            <div className="form-hint">Contoh: Wiraswasta, PNS, Guru</div>
          </div>
          
          <div className="form-group">
            <label>Alamat <span className="required">*</span></label>
            <textarea 
              name="alamat" 
              placeholder="Masukkan alamat lengkap" 
              value={form.alamat || ''} 
              onChange={handleChange} 
              required 
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Nomor Ponsel</label>
            <input 
              type="text" 
              name="nomorPonsel" 
              placeholder="Masukkan nomor ponsel" 
              value={form.nomorPonsel || ''} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Nomor WhatsApp</label>
            <input 
              type="text" 
              name="nomorWhatsapp" 
              placeholder="Masukkan nomor WhatsApp" 
              value={form.nomorWhatsapp || ''} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Masukkan alamat email" 
              value={form.email || ''} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>ID Jenis Retribusi <span className="required">*</span></label>
            <input 
              type="text" 
              name="idJenisRetribusi" 
              placeholder="Masukkan ID jenis retribusi" 
              value={form.idJenisRetribusi || ''} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Link Foto</label>
            <input 
              type="text" 
              name="fileFoto" 
              placeholder="Masukkan link foto" 
              value={form.fileFoto || ''} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-buttons">
            <button type="submit" className="btn-save">
              <span className="btn-icon">💾</span> Simpan Data
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              <span className="btn-icon">✕</span> Batal
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        /* Global styles */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }

        .form-container {
          background-color: #f5f5f5;
          min-height: 100vh;
          padding: 20px;
        }

        /* Form header styles */
        .form-header {
          margin-bottom: 20px;
        }

        .title-container {
          display: flex;
          align-items: center;
        }

        .blue-line {
          width: 5px;
          height: 30px;
          background-color: #2a3c85;
          margin-right: 15px;
        }

        .form-header h2 {
          font-size: 24px;
          color: #333;
        }

        /* Form content styles */
        .form-content {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 25px;
          margin-bottom: 20px;
        }

        .form-instruction {
          color: #666;
          margin-bottom: 20px;
        }

        /* Form group styles */
        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }

        .required {
          color: #f44336;
        }

        .form-hint {
          font-size: 12px;
          color: #777;
          margin-top: 5px;
        }

        /* Input styles */
        input, textarea {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #2a3c85;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        /* Button styles */
        .form-buttons {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }

        .btn-save, .btn-cancel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-save {
          background-color: #4caf50;
          color: white;
        }

        .btn-save:hover {
          background-color: #45a049;
        }

        .btn-cancel {
          background-color: #e0e0e0;
          color: #333;
        }

        .btn-cancel:hover {
          background-color: #d5d5d5;
        }

        .btn-icon {
          margin-right: 5px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default WajibRetribusiFormEdit;