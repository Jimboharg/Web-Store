import { Link } from "react-router-dom";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {

  const {name, price, imageUrl, id } = product;

  return (
    <div className="product-card-container">
      <Link to={"/item/" +id}>
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{`£${price}`}</span>
      </div>
      </Link>
    </div>
  );
};

export default ProductCard;
