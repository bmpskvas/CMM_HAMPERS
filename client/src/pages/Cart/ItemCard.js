import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item,setProducts,products }) => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [quant,setQuant]=useState(item.quantity)
  const mail=localStorage.getItem('mail');
  const id=item._id;
 async function del(){
      const res= await axios.post('https://cmmhampers-production.up.railway.app/hamper/delte',{'id': item._id, 'email': mail }) 
    let cartthings=products;
    cartthings=cartthings.filter((item)=>{
      return item._id!=id
    })
    setProducts(cartthings);
  }
  useEffect(()=>{
    if(quant==0){
        del();
    }
  })
  async function inc(){
    const res=await axios.post('https://cmmhampers-production.up.railway.app/hamper/inc',{'id': item._id, 'email': mail })
    let cartthings=products; 
    for(let i=0;i<cartthings.length;i++){
        
      if(cartthings[i]._id==id){
        cartthings[i].quantity = Number(cartthings[i].quantity) + 1;
        setQuant( cartthings[i].quantity);
      }
    }
    
    setProducts(cartthings);
  }
  async function dec(){
    const res=await axios.post('https://cmmhampers-production.up.railway.app/hamper/dec',{'id': item._id, 'email': mail })
    let cartthings=products; 
    for(let i=0;i<cartthings.length;i++){
      if(cartthings[i]._id==id){
        cartthings[i].quantity = Number(cartthings[i].quantity) - 1;
        setQuant( cartthings[i].quantity); 
      }
    }
    setProducts(cartthings);
  }
  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={del}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={item.image} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={dec}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{quant}</p>
          <span
            onClick={inc}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>Rs.{item.quantity * item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
