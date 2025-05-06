import React, { useState } from 'react';
import { create } from '../../api/JangkaWaktuSewa';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idJenisJangkaWaktu: '',
    jangkaWaktu: '',
    keterangan: '',
    isDefault: '0',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await create(formData);
    navigate('/jangka-waktu-sewa');
  };

  return (
    <div>
      <h2>Tambah Jangka Waktu Sewa</h2>
      <Form formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Create;
