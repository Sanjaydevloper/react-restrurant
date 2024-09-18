import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const cartDispatch = () => {
    // Update the cartItems in state
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [...cartItems], // Use a new array to trigger re-renders
    });
  };

  const updateQty = (action, id) => {
    let updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.id === id) {
        if (action === "add") {
          cartItem.qty += 1;
        } else if (action === "remove") {
          if (cartItem.qty === 1) {
            return null; // Remove item from the array
          } else {
            cartItem.qty -= 1;
          }
        }
        setQty(cartItem.qty);
      }
      return cartItem;
    }).filter(Boolean); // Filter out null values

    // Update local state
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updatedCartItems,
    });
    setFlag(flag + 1);
  };

  useEffect(() => {
    // Update qty if cartItems changes outside this component
    const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
    if (itemInCart) {
      setQty(itemInCart.qty);
    }
  }, [cartItems, item.id]); // Dependencies

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item?.imageURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* Name Section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {parseFloat(item?.price) * qty}
        </p>
      </div>

      {/* Button Section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
