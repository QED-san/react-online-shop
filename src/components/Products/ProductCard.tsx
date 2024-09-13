import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  productCardImageT,
  productCardT,
  productCardTitleT,
  productCardDescriptionT,
  productCardCategoryT,
  productCardPurchaseInfoT,
} from "../../utils/types/ProductCard";
import { Link } from "react-router-dom";
import AddToCartButton from "./ui/AddToCartButton";
import Cookies from "cookies-js";
import Theme from "../../theme/Theme";

const ProductCard = ({ children, product }: productCardT) => {
  const appTheme = Theme();
  return (
    <Box
      key={product.title.concat(Math.random().toString())}
      sx={{
        maxWidth: {
          xs: "100%",
          sm: "48%",
          lg: "31%",
        },
        width: {
          xs: "100%",
          sm: "47%",
          lg: "30%",
        },
        minHeight: "530px",
        backgroundColor: appTheme === "dark" ? "#141414" : "#ffffff",
        border: 1,
        borderColor: appTheme === "dark" ? "#262626" : "#999999",
        borderRadius: 3,
      }}
    >
      <Box padding="30px">
        <Stack>{children}</Stack>
      </Box>
    </Box>
  );
};

ProductCard.ProductImage = ProductImage;
ProductCard.ProductTitle = ProductTitle;
ProductCard.ProductDescription = ProductDescription;
ProductCard.ProductCategory = ProductCategory;
ProductCard.ProductPurchaseInfo = ProductPurchaseInfo;

export default ProductCard;

export function ProductImage({ src, id }: productCardImageT) {
  return (
    <Box
      sx={{
        maxWidth: { xs: "490px", sm: "320px", md: "340px" },
        minHeight: {
          xs: "250px",
          sm: "230px",
          md: "270px",
          lg: "280px",
          xl: "300px",
        },
        borderRadius: "10px",
      }}
    >
      <Link to={`${id}`}>
        <img
          style={{
            objectFit: "contain",
            borderRadius: "10px",
          }}
          src={src[0] || "img/productPlaceholder.png"}
          alt=""
        />
      </Link>
    </Box>
  );
}

export function ProductTitle({ title }: productCardTitleT) {
  const appTheme = Theme();
  return (
    <Box pt="20px">
      <Typography
        sx={{
          height: { xs: "27px", lg: "25px" },
          overflow: "hidden",
          fontSize: "19px",
          color: appTheme === "dark" ? "#fff" : "#000",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export function ProductDescription({
  description,
  id,
}: productCardDescriptionT) {
  const appTheme = Theme();
  return (
    <Box pt="10px">
      <Typography
        sx={{
          display: "flex",
          color: "gray",
        }}
      >
        <Typography
          sx={{
            width: { xs: "130px", sm: "120px", md: "160px", xl: "200px" },
            height: "20px",
            overflow: "hidden",
            fontSize: "12px",
          }}
        >
          {description}
          ...
        </Typography>
        <Typography
          sx={{
            fontWeight: "semibold",
            pl: "5px",
            fontSize: "11px",
            color: appTheme === "dark" ? "#fff" : "#4d4d4d",
          }}
        >
          <Link to={`${id}`}>... Read More</Link>
        </Typography>
      </Typography>
    </Box>
  );
}

export function ProductCategory({ category }: productCardCategoryT) {
  const appTheme = Theme();
  return (
    <Box pt="20px">
      <Chip
        label={category.name}
        sx={{
          border: "1px solid",
          borderColor: appTheme === "dark" ? "#262626" : "#999999",
          backgroundColor: appTheme === "dark" ? "#1a1a1a" : "#e4e4e7",
          color: appTheme === "dark" ? "#fff" : "#000",
          fontSize: "12px",
        }}
      ></Chip>
    </Box>
  );
}

export function ProductPurchaseInfo({ price, id }: productCardPurchaseInfoT) {
  const appTheme = Theme();
  const isAuthenticated = Cookies.get("user_access_token");

  return (
    <Box pt="20px">
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Box mr="auto">
          <Typography
            sx={{
              fontSize: "10px",
              color: appTheme === "dark" ? "#999999" : "#4d4d4d",
            }}
          >
            Price
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: appTheme === "dark" ? "#fff" : "#000",
            }}
          >
            ${price.toLocaleString()}
          </Typography>
        </Box>
        <Box>
          {isAuthenticated ? <AddToCartButton id={id} /> : <AddToCartButton />}
        </Box>
      </Box>
    </Box>
  );
}
