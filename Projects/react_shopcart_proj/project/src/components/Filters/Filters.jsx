import "./Filters.css";

export default function Filters({ active_filter, on_change }) {
  const items = ["All", "Electronics", "Book"];

  return (
    <div className="filters_root">
      {items.map((name) => {
        const is_active = active_filter === name;

        return (
          <button
            key={name}
            className={`filter_btn ${is_active ? "filter_btn_active" : ""}`}
            onClick={() => on_change(name)}
            type="button"
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
