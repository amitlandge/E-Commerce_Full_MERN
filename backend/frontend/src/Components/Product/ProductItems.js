import React from "react";
import "./ProductItems.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";

const ProductItems = ({
  name,
  description,
  price,
  rating,
  reviews,
  id,
  image,
  numberOfReviews,
}) => {
  console.log(image);

  return (
    <Link className="product-cart" to={`/product/${id}`}>
      <Card className="product-flex"
        sx={{
          maxWidth: 320,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          sx={{ height: 200, width: 150 }}
          image={image[0].url}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Rating value={rating} readOnly={true} style={{ width: 90 }} />
          </Typography>
          <Typography variant="body2" color="warning.main">
            {price} Rs
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItems;
