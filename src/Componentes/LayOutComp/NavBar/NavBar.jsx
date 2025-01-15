import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { mediaContext } from '../../../Context/MediaStore';
import { FetchWishlistContext } from '../../../Context/WishList';
import logos from '../../../images/logoO.png';
import { FetchCartContext } from './../../../Context/Cart';
import styles from './NavBar.module.scss';
export default function NavBar() {
  const navigate = useNavigate();
  const { numOfCart } = useContext(FetchCartContext);
  const { userData, LogOut } = useContext(mediaContext);
  const { numOfWishlistItems } = useContext(FetchWishlistContext);
  const Role = userData?.role;

  const handleCart = () => {
    navigate("/Cart");
  };

  useEffect(() => {
    console.log("NavBar is re-rendering, numOfCart: ", numOfCart);
  }, [numOfCart, numOfWishlistItems]);

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#d3d3d3' }} className={styles.navbar}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          <img src={logos} alt='logo' className={styles.logo} />
          Rosheta
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav style={{ maxHeight: '400px', flexGrow: 1 }}>
            {userData ? (
              <>
                {Role === "user" && (
                  <>
                    <Nav.Link as={Link} to='' className={styles.link}>Home</Nav.Link>
                    <Nav.Link as={Link} to='Products' className={styles.link}>Products</Nav.Link>
                    <Nav.Link as={Link} to='MedicalTests' className={styles.link}>Medical Tests</Nav.Link>
                    <Nav.Link as={Link} to='MedicalTourism' className={styles.link}>Medical Tourism</Nav.Link>
                    <Nav.Link as={Link} to='Alternative' className={styles.link}>Alternatives</Nav.Link>
                  </>)}
                {Role === "admin" && (
                  <>
                    <Nav.Link as={Link} to='' className={styles.link}>Add Product</Nav.Link>
                    <Nav.Link as={Link} to='ProductManager' className={styles.link}>Product Manager</Nav.Link>
                  </>
                )}
              </>
            ) : ''}
          </Nav>

          <div className={styles.iconContainer}>
            {userData ? (
              <div className="d-flex justify-between py-2 ">
                {Role === "user" && (<>
                  <IconButton aria-label="cart" onClick={handleCart} style={{ margin: '0 5px', padding: 0 }}>
                    <Badge badgeContent={numOfCart} color="success">
                      <div style={{
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '40px',
                        height: '40px',
                        transition: 'background-color 0.3s',
                        backgroundColor: 'transparent',
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(58, 130, 130, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <ShoppingCartIcon style={{ width: '20px', height: '20px' }} />
                      </div>
                    </Badge>
                  </IconButton>

                  <Link to='Wishlist' style={{ margin: '0 5px', textDecoration: 'none' }}>
                    <IconButton aria-label="wishlist" style={{ padding: 0 }}>
                      <Badge badgeContent={numOfWishlistItems} color="error">
                        <div style={{
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          borderRadius: '8px',
                          padding: '5px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '40px',
                          height: '40px',
                          transition: 'background-color 0.3s',
                          backgroundColor: 'transparent',
                        }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(58, 130, 130, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <FavoriteIcon style={{ width: '20px', height: '20px' }} />
                        </div>
                      </Badge>
                    </IconButton>
                  </Link>
                </>)}
                <Link to="/Orders" style={{ margin: '0 5px', textDecoration: 'none' }}>
                  <IconButton
                    className={`btn btn-light border rounded-3`}
                    aria-label="profile"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      fontSize: '1.2rem',
                      padding: '5px 10px',
                      fontWeight: '200',
                    }}
                  >
                    <HistoryIcon style={{ marginRight: '5px', width: '20px', height: '20px' }} />
                    Orders
                  </IconButton>
                </Link>
                <Link to="/profile" style={{ margin: '0 5px', textDecoration: 'none' }}>
                  <IconButton
                    className={`btn btn-light border rounded-3`}
                    aria-label="profile"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      fontSize: '1.2rem',
                      padding: '5px 10px',
                      fontWeight: '200',
                    }}
                  >
                    <PersonIcon style={{ marginRight: '5px', width: '20px', height: '20px' }} />
                    Profile
                  </IconButton>
                </Link>


                <Link style={{ textDecoration: 'none' }}>
                  <IconButton
                    onClick={LogOut}
                    className={`btn btn-outline-danger border rounded-3`}
                    aria-label="logout"
                    style={{
                      margin: '0 5px',
                      display: 'flex',
                      alignItems: 'center',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      fontSize: '1.2rem',
                      padding: '5px 10px',
                      color: '#cc1d1d',
                      fontWeight: '200',
                    }}
                  >
                    <LogoutIcon style={{ marginRight: '5px', width: '20px', height: '20px' }} />
                    Logout
                  </IconButton>
                </Link>
              </div>
            ) : (
              <Form className="d-flex justify-content-end w-25 pe-4">
                <Link to="Login" style={{ textDecoration: 'none' }}>
                  <button className='btn btn-info my-2'>LogIn</button>
                </Link>
                <Link to="SignUp" style={{ textDecoration: 'none' }}>
                  <button className='btn btn-success ms-3 my-2'>SignUp</button>
                </Link>
              </Form>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
