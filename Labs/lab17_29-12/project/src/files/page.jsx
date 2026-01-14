import { useDispatch, useSelector } from "react-redux";
import "./page.css";
import { selectAll, toggleFruit, deleteAll } from "./fruitSlice";

const Page = () => {
  const { fruits, selectedValues } = useSelector((state) => state.fruits);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Fruit Selection App</h1>
      <div className="main">
        <div className="box1 containers">
          <h2>Fruits</h2>
          <div className="buttons">
            <button className="btn green" onClick={() => dispatch(selectAll())}>
              Select All
            </button>
            <button className="btn green" onClick={() => dispatch(deleteAll())}>
              Delete All
            </button>
          </div>

          <div className="fruit-list">
            {fruits.map((item) => (
              <div
                className="fruit"
                key={item.id}
                onClick={() => dispatch(toggleFruit(item))}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div className="box2 containers">
          <h2>Selected Fruits</h2>

          {selectedValues && selectedValues.length > 0 ? (
            <div className="fruit-list">
              {selectedValues.map((item) => (
                <div className="fruit" key={item.id}>
                  {item.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">No fruits selected</p>
          )}
        </div>
      </div>
      ;
    </div>
  );
};

export default Page;
