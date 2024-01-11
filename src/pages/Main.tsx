import Products from "../components/Products";

export default function Main() {
  return (
    <div className="page-main">
      <div className="mainvisual">
        <h2 className="mainvisual__title">Shop With US</h2>
        <p className="mainvisual__subtitle">Best Products, High Quality</p>
      </div>
      <Products />
    </div>
  );
}
