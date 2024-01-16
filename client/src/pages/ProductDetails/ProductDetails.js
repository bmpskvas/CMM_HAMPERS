import React, { useEffect, useState } from "react";
import { useLocation ,useParams} from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals1";
import url from '../../urls.json'
import axios from "axios";

const server = url.python_server

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("")
  const [productInfo, setProductInfo] = useState([])
  const [similars, setSimilar] = useState([])
  const { _id } = useParams();
  const [image,setImage]=useState("");
  async function similar() {
    let response = await fetch(`${server}/similar`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ product: (location.state && location.state.item?._id) || _id })
    })
    response = await response.json()
    setSimilar(response.message)
  }

  useEffect(() => { 
    
    async function f() {
      let data;
      if (location.state && location.state.item) {
        data = location.state.item;
       
        setImage(data.img)
        setProductInfo(data);
      } else {
        try{
      const result=await axios.post('http://localhost:8000/hamper/getbyid', {id: _id});
       data=result.data.data
       data = data.map((obj, index) => ({ ...obj, image: "http://localhost:8000/"+obj.image }));
       
       setProductInfo(data[0]);
       setImage(data[0].image);
       
       }
      catch(error){
        console.error("Error fetching data:", error);
      }
    }
   
    // setPrevLocation(location.pathname);
  }
    f()
  }, [prevLocation, productInfo]);
  
  return (
    
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
     
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
          </div>
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt={image}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
      <NewArrivals products={similars} />

    </div>
  );
};

export default ProductDetails;
