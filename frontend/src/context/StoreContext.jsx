import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://food-delivery-project-abtu.onrender.com"
    const [token,setToken] = useState("");
     const [food_list,setFoodList] = useState([])


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token)
        {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    };

   // A more robust version of the function
const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            // Find the food item from the food_list
            let itemInfo = food_list.find((product) => product._id === item);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
    }
    return totalAmount;
};

     const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
     }

     const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData || {}); 
     }

    useEffect(()=>{
       
        async function loadData() {
            await fetchFoodList();
             if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"));
        }
    }
        loadData();
        
    },[])

        console.log("PROVIDER IS ALIVE AND cartItems IS:", cartItems); // <-- YEH LOG ADD KARO

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart, 
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
      
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
