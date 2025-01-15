import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Styles from './Offers.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FetchCartContext } from './../../../../Context/Cart';
import { FetchWishlistContext } from '../../../../Context/WishList';
import { BaseUrl } from '../../../BaseUrl/base'

function Offers() {
    const {addProductToWishlist,wishlist,getProductWishlist,
        deleteProductFromWishlist}=useContext(FetchWishlistContext);
    const [wishListIds, seWishListIds] = useState([]);
    const { AddProductToCart, deleteProductCart, cart, getProductCart } = useContext(FetchCartContext);
    const [offerCounts, setOfferCounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartIds, setCartIds] = useState([]);
    const [loadingMap, setLoadingMap] = useState({});

    useEffect(() => {
        if (wishlist && wishlist.result) {
            const newWishListIds = wishlist.result.map(item => item._id);
            seWishListIds(newWishListIds);
          }
        if (cart && cart.items) {
            const newCartIds = cart.items.map(item => item.productId ? item.productId._id : null).filter(id => id !== null);
            setCartIds(newCartIds);
        }
    }, [cart,wishlist]);
    const handlWishlist = async (productId, method) => {
        try{
        if (method === 'post') {
          await addProductToWishlist(productId);
          seWishListIds(prev => [...prev, productId]);
        } else {
          await deleteProductFromWishlist(productId);
          seWishListIds(prev => prev.filter(id => id !== productId));
        }
        getProductWishlist();}
        catch (error) {
        console.error("Error handling cart action:", error);
    } 
      };
    const handleAddToCart = async (productId, method) => {
        setLoadingMap(prev => ({ ...prev, [productId]: true }));

        try {
            if (method === 'post') {
                await AddProductToCart(productId);
                setCartIds(prev => [...prev, productId]);
            } else {
                await deleteProductCart(productId);
                setCartIds(prev => prev.filter(id => id !== productId));
            }
            await getProductCart();
        } catch (error) {
            console.error("Error handling cart action:", error);
        } finally {
            setLoadingMap(prev => ({ ...prev, [productId]: false }));
        }
    };

    const fetchOfferCounts = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/products/getAllProducts`);
            const allProducts = response.data.allProducts || [];
            const offerItems = allProducts.filter(item => item.offer === true);
            setOfferCounts(offerItems);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOfferCounts();
    }, []);

    
    if (loading) {
        return <i className="fa-solid fa-capsules text-danger fa-spin fa-3x d-block mx-auto text-center mt-4"></i>;
    }

    if (error) {
        return <Container><p>Error: {error}</p></Container>;
    }

    return (
        <Container className="mt-4">
            <div className={Styles.cont}>
                <h2 className={Styles.title}>{"Top Offers"}</h2>
            </div>
            <div className="row">
                {offerCounts.slice(0, 12).map(item => {
                    if (!item) return null; 
                    const isCarted = cartIds.includes(item._id); 
                    const isLoading = loadingMap[item._id];
                    const iswishList = wishListIds.includes(item._id);
                    return (
                        <div className="col-xl-2 col-md-4 col-12 mb-3" key={item._id}>
                            <Card className={Styles.card}>
                                <Card.Title className={[Styles.text, Styles.category]}>{item.category}</Card.Title>
                                <div className={Styles.offer}>Offer</div>
                                <Card.Img variant="top" className={[Styles.images]} src={item.image} />
                                <Card.Body>
                                    <Card.Title className={Styles.text}>{item.name}</Card.Title>
                                    <Card.Text className={[Styles.text, Styles.price]}>
                                        {Math.round((item.price - item.price * 0.2) * 100) / 100} EG
                                    </Card.Text>
                                    <div className={Styles.text}>
                                        <Card.Text className={[Styles.price, Styles.over]}>
                                            {item.price} EG
                                        </Card.Text>
                                        <span className={Styles.percent}>20%</span>
                                    </div>
                                    <div className={Styles.contain}>
                                      
                                        
                                        { item.quantity>0?
                                            <Button
                                            variant={isCarted ? 'danger' : 'success'}
                                            onClick={() => handleAddToCart(item._id, isCarted ? 'delete' : 'post')} 
                                            className={`${Styles.button} ${isCarted ? 'bg-danger' : ''}`}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <i className="fa-solid fa-cart-shopping fa-spin"></i>
                                            ) : (
                                                <>
                                                    {isCarted ? "Remove" : "Add to"}
                                                    <FontAwesomeIcon icon={faCartShopping} className={Styles.icon} />
                                                </>
                                            )}
                                        </Button>:
                                                <Button 
                                                variant={'danger'}
                                                className={`${Styles.button} bg-danger}`}
                                                disabled
                                            >
                                                Sold out <i class="fas fa-frown"></i>
                                            </Button>

                                                }
                                        <div  onClick={() => handlWishlist(item._id, iswishList ? 'delete' : 'post')}
                                                className={`${[Styles.heart]} `}>
                                                <i className={`${Styles.ii} ${iswishList? 'fa-solid':'fa-regular'}  fa-heart`}></i> 
                                                
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}

export default Offers;
