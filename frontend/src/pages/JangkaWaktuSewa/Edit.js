import React, { useEffect, useState } from 'react';
import { getById, update } from '../../api/JangkaWaktuSewa';
import { useNavigate, useParams } from 'react-router-dom';
import Form from './Form';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idJenisJangkaWaktu: '',
    jangkaWaktu: '',
    keterangan: '',
    isDefault: '0',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getById(id);
      setFormData(res.data);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update(id, formData);
    navigate('/jangka-waktu-sewa');
  };

  return (
    <div>
      <h2>Edit Jangka Waktu Sewa</h2>
      <Form formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Edit;
