import React from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Input,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  Search,
  GridView,
  Clear,
  Expand,
  ExpandRounded,
  ArrowRight,
} from "@mui/icons-material";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductCard from "../components/Products/ProductCard";
import productsButton from ".././theme/Products/ProductsButton";
import productsSearchBar from ".././theme/Products/ProductsSearchBar";
import SearchInput from "../components/Products/ui/SearchInput";
import { productsT } from "../utils/types/Product";
import Loader from "../components/Loaders/MainLoader";
import Theme from "../theme/Theme";

const Products = () => {
  const appTheme = Theme();
  const {
    data: products,
    error: productsError,
    isLoading: productsIsLoading,
  } = useProducts();

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useCategories();

  const [productsFilteredBy, setProductsFilteredBy] = React.useState<{
    type: "category" | "search" | "price" | "rangePrice";
    value: string;
  } | null>(null);
  const [filteredProducts, setFilteredProducts] = React.useState<
    productsT[] | null | undefined
  >(null);
  const [filterPriceByRange, setFilterPriceByRange] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [priceSearchValue, setPriceSearchValue] = React.useState(0);
  const [minPriceRangeValue, setMinPriceRangeValue] = React.useState(0);
  const [maxPriceRangeValue, setMaxPriceRangeValue] = React.useState(0);

  React.useEffect(() => {
    if (products)
      if (productsFilteredBy)
        if (productsFilteredBy.type === "category")
          setFilteredProducts(
            products.filter((p) => p.category.name === productsFilteredBy.value)
          );
  }, [products, productsFilteredBy]);

  function handleSearch() {
    if (searchInputRef.current && searchInputRef.current.value !== "")
      setProductsFilteredBy({ type: "search", value: "" });
    if (products)
      if (!filteredProducts) {
        setFilteredProducts(
          products.filter(
            (p) =>
              searchInputRef.current != null &&
              p.title.includes(searchInputRef.current.value)
          )
        );
      } else {
        setFilteredProducts(
          filteredProducts.filter(
            (p) =>
              searchInputRef.current != null &&
              p.title.includes(searchInputRef.current.value)
          )
        );
      }
  }

  function handlePriceFilter() {
    if (priceSearchValue) {
      setProductsFilteredBy({ type: "price", value: "" });
      if (products) {
        if (!filteredProducts) {
          setFilteredProducts(
            products.filter((p) => p.price == priceSearchValue)
          );
        } else {
          setFilteredProducts(
            filteredProducts.filter((p) => p.price == priceSearchValue)
          );
        }
      }
    }
  }

  function handleRangePriceFilter() {
    if (maxPriceRangeValue) {
      if (minPriceRangeValue >= 0) {
        setProductsFilteredBy({ type: "rangePrice", value: "" });
        if (products) {
          setFilteredProducts(
            products.filter(
              (p) =>
                p.price >= minPriceRangeValue && p.price <= maxPriceRangeValue
            )
          );
        }
      }
    }
  }

  return (
    <>
      <Box
        sx={{
          pt: "20px",
          color: appTheme === "dark" ? "#fff" : "#000000",
          backgroundColor: appTheme === "dark" ? "#141414" : "#fff",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            "&.MuiContainer-maxWidthLg": {
              maxWidth: "1420px",
            },
          }}
        >
          {/* search section */}
          <Box minHeight="85px" mb={filterPriceByRange ? "0" : "20px"}>
            <Box minHeight="85px">
              {/* title search section */}
              <Box minHeight="85px" display="flex" alignItems="center">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    width: { xs: "100%", sm: "50%", md: "43%", lg: "33%" },
                    border: `1px solid ${
                      appTheme === "dark" ? "#262626" : "#d1d5db"
                    }`,
                    borderRadius: "8px",
                    bgcolor: appTheme === "dark" ? "#141414" : "#f9fafb",
                  }}
                >
                  {/* seach and clear filter button */}
                  <Box
                    sx={{
                      flex: 0.05,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                      mr: "auto",
                    }}
                  >
                    {/* search handler button */}
                    <ThemeProvider theme={productsButton}>
                      <Button
                        onClick={() => handleSearch()}
                        variant="contained"
                        color="primary"
                        fullWidth={false}
                        sx={{
                          "&.MuiButtonBase-root": {
                            minWidth: "10px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "10px",
                          },
                        }}
                      >
                        <Grid>
                          <Search sx={{ fontSize: "20px" }} color="action" />
                        </Grid>
                      </Button>
                    </ThemeProvider>
                    {/* clear filter button */}
                    <Button
                      sx={{
                        "&.MuiButtonBase-root": {
                          minWidth: "10px",
                          width: "30px",
                          height: "30px",
                          ml: "10px",
                          p: "0",
                        },
                        display: productsFilteredBy == null ? "none" : "block",
                      }}
                      onClick={() => {
                        setProductsFilteredBy(null);
                        setFilteredProducts(null);
                      }}
                    >
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Clear />
                      </Grid>
                    </Button>
                  </Box>
                  {/* search input */}
                  <Box sx={{ flex: 1 }}>
                    <ThemeProvider theme={productsSearchBar}>
                      <SearchInput
                        placeholder="Search ..."
                        ref={searchInputRef}
                      />
                    </ThemeProvider>
                  </Box>
                </Box>
              </Box>
              {/* price search section */}
              <Grid>
                {/* price */}
                <Box>
                  <Box sx={{ display: "flex" }}>
                    <Grid container alignItems="center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<Expand sx={{ color: "silver" }} />}
                            checkedIcon={<ExpandRounded />}
                            onChange={(e) =>
                              setFilterPriceByRange(e.target.checked)
                            }
                          />
                        }
                        label="range"
                      />
                      <Input
                        type="number"
                        onChange={(e) =>
                          setPriceSearchValue(parseInt(e.target.value))
                        }
                        placeholder="price"
                        sx={{
                          ".MuiInputBase-input": {
                            height: "20px",
                            width: "60px",
                            color: appTheme === "light" ? "#000" : "#fff",
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: appTheme === "light" ? "#000" : "#fefe",
                          },
                        }}
                      />
                      {/* price apply */}
                      <Button
                        sx={{ ml: "10px" }}
                        onClick={() => handlePriceFilter()}
                      >
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <ArrowRight />
                        </Grid>
                      </Button>
                    </Grid>
                  </Box>
                </Box>
                {/* range price */}
                <Box display={filterPriceByRange ? "block" : "none"} my="10px">
                  <Grid container alignItems="center">
                    from
                    <Input
                      type="number"
                      placeholder="min"
                      sx={{
                        mx: "10px",
                        ".MuiInputBase-input": {
                          height: "20px",
                          width: { xs: "50px", sm: "55px" },
                          color: appTheme === "light" ? "#000" : "#fff",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: appTheme === "light" ? "#000" : "#fefe",
                        },
                      }}
                      onChange={(e) =>
                        setMinPriceRangeValue(parseInt(e.target.value))
                      }
                    />
                    to
                    <Input
                      type="number"
                      placeholder="max"
                      sx={{
                        ml: "10px",
                        ".MuiInputBase-input": {
                          height: "20px",
                          width: { xs: "50px", sm: "55px" },
                          color: appTheme === "light" ? "#000" : "#fff",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: appTheme === "light" ? "#000" : "#fefe",
                        },
                      }}
                      onChange={(e) =>
                        setMaxPriceRangeValue(parseInt(e.target.value))
                      }
                    />
                    {/* range price apply button */}
                    <Button
                      sx={{ ml: "10px" }}
                      onClick={() => handleRangePriceFilter()}
                    >
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <ArrowRight />
                      </Grid>
                    </Button>
                  </Grid>
                </Box>
              </Grid>
            </Box>
          </Box>
          {/* product and categories section */}
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                maxWidth: "100vw",
              }}
            >
              {/* products section */}
              <Box
                pt="11px"
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                gap="30px"
                maxWidth={{ xs: "auto", md: "75%", lg: "83%" }}
                sx={{ flex: 1, order: { xs: 2, md: 1 } }}
              >
                {!productsError && !products && productsIsLoading && (
                  <Loader big={"40%"} />
                )}
                {!productsIsLoading && !products && productsError && (
                  <div className="text-red-700">
                    products error: {productsError.message}
                  </div>
                )}
                {!productsIsLoading && !productsError && !productsFilteredBy
                  ? products?.map((product) => (
                      <ProductCard
                        product={product}
                        key={product.category.image.concat(
                          product.id + Math.random().toString()
                        )}
                      >
                        <ProductCard.ProductImage
                          src={product.images}
                          id={product.id}
                        />
                        <ProductCard.ProductTitle title={product.title} />
                        <ProductCard.ProductDescription
                          description={product.description}
                          id={product.id}
                        />
                        <ProductCard.ProductCategory
                          category={product.category}
                        />
                        <ProductCard.ProductPurchaseInfo
                          price={product.price}
                          id={product.id}
                        />
                      </ProductCard>
                    ))
                  : productsFilteredBy &&
                    filteredProducts?.map((fp) => (
                      <ProductCard
                        product={fp}
                        key={fp.description.concat(
                          fp.id + Math.random().toString()
                        )}
                      >
                        <ProductCard.ProductImage src={fp.images} id={fp.id} />
                        <ProductCard.ProductTitle title={fp.title} />
                        <ProductCard.ProductDescription
                          description={fp.description}
                          id={fp.id}
                        />
                        <ProductCard.ProductCategory category={fp.category} />
                        <ProductCard.ProductPurchaseInfo
                          price={fp.price}
                          id={fp.id}
                        />
                      </ProductCard>
                    ))}
              </Box>
              {/* categories section */}
              <Grid
                pt="10px"
                sx={{
                  flex: { sm: 0.25, md: 0.33, lg: 0.2 },
                  order: { xs: 1, md: 2 },
                }}
              >
                <Box
                  pt="20px"
                  sx={{
                    backgroundColor:
                      appTheme === "dark" ? "#141414" : "#ffffff",
                    border: 1,
                    borderColor: appTheme === "dark" ? "#262626" : "#999999",
                    borderRadius: 3,
                  }}
                  maxHeight="510px"
                  overflow="hidden"
                >
                  <Box pl="10px" sx={{ display: "flex", alignItems: "center" }}>
                    <GridView
                      sx={{ color: "#703bf7", fontSize: "20px", mr: "10px" }}
                    />
                    <Typography fontSize="20px">Categories :</Typography>
                  </Box>
                  <Box pt="10px" pb={categoriesIsLoading ? "20px" : "0"}>
                    {!categoriesError && !categories && categoriesIsLoading && (
                      <Loader />
                    )}
                    {!categoriesIsLoading && !categories && categoriesError && (
                      <div className="text-red-700">
                        categories error: {categoriesError.message}
                      </div>
                    )}
                    {!categoriesIsLoading && !categoriesError && categories && (
                      <Box mb="5px" px="6px" bgcolor="rgba(1, 1, 1, .1)">
                        <Button
                          onClick={() => {
                            setProductsFilteredBy(null);
                            setFilteredProducts(null);
                          }}
                          sx={{
                            textTransform: "none",
                            "&.MuiButtonBase-root": {
                              width: "100%",
                              color: appTheme === "dark" ? "#fff" : "#000",
                              justifyContent: "start",
                              fontSize: "16px",
                            },
                          }}
                        >
                          All
                        </Button>
                      </Box>
                    )}
                    {!categoriesIsLoading &&
                      !categoriesError &&
                      categories &&
                      categories?.map((category) => (
                        <Box
                          key={category.image.concat(Math.random().toString())}
                          mb="5px"
                          px="6px"
                          bgcolor="rgba(1, 1, 1, .1)"
                          overflow="hidden"
                        >
                          <Button
                            onClick={() =>
                              setProductsFilteredBy({
                                type: "category",
                                value: category.name,
                              })
                            }
                            sx={{
                              textTransform: "none",
                              "&.MuiButtonBase-root": {
                                width: "100%",
                                color: appTheme === "dark" ? "#fff" : "#000",
                                justifyContent: "start",
                                fontSize: "16px",
                              },
                            }}
                          >
                            {category.name}
                          </Button>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Products;
