import React, { useEffect, useState, useContext } from 'react'; 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Styles from './BestSeller.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FetchCartContext } from './../../../../Context/Cart';
import { FetchWishlistContext } from '../../../../Context/WishList';
import { BaseUrl } from '../../../BaseUrl/base'
import { Link } from 'react-router-dom';
function BestSeller() {
    const { addProductToWishlist, wishlist, getProductWishlist, deleteProductFromWishlist } = useContext(FetchWishlistContext);
    const { AddProductToCart, deleteProductCart, cart, getProductCart } = useContext(FetchCartContext);
    
    const [wishListIds, setWishListIds] = useState([]);
    const [bestSellerCounts, setBestSellerCounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartIds, setCartIds] = useState([]);
    const [loadingMap, setLoadingMap] = useState({});

    useEffect(() => {
        
        if (wishlist?.result) {
            const newWishListIds = wishlist.result.map(item => item?._id).filter(id => id);
            setWishListIds(newWishListIds);
        }

        if (cart?.items) {
            const newCartIds = cart.items.map(item => item.productId?._id).filter(id => id);
            setCartIds(newCartIds);
        }
    }, [cart, wishlist]);

    const handleAddToCart = async (productId, method) => {
        setLoadingMap(prev => ({ ...prev, [productId]: true }));

        try {
            if (method === 'post') {
                console.log(`Adding to cart: ${productId}`);
                await AddProductToCart(productId);
                setCartIds(prev => [...prev, productId]);
            } else {
                console.log(`Removing from cart: ${productId}`);
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

    const handleWishlist = async (productId, method) => {
        try {
            if (method === 'post') {
                console.log(`Adding to wishlist: ${productId}`);
                await addProductToWishlist(productId);
                setWishListIds(prev => [...prev, productId]);
            } else {
                console.log(`Removing from wishlist: ${productId}`);
                await deleteProductFromWishlist(productId);
                setWishListIds(prev => prev.filter(id => id !== productId));
            }
            await getProductWishlist();
        } catch (error) {
            console.error("Error handling wishlist action:", error);
        }
    };

    const fetchBestSellerCounts = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/products/getAllProducts`);
            const allProducts = response  .data.allProducts || [];
            const bestSellerItems = allProducts.filter(item => item.bestSeller === true);
            setBestSellerCounts(bestSellerItems);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBestSellerCounts();
    }, []);


    if (loading) return <Container><i className="fa-solid fa-capsules text-danger fa-spin fa-3x d-block mx-auto text-center mt-4"></i></Container>;
    if (error) return <Container><p>Error: {error}</p></Container>;

    return (
        <Container className="mt-4">
            <div className={Styles.cont}>
                <h2 className={Styles.title}>{"Our Best Seller "}</h2>
                <Link to="/Products"> 
                    <h5 className={Styles.all} onClick={() => window.scrollTo(0, 0)} >{"See All Products "} <FontAwesomeIcon icon={faArrowRight} size="1x" /></h5>
                </Link>
            </div>
            <div className="row">
                {bestSellerCounts.slice(0, 12).map((item) => {
                    if (!item) return null; 
                    const isCarted = cartIds.includes(item._id);
                    const isLoading = loadingMap[item._id];
                    const isWishList = wishListIds.includes(item._id);


                    return (
                        <div className="col-xl-2 col-md-4 col-12  mb-3" key={item._id}>
                            <Card className={Styles.card}>
                                <Card.Title className={[Styles.text, Styles.category]}>{item.category}</Card.Title>
                                <div className={Styles.BestSeller}>BestSeller</div>
                                <Card.Img variant="top" className={[Styles.images]} src={item.image} />
                                <Card.Body className={Styles.cardBody}>
                                    <br />
                                    <Card.Title className={Styles.text}>{item.name}</Card.Title>
                                    <Card.Text className={[Styles.text, Styles.price, 'mb-3']}>
                                        {item.price} EG
                                    </Card.Text>
                                    <div className={[Styles.contain]}>
                                        
                                        
                                        { item.quantity>0?
                                            <Button
                                            variant={isCarted ? 'danger' : 'success'}
                                            onClick={() => handleAddToCart(item._id, isCarted ? 'delete' : 'post')}
                                            className={`w-80 ${isCarted ? 'btn-danger' : Styles.button}`}
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
                                            </Button>
                                            :
                                            <Button 
                                                variant={'danger'}
                                                className={`${Styles.button} bg-danger}`}
                                                disabled
                                            >
                                                Sold out <i class="fas fa-frown"></i>
                                            </Button>

                                                }
                                        <div onClick={() => handleWishlist(item._id, isWishList ? 'delete' : 'post')} className={`${[Styles.heart]} `}>
                                            <i className={`${Styles.ii} ${isWishList ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
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

export default BestSeller;
