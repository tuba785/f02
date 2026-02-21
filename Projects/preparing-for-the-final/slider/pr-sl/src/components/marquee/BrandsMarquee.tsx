import "./BrandsMarquee.css";

const brands = ["Google", "Apple", "Microsoft", "Amazon", "Netflix", "Meta"];

export default function BrandsMarquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {/* дублируем массив для бесконечности */}
        {[...brands, ...brands].map((brand, index) => (
          <div className="brand" key={index}>
            {brand}
          </div>
        ))}
      </div>
    </div>
  );
}
