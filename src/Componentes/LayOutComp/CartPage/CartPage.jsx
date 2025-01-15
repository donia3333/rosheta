import React, { useContext, useEffect, useState } from 'react';
import { FetchCartContext } from './../../../Context/Cart';
import { mediaContext } from './../../../Context/MediaStore';
import styles from './CartPage.module.scss'; 
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Footer from '../../Ui/Footer/Footer';
import axios from 'axios';
import emptyCartImage from '../../../images/Cartempty.png';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../BaseUrl/base'

const CartPage = () => {
    const navigate = useNavigate(); 
    const { cart, UpdateProductCart, deleteProductCart, clearCart } = useContext(FetchCartContext);
    const { userData } = useContext(mediaContext);

    const cartItems = cart?.items || [];

    const [totals, setTotals] = useState({
        subtotal: 0,
        shippingFees: 40,
        totalPrice: 0,
    });

    const [paymentMethod, setPaymentMethod] = useState('cash');

    useEffect(() => {
        const subtotal = cartItems.reduce((acc, item) => {
            const price = item.productId.offer? parseFloat(item.productId.price)*0.8 : parseFloat(item.productId.price);
            const count = item.quantity;

            if (!isNaN(price) && !isNaN(count)) {
                return acc + (price * count);
            }
            return acc;
        }, 0);
        
        const totalPrice = subtotal + totals.shippingFees;

        setTotals({ subtotal, shippingFees: totals.shippingFees, totalPrice });
    }, [cartItems, totals.shippingFees]);

    const handlePayment = () => {
        if (paymentMethod === 'cash') {
            handleCashPayment();
        } else if (paymentMethod === 'visa') {
            handleVisaPayment();
        }
    };
    const handleCashPayment = async () => {
        try {
            const response = await axios.post(`${BaseUrl}/carts/payment/cash`, {
                userId: userData.userId,
                items: cart.items.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                })),
            });
    
            if (!response.data.success) {
                throw new Error('Cash payment failed.');
            }
    
            // Notify the user of success
            toast.success('Cash payment successful. ' , {
                autoClose: 2000,
                theme: 'dark',
                position: 'top-center',
            });
    
            clearCart(); // Clear the cart after successful payment
    
        } catch (error) {
            console.error('Cash Payment Error:', error);
            toast.error('Cash payment failed. Please try again.', {
                autoClose: 2000,
                theme: 'dark',
                position: 'top-center',
            });
        }
    };
    
    const handleVisaPayment = async () => {
        try {
            const payload = {
                userId: userData.userId,
                items: cart.items.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                })),
                paymentMethod: 'Credit Card',
            };
            console.log('Request Payload:', payload); // Log the request payload
    
            const response = await axios.post(`${BaseUrl}/payment/create-payment`, payload);
    
            if (!response.data.paymentToken) {
                throw new Error('Payment token is missing from the response.');
            }
    
            const orderId = response.data.orderId; 
            const paymentUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${871391}?payment_token=${response.data.paymentToken}`;
            
            window.open(paymentUrl, '_blank');
    
            clearCart(); 
            //await completePayment(orderId);
    
        } catch (error) {
            console.error('Payment Error:', error);
            toast.error('Payment failed. Please try again.', {
                autoClose: 2000,
                theme: 'dark',
                position: 'top-center',
            });
        }
    };
    
    const handleQuantityChange = (productId, newCount, stockQuantity) => {
        const item = cart.items.find(item => item.productId._id === productId);
        if (!item) return;

        if (newCount > stockQuantity) {
            toast.error(`Cannot exceed stock quantity of ${stockQuantity} units`, {
                autoClose: 1000,
                theme: 'dark',
                position: 'bottom-center',
            });
            return;
        }

        if (newCount < 1) {
            deleteProductCart(productId);
            return;
        }

        UpdateProductCart(productId, newCount);
    };
    const handleCheckout = () => {
        // if (cartItems.length === 0) {
        //     toast.error('Your cart is empty. Please add items to your cart before proceeding.');
        //     return;
        // }



        // clearCart();
    };

    return (
        <div>
            <Container>
                <h2 className={styles.name}>
                    {userData.userName ? `${userData.userName}'s Cart` : "Your Cart"}
                </h2>
                <div className={`row ${styles.cartContainer}`}>
                    <div className="col-12 col-lg-8">
                        {cart.items.length === 0 ? (
                            <div className={styles.emptyCartContainer}>
                            <img src={emptyCartImage} alt="Your cart is empty" className={`img-fluid ${styles.emptyCartImage}`} />
                            {/* <p className={styles.emptyCartMessage}>Your cart is empty.</p> */}
                            <button onClick={() => navigate('/products')} className={styles.browseProductsButton}>
                                Browse Products
                            </button>
                        </div>
                        ) : (
                            <div className={styles.cartItems}>
                                {cart.items.map(item => (
                                    <div key={item.productId._id} className={`row mb-3 ${styles.cartItem}`}>
                                        <div className="col-12 d-flex align-items-center">
                                            <img 
                                                src={item.productId.image} 
                                                alt={item.productId.name} 
                                                className={`img-fluid ${styles.cartItemImage}`} 
                                            />
                                            <div className={`d-flex flex-column ${styles.cartItemDetails}`}>
                                                <h4 className={styles.cartItemTitle}>{item.productId.name}</h4>
                                                <p className={styles.cartItemDescription}>{item.productId.description}</p>
                                                <p className={styles.cartItemPrice}>Price: {item.productId.offer? parseFloat(item.productId.price*0.8).toFixed(2) :parseFloat(item.productId.price).toFixed(2)}EG</p>
                                                <p className={styles.cartItemStock}>Total in Stock: {item.productId.quantity} units</p>
                                                <div className={`d-flex align-items-center ${styles.cartItemQuantity}`}>
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1, item.productId.quantity)}
                                                        className={`btn btn-secondary ${styles.quantityButton}`}
                                                    >
                                                        -
                                                    </button>
                                                    <span className={styles.quantityCount}>{item.quantity}</span>
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1, item.productId.quantity)}
                                                        className={`btn btn-secondary ${styles.quantityButton}`}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => deleteProductCart(item.productId._id)} 
                                                    className={`btn btn-outline-danger mt-4`}
                                                >
                                                    Remove From Cart <i className="fa-solid fa-cart-shopping"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-4 ">
                        {/* Order Summary Section */}
                        <div className={styles.cartSummary}>
                            <h3 className={styles.h3}>Order Summary</h3>
                            <div className={styles.summaryDetails}>
                                <div className={styles.summaryItem}>
                                    <span>Subtotal </span>
                                    <span>{totals.subtotal.toFixed(2)} EGY</span>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span>Shipping Fees </span>
                                    <span>{totals.shippingFees} EGY</span>
                                </div>
                                <div className={[styles.summaryItem]}>
                                    <span>Total Products </span>
                                    <span>{cart.items.reduce((acc, item) => acc + item.quantity, 0)} items</span>
                                </div>
                                <hr className={styles.divider} />
                                <div className={styles.totalSection}>
                                    <h4 className={styles.h4}>Total</h4>
                                    <h4 className={styles.h4}>{totals.totalPrice.toFixed(2)} EGY</h4>
                                </div>
                            </div>
                            {/* <button 
                                className={`btn btn-success ${styles.checkoutButton}`}
                                onClick={handleCheckout}
                                disabled={cart.items.length === 0}
                            >
                                CHECKOUT
                            </button> */}
                            <button 
                                onClick={() => clearCart()} 
                                className={`btn btn-danger ${styles.clearCartButton}`}
                            >
                                Clear Cart
                            </button>
                        </div>
                        {/* Payment Section */}
                        <div className={styles.cartSummary}>
                            <h4 className={styles.h4}>Payment Method</h4>
                            <div className={styles['payment-options']}>
                                <div 
                                    className={styles['payment-option']} 
                                    onClick={() => setPaymentMethod('visa')}
                                    style={{
                                        borderColor: paymentMethod === 'visa' ? '#00f' : '#ddd',
                                        backgroundColor: paymentMethod === 'visa' ? '#e0f7fa' : '#fff',
                                    }}
                                >
                                    <div className={styles['payment-icon']}>
                                        <i className="fa-solid fa-credit-card" />
                                    </div>
                                    <div className={styles['payment-details']}>
                                        <span className={styles['payment-subtitle']}>Debit/Credit Card</span>
                                        <span className={styles['payment-description']}>Monthly installments plans available</span>
                                    </div>
                                </div>
                                <div 
                                    className={styles['payment-option']} 
                                    onClick={() => setPaymentMethod('cash')}
                                    style={{
                                        borderColor: paymentMethod === 'cash' ? '#00f' : '#ddd',
                                        backgroundColor: paymentMethod === 'cash' ? '#e0f7fa' : '#fff',
                                    }}
                                >
                                    <div className={styles['payment-icon']}>
                                        <i className="fa-solid fa-money-bill-wave" />
                                    </div>
                                    <div className={styles['payment-details']}>
                                        <span className={styles['payment-subtitle']}>Cash On Delivery</span>
                                        <span className={styles['payment-description']}>Extra charges may be applied</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handlePayment} className={`btn btn-success ${styles.checkoutButton}`}>
                                Click to order
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CartPage;
