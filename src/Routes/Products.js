import React from "react";
import { Link } from "react-router-dom";

function Products(props) {
  return (
    <div className="container">
      <Link to={"/DetailPage/" + props.product.id}>
        <img src={"images/img" + (props.i + 1) + ".jpg"} width="50%" />
        <h3>{props.product.name}</h3>
        <p>{props.product.price}원</p>
      </Link>
    </div>
   
  );
}
export default Products;