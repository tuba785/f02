import "./ProductList.css";

export default function ProductList({ products, on_add }) {
  return (
    <div className="product_grid">
      {products.map((p) => {
        return (
          <div className="product_card" key={p.id}>
            <div className="product_image_wrap">
              <img className="product_image" src={p.image} alt={p.name} />
            </div>

            <div className="product_info">
              <div className="product_top_row">
                <div className="product_name">{p.name}</div>
                <div className="product_tag">{p.category}</div>
              </div>

              <div className="product_price">{p.price} ₼</div>

              <button
                className="product_btn"
                type="button"
                onClick={() => on_add(p)}
              >
                + Add to cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
