import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import useCategories from "../../hooks/useCategories";
import { productCategoryT } from "../../utils/types/Product";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loaders/MainLoader";
import TableHeader from "../../components/Admin/TableHeader";
import TableBodyCell from "../../components/Admin/TableBodyCell";
import CustomButton from "../../theme/Products/ProductsButton";
import { Create, Delete } from "@mui/icons-material";

const CategoriesTable = () => {
  const { data: categories, error, isLoading } = useCategories();

  const createProductsRow = (
    id: productCategoryT["id"],
    name: productCategoryT["name"],
    image: productCategoryT["image"]
  ) => {
    return {
      id,
      name,
      image,
    };
  };
  const rows = categories?.map((product) =>
    createProductsRow(product.id, product.name, product.image)
  );

  const navigate = useNavigate();

  return (
    <Box pt="40px">
      <Container maxWidth="md">
        <TableContainer>
          {!error && !categories && isLoading && <Loader big={"40%"} />}
          {!isLoading && !categories && error && (
            <div className="text-red-700">
              categories error: {error.message}
            </div>
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
                    <TableHeader>name</TableHeader>
                  </TableCell>
                  <TableCell>
                    <TableHeader>image</TableHeader>
                  </TableCell>
                  <TableCell align="center">
                    <TableHeader>management</TableHeader>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row) => (
                  <TableRow
                    key={row.name.concat(row.image.concat(row.id.toString()))}
                  >
                    <TableBodyCell>{row.id}</TableBodyCell>
                    <TableBodyCell>{row.name}</TableBodyCell>
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
                                navigate(`/admin/update_category/${row.id}`)
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
                                navigate(`/admin/delete_category/${row.id}`)
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
      </Container>
    </Box>
  );
};

export default CategoriesTable;
