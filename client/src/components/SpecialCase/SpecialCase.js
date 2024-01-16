import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri"
import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"
import axios from 'axios';
import url from '../../urls.json';
import { checkLogin } from '../../middleware/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const server = url.node_server

const SpecialCase = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [user, setUser] = useState(null)
  const [buttonvalue,setButtonValue]=useState("Login");
  useEffect(()=>{
    if(localStorage.getItem('token')!==null){
      setButtonValue("Logout");
    }
  })
  
  const navigate=useNavigate();
  let mail;
  const handleLogout = async () => {
    let res = await fetch(`${server}/logout`, {
      method: "GET",
      credentials: "include"
    })
    res = await res.json()
    if (!res) {
      alert("Error logging out")
    }
    else {
      window.location.reload()
    }
  }
  function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setButtonValue("Login");
    // alert('logged out')
    window.location.href='/';
  }
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: 'application/json'
          }
        })
        .then( async (res) => {
          const email=res.data.email;
          const result = await axios.post('http://localhost:8000/auths/checkuser', {'email': email})
          const msg=result.data.message;
          const token=result.data.data;
          if(msg=="account created"){
          alert('account created & logged in')
          localStorage.setItem('token',token)
          localStorage.setItem('mail',email)
          setButtonValue("Logout");
            
          }
          else if(msg=="user exists"){
            alert('logged in')
            localStorage.setItem('token',token)
            localStorage.setItem('mail',email)
            setButtonValue("Logout");
            console.log(buttonvalue);
          }
          else{
            alert('error occured')
          }

        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log('Login Failed:', error)
  });
  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      {!user ?
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
          <div className="flex justify-center items-center">
            <FontAwesomeIcon icon={faUser} height="20px" />
          </div>
          <p className="text-xs font-semibold font-titleFont" onClick={() => (buttonvalue === "Login" ? login() : logout())}>{buttonvalue}</p>
        </div>

        : <>
          <div onClick={handleLogout} className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
            <FontAwesomeIcon icon={faRightFromBracket} height="20px" />
            <p className="text-xs font-semibold font-titleFont">Logout</p>
          </div>
          <Link to="/cart">
            <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
              <div className="flex justify-center items-center">
                <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

                <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
              </div>
              <p className="text-xs font-semibold font-titleFont">Buy Now</p>
              {products.length > 0 && (
                <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {products.length}
                </p>
              )}
            </div>
          </Link>
        </>}
    </div>
  );
};

export default SpecialCase;
