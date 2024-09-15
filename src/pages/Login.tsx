import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../theme/Products/ProductsButton";
import { useGetTokens, useLoginUser } from "../hooks/useAuth";
import {
  authenticateUser,
  tokensT,
  UserT,
} from "../state management/User/UserSlice";
import Cookies from "cookies-js";
import { Buffer } from "buffer";
import { useDispatch } from "react-redux";
import { GetTokensCunstructor } from "../hooks/Cunstructors/Cunstructor";
import Theme from "../theme/Theme";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserInputsT } from "../utils/types/Login";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
  const appTheme = Theme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInputsT>();
  const getTokens = useGetTokens(setAccessToken);
  const loginUser = useLoginUser(setUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginUserInputsT> = (data) => {
    if (data.password.length >= 4)
      getTokens
        .mutateAsync(GetTokensCunstructor(data.email, data.password))
        .catch(() =>
          toast.error("Login failed", {
            duration: 2000,
            position: "bottom-left",
          })
        );
    else console.log("password must be more than 4 characters");
  };

  function decodeJwt(token: tokensT): {
    sub: number;
    iat: number;
    exp: number;
  } {
    const base64Payload = token.access_token.split(".")[1];
    const payloadBuffer = Buffer.from(base64Payload, "base64");
    const parsedBuffer = JSON.parse(payloadBuffer.toString());
    return parsedBuffer;
  }

  function setAccessToken(res: tokensT) {
    const decodedAccessToken = decodeJwt(res);
    const expireDate = new Date(decodedAccessToken.exp * 1000);
    document.cookie = `user_access_token=${
      res.access_token
    }; expires=${expireDate.toUTCString()}; Secure; SameSite;`;
    loginUser.mutateAsync(res);
  }

  function setUserState(res: UserT) {
    if (Cookies.get("user_access_token")) {
      dispatch(authenticateUser(res));
      setTimeout(() => navigate("/products"), 1000);
      toast.success("Login successful", {
        duration: 1000,
        position: "bottom-left",
      });
    }
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
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={2}
                p="10px"
                display="flex"
                justifyContent="center"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  pt="20px"
                  pb={{ xs: "30px", md: "10px" }}
                >
                  <Typography variant="h4" fontWeight="bold" color="#703bf7">
                    Login
                  </Typography>
                </Box>
                {/* email */}
                <Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Box>
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
                        <Box>
                          <Box>
                            <TextField
                              {...register("email", { required: true })}
                              type="email"
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
                  </Box>
                </Box>
                {/* password */}
                <Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Box>
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
                          {...register("password", { required: true, min: 4 })}
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
                            Login
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
                          to="/signup"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          Sign Up
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

export default Login;
