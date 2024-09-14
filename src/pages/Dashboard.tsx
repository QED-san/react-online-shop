import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state management/store";
import React from "react";
import ProductsButton from "../theme/Products/ProductsButton";
import { Edit, Logout } from "@mui/icons-material";
import CustomInput from "../components/Products/ui/CustomInput";
import { useCheckEmail, useUpdateUser, useUploadFile } from "../hooks/useAuth";
import {
  checkEmailResT,
  fileUploadResT,
  updateUserReqT,
} from "../utils/types/Auth";
import {
  UserT,
  logOutUser,
  updateUser,
} from "../state management/User/UserSlice";
import {
  UpdateUserReqT,
  UserUpdateCunstructor,
} from "../hooks/Cunstructors/Cunstructor";
import { ListAlt } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Theme from "../theme/Theme";
import { resetOrderState } from "../state management/Orders/OrderSlice";
import { resetCart } from "../state management/Cart/CartSlice";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const appTheme = Theme();
  const user = useSelector((state: RootState) => state.User);
  const [bigImage, setBigImage] = React.useState(user.avatar);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user_access_token"]);
  console.log(cookies, setCookie);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const checkEmail = useCheckEmail(setTheEmailVerificationRes);
  const updateUserRequest =
    useUpdateUser<Partial<updateUserReqT>>(updateUserState);
  const uploadFile = useUploadFile(setTheAvatarUploadRes);
  const [tempEmail, setTempEmail] = React.useState<string>("");
  const [authReqsRes, setAuthReqsRes] = React.useState({
    emailChecked: false,
    avatarChecked: false,
  });
  const [inputsVal, setInputsVal] = React.useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [inputFile, setInputFile] = React.useState<Blob>(new Blob());
  const dispatch = useDispatch();
  const [avatarChanged, setAvatarChanged] = React.useState(false);

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
          password: passwordRef.current.value,
        });
        setTempEmail(emailRef.current.value);
        checkEmail.mutateAsync(emailRef.current.value);
      } else console.log("name or email or password should not be empty");
  };

  const handleEditAvatarClick = () => {
    if (imageInputRef.current) imageInputRef.current.click();
  };

  function setTheEmailVerificationRes(res: checkEmailResT) {
    // again the is available but of the api
    if (!res.isAvailable) {
      setInputsVal({ ...inputsVal, email: tempEmail });
      setTempEmail("");
      setAuthReqsRes({ ...authReqsRes, emailChecked: true });
    }
    if (avatarChanged) {
      uploadFile
        .mutateAsync(inputFile)
        .catch(() =>
          toast.error("Failed to update avatar", { duration: 2000 })
        );
      setAvatarChanged(false);
    }
  }

  function setTheAvatarUploadRes(res: fileUploadResT) {
    toast.success("Avatar updated", {
      duration: 1000,
    });
    setBigImage(res.location);
    setInputsVal({ ...inputsVal, avatar: res.location });
    setAuthReqsRes({ ...authReqsRes, avatarChecked: true });
  }

  function updateUserState(res: UserT) {
    dispatch(updateUser(res));
    toast.success("User updated successfuly", {
      duration: 3000,
    });
  }

  React.useEffect(() => {
    function reqToUpdateUser() {
      const initialUser: UpdateUserReqT = {
        name: inputsVal.name,
        password: inputsVal.password,
        email: "",
        avatar: "",
        userState: user,
      };
      if (authReqsRes.avatarChecked) initialUser.avatar = inputsVal.avatar;
      if (authReqsRes.emailChecked) initialUser.email = inputsVal.email;
      const userObj = UserUpdateCunstructor(initialUser);
      if (Object.values(userObj).length > 0) {
        updateUserRequest.mutateAsync(userObj).catch(() =>
          toast.error("Failed to update user", {
            duration: 2000,
          })
        );
      }
    }

    reqToUpdateUser();
  }, [
    inputsVal.name,
    inputsVal.password,
    inputsVal.email,
    inputsVal.avatar,
    authReqsRes.avatarChecked,
    authReqsRes.emailChecked,
  ]);

  return (
    <Box
      bgcolor={appTheme === "dark" ? "#141414" : "#fff"}
      color={appTheme === "dark" ? "#ffef" : "#000"}
      py="40px"
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          height={{ xs: "auto", md: "400px" }}
          minHeight="400px"
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
                  <Box display="flex" justifyContent="end">
                    <Box position="absolute" top="0" right="0">
                      <Tooltip title="Log Out">
                        <Button
                          onClick={() => {
                            removeCookie("user_access_token");
                            dispatch(logOutUser());
                            dispatch(resetCart());
                            dispatch(resetOrderState());
                            navigate("/products");
                          }}
                          sx={{
                            "&.MuiButtonBase-root": {
                              minWidth: "10px",
                              width: "40px",
                              height: "40px",
                              borderRadius: "10px",
                            },
                          }}
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            pl="1px"
                          >
                            <Logout sx={{ color: "red" }} />
                          </Box>
                        </Button>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Avatar
                    src={bigImage}
                    sx={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "340px",
                    }}
                    alt=""
                  />
                </Box>
                {/* edit button */}
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
                          ref={imageInputRef}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setAvatarChanged(true);
                            setInputFile(e.target.files![0]);
                          }}
                          sx={{ display: "none" }}
                        ></CustomInput>
                      </Button>
                    </ThemeProvider>
                  </Box>
                </Box>
                {/* order history section */}
                <Box
                  display="inline"
                  bgcolor={appTheme === "dark" ? "white" : "#f3f3f3"}
                  pt="8px"
                  pb="10px"
                  px="8px"
                  borderRadius="10px"
                >
                  <Tooltip title="Order History">
                    <Link to="orders">
                      <ListAlt sx={{ color: "#703bf7" }} />
                    </Link>
                  </Tooltip>
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
                      color={appTheme === "dark" ? "#fff" : "#000"}
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
      <Toaster position="bottom-left" />
    </Box>
  );
};

export default Dashboard;
