import { Link } from "react-router-dom";

import "./see-all.styles.scss";

const SeeAll = ({ title }) => {
  const productType = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="see-all-container">
      <Link className="see-all" to={title}>
        <div className="link-container">
          <h2>See All </h2>
          <h2>{productType}</h2>
        </div>
      </Link>
    </div>
  );
};

export default SeeAll;
