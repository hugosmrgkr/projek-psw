import React from 'react';

const Form = ({ formData, setFormData, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Jenis Jangka Waktu:</label>
        <input
          type="number"
          value={formData.idJenisJangkaWaktu}
          onChange={e => setFormData({ ...formData, idJenisJangkaWaktu: e.target.value })}
        />
      </div>
      <div>
        <label>Jangka Waktu:</label>
        <input
          type="text"
          value={formData.jangkaWaktu}
          onChange={e => setFormData({ ...formData, jangkaWaktu: e.target.value })}
        />
      </div>
      <div>
        <label>Keterangan:</label>
        <input
          type="text"
          value={formData.keterangan}
          onChange={e => setFormData({ ...formData, keterangan: e.target.value })}
        />
      </div>
      <div>
        <label>Default:</label>
        <select
          value={formData.isDefault}
          onChange={e => setFormData({ ...formData, isDefault: e.target.value })}
        >
          <option value="1">Ya</option>
          <option value="0">Tidak</option>
        </select>
      </div>
      <button type="submit">Simpan</button>
    </form>
  );
};

export default Form;
