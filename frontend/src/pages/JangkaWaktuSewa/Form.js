import React from 'react';

const Form = ({ formData, setFormData, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID Jenis Jangka Waktu</label>
        <input
          type="text"
          name="idJenisJangkaWaktu"
          value={formData.idJenisJangkaWaktu}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Jangka Waktu</label>
        <input
          type="text"
          name="jangkaWaktu"
          value={formData.jangkaWaktu}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Keterangan</label>
        <textarea
          name="keterangan"
          value={formData.keterangan}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Is Default</label>
        <input
          type="checkbox"
          name="isDefault"
          checked={formData.isDefault === '1'}
          onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked ? '1' : '0' })}
        />
      </div>
      <button type="submit">Simpan</button>
    </form>
  );
};

export default Form;
