import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import FooterBottom from '../Footer/FooterBottom';
import Header from '../Header/Header';
import HeaderBottom from '../Header/HeaderBottom';
import url from '../../../urls.json';
import { useLocation } from 'react-router-dom';
import Product from '../Products/Product';
import axios from 'axios';

const server = url.python_server;

const Orders = () => {
  const location = useLocation();
  const id=location.state.id;
  const mail=localStorage.getItem('mail')
  const token=localStorage.getItem('token');
  useEffect(()=>{
    if(token==null){
      alert('Login, to continue!')
      window.location.href='/';
    }
  })
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: mail,
    productId: id,
    address: '',
    phoneNum: '',
    token:token,
  });

 
  const queryParams = new URLSearchParams(location.search);
  const query_searched = queryParams.get('query');

  // Your existing useEffect code...

  const  handleFormSubmit = async (e) => {
    e.preventDefault();
    const data=formData;
    // console.log(data);
    const result=await axios.post('http://localhost:8000/hamper/orderdetails',formData);
    alert(result.data.message);
    setFormData({
      name: '',
      email: mail,
      productId: id,
      address: '',
      phoneNum: '',
      token:token,
    });
  };
 async function filldetails(){
  const result=await axios.post('http://localhost:8000/hamper/filldetails',{'email':mail });
  const data=result.data.details[0];
  setFormData({
    name: data['name'],
    productId: id,
    email: mail,
    address: data['address'],
    phoneNum: data['phoneNo'],
    token:token,
  });

  }
  return (
    <>
      <Header />
      <HeaderBottom />
      <div className="w-full p-10">
        {/* Centered form */}
   
<div className="max-w-md mx-auto">
  <form onSubmit={handleFormSubmit} className="mb-4">
    {/* Existing code for the name field */}
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />

    {/* New block for the email field */}
    <label htmlFor="email" className="block mt-4 text-sm font-medium text-gray-700">
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />

    {/* New block for the productId field */}
    <label htmlFor="productId" className="block mt-4 text-sm font-medium text-gray-700">
      Product ID
    </label>
    <input
      type="text"
      id="productId"
      name="productId"
      value={formData.productId}
      onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />
    {/* New block for the address field */}
    <label htmlFor="address" className="block mt-4 text-sm font-medium text-gray-700">
      Address
    </label>
    <input
      type="text"
      id="address"
      name="address"
      value={formData.address}
      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />

    {/* New block for the phoneNum field */}
    <label htmlFor="phoneNum" className="block mt-4 text-sm font-medium text-gray-700">
      Phone Number
    </label>
    <input
      type="tel"
      id="phoneNum"
      name="phoneNum"
      value={formData.phoneNum}
      onChange={(e) => setFormData({ ...formData, phoneNum: e.target.value })}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />
<div className="flex gap-4">
  <button
    type="submit"
    className="flex-1 mt-4 p-2 bg-black text-white rounded-md hover:bg-gray-700 transition duration-300"
  >
    Place Your Order
  </button>
  <button type="button" onClick={() => filldetails()} className="flex-1 mt-4 p-2 bg-black text-white rounded-md hover:bg-gray-700 transition duration-300">
  Fill Previous Details
</button>
</div>


  </form>
</div>


        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((p) => {
            return (
              <Product
                id={p.id}
                productName={
                  p.name.length > 20 ? p.name.substring(0, 20) + '...' : p.name
                }
                img={p.image}
                productFullName={p.name}
                price={p.discount_price}
                main_category={p.main_category}
                sub_category={p.sub_category}
                ratings={p.ratings}
              />
            );
          })}
        </div>
      </div>
      <Footer />
      <FooterBottom />
    </>
  );
};

export default Orders;
