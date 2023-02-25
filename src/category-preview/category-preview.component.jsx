import { Link } from "react-router-dom";

import ProductCard from "../components/product-card/product-card.component";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  const numberOfProductsToPreview = 4;

  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products.map(
          (item, index) =>
            index < numberOfProductsToPreview && 
              <ProductCard key={item.id} product={item} />
        )}
      </div>
    </div>
  );
};

export default CategoryPreview;
