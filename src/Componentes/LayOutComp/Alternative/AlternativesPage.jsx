import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styles from'./AlternativesPage.module.scss';
import { Container } from 'react-bootstrap';

const Alternative = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setIsLoading(true); 
        const { data } = await axios.get(`https://pharmacy-backend845.vercel.app/alternatives/getAllAlternatives`); 
        if (Array.isArray(data.allAlternatives)) {
          setMedicines(data.allAlternatives);
          setFilteredMedicines(data.allAlternatives);
        } else {
          console.log("Unexpected response format:", data.allAlternatives);
        }
      } catch (error) {
        console.log("Error fetching medicines:", error);
        setError("Failed to load medicines. Please try again later."); 
      } finally {
        setIsLoading(false); 
      }
    };
    fetchMedicines();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMedicines(filtered);
    } else {
      setFilteredMedicines(medicines); 
    }
  }, [searchQuery, medicines]);

  return (
    <div className={styles.alternativesPage}>
      <h1>Search for Alternatives</h1>
      <input
        type="text"
        placeholder="Search for a medicine..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
        
      />
      {isLoading ? (
        <div><Container><i className="fa-solid fa-capsules text-danger fa-spin fa-3x d-block mx-auto text-center mt-4"></i></Container></div> 
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p> 
      ) : (
        <div className={styles.medicineCards}>
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <div key={medicine._id} className={styles.medicineCard}>
                <img src={medicine.image} alt={medicine.name} className={styles.medicineImage} />
                <h2 className="text-center">{medicine.name}</h2>
                <p><strong>Category:</strong> {medicine.category}</p>
                <p><strong>Description:</strong> {medicine.description}</p>
                <p><strong>Price:</strong> {medicine.price} EG</p>
              </div>
            ))
          ) : (
            <p>No medicines found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Alternative;