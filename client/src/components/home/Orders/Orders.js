import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import FooterBottom from '../Footer/FooterBottom'
import Header from '../Header/Header'
import HeaderBottom from '../Header/HeaderBottom'
import url from '../../../urls.json'
import { useLocation } from 'react-router-dom'
import Product from "../Products/Product"

const server = url.python_server
const Orders = () => {
  const [products, setProducts] = useState([])
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const query_searched = queryParams.get('query')

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch(`${server}/myOrders`, {
        method: "GET",
        credentials: "include"
      })
      const fetched_products = await response.json()
      const filteredProducts = []
      fetched_products.message.map(p => {
        p.image = p.image.replace(/W\/IMAGERENDERING_521856-T1\/images\//, '')
        p.image = p.image.replace(/W\/IMAGERENDERING_521856-T2\/images\//, '')
      })
      setProducts(fetched_products.message)
      console.log(fetched_products.message)
    }

    loadProducts()
  }, [])

  // function show() {
  //   return products.map(
  //     ({ image, name, ratings, discount_price, actual_price }) => (
  //       <Card
  //         key={Math.random()}
  //         img={image}
  //         title={name}
  //         // star={ratings}
  //         // reviews={reviews}
  //         prevPrice={`Rs.${actual_price}`}
  //         newPrice={`Rs.${discount_price}`}
  //       />
  //     )
  //   );
  // }

  return (
    <>
      <Header />
      <HeaderBottom />
      <div className="w-full p-10">
        {products.length !== 0 ? <>Fetched {products.length} products<br/><br/> </>: <></>}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map(p => {
            return <Product
            id={p.id}
            productName={p.name.length > 20
              ? p.name.substring(0, 20) + "..."
              : p.name} 
            img={p.image}
            productFullName={p.name}
            price={p.discount_price}
            main_category = {p.main_category}
            sub_category = {p.sub_category}
            ratings = {p.ratings}
            />
          })}
        </div>
      </div>
      <Footer />
      <FooterBottom />
    </>
  )
}

export default Orders