import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FetchProduct } from '../../../Context/FetchProduct';
import Product from '../Product/Product';
import styles from './products.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import Slider from './Slide/Slide';

export default function Products() {
  const { hash } = useLocation();
  const { ear, eyes, painkiller, skinCare, haircare, head, depression, internalDiseases, bones, loading } = useContext(FetchProduct);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash, FetchProduct]);



  const [searchTerm, setSearchTerm] = useState('');

  const filterProducts = (products) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <>
      <div className="text-center mt-4">
        <h2 className={styles.welcomeMessage}>Welcome to Our Product Page! 🛍️</h2>
      </div>
      <Slider />
      <Container>
        <div className='row'>
          <div className="search-bar m-4 m-auto mt-4">
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
            </div>
          </div>
        </div>
      </Container>

      <div id="Eyes">
        <Product categoryProducts={filterProducts(eyes)} categoryName={'Eyes'} loading={loading} />
      </div>
      <div id="PainKillers">
        <Product categoryProducts={filterProducts(painkiller)} categoryName={'Pain Killer'} loading={loading} />
      </div>
      <div id="SkinCare">
        <Product categoryProducts={filterProducts(skinCare)} categoryName={'Skin Care'} loading={loading} />
      </div>
      <div id="HairCare">
        <Product categoryProducts={filterProducts(haircare)} categoryName={'Hair Care'} loading={loading} />
      </div>
      <div id="MentalHealth">
        <Product categoryProducts={filterProducts(depression)} categoryName={'Depression and Mental illnesses'} loading={loading} />
      </div>
      <div id="InternalDiseases">
        <Product categoryProducts={filterProducts(internalDiseases)} categoryName={'Internal Diseases'} loading={loading} />
      </div>
      <div id="Bones">
        <Product categoryProducts={filterProducts(bones)} categoryName={'Bones'} loading={loading} />
      </div>
      <div id="Head">
        <Product categoryProducts={filterProducts(head)} categoryName={'Head'} loading={loading} />
      </div>
      <div id="Ears">
        <Product categoryProducts={filterProducts(ear)} categoryName={'Ear'} loading={loading} />
      </div>
    </>
  );
}
