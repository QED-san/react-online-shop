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
import {
  useCheckEmail,
  useRegisterUser,
  useUploadFile,
} from "../hooks/useAuth";
import React from "react";
import CustomButton from "../theme/Products/ProductsButton";
import Loader from "../components/Loaders/MainLoader";
import { Link } from "react-router-dom";
import { UserT } from "../state management/User/UserSlice";
import { UserRegisterCunstructor } from "../hooks/Cunstructors/Cunstructor";
import Theme from "../theme/Theme";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterUserInputsT } from "../utils/types/Singup";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import toast, { Toaster } from "react-hot-toast";
import { Clear } from "@mui/icons-material";

export const Signup = () => {
  const appTheme = Theme();
  const checkEmail = useCheckEmail();
  const uploadImage = useUploadFile();
  const registerUser = useRegisterUser(RegisterUser);
  const [userImage, setUserImage] = React.useState<Blob>();
  const [userImageError, setUserImageError] = React.useState<string | null>(
    null
  );
  const passwordWarningSnackAction = (id: SnackbarKey) => {
    return (
      <>
        <Button
          onClick={() => closeSnackbar(id)}
          sx={{
            "&.MuiButtonBase-root": {
              minWidth: "10px",
            },
          }}
        >
          <Clear />
        </Button>
      </>
    );
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInputsT>();
  const onSubmit: SubmitHandler<RegisterUserInputsT> = (data) => {
    if (userImage)
      if (data.password.length >= 4)
        checkEmail.mutateAsync(data.email).then((res) => {
          if (!res.isAvailable)
            uploadImage.mutateAsync(userImage).then((res) => {
              registerUser
                .mutateAsync(
                  UserRegisterCunstructor(
                    data.name,
                    data.email,
                    data.password,
                    res.location,
                    "admin"
                  )
                )
                .catch(() =>
                  toast.error("Register failed", {
                    position: "bottom-left",
                    duration: 2000,
                  })
                );
            });
        });
      else
        enqueueSnackbar("password must be more than 4 characters", {
          action: passwordWarningSnackAction,
          autoHideDuration: 3000,
          variant: "warning",
        });
    else setUserImageError("this field is required");
  };

  function RegisterUser(res: UserT) {
    console.log(res);
    toast.loading("Redirecting to login page...", {
      duration: 1000,
      position: "bottom-left",
    });
  }

  return (
    <Box
      bgcolor={appTheme === "dark" ? "#141414" : "#fff"}
      pt={{ xs: "50px", lg: "80px", xl: "110px" }}
    >
      <Container
        maxWidth="lg"
        sx={{
          "&.MuiContainer-maxWidthLg": {
            maxWidth: "1400px",
          },
        }}
      >
        <Box
          border="5px solid"
          borderColor={appTheme === "dark" ? "#262626" : "#f3f3f3"}
          borderRadius="10px"
          bgcolor={appTheme === "dark" ? "#1a1a1a" : "#fcfcfc"}
        >
          <Container maxWidth="lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={2}
                p="10px"
                display="flex"
                justifyContent="center"
              >
                {/* title */}
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  pt="20px"
                >
                  <Typography variant="h4" fontWeight="bold" color="#703bf7">
                    Sign Up
                  </Typography>
                </Box>
                {/* name and password */}
                <Box>
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    justifyContent="end"
                    gap={{
                      xs: "40px",
                      sm: "20px",
                      md: "40px",
                      lg: "60px",
                      xl: "100px",
                    }}
                    p="10px"
                  >
                    <Box flex={1} mr={{ xs: "0", sm: "auto" }}>
                      <Box display="flex" gap="10px">
                        <Typography
                          fontSize="17px"
                          color={appTheme === "dark" ? "#fff" : "#000"}
                        >
                          Full Name
                        </Typography>
                        <Box>
                          {errors.name && (
                            <Box
                              component="span"
                              color="orange"
                              sx={{ opacity: "80%" }}
                            >
                              {errors.name.message}
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        <TextField
                          {...register("name", { required: true })}
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
                    <Box flex={1}>
                      <Box display="flex" gap="10px">
                        <Typography
                          fontSize="17px"
                          color={appTheme === "dark" ? "#fff" : "#000"}
                        >
                          Password
                        </Typography>
                        <Box>
                          {errors.password && (
                            <Box
                              component="span"
                              color="orange"
                              sx={{ opacity: "80%" }}
                            >
                              {errors.password.message}
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        <TextField
                          {...register("password", { required: true })}
                          type="password"
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
                {/* email and avatar */}
                <Box>
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    justifyContent="end"
                    gap={{
                      xs: "40px",
                      sm: "20px",
                      md: "40px",
                      lg: "60px",
                      xl: "100px",
                    }}
                    p="10px"
                  >
                    {/* email section */}
                    <Box flex={1} mr={{ xs: "0", sm: "auto" }}>
                      <Box display="flex" gap="10px">
                        <Typography
                          fontSize="17px"
                          color={appTheme === "dark" ? "#fff" : "#000"}
                        >
                          Email Address
                        </Typography>
                        <Box>
                          {errors.email && (
                            <Box
                              component="span"
                              color="orange"
                              sx={{ opacity: "80%" }}
                            >
                              {errors.email.message}
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        <Box
                          display="flex"
                          sx={{
                            border: "1px solid",
                            borderRadius: "10px",
                            borderColor:
                              appTheme === "dark" ? "#262626" : "#d1d5db",
                            bgcolor:
                              appTheme === "dark" ? "#141414" : "#f3f3f3",
                            "&.MuiBox-root:hover": {
                              borderColor: "#703bf7",
                            },
                          }}
                        >
                          <Box flex="1">
                            <TextField
                              {...register("email", { required: true })}
                              type="email"
                              sx={{
                                width: "100%",
                                "& .MuiInputBase-input": {
                                  color: appTheme === "dark" ? "white" : "#000",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                  border: "none",
                                },
                                "&:hover:not(.Mui-focused)": {
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                  },
                                },
                                "& .Mui-focused": {
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                  },
                                },
                              }}
                            />
                          </Box>
                          <Box
                            flex=".1"
                            p="8px"
                            display={
                              checkEmail.isPending ||
                              checkEmail.isError ||
                              checkEmail.isSuccess
                                ? "block"
                                : "none"
                            }
                          >
                            <Box
                              minWidth="100%"
                              minHeight="100%"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              {checkEmail.isPending && (
                                <Loader spinner={true} />
                              )}
                              {checkEmail.isSuccess && <Box>✅</Box>}
                              {checkEmail.isError && <Box>❌</Box>}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {/* avatar section */}
                    <Box flex={1}>
                      <Box display="flex" gap="10px">
                        <Typography
                          fontSize="17px"
                          color={appTheme === "dark" ? "#fff" : "#000"}
                        >
                          Avatar
                        </Typography>
                        <Box>
                          {userImageError && (
                            <Box
                              component="span"
                              color="orange"
                              sx={{ opacity: "80%" }}
                            >
                              {userImageError}
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        <Box
                          display="flex"
                          sx={{
                            border: "1px solid",
                            borderRadius: "10px 10px 10px 0",
                            borderColor:
                              appTheme === "dark" ? "#262626" : "#d1d5db",
                            bgcolor:
                              appTheme === "dark" ? "#141414" : "#f3f3f3",
                            "&.MuiBox-root:hover": {
                              borderColor: "#703bf7",
                            },
                          }}
                        >
                          <Box flex="1">
                            <Input
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setUserImageError(null);
                                setUserImage(e.target.files?.[0]);
                              }}
                              type="file"
                              required
                              sx={{
                                width: "100%",
                                p: "10px",
                                borderRadius: "10px 10px 0 0",
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
                          <Box flex=".1">
                            <Box
                              minWidth="100%"
                              minHeight="100%"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              {uploadImage.isPending && (
                                <Loader spinner={true} />
                              )}
                              {uploadImage.isSuccess && <Box>✅</Box>}
                              {uploadImage.isError && <Box>❌</Box>}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* buttons */}
                <Box py="40px">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
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
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            Sign Up
                          </Box>
                        </Button>
                      </ThemeProvider>
                    </Box>
                    <Box mt="20px">
                      <Box
                        display="flex"
                        justifyContent="center"
                        textAlign="center"
                        width={{ xs: "200px", sm: "300px" }}
                        height="50px"
                        borderRadius="8px"
                        bgcolor="#333333"
                        color="#fff"
                        py="10px"
                      >
                        <Link
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          to="/login"
                        >
                          Login
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </form>
          </Container>
        </Box>
      </Container>
      <Toaster />
    </Box>
  );
};

export default Signup;
