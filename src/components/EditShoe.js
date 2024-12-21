import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

function EditShoe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoe, setShoe] = useState({
    name: '',
    price: '',
    size: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const shoeDoc = await getDoc(doc(db, 'shoes', id));
        if (shoeDoc.exists()) {
          setShoe(shoeDoc.data());
        } else {
          setError('ไม่พบข้อมูลรองเท้า');
        }
      } catch (error) {
        console.error('Error fetching shoe:', error);
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
      } finally {
        setLoading(false);
      }
    };
    fetchShoe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'shoes', id), {
        ...shoe,
        price: Number(shoe.price),
        updatedAt: new Date().toISOString()
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating shoe:', error);
      setError('เกิดข้อผิดพลาดในการอัพเดทข้อมูล');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoe(prevShoe => ({
      ...prevShoe,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container max-w-2xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">แก้ไขรองเท้า</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">ชื่อรองเท้า:</label>
          <input
            type="text"
            name="name"
            value={shoe.name}
            onChange={handleChange}
            className="input-field"
            placeholder="กรุณากรอกชื่อรองเท้า"
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
            placeholder="กรุณากรอกราคา"
            min="0"
            step="0.01"
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
            placeholder="กรุณากรอกไซส์"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="button button-primary flex-1">
            บันทึกการแก้ไข
          </button>
          <button 
            type="button" 
            onClick={handleCancel}
            className="button button-danger flex-1"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditShoe;