import React from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import useProduct from "../hooks/useProduct";
import ProductCard from "../components/Products/ProductCard";
import AddToCartButton from "../components/Products/ui/AddToCartButton";
import Loader from "../components/Loaders/MainLoader";
import Cookies from "cookies-js";
import Theme from "../theme/Theme";

export const ProductDetail = () => {
  const appTheme = Theme();
  const { id } = useParams();
  const { data: product, error, isLoading } = useProduct(id);

  const [dynamicBigImage, setDynamicBigImage] = React.useState<string | null>(
    null
  );
  const isAuthenticated = !!Cookies.get("user_access_token");

  return (
    <Box
      sx={{
        backgroundColor: appTheme === "dark" ? "#141414" : "#ffffff",
        color: appTheme === "dark" ? "#fff" : "#000",
      }}
    >
      <Box pt="70px">
        <Box pb="150px">
          <Container maxWidth="lg">
            <Box
              minHeight="420px"
              border={1}
              borderColor={appTheme === "dark" ? "#262626" : "#262626"}
              borderRadius="13px"
              sx={{
                backgroundColor: appTheme === "dark" ? "#1a1a1a" : "#f4f4f5",
              }}
              p="10px"
            >
              {/* back to prev page btn */}
              <Box>
                <Grid container justifyContent="end" alignItems="center">
                  <Box
                    border={1}
                    borderRadius="99999px"
                    borderColor={appTheme === "dark" ? "#262626" : "#999999"}
                    color={appTheme === "dark" ? "#999999" : "#262626"}
                    bgcolor={appTheme === "dark" ? "#141414" : "#e4e4e7"}
                    py="6px"
                    px="15px"
                  >
                    <Link to="/products">
                      <Box display="flex" alignItems="center">
                        <Typography>
                          <ArrowBackIosNew
                            sx={{
                              color: appTheme === "dark" ? "#fff" : "#000",
                              fontSize: "13px",
                              mr: "10px",
                            }}
                          />
                        </Typography>
                        <Typography variant="subtitle2">Back</Typography>
                      </Box>
                    </Link>
                  </Box>
                </Grid>
              </Box>
              <Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  mt="10px"
                >
                  {isLoading && <Loader big="40%" />}
                  {error && <Box>erorr: {error.message}</Box>}
                  {!error && !isLoading && product && (
                    <>
                      {/* images */}
                      <Box
                        width={{ xs: "auto", md: "40%" }}
                        ml={{ xs: "0", md: "40px" }}
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                      >
                        <Box
                          width={{ xs: "100%", md: "270px" }}
                          order={{ xs: 1, md: 2 }}
                          py={{ xs: "0", md: "20px" }}
                        >
                          <img
                            id="big-product-image"
                            style={{
                              objectFit: "contain",
                              borderRadius: "15px",
                            }}
                            src={
                              dynamicBigImage ||
                              product?.images[0] ||
                              "/img/productPlaceholder.png"
                            }
                            alt=""
                          />
                        </Box>
                        <Box
                          order={{ xs: 2, md: 1 }}
                          mr={{ xs: "0", md: "20px" }}
                        >
                          <Box
                            display="flex"
                            flexDirection={{ xs: "row", md: "column" }}
                            justifyContent="center"
                            gap="30px"
                            mt={{ xs: "20px", md: "0" }}
                          >
                            {product?.images.map((img, index: number) => {
                              return (
                                <Box
                                  key={product?.id + Math.random()}
                                  sx={{
                                    cursor: "pointer",
                                    opacity:
                                      dynamicBigImage === img ||
                                      (dynamicBigImage === null && index === 0)
                                        ? "20%"
                                        : "100%",
                                  }}
                                  width={{ xs: "60px", sm: "90px", md: "80px" }}
                                  onClick={() => setDynamicBigImage(img)}
                                >
                                  <img
                                    style={{
                                      objectFit: "contain",
                                      borderRadius: "10px",
                                    }}
                                    src={img}
                                    alt=""
                                  />
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                      </Box>
                      {/* details */}
                      <Box
                        width={{ xs: "auto", md: "60%" }}
                        mt={{ xs: "20px", md: "0" }}
                      >
                        <Box>
                          <Stack p="20px">
                            {/* title */}
                            <Box>
                              <Box overflow="hidden">
                                <Typography variant="h4" fontWeight="bold">
                                  {product?.title || "title"}
                                </Typography>
                              </Box>
                            </Box>
                            {/* category */}
                            <Box mt="1px">
                              <Box
                                display="flex"
                                justifyContent="start"
                                alignItems={"center"}
                              >
                                {product ? (
                                  <ProductCard.ProductCategory
                                    category={product.category}
                                  />
                                ) : (
                                  <ProductCard.ProductCategory
                                    category={{
                                      id: 0,
                                      name: "category",
                                      image: "image",
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                            {/* description */}
                            <Box
                              my="45px"
                              maxHeight="90px"
                              minHeight="90px"
                              overflow="hidden"
                            >
                              <Typography
                                fontSize="20px"
                                color={
                                  appTheme === "dark" ? "#999999" : "#8e8e90"
                                }
                              >
                                {product?.description || "description"}
                              </Typography>
                            </Box>
                            {/* purchase info */}
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="end"
                            >
                              <Box mr="auto">
                                <Box>
                                  <Typography
                                    color={
                                      appTheme === "dark"
                                        ? "#999999"
                                        : "#8e8e90"
                                    }
                                  >
                                    price
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography fontSize="23px" fontWeight="bold">
                                    $ {product?.price.toLocaleString()}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box>
                                {product &&
                                  (id && isAuthenticated ? (
                                    <AddToCartButton id={parseInt(id)} />
                                  ) : (
                                    <AddToCartButton />
                                  ))}
                              </Box>
                            </Box>
                          </Stack>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
