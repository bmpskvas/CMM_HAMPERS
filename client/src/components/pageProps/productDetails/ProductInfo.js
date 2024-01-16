import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
// import Rating from '@mui/material/Rating';
import Rating from "./Rating";
import url from '../../../urls.json'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const server = url.node_server

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(`Hello, i want to buy the product with id ${productInfo._id}.`) + '&phone=+916202872652';
    // let response = await fetch(`${server}/order`, {
    //   method: "POST",
    //   credentials: 'include',
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify({ product: productInfo.id })
    // })
    // response = await response.json()
    // alert(response.message)
   
  
  const handleBuyNowClick = () => {
    // window.location.href = whatsappUrl;
    if(localStorage.getItem('token')==null){
      alert('Login, to buy!')
    }
    else{
    navigate(`/orders`,{
      state:{
        id:productInfo._id
      }
    })
  }
  };
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productFullName}</h2>
      <p className="text-xl font-semibold">Rs.{productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        {/* <span className="font-normal">Colors:</span> {productInfo.color} */}
      </p>
      <Rating rate={productInfo.ratings} />
      <button
        onClick={handleBuyNowClick}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Buy Now
      </button>
      <button
        onClick={async () => {
          if(localStorage.getItem('token')==null){
            alert('Login, to continue!')
          }
          else{ 
        const token=localStorage.getItem('token')
        const result=await axios.post('http://localhost:8000/hamper/addtocart',{productInfo,'token':token} );
        window.location.href='/cart';
          // dispatch(
          //   addToCart({
          //     _id: productInfo._id,
          //     name: productInfo.productName,
          //     quantity: 1,
          //     image: productInfo.img,
          //     // badge: productInfo.badge,
          //     price: productInfo.price
          //     // colors: productInfo.color,
          //   })
            
          // )
          }
      }
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Category:</span>  {productInfo.productName}
      </p>
    </div>
  );
};

export default ProductInfo;
