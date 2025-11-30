import React from "react";
import "./pp.css";

function ProductPrice({
  name,
  price,
  discountPrice,
  isStock,
  imageUrl,
  category,
}) {
  const hasDiscount = discountPrice !== null && discountPrice < price;

  return (
    <article className="productCard">
      <div className="imageWrapper">
        {hasDiscount && <span className="badge sale">Sale</span>}
        {!isStock && <span className="badge sold">Sold Out</span>}

        <img src={imageUrl} alt={name} className="productImage" />
      </div>

      <div className="productBody">
        <p className="category">{category}</p>
        <h2 className="productName">{name}</h2>

        <div className="priceRow">
          {hasDiscount ? (
            <>
              <span className="oldPrice">${price}</span>
              <span className="newPrice">${discountPrice}</span>
            </>
          ) : (
            <span className="newPrice">${price}</span>
          )}
        </div>

        <button
          className={isStock ? "productBtn active" : "productBtn disabled"}
          disabled={!isStock}
        >
          {isStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
}

export default ProductPrice;
