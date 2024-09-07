import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Add,
  Clear,
  CoPresent,
  Language,
  Remove,
  Store,
} from "@mui/icons-material";
import useCartProducts from "../hooks/useCartProducts";
import {
  incrementCartItemQntt,
  decrementCartItemQntt,
  removeFromCart,
  resetCart,
} from "../state management/Cart/CartSlice";
import { useDispatch } from "react-redux";
import { CartReducerCunstructor } from "../state management/Cart/Cunstructor";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  addOrder,
  DateT,
  PaymentTypeT,
  PurchaseMethodT,
} from "../state management/Orders/OrderSlice";
import { OrderReucerCunstructor } from "../state management/Orders/Custructors";

export const Cart = () => {
  const products = useCartProducts();
  const appTheme = useTheme();
  const dispatch = useDispatch();
  const [checkOutSectionIsOpen, setCheckOutSectionOpen] =
    React.useState<boolean>(false);
  const [productsDiscount] = React.useState(0);
  const [orderInfo, setOrderInfo] = React.useState<{
    paymentType: PaymentTypeT;
    purchaseMethod: PurchaseMethodT;
    deliveryDate: DateT;
  }>({
    paymentType: "online",
    purchaseMethod: "online",
    deliveryDate: "",
  });
  const [deliveryDate, setDeliveryDate] = React.useState<Dayjs | null>(null);

  React.useEffect(() => {
    if (deliveryDate && deliveryDate > dayjs("2024-01-01"))
      setOrderInfo({
        ...orderInfo,
        deliveryDate: deliveryDate.toString(),
      });
  }, [deliveryDate]);

  const createOrder = () => {
    if (products) {
      dispatch(addOrder(OrderReucerCunstructor(orderInfo, products)));
      dispatch(resetCart());
    }
  };

  return (
    <Box
      minHeight="550px"
      bgcolor={appTheme.palette.mode === "dark" ? "#141414" : "#fff"}
      pt="30px"
    >
      <Container
        maxWidth="lg"
        sx={{
          "&.MuiContainer-maxWidthLg": {
            maxWidth: "1320px",
          },
        }}
      >
        {products ? (
          <>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              gap="30px"
            >
              <Box
                flex={{ xs: "1", md: "1" }}
                color={appTheme.palette.mode === "dark" ? "#ffef" : "#000"}
              >
                <Box
                  p="20px"
                  border="2px solid"
                  borderColor={
                    appTheme.palette.mode === "dark" ? "#262626" : "#eeeef3"
                  }
                  borderRadius="15px"
                >
                  {/* cart header */}
                  <Box display="flex" justifyContent="end" pb="20px">
                    <Box mr="auto" display="flex" alignItems="end">
                      <Box>
                        <Typography variant="h5">Cart</Typography>
                      </Box>
                      <Box ml="10px">
                        <Typography fontSize="13px" color="gray">
                          ({products.length} products)
                        </Typography>
                      </Box>
                    </Box>
                    {/* <Box>
                      <ThemeProvider theme={menuButtonTheme}>
                        <Button
                          sx={{ textTransform: "none" }}
                          onClick={() => dispatch(resetCart())}
                        >
                          <Box display="flex" alignItems="center">
                            <Box mr="5px">
                              <Clear sx={{ fontSize: "14px", color: "red" }} />
                            </Box>
                            <Box>
                              <Typography color="red" fontSize="13px">
                                Clear cart
                              </Typography>
                            </Box>
                          </Box>
                        </Button>
                      </ThemeProvider>
                    </Box> */}
                  </Box>
                  {/* cart item columns title */}
                  <Box pt="10px" display={{ xs: "none", md: "block" }}>
                    <Box display="flex" pl="20px">
                      <Box flex="1.2">Product</Box>
                      <Box flex=".50">Count</Box>
                      <Box flex=".6">Price</Box>
                    </Box>
                  </Box>
                  {/* cart products */}
                  <Box pt="15px">
                    <Box>
                      {products.map((p) => {
                        return (
                          <Box
                            key={p?.category.name
                              .concat(p?.category.image)
                              .concat(Math.random().toString())}
                            mb="15px"
                            p="10px"
                            border="3px solid"
                            borderColor={
                              appTheme.palette.mode === "dark"
                                ? "#262626"
                                : "#eeeef3"
                            }
                            borderRadius="20px"
                          >
                            <Box
                              display="flex"
                              flexDirection={{ xs: "column", md: "row" }}
                              gap="20px"
                            >
                              {/* image and title and description */}
                              <Box flex={{ xs: "", md: 1.1 }} minHeight="100px">
                                <Box
                                  display="flex"
                                  flexDirection={{
                                    xs: "column",
                                    md: "row",
                                  }}
                                  height="100%"
                                >
                                  <Box flex={{ xs: 1, md: 0.3 }}>
                                    <img
                                      src={p?.images[0]}
                                      style={{ borderRadius: "13px" }}
                                      alt=""
                                    />
                                  </Box>
                                  <Box flex={{ xs: 1, md: 0.7 }}>
                                    <Box
                                      height="100%"
                                      display="flex"
                                      flexDirection="column"
                                      justifyContent="center"
                                      pl="20px"
                                      pt={{ xs: "10px", md: "0" }}
                                    >
                                      <Box
                                        maxHeight={{
                                          xs: "130px",
                                          md: "20px",
                                        }}
                                        overflow="hidden"
                                        pb={{ xs: "20px", md: "0" }}
                                      >
                                        <Typography
                                          variant="subtitle2"
                                          fontSize={{
                                            xs: "25px",
                                            md: "14px",
                                          }}
                                          fontWeight="bold"
                                        >
                                          {p?.title}
                                        </Typography>
                                      </Box>
                                      <Box
                                        maxHeight={{ xs: "62px", md: "35px" }}
                                        overflow="hidden"
                                      >
                                        <Typography
                                          fontSize={{
                                            xs: "14px",
                                            md: "12px",
                                          }}
                                          color="gray"
                                        >
                                          {p?.description}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                              {/* qntt management */}
                              <Box
                                minHeight="100px"
                                flex={{ xs: "", md: 0.8 }}
                                p={{ xs: "25px", md: "0" }}
                              >
                                <Box height="100%">
                                  <Box
                                    height="100%"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Box>
                                      <Button
                                        onClick={() =>
                                          p
                                            ? p.qntt > 1
                                              ? dispatch(
                                                  decrementCartItemQntt(
                                                    CartReducerCunstructor(p.id)
                                                  )
                                                )
                                              : dispatch(
                                                  removeFromCart(
                                                    CartReducerCunstructor(p.id)
                                                  )
                                                )
                                            : null
                                        }
                                        sx={{
                                          "&.MuiButtonBase-root": {
                                            minWidth: "10px",
                                            width: { xs: "50px", md: "30px" },
                                            height: "30px",
                                            p: "0",
                                            border: "2px solid",
                                            borderRadius: {
                                              xs: "10px",
                                              md: "9999px",
                                            },
                                            borderColor: "silver",
                                          },
                                        }}
                                      >
                                        <Remove
                                          sx={{
                                            color:
                                              appTheme.palette.mode === "dark"
                                                ? "#fff"
                                                : "#000",
                                            fontSize: "16px",
                                          }}
                                        />
                                      </Button>
                                    </Box>
                                    <Box mx="20px" fontWeight="bold">
                                      {p?.qntt}
                                    </Box>
                                    <Box>
                                      <Button
                                        onClick={() =>
                                          p &&
                                          dispatch(
                                            incrementCartItemQntt(
                                              CartReducerCunstructor(p.id)
                                            )
                                          )
                                        }
                                        sx={{
                                          "&.MuiButtonBase-root": {
                                            minWidth: "10px",
                                            width: { xs: "50px", md: "30px" },
                                            height: "30px",
                                            p: "0",
                                            border: "2px solid",
                                            borderRadius: {
                                              xs: "10px",
                                              md: "9999px",
                                            },
                                            borderColor: "silver",
                                          },
                                        }}
                                      >
                                        <Add
                                          sx={{
                                            color:
                                              appTheme.palette.mode === "dark"
                                                ? "#fff"
                                                : "#000",
                                            fontSize: "16px",
                                          }}
                                        />
                                      </Button>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                              {/* price and remover */}
                              <Box
                                flex={{ xs: "", md: 0.6 }}
                                minHeight="100px"
                                px={{ xs: "40px", md: "0" }}
                              >
                                <Box
                                  minHeight="100%"
                                  display="flex"
                                  justifyContent="end"
                                >
                                  <Box
                                    mr="auto"
                                    display="flex"
                                    alignItems="center"
                                  >
                                    <Box>
                                      <Typography
                                        fontSize="20px"
                                        fontWeight="bold"
                                      >
                                        ${p && p.price * p.qntt}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Box display="flex" alignItems="center">
                                    <Box>
                                      <Button
                                        sx={{
                                          textTransform: "none",
                                          "&.MuiButtonBase-root": {
                                            minWidth: "10px",
                                            p: "10px",
                                            borderRadius: "9999px",
                                          },
                                        }}
                                        onClick={() =>
                                          p &&
                                          dispatch(
                                            removeFromCart(
                                              CartReducerCunstructor(p.id)
                                            )
                                          )
                                        }
                                      >
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                        >
                                          <Clear
                                            sx={{
                                              fontSize: "20px",
                                              color: "red",
                                            }}
                                          />
                                        </Box>
                                      </Button>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* checkout section */}
              <Box
                flex={{ xs: "1", md: ".4" }}
                bgcolor={
                  appTheme.palette.mode === "dark" ? "#373A40" : "#f3f3f9"
                }
                borderRadius="20px"
                p="20px"
                pb={checkOutSectionIsOpen ? "20px" : "200px"}
                maxHeight={checkOutSectionIsOpen ? "500px" : "200px"}
              >
                {/* price info */}
                <Box>
                  <Divider
                    variant="middle"
                    color={
                      appTheme.palette.mode === "dark" ? "white" : "silver"
                    }
                  ></Divider>
                  <Stack spacing={1}>
                    <Box pt="20px" display="flex" justifyContent="end">
                      <Box mr="auto">
                        <Typography
                          variant="subtitle2"
                          color={
                            appTheme.palette.mode === "dark" ? "white" : "gray"
                          }
                          fontSize="13px"
                        >
                          Subtotal
                        </Typography>
                      </Box>
                      <Box>
                        {products.reduce(
                          (accum, current) =>
                            current.price * current.qntt + accum,
                          0
                        )}
                        .00
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent="end">
                      <Box mr="auto">
                        <Typography
                          variant="subtitle2"
                          color={
                            appTheme.palette.mode === "dark" ? "white" : "gray"
                          }
                          fontSize="13px"
                        >
                          Discount
                        </Typography>
                      </Box>
                      <Box>-{productsDiscount}.00</Box>
                    </Box>
                    <Box display="flex" justifyContent="end">
                      <Box mr="auto">
                        <Typography
                          variant="subtitle1"
                          color={
                            appTheme.palette.mode === "dark" ? "silver" : "#000"
                          }
                        >
                          Total
                        </Typography>
                      </Box>
                      <Box>
                        {products.reduce(
                          (accum, current) =>
                            current.price * current.qntt + accum,
                          0
                        ) - productsDiscount}
                        .00
                      </Box>
                    </Box>
                  </Stack>
                  <Box display={checkOutSectionIsOpen ? "none" : "block"}>
                    <Button
                      onClick={() => setCheckOutSectionOpen(true)}
                      sx={{
                        mt: "20px",
                        textTransform: "none",
                        "&.MuiButtonBase-root": {
                          minWidth: "10px",
                          width: "100%",
                          p: "10px",
                          borderRadius: "10px",
                          color:
                            appTheme.palette.mode === "dark" ? "#000" : "#fff",
                          backgroundColor:
                            appTheme.palette.mode === "dark"
                              ? "#dedede"
                              : "#080816",
                        },
                      }}
                    >
                      Continue to Checkout
                    </Button>
                  </Box>
                </Box>
                {/* order infos */}
                <Box
                  pt="20px"
                  display={checkOutSectionIsOpen ? "block" : "none"}
                >
                  <Box>
                    <Box>
                      <Box mb="8px">
                        <Typography
                          fontSize="15px"
                          color={
                            appTheme.palette.mode === "dark"
                              ? "#F6F5F2"
                              : "black"
                          }
                        >
                          Payment type
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 24 },
                              ml: "10px",
                            }}
                            onChange={(e) =>
                              setOrderInfo({
                                ...orderInfo,
                                paymentType:
                                  e.target.checked === true
                                    ? "inPerson"
                                    : "online",
                              })
                            }
                            icon={<Language sx={{ color: "gray" }} />}
                            checkedIcon={<CoPresent />}
                          />
                        }
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color:
                              appTheme.palette.mode === "dark"
                                ? "#F0EBE3"
                                : "black",
                          },
                        }}
                        label={
                          orderInfo.paymentType === "inPerson"
                            ? "In person"
                            : "online"
                        }
                      />
                    </Box>
                    <Box mt="10px">
                      <Box mb="8px">
                        <Typography
                          fontSize="15px"
                          color={
                            appTheme.palette.mode === "dark"
                              ? "#F6F5F2"
                              : "black"
                          }
                        >
                          Purchase method
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 24 },
                              ml: "10px",
                            }}
                            onChange={(e) =>
                              setOrderInfo({
                                ...orderInfo,
                                purchaseMethod:
                                  e.target.checked === true
                                    ? "nearbyShop"
                                    : "online",
                              })
                            }
                            icon={<Language sx={{ color: "gray" }} />}
                            checkedIcon={<Store />}
                          />
                        }
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color:
                              appTheme.palette.mode === "dark"
                                ? "#F0EBE3"
                                : "black",
                          },
                        }}
                        label={
                          orderInfo.purchaseMethod === "nearbyShop"
                            ? "Nearby shop"
                            : "online"
                        }
                      />
                    </Box>
                    <Box mt="10px">
                      <Box mb="8px">
                        <Typography
                          fontSize="15px"
                          color={
                            appTheme.palette.mode === "dark"
                              ? "#F6F5F2"
                              : "black"
                          }
                        >
                          Delivery date
                        </Typography>
                      </Box>
                      <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={["DatePicker", "DatePicker"]}
                          >
                            <DatePicker
                              disablePast={true}
                              label="delivery date"
                              value={deliveryDate}
                              onChange={(newValue) => setDeliveryDate(newValue)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        sx={{
                          mt: "20px",
                          textTransform: "none",
                          "&.MuiButtonBase-root": {
                            minWidth: "10px",
                            width: "100%",
                            p: "10px",
                            borderRadius: "10px",
                            color:
                              appTheme.palette.mode === "dark"
                                ? "#000"
                                : "#fff",
                            backgroundColor:
                              appTheme.palette.mode === "dark"
                                ? "#dedede"
                                : "#080816",
                          },
                        }}
                        onClick={() => createOrder()}
                      >
                        Register order
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box pt="40px">
            <Typography
              color={appTheme.palette.mode === "dark" ? "#fff" : "#000"}
            >
              Empty
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
