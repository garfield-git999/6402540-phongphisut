import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function ShoeList() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShoes();
  }, []);

  const fetchShoes = async () => {
    try {
      const shoesCollection = collection(db, 'shoes');
      const snapshot = await getDocs(shoesCollection);
      const shoeList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setShoes(shoeList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shoes:', error);
      setLoading(false);
    }
  };

  const deleteShoe = async (id) => {
    if (window.confirm('คุณต้องการลบรายการนี้ใช่หรือไม่?')) {
      try {
        await deleteDoc(doc(db, 'shoes', id));
        fetchShoes();
      } catch (error) {
        console.error('Error deleting shoe:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">รายการรองเท้า</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shoes.map(shoe => (
          <div key={shoe.id} className="shoe-card">
            <div className="shoe-info">
              <h3 className="text-xl font-semibold mb-2">{shoe.name}</h3>
              <p className="text-gray-600 mb-1">฿{Number(shoe.price).toLocaleString()}</p>
              <p className="text-gray-600 mb-4">ไซส์: {shoe.size}</p>
              <div className="flex space-x-2">
                <Link to={`/edit/${shoe.id}`} className="button button-primary flex-1">
                  แก้ไข
                </Link>
                <button
                  onClick={() => deleteShoe(shoe.id)}
                  className="button button-danger flex-1"
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoeList;
