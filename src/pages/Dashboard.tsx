import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state management/store";
import React from "react";
import ProductsButton from "../theme/Products/ProductsButton";
import { Edit } from "@mui/icons-material";
import CustomInput from "../components/Products/ui/CustomInput";
import { useCheckEmail, useUpdateUser, useUploadFile } from "../hooks/useAuth";
import {
  checkEmailResT,
  fileUploadResT,
  updateUserReqT,
} from "../utils/types/Auth";
import { UserT, updateUser } from "../state management/User/UserSlice";
import { UserUpdateCunstructor } from "../hooks/Cunstructor";

const Dashboard = () => {
  const appTheme = useTheme();
  const user = useSelector((state: RootState) => state.User);
  const [bigImage, setBigImage] = React.useState(user.avatar);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const imageRef = React.useRef<HTMLInputElement>(null);
  const checkEmail = useCheckEmail(setTheEmailVerificationRes);
  const updateUserReq = useUpdateUser<Partial<updateUserReqT>>(updateUserState);
  const uploadFile = useUploadFile(requestToUpdateUser);
  // const [authReqsRes, setAuthReqsRes] = React.useState({
  //   // checkPassword: "",
  //   checkUpdate: "",
  // });
  const [inputsVal, setInputsVal] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [inputFile, setInputFile] = React.useState<Blob>(new Blob());
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (nameRef.current && emailRef.current && passwordRef.current)
      if (
        nameRef.current.value.length > 0 &&
        emailRef.current.value.length > 0 &&
        passwordRef.current.value.length >= 4
      ) {
        setInputsVal({
          ...inputsVal,
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        checkEmail.mutateAsync(emailRef.current.value);
      } else console.log("name or email or password should not be empty");
  };
  const handleEditAvatarClick = () => {
    if (imageRef.current) imageRef.current.click();
  };

  function setTheEmailVerificationRes(res: checkEmailResT) {
    // again the is available but of the api
    if (!res.isAvailable) uploadFile.mutateAsync(inputFile);
  }
  function requestToUpdateUser(res: fileUploadResT) {
    console.log("image uploaded");
    setBigImage(res.location);
    const userObj = UserUpdateCunstructor(
      inputsVal.name,
      inputsVal.email,
      inputsVal.password,
      res.location,
      user
    );
    if (res && Object.values(userObj).length > 0) {
      updateUserReq.mutateAsync(userObj);
    }
  }
  function updateUserState(res: UserT) {
    dispatch(updateUser(res));
    console.log("user updated");
  }

  return (
    <Box
      bgcolor={appTheme.palette.mode === "dark" ? "#141414" : "#fff"}
      color={appTheme.palette.mode === "dark" ? "#ffef" : "#000"}
      py="40px"
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          height={{ xs: "auto", md: "400px" }}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box
            height={{ md: "90%", lg: "100%" }}
            flex="1"
            mb={{ xs: "40px", md: "auto" }}
          >
            <Box
              height={{ xs: "50%", md: "100%" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box position="relative" height="80%" width="60%">
                <Box>
                  <Avatar
                    src={bigImage}
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                    alt=""
                  />
                </Box>
                <Box position="absolute" bottom="0" right="0" color="red">
                  <Box bgcolor="#703bf7" borderRadius="10px">
                    <ThemeProvider theme={ProductsButton}>
                      <Button
                        onClick={handleEditAvatarClick}
                        sx={{
                          textTransform: "none",
                          "&.MuiButtonBase-root": {
                            minWidth: "10px",
                            height: "40px",
                            borderRadius: "10px",
                            color: "white",
                          },
                        }}
                      >
                        <Box display="flex">
                          <Box mr="5px">
                            <Edit />
                          </Box>
                          <Box>Edit avatar</Box>
                        </Box>
                        <CustomInput
                          type="file"
                          ref={imageRef}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setInputFile(e.target.files![0])
                          }
                          sx={{ display: "none" }}
                        ></CustomInput>
                      </Button>
                    </ThemeProvider>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box height="100%" flex="1">
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack width="80%" spacing={{ xs: 7, md: 3 }}>
                <Box>
                  <Box>
                    <Typography
                      fontSize="17px"
                      color={appTheme.palette.mode === "dark" ? "#fff" : "#000"}
                    >
                      Name
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <Box>
                        <CustomInput
                          ref={nameRef}
                          type="text"
                          required
                          defaultValue={user.name}
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
                <Box>
                  <Box>
                    <Typography
                      fontSize="17px"
                      color={appTheme.palette.mode === "dark" ? "#fff" : "#000"}
                    >
                      Email Address
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <Box>
                        <CustomInput
                          ref={emailRef}
                          type="email"
                          required
                          defaultValue={user.email}
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
                <Box>
                  <Box>
                    <Typography
                      fontSize="17px"
                      color={appTheme.palette.mode === "dark" ? "#fff" : "#000"}
                    >
                      Password
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <Box>
                        <CustomInput
                          ref={passwordRef}
                          type="text"
                          required
                          defaultValue={user.password}
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
                <Box>
                  <Box display="flex" justifyContent="center">
                    <Box borderRadius="10px" bgcolor="#703bf7">
                      <Button
                        onClick={handleSubmit}
                        sx={{
                          textTransform: "none",
                          "&.MuiButtonBase-root": {
                            minWidth: "10px",
                            width: "180px",
                            height: "43px",
                            borderRadius: "10px",
                            color: "white",
                          },
                        }}
                      >
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
