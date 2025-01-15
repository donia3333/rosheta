import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { mediaContext } from '../../../Context/MediaStore';
import styles from './Orders.module.scss';
import { Container, Button, Modal, Spinner } from 'react-bootstrap';
import noOrder from '../../../images/noOrder.jpg';
import { toast } from 'react-toastify';
import { BaseUrl } from '../../BaseUrl/base'
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const { userData, Role } = useContext(mediaContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [paymentError, setPaymentError] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [statusToUpdate, setStatusToUpdate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError('');
        
            try {
                const endpoint = Role === 'admin' ? `${BaseUrl}/orders/getAllOrders` : `${BaseUrl}/orders/getOrders?userId=${userData.userId}`;
                const response = await axios.get(endpoint);
        
                if (response.data.success) {
                    if (Array.isArray(response.data.orders)) {
                        if (response.data.orders.length > 0) {
                            setOrders(response.data.orders);
                        } else {
                            throw new Error('No orders found.');
                        }
                    } else {
                        throw new Error('Orders data is not an array.');
                    }
                } else {
                    throw new Error('Failed to fetch orders.');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Error fetching orders: ' + err.message);
            } finally {
                setLoading(false);
            }
        };             

        fetchOrders();
    }, [userData, Role]);

    const openModal = (order) => {
        setSelectedOrder(order);
        setStatusToUpdate(order.status); 
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setPaymentStatus(null);
        setPaymentError('');
    };

    const handleUpdateStatus = async () => {
        if (selectedOrder.status === 'completed') {
            setPaymentError('Cannot update status.');
            return;
        }

        if (!['pending', 'canceled','completed'].includes(statusToUpdate)) return;

        try {
            const response = await axios.put(`http://localhost:3000/orders/${selectedOrder._id}/updateStatus`, {
                status: statusToUpdate,
            });

            if (response.data.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === selectedOrder._id ? { ...order, status: statusToUpdate } : order
                    )
                );
                setSelectedOrder({ ...selectedOrder, status: statusToUpdate });
                setPaymentStatus(true);
                setPaymentError(false);
                toast.success('Order status updated successfully!');
            } else {
                throw new Error('Failed to update order status.');
            }
        } catch (err) {
            setPaymentError('Error updating order status: ' + err.message);
            setPaymentStatus(false);
            toast.error('Error updating order status: ' + err.message);
        }
    };

    if (loading) {
        return (
            <Container className={styles.loadingContainer}>
                <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Spinner animation="border" />
                </div>
            </Container>
        );
    }


    return (
        <Container>
            <div className="row justify-content-center">
                {Role==='user'?
                    <h2 className={styles.name}>
                    {userData.userName ? `${userData.userName}'s Orders` : "Your Orders"}
                    </h2>
                :
                    <h2 className={styles.name}>
                    Order Management
                    </h2>
                }
                {orders.length > 0? (
                    orders.map((order) => (
                        <div key={order._id} className="col-lg-4 col-md-6 col-sm-10 mt-4 mb-4">
                            <div className={styles.card} onClick={() => openModal(order)}>
                                <div className={`${styles.badge} ${styles[order.status]}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </div>
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.cardTitle}>
                                        Order ID: <br /> {order._id}
                                    </h3>
                                </div>
                                <div className={styles.cardBody}>
                                    {Role==='user'?
                                    <>
                                        <p><i className="fas fa-user"></i> User: {order.userId?.userName || 'N/A'}</p>
                                        <p><i className="fas fa-envelope"></i> Email: {order.userId?.email || 'N/A'}</p>
                                    </>
                                    :
                                    <>
                                    <p><i className="fas fa-user"></i> User: {order.userId}</p>
                                    </>
                                    }
                                    <p><i className="fas fa-credit-card"></i> Payment Method: {order.paymentMethod}</p>
                                    <p><i className="fas fa-calendar-alt"></i> Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <Button variant="success" className={styles.cardButton} onClick={() => openModal(order)}>
                                    View More <i className="fas fa-eye"></i>
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        <img src={noOrder} alt="No Order" className={styles.noOrder} />
                        {Role === 'user' ? (
                            <button onClick={() => navigate('/products')} className={styles.browseProductsButton}>
                                Browse Products
                            </button>
                        ) : null}
                    </>
                )}
            </div>

            <Modal show={!!selectedOrder} onHide={closeModal} centered className={styles.modal}>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title className={styles.modalTitle}>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    {selectedOrder ? (
                        <>
                            <h5 className={styles.modalOrderId}>Order ID: {selectedOrder._id}</h5>
                            {Role==='user'?
                                <>
                                <p><i className="fas fa-user"></i> User: {selectedOrder.userId?.userName || 'N/A'}</p>
                                <p><i className="fas fa-envelope"></i> Email: {selectedOrder.userId?.email || 'N/A'}</p>
                                </>
                            :
                            <>
                            <p><i className="fas fa-user"></i> User: {selectedOrder.userId}</p>
                            </>
                            }
                            <p><i className="fas fa-info-circle"></i> Status:
                                <span className={`${styles.cardStatus} ${
                                    selectedOrder.status === 'completed' ? styles.completed : 
                                    selectedOrder.status === 'pending' ? styles.pending : 
                                    selectedOrder.status === 'canceled' ? styles.canceled :
                                    styles.failed
                                }`}>
                                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                </span>
                            </p>
                            <p><i className="fas fa-credit-card"></i> Payment Method: {selectedOrder.paymentMethod}</p>
                            <p><i className="fas fa-calendar-alt"></i> Order Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                            <p><i className="fas fa-money-bill-wave"></i> Total Price: {selectedOrder.totalPrice} EGP</p>
                            <p><i className="fas fa-box"></i> Items:</p>
                            <ul>
                                {selectedOrder.items.map((item, index) => (
                                    <li key={index}>
                                        {item.productId} - Quantity: {item.quantity} 
                                    </li>
                                ))}
                            </ul>
                            
                            {Role === 'admin' && (
                                <div>
                                    <h6 className='text-center'>Update Order Status:</h6>
                                    <select className='w-100 mb-2 text-center bg-dark text-light rounded p-2' value={statusToUpdate} onChange={(e) => setStatusToUpdate(e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="canceled">Canceled</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <br></br>
                                    <Button variant="success" className='w-100 mb-4' onClick={handleUpdateStatus}>Update</Button>
                                    {paymentError && <p className={styles.error}>{paymentError}</p>}
                                </div>
                            )}
                        </>
                    ) : (
                        <Spinner animation="border" />
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Orders;
