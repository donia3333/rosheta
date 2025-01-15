import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { FetchWishlistContext } from '../../../Context/WishList';
import noProduct from '../../../images/nproduct.png';
import { FetchCartContext } from './../../../Context/Cart';
import Styles from './product.module.scss';
export default function Product({ categoryProducts = [], categoryName = '', loading }) {

  const { AddProductToCart, deleteProductCart, cart, getProductCart } = useContext(FetchCartContext);
  const { addProductToWishlist, wishlist, getProductWishlist,
    deleteProductFromWishlist } = useContext(FetchWishlistContext)
  const [cartIds, setCartIds] = useState([]);
  const [wishListIds, seWishListIds] = useState([]);
  const [loading2, setLoading2] = useState({});


  useEffect(() => {
    if (cart && cart.items) {
      const newCartIds = cart.items.map(item => item.productId._id);
      setCartIds(newCartIds);
    }
    if (wishlist && wishlist.result) {
      const newWishListIds = wishlist.result.map(item => item._id);
      seWishListIds(newWishListIds);
    }
  }, [cart, wishlist, categoryProducts]);

  const handleAddToCart = async (productId, method) => {
    setLoading2(prev => ({ ...prev, [productId]: true }));
    if (method === 'post') {
      await AddProductToCart(productId);
      setCartIds(prev => [...prev, productId]);
    } else {
      await deleteProductCart(productId);
      setCartIds(prev => prev.filter(id => id !== productId));
    }
    setLoading2(prev => ({ ...prev, [productId]: false }));
    getProductCart();
  };
  const handlWishlist = async (productId, method) => {
    if (method === 'post') {
      await addProductToWishlist(productId);
      seWishListIds(prev => [...prev, productId]);
    } else {
      await deleteProductFromWishlist(productId);
      seWishListIds(prev => prev.filter(id => id !== productId));
    }
    getProductWishlist();
  };

  return (
    <Container className={`${Styles.allProduct} mt-4`}>
      <div className={Styles.cont}>
        <h2 className={Styles.title}>{categoryName} Products💊</h2>
      </div>
      <div className="row mt-3">
        {categoryProducts.length === 0 && <div className='text-center'>
          <img src={noProduct} alt="No Product" className={Styles.noProduct} />
        </div>}
        {loading ? (
          <div className="text-center">
            <i className="fa-solid fa-capsules text-danger fa-spin fa-3x"></i>
          </div>
        ) : categoryProducts ? (
          <>
            {categoryProducts && categoryProducts.map((item, index) => {
              const isCarted = cartIds.includes(item.productId);
              const iswishList = wishListIds.includes(item.productId);
              const modalId = `${categoryName.replace(/\s+/g, '')}_${item.productId}`;
              return (
                <div className="col-xl-2 col-md-4 col-12 mb-5" key={index}>
                  <Card className={Styles.card}>
                    <Link data-bs-toggle="modal" data-bs-target={`#${modalId}`} className='linkk'>
                      <Card.Title className={[Styles.text, Styles.category]}>{categoryName}</Card.Title>
                      {item.bestSeller ? <div className={Styles.BestSeller}>BestSeller</div> : ''}
                      {item.offer ? <div className={`${Styles.BestSeller} bg-secondary`}>offer</div> : ''}
                      <Card.Img variant="top" className={[Styles.images]} src={item.image} />
                    </Link>
                    <Card.Body className={Styles.cardBody}>
                      <br />
                      <Card.Title className={Styles.text}>{item.name}</Card.Title>

                      {item.offer ? (
                        <>
                          <Card.Text className={[Styles.text, Styles.price]}>
                            {Math.round((item.price - item.price * 0.2) * 100) / 100} EG
                          </Card.Text>
                          <div className={Styles.text}>
                            <Card.Text className={[Styles.price, Styles.over]}>
                              {item.price} EG
                            </Card.Text>
                            <span className={Styles.percent}>20%</span>
                          </div>
                        </>
                      ) : <Card.Text className={[Styles.text, Styles.price, 'mb-4 pb-3']}>
                        {item.price} EG
                      </Card.Text>}
                      <div className={[Styles.contain]}>
                        <div>

                          {item.quantity > 0 ?
                            <Button
                              variant={isCarted ? 'danger' : 'success'}
                              onClick={() => handleAddToCart(item.productId, isCarted ? 'delete' : 'post')}
                              className={`${Styles.button} ${isCarted ? 'bg-danger' : ''}`}
                              disabled={loading2[item.productId]}
                            >
                              {loading2[item.productId] ? (
                                <i className="fa-solid fa-cart-shopping fa-spin"></i>
                              ) : (
                                <>
                                  {isCarted ? "Remove" : "Add to"}
                                  <FontAwesomeIcon icon={faCartShopping} className={Styles.icon} />
                                </>
                              )}
                            </Button> :
                            <Button
                              variant={'danger'}
                              className={`${Styles.button} bg-danger}`}
                              disabled
                            >
                              Sold out <i class="fas fa-frown"></i>

                            </Button>

                          }
                        </div>
                        <div onClick={() => handlWishlist(item.productId, iswishList ? 'delete' : 'post')}
                          className={`${[Styles.heart]} `}>
                          <i className={`${Styles.ii} ${iswishList ? 'fa-solid' : 'fa-regular'}  fa-heart`}></i>

                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  {/* Modal Code */}
                  <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby={`exampleModalLabel${index}`} aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5 text-danger" id={`exampleModalLabel${index}`}>{item.name}</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex flex-column flex-md-row">
                          <div className="col-md-6">
                            <img src={item.image} className="img-fluid rounded" alt={item.name} style={{ maxHeight: '300px', objectFit: 'cover' }} />
                          </div>
                          <div className="col-md-6 ps-md-3">
                            <h4 className='text-muted'>{categoryName}</h4>
                            <p className='text-muted fs-5'><strong className='text-black'>Description:</strong> {item.description}</p>
                            <p className='text-muted fs-5'><strong className='text-black'>Quantity:</strong> {item.quantity > 0 ? item.quantity : "Out of stock"}</p>
                            {item.offer ? (
                              <>
                                <Card.Text>
                                  <p className='text-muted fs-5'><strong className='text-black'>Price:</strong>  {Math.round((item.price - item.price * 0.2) * 100) / 100} EG</p>


                                </Card.Text>
                                <div>
                                  <Card.Text className={[Styles.price, Styles.over]}>
                                    {item.price} EG
                                  </Card.Text>
                                  <span className={Styles.percent}>20%</span>
                                </div>
                              </>
                            ) : <p className='text-muted fs-5'><strong className='text-black'>Price:</strong> {item.price} EG</p>}
                            <div className={[Styles.contain]}>

                              {item.quantity > 0 ?
                                <Button
                                  variant={isCarted ? 'danger' : 'success'}
                                  onClick={() => handleAddToCart(item.productId, isCarted ? 'delete' : 'post')}
                                  className={`${Styles.button} w-75 ${isCarted ? 'bg-danger' : ''}`}
                                  disabled={loading2[item.productId]}
                                >
                                  {loading2[item.productId] ? (
                                    <i className="fa-solid fa-cart-shopping fa-spin"></i>
                                  ) : (
                                    <>
                                      {isCarted ? "Remove" : "Order"}
                                      <FontAwesomeIcon icon={faCartShopping} className={Styles.icon} />
                                    </>
                                  )}
                                </Button> :
                                <Button
                                  variant={'danger'}
                                  className={`${Styles.button} w-75 bg-danger}`}
                                  disabled
                                >
                                  Sold out <i class="fas fa-frown"></i>

                                </Button>

                              }
                              <div onClick={() => handlWishlist(item.productId, iswishList ? 'delete' : 'post')}
                                className={`${[Styles.heart]} `}>
                                <i className={`${Styles.ii} ${iswishList ? 'fa-solid' : 'fa-regular'}  fa-heart`}></i>

                              </div>

                            </div>
                          </div>
                        </div>
                        <div className="modal-footer ">
                          <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
}


