import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { BaseUrl } from "../../../BaseUrl/base";
import Styles from "./ProductManager.module.scss";



const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        category: "",
        quantity: 0,
        bestSeller: false,
        offer: false,
        description: "",
        image: null,
    });

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${BaseUrl}/products/getAllProducts`);
            setProducts(data.allProducts);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const deleteProduct = async (_id) => {
        try {
            await axios.delete(`${BaseUrl}/products/deleteProduct`, {
                data: { _id },
            });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    const updateProduct = async () => {
        try {
            await axios.put(`${BaseUrl}/products/updateProduct`, {
                ...formData,
                _id: editingProduct._id,
            });
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            console.error("Error updating product", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            quantity: product.quantity,
            bestSeller: product.bestSeller,
            offer: product.offer,
            description: product.description,
            image: null,
        });
        setShowModal(true);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="container mt-4 mb-5">
                <h2 className="text-center mb-4">Product List</h2>
                <div className="search-bar w-50 m-auto mt-4">
                    <input
                        type="text"
                        placeholder="Search on products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control p-2 mb-4"
                    />
                </div>
                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    {filteredProducts.map((product) => (
                        <Col key={product._id}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Category: {product.category}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Price:</strong> EGP {product.price.toFixed(2)}<br />
                                        <strong>Quantity:</strong> {product.quantity}<br />
                                        <strong>Best Seller:</strong> {product.bestSeller ? "Yes" : "No"}<br />
                                        <strong>Offer:</strong> {product.offer ? "Yes" : "No"}<br />
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            className={Styles.btn}
                                            onClick={() => handleEditClick(product)}

                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteProduct(product._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className={Styles.textarea}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button className={Styles.btn} onClick={updateProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductManager;
