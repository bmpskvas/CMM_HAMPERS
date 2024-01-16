import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import Pagination from "../Pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const categories = ['Birthday Hampers', 'Anniversary Hampers', 'Tray Hampers', 'Basket Hampers', 'Maternity Hampers', 'Chocolate tower Hampers','Meal Hampers']
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [cat,setCat]=useState()
  const navigate=useNavigate();
  const [cards,setCards]=useState([])
     function handleCategoryClick  (index) {
      // Add your logic for handling category click here
      // console.log(`Category clicked: ${categories[index]}`);
      // // Example: Toggle showSubCatOne state
      // setShowSubCatOne(!showSubCatOne);
      const category=categories[index];
      // console.log(category);
      async function getcards() {
        try {
          const result = await axios.post('http://localhost:8000/hamper/getbycategory', {category: category});
         let data=result.data.data;
          data = data.map((obj, index) => ({ ...obj, image: "http://localhost:8000/"+obj.image }));
         
          setCards(data);
          navigate('/shop',{
            state: data
          })
          // console.log(data.filter(item => item.category===category_searched))
        } catch (error) {
          console.error(error);
          
        }
      }
     getcards();
       
    };

  


  return (
    <div className="w-full">
    <NavTitle title="Shop by Category" icons={false} />
    <div>
      <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
        {categories.map((category, index) => (
          <li
            key={index} // You can use index as the key since categories don't seem to have unique identifiers
            className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
            onClick={() => handleCategoryClick(index)}
            style={{ cursor: 'pointer'}}
          >
            {category}
            {/* Add your logic for icons here if needed */}
          </li>
        ))}
      </ul>
    </div>
  </div>
  
  );
};

export default Category;
