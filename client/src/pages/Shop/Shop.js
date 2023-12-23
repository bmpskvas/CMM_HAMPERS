import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import axios from "axios";
const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };
  const [shopitem,setShopitem]=useState([]);
  useEffect(()=>{
     async function call(){
      try{
        const result= await axios.get('http://localhost:8000/hamper/allpost');
        let data=result.data.data;
        data = data.map((obj, index) => ({ ...obj, image: "http://localhost:8000/"+obj.image }));
        setShopitem(data);
      }
      catch(error){
        alert('error occured')
      }
     }
     call();
  })
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination itemsPerPage={itemsPerPage} items={shopitem} />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
