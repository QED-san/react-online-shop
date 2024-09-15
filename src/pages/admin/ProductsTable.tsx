import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import useProducts from "../../hooks/useProducts";
import { productsT } from "../../utils/types/Product";
import React from "react";
import * as Product from "../../utils/types/Product";
import TableHeader from "../../components/Admin/TableHeader";
import TableBodyCell from "../../components/Admin/TableBodyCell";
import CustomButton from "../../theme/Products/ProductsButton";
import { Create, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/Loaders/MainLoader";

const ProductsTable = () => {
  const {
    data: products,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useProducts();
  const [allProducts, setAllProducts] = React.useState<Product.productsT[]>([]);
  const [allProductsLength, setAllProductsLength] = React.useState<number>(0);

  const createProductsRow = (
    id: productsT["id"],
    title: productsT["title"],
    price: productsT["price"],
    description: productsT["description"],
    category: productsT["category"],
    images: productsT["images"]
  ) => {
    return {
      id,
      title,
      price,
      description,
      category: category.name,
      image: images[0],
    };
  };

  React.useEffect(() => {
    if (products) {
      setAllProducts([
        ...allProducts,
        ...products.pages[products.pages.length - 1],
      ]);

      setAllProductsLength(
        products.pages.reduce(
          (accumulator, page) => page.length + accumulator,
          0
        )
      );
    }
  }, [products]);

  const rows = allProducts.map((product) =>
    createProductsRow(
      product.id,
      product.title,
      product.price,
      product.description,
      product.category,
      product.images
    )
  );

  const navigate = useNavigate();

  return (
    <Box pt="40px">
      <InfiniteScroll
        dataLength={allProductsLength}
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={
          <Loader
            spinner={true}
            // because of scale of loader, it was making a lil extra height
            display={isFetchingNextPage ? "block" : "none"}
          />
        }
      >
        <TableContainer sx={{ mb: "30px" }}>
          {!error && !products && isLoading && <Loader big={"40%"} />}
          {!isLoading && !products && error && (
            <div className="text-red-700">products error: {error.message}</div>
          )}
          {!isLoading && !error && (
            <Table
              sx={{
                minWidth: 650,
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableHeader>id</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>title</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>price</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>description</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>category</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>image</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>management</TableHeader>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.title.concat(
                      row.description.concat(row.id.toString())
                    )}
                  >
                    <TableBodyCell>{row.id}</TableBodyCell>
                    <TableBodyCell>{row.title}</TableBodyCell>
                    <TableBodyCell>{row.price.toLocaleString()}</TableBodyCell>
                    <TableBodyCell>{row.description}</TableBodyCell>
                    <TableBodyCell>{row.category}</TableBodyCell>
                    <TableBodyCell>
                      <Box sx={{ width: "60px", height: "60px" }}>
                        <img
                          src={row.image}
                          alt="failed to load"
                          style={{ objectFit: "contain", borderRadius: "10px" }}
                        />
                      </Box>
                    </TableBodyCell>
                    <TableBodyCell>
                      <Box
                        display="flex"
                        flexDirection={{ xs: "column", lg: "row" }}
                        alignItems="center"
                        justifyContent="center"
                        gap="10px"
                      >
                        <ThemeProvider theme={CustomButton}>
                          <Box>
                            <Button
                              onClick={() =>
                                navigate(`/admin/update_product/${row.id}`)
                              }
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
                              <Box>
                                <Create
                                  sx={{ fontSize: "20px" }}
                                  color="action"
                                />
                              </Box>
                            </Button>
                          </Box>
                          <Box>
                            <Button
                              onClick={() =>
                                navigate(`/admin/delete_product/${row.id}`)
                              }
                              variant="outlined"
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
                              <Box>
                                <Delete
                                  sx={{ fontSize: "20px" }}
                                  color="error"
                                />
                              </Box>
                            </Button>
                          </Box>
                        </ThemeProvider>
                      </Box>
                    </TableBodyCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </InfiniteScroll>
    </Box>
  );
};

export default ProductsTable;
