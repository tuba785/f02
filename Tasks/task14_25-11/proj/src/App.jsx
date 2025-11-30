import React from "react";
import "./App.css";
import ProductPrice from "./components/ProductPrice/pp";

import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";

const products = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 300,
    discountPrice: null,
    isStock: true,
    imageUrl: image1,
  },
  {
    id: 2,
    name: "Nike Air Jordan",
    category: "Footwear",
    price: 200,
    discountPrice: 150,
    isStock: true,
    imageUrl: image2,
  },
  {
    id: 3,
    name: "Logitech G Pro",
    category: "Gaming",
    price: 100,
    discountPrice: null,
    isStock: false,
    imageUrl: image3,
  },
];

function App() {
  return (
    <div className="page">
      <header className="pageHeader">
        <h1 className="pageTitle">Featured Products</h1>
        <p className="pageSubtitle">
          Explore our latest collection of premium gadgets and stylish footwear.
          Handpicked items for the modern lifestyle.
        </p>
      </header>

      <div className="productsGrid">
        {products.map((product) => (
          <ProductPrice
            key={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            discountPrice={product.discountPrice}
            isStock={product.isStock}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
