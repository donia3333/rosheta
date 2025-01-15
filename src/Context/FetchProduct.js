import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { BaseUrl } from '../Componentes/BaseUrl/base';

export const FetchProduct = createContext(null);

export default function FetchProducttProvider(props) {
  const [eyes, setEyes] = useState([]);
  const [painkiller, setPainkiller] = useState([]);
  const [skinCare, setSkinCare] = useState([]);
  const [haircare, setHaircare] = useState([]);
  const [head, setHead] = useState([]);
  const [depression, setDepression] = useState([]);
  const [internalDiseases, setInternalDiseases] = useState([]);
  const [bones, setBones] = useState([]);
  const [ear, setEar] = useState([]);
  const [loading, setLoading] = useState(false);

  let getAllItems = async (category, callBack) => {
    try {
      setLoading(true);
      let { data } = await axios.post(`${BaseUrl}/products/category`, { category });
      callBack(data.products);
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllItems('Ear', setEar);
    getAllItems('eyes', setEyes);
    getAllItems('Pain killer', setPainkiller);
    getAllItems('Skin care', setSkinCare);
    getAllItems('haircare', setHaircare);
    getAllItems('Head', setHead);
    getAllItems('Depression and Mental illnesses', setDepression);
    getAllItems('internal diseases', setInternalDiseases);
    getAllItems('Bones', setBones);
  }, []);

  return (
    <FetchProduct.Provider value={{ ear, eyes, painkiller, skinCare, haircare, head, depression, internalDiseases, bones, loading }}>
      {props.children}
    </FetchProduct.Provider>
  );
}
