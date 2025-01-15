import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BaseUrl } from "../../../BaseUrl/base";
import Styles from "./AddProduct.module.scss";

const AddProduct = () => {
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
    const [isHovered, setIsHovered] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        const productData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            productData.append(key, value);
        });

        try {
            await axios.post(`${BaseUrl}/products/addProduct`, productData);
            setSuccessMessage("Product added successfully!");
            setErrorMessage("");
            setFormData({
                name: "",
                price: 0,
                category: "",
                quantity: 0,
                bestSeller: false,
                offer: false,
                description: "",
                image: null,
            });
        } catch (error) {
            setErrorMessage("Product Already Exists");
            setSuccessMessage("");
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4">Add New Product</h2>
            <Form onSubmit={addProduct} className="p-4 border rounded shadow-sm bg-light">
                {successMessage && <h3 className={Styles.successmsg}>{successMessage}</h3>}
                {errorMessage && <h3 className={Styles.errormsg}>{errorMessage}</h3>}
                <Form.Group controlId="formProductName" className="mb-2">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formProductPrice" className="mb-2">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formProductCategory" className="mb-2">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Ear">Ear</option>
                        <option value="Head">Head</option>
                        <option value="Bones">Bones</option>
                        <option value="internal diseases">Internal Diseases</option>
                        <option value="Depression and Mental illnesses">Depression and Mental Illnesses</option>
                        <option value="haircare">Hair Care</option>
                        <option value="Skin care">Skin Care</option>
                        <option value="Pain killer">Pain Killer</option>
                        <option value="eyes">Eyes</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formProductQuantity" className="mb-2">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBestSeller" className="mb-2">
                    <Form.Check
                        type="checkbox"
                        label="Best Seller"
                        name="bestSeller"
                        checked={formData.bestSeller}
                        onChange={(e) =>
                            setFormData({ ...formData, bestSeller: e.target.checked })
                        }
                    />
                </Form.Group>
                <Form.Group controlId="formOffer" className="mb-2">
                    <Form.Check
                        type="checkbox"
                        label="Offer"
                        name="offer"
                        checked={formData.offer}
                        onChange={(e) =>
                            setFormData({ ...formData, offer: e.target.checked })
                        }
                    />
                </Form.Group>
                <Form.Group controlId="formProductDescription" className="mb-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Enter product description"
                        required
                        className={Styles.textarea}
                    />
                </Form.Group>
                <Form.Group controlId="formProductImage" className="mb-2">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                        required
                    />
                </Form.Group>
                <Button
                    type="submit"
                    className="w-25 mt-3"
                    style={{
                        backgroundColor: isHovered ? 'rgb(48, 110, 110)' : 'rgb(58, 130, 130)',
                        color: '#fff',
                        border: 'none',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Add Product
                </Button>
            </Form>
        </div>
    );
};

export default AddProduct;
