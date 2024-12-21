import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AddShoe() {
  const navigate = useNavigate();
  const [shoe, setShoe] = useState({
    name: '',
    price: '',
    size: '',
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'shoes'), {
        ...shoe,
        price: Number(shoe.price)
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding shoe:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoe(prevShoe => ({
      ...prevShoe,
      [name]: value
    }));
  };

  return (
    <div className="form-container max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">เพิ่มรองเท้า</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">ชื่อรองเท้า:</label>
          <input
            type="text"
            name="name"
            value={shoe.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">ราคา:</label>
          <input
            type="number"
            name="price"
            value={shoe.price}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">ไซส์:</label>
          <input
            type="text"
            name="size"
            value={shoe.size}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="button button-primary w-full">
          เพิ่มรองเท้า
        </button>
      </form>
    </div>
  );
}

export default AddShoe;