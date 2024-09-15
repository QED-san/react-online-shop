import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Theme from "../../../theme/Theme";
import React from "react";
import CustomButton from "../../../theme/Products/ProductsButton";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  UpdateProductFormData,
  UpdateProductInputsT,
} from "../../../utils/types/ProductManagement";
import { useUploadFile } from "../../../hooks/useAuth";
import { useUpdateProduct } from "../../../hooks/useProductManagement";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const appTheme = Theme();
  const uploadFile = useUploadFile();
  const [productImage, setProductImage] = React.useState<Blob>();
  const updateProduct = useUpdateProduct();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProductInputsT>();

  const onSubmit: SubmitHandler<UpdateProductInputsT> = (data) => {
    if (productImage) {
      uploadFile.mutateAsync(productImage).then((res) => {
        requestToUpdateProduct({
          ...data,
          images: [res.location],
        });
      });
    } else {
      requestToUpdateProduct({
        ...data,
        images: [],
      });
    }
  };

  const requestToUpdateProduct = (reqPayload: UpdateProductFormData) => {
    const req = {
      updatedProduct: { ...reqPayload },
      id: reqPayload.id,
    };
    updateProduct.mutateAsync(req).then((res) => console.log(res));
  };

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
                        Id
                      </Typography>
                      <Box>
                        {errors.id && (
                          <Box
                            component="span"
                            color="orange"
                            sx={{ opacity: "80%" }}
                          >
                            {errors.id.message}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Box>
                          <TextField
                            {...register("id", { required: true })}
                            defaultValue={id}
                            type="number"
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
                            {...register("title")}
                            type="text"
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
                            {...register("price")}
                            type="number"
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
                            {...register("description")}
                            type="text"
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
                          <Input
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setProductImage(e.target.files?.[0])}
                            type="file"
                            sx={{
                              width: "100%",
                              p: "10px",
                              borderRadius: "10px 0 0 0",
                              borderInline: "1px solid",
                              borderTop: "1px solid",
                              borderColor:
                                appTheme === "dark" ? "#262626" : "#d1d5db",
                              borderInlineEndColor: "transparent",
                              backgroundColor:
                                appTheme === "dark" ? "#141414" : "#f3f3f3",
                              "& .MuiInputBase-input": {
                                color: appTheme === "dark" ? "white" : "#000",
                              },
                            }}
                          />
                        </Box>
                        {/* <Box flex=".1">
                          <Box height="100%">
                            <Button
                              onClick={() => setUploadButtonPressed(true)}
                              sx={{
                                "&.MuiButtonBase-root": {
                                  minWidth: "10px",
                                  height: "100%",
                                  borderRadius: "0 10px 0 0",
                                  border: "1px solid",
                                  borderColor:
                                    appTheme === "dark" ? "#262626" : "#d1d5db",
                                  borderInlineStartColor: "transparent",
                                  borderBlockEndColor: "black",
                                },
                                textTransform: "none",
                              }}
                            >
                              Upload
                            </Button>
                          </Box>
                        </Box> */}
                      </Box>
                    </Box>
                  </Box>
                  {/* submit button */}
                  <Box py="40px">
                    <Box display="flex" alignItems="center">
                      <Box>
                        <ThemeProvider theme={CustomButton}>
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
                            <Box>Update</Box>
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

export default UpdateProduct;
