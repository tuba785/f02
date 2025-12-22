import "./Cart.css";
import { RiShoppingBag3Line } from "react-icons/ri";

export default function Cart({
  cart_items,
  cart_count,
  cart_total,
  on_change_qty,
  on_remove_all,
  on_complete_order,
}) {
  const items_array = Object.values(cart_items);
  const is_empty = items_array.length === 0;

  return (
    <div className="cart_root">
      <div className="cart_title_row">
        <div className="cart_title">Cart</div>
        {cart_count > 0 && <div className="cart_badge">{cart_count}</div>}
      </div>

      {is_empty ? (
        <div className="cart_empty">
          <div className="cart_empty_icon">
            <RiShoppingBag3Line />
          </div>
          <div className="cart_empty_big">Cart is empty.</div>
          <div className="cart_empty_small">Add product</div>
        </div>
      ) : (
        <>
          <div className="cart_items">
            {items_array.map((it) => {
              const p = it.product;

              return (
                <div className="cart_item" key={p.id}>
                  <div className="cart_item_row">
                    <div className="cart_item_name">{p.name}</div>

                    <div className="cart_item_right">
                      <div className="cart_item_price">{p.price} ₼</div>

                      <button
                        className="cart_remove_btn"
                        type="button"
                        onClick={() => on_remove_all(p.id)}
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <div className="cart_qty_row">
                    <div className="cart_qty_controls">
                      <button
                        className="cart_qty_btn"
                        type="button"
                        onClick={() => on_change_qty(p.id, -1)}
                      >
                        −
                      </button>

                      <div className="cart_qty_value">{it.qty}</div>

                      <button
                        className="cart_qty_btn"
                        type="button"
                        onClick={() => on_change_qty(p.id, +1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="cart_item_price">{it.qty * p.price} ₼</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart_summary">
            <div className="cart_summary_row">
              <div>Product number</div>
              <div className="cart_summary_value">{cart_count}</div>
            </div>

            <div className="cart_summary_row">
              <div>Total amount</div>
              <div className="cart_summary_value">{cart_total} ₼</div>
            </div>

            <button
              className="cart_order_btn"
              type="button"
              onClick={on_complete_order}
            >
              Complete Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
