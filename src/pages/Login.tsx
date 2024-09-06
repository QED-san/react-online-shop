import {
  Box,
  Button,
  Container,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ProductsButton from "../theme/Products/ProductsButton";
import CustomTextInput from "../components/Products/ui/CustomInput";
import React from "react";
import { useGetTokens, useLoginUser } from "../hooks/useAuth";
import {
  authenticateUser,
  tokensT,
  UserT,
} from "../state management/User/UserSlice";
import Cookies from "cookies-js";
import { Buffer } from "buffer";
import { useDispatch } from "react-redux";
import { GetTokensCunstructor } from "../hooks/Cunstructor";

export const Login = () => {
  const appTheme = useTheme();
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const getTokens = useGetTokens(setAccessToken);
  const loginUser = useLoginUser(setUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (emailInputRef.current && passwordInputRef.current)
      if (
        emailInputRef.current.value.length > 0 &&
        passwordInputRef.current.value.length > 4
      )
        getTokens.mutateAsync(
          GetTokensCunstructor(
            emailInputRef.current.value,
            passwordInputRef.current.value
          )
        );
      else console.log("the email or password cant be empty");
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
      setTimeout(() => navigate("/"), 1000);
    }
  }

  return (
    <Box
      bgcolor={appTheme.palette.mode === "dark" ? "#141414" : "#fff"}
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
          borderColor={appTheme.palette.mode === "dark" ? "#262626" : "#f3f3f3"}
          borderRadius="10px"
          bgcolor={appTheme.palette.mode === "dark" ? "#1a1a1a" : "#fcfcfc"}
        >
          <Container maxWidth="sm">
            <Stack spacing={2} p="10px" display="flex" justifyContent="center">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                pt="20px"
              >
                <Typography variant="h4" fontWeight="bold" color="#703bf7">
                  Login
                </Typography>
              </Box>
              <Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box>
                    <Box>
                      <Typography
                        fontSize="17px"
                        color={
                          appTheme.palette.mode === "dark" ? "#fff" : "#000"
                        }
                      >
                        Email Address
                      </Typography>
                    </Box>
                    <Box>
                      <Box>
                        <Box>
                          <CustomTextInput
                            ref={emailInputRef}
                            type="email"
                            required
                            sx={{
                              pb: "55px",
                              borderRadius: "10px",
                              bgcolor:
                                appTheme.palette.mode === "dark"
                                  ? "#141414"
                                  : "#f3f3f3",
                              "& .MuiInputBase-input": {
                                color:
                                  appTheme.palette.mode === "dark"
                                    ? "white"
                                    : "#000",
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid",
                                borderRadius: "10px",
                                borderColor:
                                  appTheme.palette.mode === "dark"
                                    ? "#262626"
                                    : "#d1d5db",
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
              <Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box>
                    <Box>
                      <Typography
                        fontSize="17px"
                        color={
                          appTheme.palette.mode === "dark" ? "#fff" : "#000"
                        }
                      >
                        Password
                      </Typography>
                    </Box>
                    <Box>
                      <CustomTextInput
                        ref={passwordInputRef}
                        type="password"
                        required
                        sx={{
                          pb: "55px",
                          borderRadius: "10px",
                          bgcolor:
                            appTheme.palette.mode === "dark"
                              ? "#141414"
                              : "#f3f3f3",
                          "& .MuiInputBase-input": {
                            color:
                              appTheme.palette.mode === "dark"
                                ? "white"
                                : "#000",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid",
                            borderRadius: "10px",
                            borderColor:
                              appTheme.palette.mode === "dark"
                                ? "#262626"
                                : "#d1d5db",
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
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box>
                    <ThemeProvider theme={ProductsButton}>
                      <Button
                        onClick={handleSubmit}
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
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
