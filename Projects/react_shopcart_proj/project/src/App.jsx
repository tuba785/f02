import { useState } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import Modal from "./components/Modal/Modal";

import laptop_img from "./assets/laptop.jpg";
import phone_img from "./assets/phone.jpg";
import book_img from "./assets/book.jpg";
import camera_img from "./assets/camera.jpg";

const products_data = [
  {
    id: "p1",
    name: "Laptop",
    image: laptop_img,
    category: "Electronics",
    price: 1200,
  },
  {
    id: "p2",
    name: "Telephone",
    image: phone_img,
    category: "Electronics",
    price: 800,
  },
  { id: "p3", name: "Book", image: book_img, category: "Book", price: 25 },
  {
    id: "p4",
    name: "Camera",
    image: camera_img,
    category: "Electronics",
    price: 650,
  },
];

export default function App() {
  const [active_filter, set_active_filter] = useState("All");
  const [cart_items, set_cart_items] = useState({});
  const [is_modal_open, set_is_modal_open] = useState(false);

  const filtered_products =
    active_filter === "All"
      ? products_data
      : products_data.filter((p) => p.category === active_filter);

  const cart_count = Object.values(cart_items).reduce(
    (sum, it) => sum + it.qty,
    0
  );

  const cart_total = Object.values(cart_items).reduce(
    (sum, it) => sum + it.qty * it.product.price,
    0
  );

  function add_to_cart(product) {
    set_cart_items((prev) => {
      const current = prev[product.id];
      const next_qty = current ? current.qty + 1 : 1;

      return {
        ...prev,
        [product.id]: { product, qty: next_qty },
      };
    });
  }

  function change_cart_qty(product_id, delta) {
    set_cart_items((prev) => {
      const current = prev[product_id];
      if (!current) return prev;

      const next_qty = current.qty + delta;

      if (next_qty <= 0) {
        const copy = { ...prev };
        delete copy[product_id];
        return copy;
      }

      return {
        ...prev,
        [product_id]: { ...current, qty: next_qty },
      };
    });
  }

  function remove_from_cart(product_id) {
    set_cart_items((prev) => {
      if (!prev[product_id]) return prev;
      const copy = { ...prev };
      delete copy[product_id];
      return copy;
    });
  }

  function complete_order() {
    if (cart_count === 0) return;
    set_is_modal_open(true);
  }

  function close_modal_and_reload() {
    set_is_modal_open(false);
    window.location.reload();
  }

  return (
    <div className="app_root">
      <Header />

      <div className="app_body">
        <aside className="cart_sidebar">
          <Cart
            cart_items={cart_items}
            cart_count={cart_count}
            cart_total={cart_total}
            on_change_qty={change_cart_qty}
            on_remove_all={remove_from_cart}
            on_complete_order={complete_order}
          />
        </aside>

        <main className="products_area">
          <div className="products_top">
            <div className="products_title_block">
              <h2 className="products_title">
                {active_filter === "All" ? "All Products" : active_filter}
              </h2>
              <div className="products_count">
                {filtered_products.length} products available
              </div>
            </div>

            <Filters
              active_filter={active_filter}
              on_change={set_active_filter}
            />
          </div>

          <div className="products_scroll">
            <ProductList products={filtered_products} on_add={add_to_cart} />
          </div>
        </main>
      </div>

      {is_modal_open && (
        <Modal
          title="Purchase completed"
          text="Your order has been placed successfully."
          button_text="OK"
          on_close={close_modal_and_reload}
        />
      )}
    </div>
  );
}
