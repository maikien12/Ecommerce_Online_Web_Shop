import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
        productList : [],
        CartItem : []
       
}

export const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setDataProduct : (state,action) => {
             
                state.productList = [...action.payload]

        },
        addCartItem : (state, action) => {
                const  check = state.CartItem.some(el => el._id === action.payload._id)
                console.log(check)
                if(check){
                    toast("already Item in Cart")
                }
                else{
                    toast("Item Add Successfully")
                    const total = action.payload.price
                state.CartItem = [...state.CartItem,{...action.payload,qty : 1, total : total} ];
                }
              

                
        },  
        deleteCartItem : (state, action) => {
          
                toast("one Item Delete")
                const  index = state.CartItem.findIndex((el) => el._id === action.payload)
                state.CartItem.splice(index, 1)
                console.log(index)
        },
        increaseQty : (state, action) => {
            
            const  index = state.CartItem.findIndex((el) => el._id === action.payload);
            let qty = state.CartItem[index].qty;
            const qtyInc = ++qty;
            state.CartItem[index].qty = qtyInc;

            const price = state.CartItem[index].price;
            const total = price * qtyInc;
            state.CartItem[index].total = total;
    
        },
        decreaseQty : (state, action) => {
            const  index = state.CartItem.findIndex((el) => el._id === action.payload);
            let qty = state.CartItem[index].qty;
           
            if(qty > 1){
                const qtyDec = --qty;
                state.CartItem[index].qty = qtyDec;

                const price = state.CartItem[index].price;
                const total = price * qtyDec;
                state.CartItem[index].total = total;
            }
            
        }

    }
})

export const {setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty} = productSlice.actions

export default productSlice.reducer