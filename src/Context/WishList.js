import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BaseUrl } from "../Componentes/BaseUrl/base";
import { mediaContext } from "./MediaStore";

export const FetchWishlistContext = createContext();

export default function FetchWishlistProvider(props) {
    const notify = (msg, type) => {
        toast[type](msg, {
            autoClose: 1000,
            theme: 'dark',
            position: 'bottom-center'
        });
    }

    const [wishlist, setWishlist] = useState({ result: [] });
    const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
    const { userData } = useContext(mediaContext);
    const token = localStorage.getItem('token');


    const getProductWishlist = async () => {
        try {
            const { data } = await axios.get(`${BaseUrl}/wishlist/getAllWishlist`, {
                headers: { 'token': token }
            });
            setWishlist(data || [] );
            setNumOfWishlistItems(data.result.length || 0);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };


    useEffect(() => {
        if (localStorage.getItem("token") && userData !== '') {
            getProductWishlist();
        }
    }, [userData]);

    
    const addProductToWishlist = async (productId) => {

        
        try {
            console.log(`Adding product to wishlist: ${productId}`);
            const response = await axios.patch(`${BaseUrl}/wishlist/addToWishlist`, { productId }, {
                headers: { 'token': token }
            });
            console.log('Response from adding to wishlist:', response.data);
            notify('Product Added To Wishlist', 'success');
            getProductWishlist();
        } catch (error) {
            console.error("Error adding product to wishlist:", error);
            notify('Error adding product to wishlist', 'error');
        }
    };

    const deleteProductFromWishlist = async (productId) => {
        try {
            const response = await axios.delete(`${BaseUrl}/wishlist/removeFromWishlist`, {
                data: { productId },
                headers: { 'token': token }
            });
            notify('Product Deleted From Wishlist', 'success');
            getProductWishlist(); 
        } catch (error) {
            console.error("Error deleting product from wishlist:", error);
            notify('Error deleting product from wishlist', 'error');
        }
    };

    const clearWishlist = async () => {
        try {
            await axios.delete(`${BaseUrl}/wishlist/clearWishlist`, {
                headers: { 'token': token }
            });
            setWishlist([]);
            notify('Wishlist cleared', 'success');
        } catch (error) {
            console.error("Error clearing wishlist:", error);
            notify('Error clearing wishlist', 'error');
        }
    };

    return (
        <FetchWishlistContext.Provider value={{
            addProductToWishlist,
            wishlist,
            numOfWishlistItems,
            deleteProductFromWishlist,
            clearWishlist,
            getProductWishlist
        }}>
            {props.children}
        </FetchWishlistContext.Provider>
    );
}
