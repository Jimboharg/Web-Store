import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  console.log(category);

  return (
    <div className="category-container">
      <div className="category-cards-container">
        <div className="title-container">
          <h2>{category.toUpperCase()}</h2>
        </div>
        <div className="preview">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
