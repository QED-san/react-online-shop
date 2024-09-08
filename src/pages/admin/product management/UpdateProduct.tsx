import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Theme from "../../../theme/Theme";
import React from "react";
import CustomInput from "../../../components/Products/ui/CustomInput";
import useCategories from "../../../hooks/useCategories";
import ProductsButton from "../../../theme/Products/ProductsButton";

const UpdateProduct = () => {
  const appTheme = Theme();
  const idRef = React.useRef<HTMLInputElement>(null);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const imageRef = React.useRef<HTMLInputElement>(null);
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = React.useState<number>(0);

  return (
    <Box
      bgcolor={appTheme === "dark" ? "#141414" : "#fff"}
      color={appTheme === "dark" ? "#fff" : "#000"}
      pt="20px"
      minHeight="300px"
    >
      <Container maxWidth="md">
        <Box>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Container maxWidth="md">
              <Stack spacing={3}>
                <Box>
                  <Box>
                    <Typography
                      fontSize="17px"
                      color={appTheme === "dark" ? "#fff" : "#000"}
                    >
                      Id
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <Box>
                        <CustomInput
                          ref={idRef}
                          type="number"
                          required
                          sx={{
                            pb: "55px",
                            borderRadius: "10px",
                            bgcolor:
                              appTheme === "dark" ? "#141414" : "#f3f3f3",
                            "& .MuiInputBase-input": {
                              color: appTheme === "dark" ? "white" : "#000",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid",
                              borderRadius: "10px",
                              borderColor:
                                appTheme === "dark" ? "#262626" : "#d1d5db",
                              mb: "1px",
                            },
                            "&:hover:not(.Mui-focused)": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #703bf7",
                                borderRadius: "10px",
                              },
                            },
                            "& .Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #703bf7",
                                borderRadius: "10px",
                              },
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Typography
                      fontSize="17px"
                      color={appTheme === "dark" ? "#fff" : "#000"}
                    >
                      Title
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <Box>
                        <CustomInput
                          ref={titleRef}
                          type="text"
                          required
                          sx={{
                            pb: "55px",
                            borderRadius: "10px",
                            bgcolor:
                              appTheme === "dark" ? "#141414" : "#f3f3f3",
                            "& .MuiInputBase-input": {
                              color: appTheme === "dark" ? "white" : "#000",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid",
                              borderRadius: "10px",
                              borderColor:
                                appTheme === "dark" ? "#262626" : "#d1d5db",
                              mb: "1px",
                            },
                            "&:hover:not(.Mui-focused)": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #703bf7",
                                borderRadius: "10px",
                              },
                            },
                            "& .Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #703bf7",
                                borderRadius: "10px",
                              },
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Typography
                      fontSize="17px"
                      color={appTheme === "dark" ? "#fff" : "#000"}
                    >
                      Price
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <Box>
                        <CustomInput
                          ref={priceRef}
                          type="number"
                          required
                          sx={{
                            pb: "55px",
                            borderRadius: "10px",
                            bgcolor:
                              appTheme === "dark" ? "#141414" : "#f3f3f3",
                            "& .MuiInputBase-input": {
                              color: appTheme === "dark" ? "white" : "#000",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid",
                              borderRadius: "10px",
                              borderColor:
                                appTheme === "dark" ? "#262626" : "#d1d5db",
                              mb: "1px",
                            },
                            "&:hover:not(.Mui-focused)": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #703bf7",
                                borderRadius: "10px",
                              },
                            },
                            "& .Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #703bf7",
                                borderRadius: "10px",
                              },
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Typography
                      fontSize="17px"
                      color={appTheme === "dark" ? "#fff" : "#000"}
                    >
                      Description
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <Box>
                        <CustomInput
                          ref={descriptionRef}
                          type="text"
                          required
                          sx={{
                            pb: "55px",
                            borderRadius: "10px",
                            bgcolor:
                              appTheme === "dark" ? "#141414" : "#f3f3f3",
                            "& .MuiInputBase-input": {
                              color: appTheme === "dark" ? "white" : "#000",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid",
                              borderRadius: "10px",
                              borderColor:
                                appTheme === "dark" ? "#262626" : "#d1d5db",
                              mb: "1px",
                            },
                            "&:hover:not(.Mui-focused)": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #703bf7",
                                borderRadius: "10px",
                              },
                            },
                            "& .Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #703bf7",
                                borderRadius: "10px",
                              },
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Typography
                      fontSize="17px"
                      color={appTheme === "dark" ? "#fff" : "#000"}
                    >
                      Image
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <Box>
                        <CustomInput
                          ref={imageRef}
                          type="file"
                          required
                          sx={{
                            pb: "55px",
                            borderRadius: "10px",
                            bgcolor:
                              appTheme === "dark" ? "#141414" : "#f3f3f3",
                            "& .MuiInputBase-input": {
                              color: appTheme === "dark" ? "white" : "#000",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid",
                              borderRadius: "10px",
                              borderColor:
                                appTheme === "dark" ? "#262626" : "#d1d5db",
                              mb: "1px",
                            },
                            "&:hover:not(.Mui-focused)": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #703bf7",
                                borderRadius: "10px",
                              },
                            },
                            "& .Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #703bf7",
                                borderRadius: "10px",
                              },
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* category  */}
                <Box>
                  <Box>
                    {categories?.map((category) => (
                      <Chip
                        label={category.name}
                        onClick={() => setSelectedCategory(category.id)}
                        onDelete={() => setSelectedCategory(0)}
                        sx={{
                          border: "1px solid",
                          borderColor:
                            appTheme === "dark" ? "#262626" : "#999999",
                          color: appTheme === "dark" ? "#fff" : "#000",
                          backgroundColor:
                            appTheme === "dark" ? "#1a1a1a" : "#e4e4e7",
                          fontSize: { xs: "10px", md: "13px", lg: "14px" },
                          margin: "5px",
                          "& .MuiChip-deleteIcon": {
                            color: appTheme === "dark" ? "#e4e4e7" : "#1a1a1a",
                            display:
                              selectedCategory === category.id
                                ? "block"
                                : "none",
                            "&:hover": {
                              color: "gray",
                            },
                          },
                        }}
                      ></Chip>
                    ))}
                  </Box>
                </Box>
                {/* submit button */}
                <Box py="40px">
                  <Box display="flex" alignItems="center">
                    <Box>
                      <ThemeProvider theme={ProductsButton}>
                        <Button
                          // onClick={handleSubmit}
                          variant="contained"
                          color="primary"
                          fullWidth={false}
                          sx={{
                            "&.MuiButtonBase-root": {
                              minWidth: "10px",
                              width: { xs: "200px", sm: "300px" },
                              height: "50px",
                              borderRadius: "8px",
                            },
                            textTransform: "none",
                          }}
                        >
                          <Box>Submit</Box>
                        </Button>
                      </ThemeProvider>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default UpdateProduct;
