import {
  Box,
  Button,
  Chip,
  Container,
  Input,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Theme from "../../../theme/Theme";
import React from "react";
import ProductsButton from "../../../theme/Products/ProductsButton";
import useCategories from "../../../hooks/useCategories";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateProductInputsT } from "../../../utils/types/ProductManagement";
// import { useUploadFile } from "../../../hooks/useAuth";

const CreateProduct = () => {
  const appTheme = Theme();
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = React.useState<number>(0);
  // const uploadFile = useUploadFile()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateProductInputsT>();
  const onSubmit: SubmitHandler<CreateProductInputsT> = (data) =>
    console.log(data);

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <Box>
                    <Box display="flex" gap="10px">
                      <Typography
                        fontSize="17px"
                        color={appTheme === "dark" ? "#fff" : "#000"}
                      >
                        Title
                      </Typography>
                      <Box>
                        {errors.title && (
                          <Box
                            component="span"
                            color="orange"
                            sx={{ opacity: "80%" }}
                          >
                            {errors.title.message}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Box>
                          <TextField
                            {...register("title", {
                              required: true,
                            })}
                            sx={{
                              width: "100%",
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
                    <Box display="flex" gap="10px">
                      <Typography
                        fontSize="17px"
                        color={appTheme === "dark" ? "#fff" : "#000"}
                      >
                        Price
                      </Typography>
                      <Box>
                        {errors.price && (
                          <Box
                            component="span"
                            color="orange"
                            sx={{ opacity: "80%" }}
                          >
                            {errors.price.message}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Box>
                          <TextField
                            type="number"
                            {...register("price", { required: true })}
                            sx={{
                              width: "100%",
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
                    <Box display="flex" gap="10px">
                      <Typography
                        fontSize="17px"
                        color={appTheme === "dark" ? "#fff" : "#000"}
                      >
                        Description
                      </Typography>
                      <Box>
                        {errors.description && (
                          <Box
                            component="span"
                            color="orange"
                            sx={{ opacity: "80%" }}
                          >
                            {errors.description.message}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Box>
                          <TextField
                            {...register("description", { required: true })}
                            sx={{
                              width: "100%",
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
                    <Box display="flex" gap="10px">
                      <Typography
                        fontSize="17px"
                        color={appTheme === "dark" ? "#fff" : "#000"}
                      >
                        Image
                      </Typography>
                      <Box>
                        {errors.image && (
                          <Box
                            component="span"
                            color="orange"
                            sx={{ opacity: "80%" }}
                          >
                            {errors.image.message}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Box>
                          <Input
                            type="file"
                            {...register("image", {
                              required: true,
                            })}
                            sx={{
                              width: "100%",
                              p: "10px",
                              borderRadius: "10px 10px 0 0",
                              borderInline: "1px solid",
                              borderTop: "1px solid",
                              borderColor:
                                appTheme === "dark" ? "#262626" : "#d1d5db",
                              backgroundColor:
                                appTheme === "dark" ? "#141414" : "#f3f3f3",
                              "& .MuiInputBase-input": {
                                color: appTheme === "dark" ? "white" : "#000",
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
                          key={category.name.concat(Math.random().toString())}
                          label={category.name}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setValue("categoryId", category.id);
                          }}
                          onDelete={() => {
                            setSelectedCategory(0);
                            setValue("categoryId", null);
                          }}
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
                              color:
                                appTheme === "dark" ? "#e4e4e7" : "#1a1a1a",
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
                            type="submit"
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
                            <Box>Create</Box>
                          </Button>
                        </ThemeProvider>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </form>
            </Container>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateProduct;
