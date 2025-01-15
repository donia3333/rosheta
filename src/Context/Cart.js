import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BaseUrl } from "../Componentes/BaseUrl/base";
import { mediaContext } from "./MediaStore";

export const FetchCartContext = createContext();

export default function FetchCartProvider(props) {
    const notify = (msg, type) => {
        toast[type](msg, {
            autoClose: 1000,
            theme: 'dark',
            position: 'bottom-center'
        });
    };

    const [cart, setCart] = useState({ items: [] });
    const [numOfCart, setNumOfCart] = useState(0);
    const { userData } = useContext(mediaContext);
    const token = localStorage.getItem('token');

    const AddProductToCart = async (productId) => {
        try {
            await axios.post(`${BaseUrl}/carts/addProductToCart`, { productId }, {
                headers: { 'token': token }
            });
            notify('Product Added To Cart', 'success');
            getProductCart();
        } catch (error) {
            notify(error.response?.data?.message || 'Error adding product to cart', 'error');
        }
    };

    const getProductCart = async () => {
        try {
            const { data } = await axios.get(`${BaseUrl}/carts/getCartForUser`, {
                headers: { 'token': token }
            });
            setCart(data.cart);
            calculateNumOfCart(data.cart.items);
        } catch (error) {
            console.error("Error fetching cart:", error);
            notify('Error fetching cart', 'error');
        }
    };

    const calculateNumOfCart = (items) => {
        const totalCount = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
        setNumOfCart(totalCount);
    };

    useEffect(() => {
        if (token && userData) {
            getProductCart();
        }
    }, [userData]);

    const deleteProductCart = async (productId) => {
        try {
            await axios.delete(`${BaseUrl}/carts/removeProductFromCart/${productId}`, {
                headers: { 'token': token }
            });
            setCart((prevCart) => {
                const updatedItems = prevCart.items.filter(item => item.productId._id !== productId);
                calculateNumOfCart(updatedItems);
                return { ...prevCart, items: updatedItems };
            });
            notify('Product Deleted From Cart', 'success');
        } catch (error) {
            notify('Error deleting product from cart', 'error');
        }
    };

    const UpdateProductCart = async (productId, quantity) => {
        try {
            await axios.put(`${BaseUrl}/carts/updateProductQuantityInCart`, { productId, quantity }, {
                headers: { 'token': token }
            });
            notify(`Product quantity updated to ${quantity}`, 'success');
            getProductCart();
        } catch (error) {
            notify(error.response?.data?.msg || 'Error updating product quantity', 'error');
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete(`${BaseUrl}/carts/clearCart`, {
                headers: { 'token': token }
            });
            setCart({ items: [] });
            setNumOfCart(0);
            notify('Cart cleared successfully', 'success');
        } catch (error) {
            notify('Error clearing cart', 'error');
        }
    };

    return (
        <FetchCartContext.Provider value={{
            AddProductToCart, cart, setCart, getProductCart,
            numOfCart, deleteProductCart, UpdateProductCart, clearCart
        }}>
            {props.children}
        </FetchCartContext.Provider>
    );
}
