import * as React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Drawer,
  ThemeProvider,
  CssBaseline,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import {
  GitHub,
  SettingsSuggest,
  ShoppingBag,
  Brightness2,
  LightMode,
  Login,
  PersonAddAlt,
} from "@mui/icons-material";
import {
  navbar,
  menuButtonTheme,
  logoTheme,
  navPagesLinksTheme,
  authTheme,
  drawerTheme,
  drawerPagesLinksTheme,
} from "../theme/Navbar/all/allThemes";
import { RootState } from "../state management/store";
import { useSelector } from "react-redux";
import ThemeDropDown from "./Navbar/ThemeDropDown";
import DropDown from "./Navbar/DropDown";
import useCartProducts from "../hooks/useCartProducts";
import Cookies from "cookies-js";
import Theme from "../theme/Theme";

const NavBar = () => {
  const appTheme = Theme();
  const themeMode = useSelector((state: RootState) => state.Theme.mode);
  const [isDrawerOpen, setDrawer] = React.useState(false);
  const [isCartDropDownOpen, setCartDropDownOpen] = React.useState(false);
  const [selectThemeDropDownState, setSelectThemeDropDownState] =
    React.useState(false);
  const cartProducts = useCartProducts();
  const isAuthenticated = Cookies.get("user_access_token");
  const user = useSelector((state: RootState) => state.User);

  return (
    <Box
      sx={{
        minHeight: "80px",
        backgroundImage: "url('/img/navBackgroundImage.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: appTheme === "dark" ? "#141414" : "#fcfcfc",
        boxShadow: "none",
        borderBottom: "2px solid",
        borderColor: appTheme === "dark" ? "#1f1f1f" : "#999999",
      }}
    >
      <Container maxWidth="xl">
        <ThemeProvider theme={navbar}>
          <AppBar
            position="static"
            sx={{
              height: "80px",
              backgroundColor: "unset",
            }}
          >
            <Grid
              container
              alignContent={"center"}
              sx={{ height: "80px", width: "100%" }}
            >
              {/* nav drawer menu buttom */}
              <ThemeProvider theme={menuButtonTheme}>
                <CssBaseline />
                <Button
                  variant="text"
                  sx={{ backdropFilter: "blur(1px)", display: { lg: "none" } }}
                  onClick={() => setDrawer(!isDrawerOpen)}
                  color="info"
                >
                  <Typography
                    variant="h5"
                    color={appTheme === "dark" ? "#fcfcfc" : "#2F3645"}
                  >
                    M
                  </Typography>
                </Button>
              </ThemeProvider>
              {/* nav logo */}
              <Box sx={{ flex: 1 }}>
                <Grid container justifyContent="center">
                  <ThemeProvider theme={logoTheme}>
                    <CssBaseline />
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color={appTheme === "dark" ? "#fcfcfc" : "#2F3645"}
                    >
                      <Link to="/">Online Shop</Link>
                    </Typography>
                  </ThemeProvider>
                </Grid>
              </Box>
              {/* nav page links */}
              <Box
                sx={{
                  minHeight: "45px",
                  backdropFilter:
                    appTheme === "dark" ? "blur(1.6px)" : "blur(2px)",
                  border: 2,
                  borderColor: appTheme === "dark" ? "#262626" : "#999999",
                  borderRadius: 6,
                  display: { xs: "none", lg: "block" },
                  flex: 1,
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    color: appTheme === "dark" ? "#fcfcfc" : "#2F3645",
                  }}
                >
                  <ThemeProvider theme={navPagesLinksTheme}>
                    <CssBaseline />
                    <Grid
                      container
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{ height: "45px", flex: 1 }}
                    >
                      <Typography variant="subtitle1">
                        <Link to="/">Home</Link>
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{ height: "45px", flex: 1 }}
                    >
                      <Typography variant="subtitle1">
                        <Link to="/products">Products</Link>
                      </Typography>
                    </Grid>
                  </ThemeProvider>
                </Grid>
              </Box>
              <Box
                sx={{
                  display: { xs: "none", lg: "block" },
                  flex: 1,
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    height: "100%",
                    color: appTheme === "dark" ? "#fcfcfc" : "#2f3645",
                  }}
                >
                  {/* cart and profile pic OR auth buttons */}
                  {isAuthenticated ? (
                    <Grid
                      container
                      justifyContent="end"
                      alignItems="center"
                      gap={1}
                      sx={{ height: "100%", flex: 1 }}
                    >
                      <ThemeProvider theme={authTheme}>
                        <CssBaseline />
                        <Grid
                          onMouseEnter={() => setCartDropDownOpen(true)}
                          onMouseLeave={() => setCartDropDownOpen(false)}
                          position="relative"
                          container
                          justifyContent="center"
                          alignItems="center"
                          border={1}
                          borderRadius={1.4}
                          sx={{
                            width: "30%",
                            py: "5px",
                            borderColor:
                              appTheme === "dark" ? "#262626" : "#999999",
                            backgroundColor:
                              appTheme === "dark" ? "#1a1a1a" : "white",
                          }}
                        >
                          <Link to="dashboard/cart">
                            <Grid container alignItems="center">
                              <ShoppingBag
                                sx={{ fontSize: "18px", mr: "10px" }}
                              />
                              <Typography variant="subtitle2" fontWeight="bold">
                                Cart
                              </Typography>
                            </Grid>
                          </Link>
                          <DropDown
                            mode={appTheme!}
                            display={isCartDropDownOpen ? "block" : "none"}
                            top="33px"
                            left={
                              cartProducts?.length === 0 || !cartProducts
                                ? "-15px"
                                : "-155px"
                            }
                            p={
                              cartProducts?.length === 0 || !cartProducts
                                ? "10px"
                                : "2px"
                            }
                          >
                            {cartProducts?.length === 0 || !cartProducts ? (
                              <Box px="20px">Empty</Box>
                            ) : (
                              <Box
                                borderRadius="10px"
                                bgcolor={appTheme === "dark" ? "" : "#EEEEEE"}
                                p="6px"
                              >
                                {cartProducts?.map(
                                  (item, index: number) =>
                                    index <= 2 && (
                                      <Box
                                        key={item?.description.concat(
                                          Math.random().toString()
                                        )}
                                        minWidth="360px"
                                        minHeight="70px"
                                        pb={"10px"}
                                        borderRadius="10px"
                                      >
                                        <Divider
                                          variant="middle"
                                          color="silver"
                                          sx={{
                                            display:
                                              index === 0 ? "none" : "block",
                                            mb: "10px",
                                          }}
                                        ></Divider>
                                        <Box display="flex" width="100%">
                                          <Box
                                            width="20%"
                                            height="100%"
                                            borderRadius="14px"
                                          >
                                            <Box height="100%" p="3px">
                                              <img
                                                style={{
                                                  borderRadius: "10px",
                                                  objectFit: "contain",
                                                }}
                                                src={item?.images[0]}
                                                alt=""
                                              />
                                            </Box>
                                          </Box>
                                          <Box
                                            width="58%"
                                            height="100%"
                                            pl="10px"
                                          >
                                            <Box
                                              display="flex"
                                              flexDirection="column"
                                            >
                                              <Box
                                                maxHeight="40px"
                                                overflow="hidden"
                                              >
                                                <Typography
                                                  variant="h6"
                                                  fontSize="13px"
                                                >
                                                  {item?.title}
                                                </Typography>
                                              </Box>
                                              <Box
                                                pt="4px"
                                                maxHeight="25px"
                                                overflow="hidden"
                                              >
                                                <Typography
                                                  variant="subtitle1"
                                                  fontSize="11px"
                                                  color="gray"
                                                >
                                                  {item?.description}
                                                </Typography>
                                              </Box>
                                            </Box>
                                          </Box>
                                          <Box
                                            width="20%"
                                            height="100%"
                                            overflow="hidden"
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="end"
                                            py="10px"
                                          >
                                            <Box mb="auto" alignSelf="end">
                                              $
                                              {item &&
                                                (
                                                  item.price * item.qntt
                                                ).toLocaleString()}
                                            </Box>
                                            <Box alignSelf="end">
                                              {item?.qntt}
                                            </Box>
                                          </Box>
                                        </Box>
                                      </Box>
                                    )
                                )}
                              </Box>
                            )}
                            {cartProducts && cartProducts.length > 3 && (
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Link to="dashboard/cart">More ...</Link>
                              </Box>
                            )}
                          </DropDown>
                        </Grid>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            width: "25%",
                          }}
                        >
                          <Link to="dashboard">
                            <Avatar
                              sx={{
                                bgcolor: appTheme === "dark" ? "#1a1a1a" : "",
                              }}
                              alt="profile"
                              src={user.avatar}
                            />
                          </Link>
                        </Grid>
                      </ThemeProvider>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      justifyContent="end"
                      alignItems="center"
                      gap={1}
                      sx={{ height: "100%", flex: 1 }}
                    >
                      <ThemeProvider theme={authTheme}>
                        <CssBaseline />
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          border={1}
                          borderRadius={1.4}
                          sx={{
                            width: "30%",
                            py: "5px",
                            borderColor:
                              appTheme === "dark" ? "#262626" : "#999999",
                            backgroundColor:
                              appTheme === "dark" ? "#1a1a1a" : "white",
                          }}
                        >
                          <Link to="/login">
                            <Grid container alignItems="center">
                              <Login sx={{ fontSize: "18px", mr: "10px" }} />
                              <Typography variant="subtitle2" fontWeight="bold">
                                Login
                              </Typography>
                            </Grid>
                          </Link>
                        </Grid>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          border={1}
                          borderRadius={1.4}
                          sx={{
                            width: "37%",
                            px: "1px",
                            py: "5px",
                            borderColor:
                              appTheme === "dark" ? "#262626" : "#999999",
                            backgroundColor:
                              appTheme === "dark" ? "#1a1a1a" : "white",
                          }}
                        >
                          <Link to="signup">
                            <Grid container alignItems="center">
                              <PersonAddAlt
                                sx={{ fontSize: "20px", mr: "6px" }}
                              />
                              <Typography variant="subtitle2" fontWeight="bold">
                                Sign Up
                              </Typography>
                            </Grid>
                          </Link>
                        </Grid>
                      </ThemeProvider>
                    </Grid>
                  )}
                  {/* theme and github info */}
                  <Grid
                    container
                    alignItems="center"
                    sx={{ height: "100%", flex: 0.8, ml: "10px" }}
                  >
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={{ width: "35%" }}
                    >
                      <Box position="relative">
                        <ThemeProvider theme={menuButtonTheme}>
                          <CssBaseline />
                          <Button
                            sx={{
                              "&.MuiButtonBase-root": {
                                minWidth: "10px",
                                width: "34px",
                                height: "37px",
                              },
                            }}
                            variant="text"
                            color="info"
                            onClick={() =>
                              setSelectThemeDropDownState(
                                selectThemeDropDownState ? false : true
                              )
                            }
                          >
                            <Box
                              sx={{
                                zIndex: "999999999",
                                border: 1,
                                borderRadius: 1.3,
                                borderColor:
                                  appTheme === "dark" ? "#262626" : "#999999",
                                backgroundColor:
                                  appTheme === "dark" ? "#1a1a1a" : "#f0f2ff",
                                color:
                                  appTheme === "dark" ? "#fcfcfc" : "#2F3645",
                                p: "5px",
                              }}
                            >
                              {themeMode === "system" ? (
                                <SettingsSuggest />
                              ) : themeMode === "dark" ? (
                                <Brightness2 />
                              ) : (
                                <LightMode />
                              )}
                            </Box>
                          </Button>
                        </ThemeProvider>
                      </Box>
                      {/* theme drop down */}
                      <ThemeDropDown
                        top="65px"
                        display={selectThemeDropDownState ? "block" : "none"}
                        mode={appTheme!}
                      />
                    </Grid>
                    {/* nav github link */}
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        width: { md: "18%", xl: "14%" },
                        border: 1,
                        borderRadius: 1.3,
                        p: "2px",
                        borderColor:
                          appTheme === "dark" ? "#262626" : "#999999",
                        backgroundColor:
                          appTheme === "dark" ? "#1a1a1a" : "white",
                      }}
                    >
                      <Link to="https://github.com/Seraaga022">
                        <GitHub
                          sx={{
                            color: appTheme === "dark" ? "white" : "black",
                          }}
                        />
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </AppBar>
        </ThemeProvider>
        {/* left drawer */}
        {/* <ThemeProvider theme={drawerTheme}> */}
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setDrawer(!isDrawerOpen)}
            color={appTheme === "dark" ? "#fcfcfc" : "#2F3645"}
          >
            <Box sx={{ width: "100%", height: "100px", pt: "20px" }}>
              {/* cart and profile pic OR auth buttons */}
              {isAuthenticated ? (
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                    sx={{ height: "50px", px: "10px", pt: "10px", mb: "30px" }}
                  >
                    <ThemeProvider theme={authTheme}>
                      <CssBaseline />
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Link
                          to="dashboard/cart"
                          onClick={() => setDrawer(false)}
                        >
                          <Grid container alignItems="center">
                            <ShoppingBag
                              sx={{ fontSize: "18px", mr: "10px" }}
                            />
                          </Grid>
                        </Link>
                        <Box>
                          <Link to="dashboard" onClick={() => setDrawer(false)}>
                            <Avatar
                              sx={{
                                bgcolor: appTheme === "dark" ? "#1a1a1a" : "",
                              }}
                              alt="profile"
                              src={user.avatar}
                            />
                          </Link>
                        </Box>
                      </Grid>
                    </ThemeProvider>
                  </Grid>
                </Box>
              ) : (
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                    sx={{ height: "50px", px: "10px", pt: "10px", mb: "30px" }}
                  >
                    <ThemeProvider theme={authTheme}>
                      <CssBaseline />
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        border={1}
                        borderRadius={1.4}
                        sx={{
                          py: "1px",
                          borderColor:
                            appTheme === "dark" ? "#262626" : "#999999",
                          backgroundColor:
                            appTheme === "dark" ? "#1a1a1a" : "silver",
                        }}
                      >
                        <Link to="/login">
                          <Grid container alignItems="center">
                            <Login sx={{ fontSize: "18px", mr: "10px" }} />
                            <Typography variant="subtitle1" fontWeight="bold">
                              Login
                            </Typography>
                          </Grid>
                        </Link>
                      </Grid>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        border={1}
                        borderRadius={1.4}
                        sx={{
                          py: "1px",
                          borderColor:
                            appTheme === "dark" ? "#262626" : "#999999",
                          backgroundColor:
                            appTheme === "dark" ? "#1a1a1a" : "silver",
                        }}
                      >
                        <Link to="signup">
                          <Grid container alignItems="center">
                            <PersonAddAlt
                              sx={{ fontSize: "20px", mr: "6px" }}
                            />
                            <Typography variant="subtitle1" fontWeight="bold">
                              Sign Up
                            </Typography>
                          </Grid>
                        </Link>
                      </Grid>
                    </ThemeProvider>
                  </Grid>
                </Box>
              )}
              {/* github and theme info */}
              <Box>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: "80%",
                    pl: "20px",
                    mb: "15px",
                  }}
                >
                  {/* github section */}
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      width: "30%",
                      height: "100%",
                      border: 1,
                      borderRadius: 1.3,
                      p: "2px",
                      borderColor: appTheme === "dark" ? "#262626" : "#999999",
                      backgroundColor:
                        appTheme === "dark" ? "#1a1a1a" : "silver",
                    }}
                  >
                    <Link to="https://github.com/Seraaga022">
                      <GitHub
                        sx={{
                          color: appTheme === "dark" ? "white" : "black",
                        }}
                      />
                    </Link>
                  </Grid>
                  {/* theme section */}
                  <Box
                    position="relative"
                    sx={{
                      width: "33px",
                      height: "33px",
                    }}
                  >
                    <ThemeProvider theme={menuButtonTheme}>
                      <CssBaseline />
                      <Button
                        sx={{
                          "&.MuiButtonBase-root": {
                            minWidth: "10px",
                            width: "29px",
                            height: "30px",
                          },
                          mt: "2px",
                          ml: "10px",
                          borderRadius: 1.3,
                        }}
                        variant="text"
                        color="info"
                        onClick={() =>
                          setSelectThemeDropDownState(
                            selectThemeDropDownState ? false : true
                          )
                        }
                      >
                        <Box
                          sx={{
                            border: 1,
                            borderRadius: 1.3,
                            borderColor:
                              appTheme === "dark" ? "#262626" : "#999999",
                            backgroundColor:
                              appTheme === "dark" ? "#1a1a1a" : "#f0f2ff",
                            color: appTheme === "dark" ? "#fcfcfc" : "#2F3645",
                            p: "2px",
                          }}
                        >
                          {themeMode === "system" ? (
                            <SettingsSuggest />
                          ) : themeMode === "dark" ? (
                            <Brightness2 />
                          ) : (
                            <LightMode />
                          )}
                        </Box>
                      </Button>
                    </ThemeProvider>
                  </Box>
                  <ThemeDropDown
                    top="140px"
                    display={selectThemeDropDownState ? "block" : "none"}
                    mode={appTheme!}
                  />
                </Grid>
              </Box>
              {/* basic pages */}
              <Box>
                <Stack sx={{ px: "10px" }}>
                  <ThemeProvider theme={drawerPagesLinksTheme}>
                    <Box sx={{ pl: "20px", mb: "15px" }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={"bold"}
                        fontSize="25px"
                      >
                        Pages
                      </Typography>
                    </Box>
                    <CssBaseline />
                    <Stack>
                      <Box mb="7px">
                        <Link to="/" onClick={() => setDrawer(false)}>
                          <Typography variant="subtitle2" fontSize="20px">
                            🏡 home
                          </Typography>
                        </Link>
                      </Box>
                      <Box>
                        <Link to="/products" onClick={() => setDrawer(false)}>
                          <Typography variant="subtitle2" fontSize="20px">
                            📦 products
                          </Typography>
                        </Link>
                      </Box>
                    </Stack>
                  </ThemeProvider>
                </Stack>
              </Box>
            </Box>
          </Drawer>
        {/* </ThemeProvider> */}
      </Container>
    </Box>
  );
};

export default NavBar;
