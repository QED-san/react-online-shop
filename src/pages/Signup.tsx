import {
  Box,
  Button,
  Container,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {
  useCheckEmail,
  useRegisterUser,
  useUploadFile,
} from "../hooks/useAuth";
import { checkEmailResT, fileUploadResT } from "../utils/types/Auth";
import React from "react";
import CustomInput from "../components/Products/ui/CustomInput";
import ProductsButton from "../theme/Products/ProductsButton";
import Loader from "../components/Loaders/MainLoader";
import { Link } from "react-router-dom";
import { UserT } from "../state management/User/UserSlice";
import { UserRegisterCunstructor } from "../hooks/Cunstructor";
import Theme from "../theme/Theme";

export const Signup = () => {
  const appTheme = Theme();
  const checkEmail = useCheckEmail(setTheEmailVerificationRes);
  const uploadImage = useUploadFile(setImageUploadRes);
  const registerUser = useRegisterUser(RegisterUser);

  const [authReqRes, setAuthReqRes] = React.useState<{
    emailCheckRes: boolean;
    imgUploadRes: string;
    registerRes: UserT | null;
  }>({
    emailCheckRes: false,
    imgUploadRes: "",
    registerRes: null,
  });

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);

  const handleEmailVefication = () => {
    if (emailInputRef?.current && emailInputRef.current.value) {
      checkEmail.mutateAsync(emailInputRef.current.value);
    }
  };
  const handleImgUploadRes = () => {
    if (
      avatarInputRef?.current &&
      avatarInputRef.current.files &&
      avatarInputRef.current.files?.length > 0
    ) {
      uploadImage.mutateAsync(avatarInputRef.current.files[0]);
    } else console.log("there is a problem with your image");
  };
  const handleSubmit = () => {
    if (
      nameInputRef?.current &&
      passwordInputRef?.current &&
      emailInputRef?.current &&
      avatarInputRef?.current
    )
      if (nameInputRef.current.value.length !== 0)
        if (passwordInputRef.current.value.length >= 4) {
          handleEmailVefication();
          handleImgUploadRes();
          if (
            !authReqRes.emailCheckRes && // the api did not accept the emails anyway
            authReqRes.imgUploadRes?.length !== 0
          )
            registerUser.mutateAsync(
              UserRegisterCunstructor(
                nameInputRef.current.value,
                emailInputRef.current.value,
                passwordInputRef.current.value,
                authReqRes.imgUploadRes,
                "admin"
              )
            );
        } else console.log("password shoud be more than 4 character");
      else console.log("name shoud not be ampty");
  };

  function setImageUploadRes(res: fileUploadResT) {
    setAuthReqRes({ ...authReqRes, imgUploadRes: res.location });
  }
  function setTheEmailVerificationRes(res: checkEmailResT) {
    setAuthReqRes({ ...authReqRes, emailCheckRes: res.isAvailable });
  }
  function RegisterUser(res: UserT) {
    console.log(res);
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
            <Stack spacing={2} p="10px" display="flex" justifyContent="center">
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
                    <Box>
                      <Typography
                        fontSize="17px"
                        color={appTheme === "dark" ? "#fff" : "#000"}
                      >
                        Full Name
                      </Typography>
                    </Box>
                    <Box>
                      <CustomInput
                        ref={nameInputRef}
                        required
                        sx={{
                          bgcolor: appTheme === "dark" ? "#141414" : "#f3f3f3",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box flex={1}>
                    <Box>
                      <Typography
                        fontSize="17px"
                        color={appTheme === "dark" ? "#fff" : "#000"}
                      >
                        Password
                      </Typography>
                    </Box>
                    <Box>
                      <CustomInput
                        ref={passwordInputRef}
                        type="password"
                        required
                        sx={{
                          bgcolor: appTheme === "dark" ? "#141414" : "#f3f3f3",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
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
                    <Box>
                      <Typography
                        fontSize="17px"
                        color={appTheme === "dark" ? "#fff" : "#000"}
                      >
                        Email Address
                      </Typography>
                    </Box>
                    <Box>
                      <Box
                        display="flex"
                        sx={{
                          border: "1px solid",
                          borderRadius: "10px",
                          borderColor:
                            appTheme === "dark" ? "#262626" : "#d1d5db",
                          bgcolor: appTheme === "dark" ? "#141414" : "#f3f3f3",
                          "&.MuiBox-root:hover": {
                            borderColor: "#703bf7",
                          },
                        }}
                      >
                        <Box flex="1">
                          <CustomInput
                            ref={emailInputRef}
                            type="email"
                            required
                            sx={{
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
                            {checkEmail.isPending && <Loader upload={true} />}
                            {checkEmail.isSuccess && <Box>✅</Box>}
                            {checkEmail.isError && <Box>❌</Box>}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box flex={1}>
                    <Box>
                      <Typography
                        fontSize="17px"
                        color={appTheme === "dark" ? "#fff" : "#000"}
                      >
                        Avatar
                      </Typography>
                    </Box>
                    <Box>
                      <Box
                        display="flex"
                        sx={{
                          border: "1px solid",
                          borderRadius: "10px",
                          borderColor:
                            appTheme === "dark" ? "#262626" : "#d1d5db",
                          bgcolor: appTheme === "dark" ? "#141414" : "#f3f3f3",
                          "&.MuiBox-root:hover": {
                            borderColor: "#703bf7",
                          },
                        }}
                      >
                        <Box flex="1">
                          <CustomInput
                            ref={avatarInputRef}
                            type="file"
                            required
                            sx={{
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
                        <Box flex=".1">
                          <Box
                            minWidth="100%"
                            minHeight="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            {uploadImage.isPending && <Loader upload={true} />}
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
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
