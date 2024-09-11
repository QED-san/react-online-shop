import { Box, Button, Container, Stack } from "@mui/material";
import Theme from "../theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state management/store";
import { resetOrderState } from "../state management/Orders/OrderSlice";
import { Clear } from "@mui/icons-material";

const Orders = () => {
  const appTheme = Theme();
  const orders = useSelector((state: RootState) => state.Order);
  const dispatch = useDispatch();

  return (
    <Box
      bgcolor={appTheme === "dark" ? "#141414" : "#fff"}
      color={appTheme === "dark" ? "#ffef" : "#000"}
      minHeight="253px"
      pt="20px"
    >
      <Container maxWidth="md">
        <Box>
          <Box display="flex" justifyContent="center">
            <Box fontSize="30px" marginRight="auto">
              Orders
            </Box>
            <Box>
              <Button
                onClick={() => dispatch(resetOrderState())}
                sx={{
                  textTransform: "none",
                  "&.MuiButtonBase-root": {
                    minWidth: "10px",
                    height: "30px",
                    borderRadius: "7px",
                    color: "red",
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Box display="flex" alignItems="center">
                    <Clear sx={{ fontSize: "17px" }} />
                  </Box>
                  <Box>Clear</Box>
                </Box>
              </Button>
            </Box>
          </Box>
          <Box>
            {orders.length > 0 ? (
              <Stack spacing={3}>
                {orders.map((order) => (
                  <Box
                    key={order.creationDate.concat(
                      order.purchaseMethod.concat(order.paymentType)
                    )}
                    bgcolor={appTheme === "dark" ? "#141414" : "#f3f3f3"}
                    borderRadius="15px"
                    border="1px solid"
                    borderColor={appTheme === "dark" ? "#262626" : "#d1d5db"}
                    p="15px"
                    fontSize="18px"
                  >
                    <Stack spacing={2}>
                      <Box display="flex" justifyContent="end">
                        <Box marginRight="auto">
                          <Box display="flex" alignItems="end">
                            <Box fontSize="14px" color="gray">
                              Payment type&nbsp;
                            </Box>
                            <Box>
                              {order.paymentType === "inPerson"
                                ? "In person"
                                : "Online"}
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <Box display="flex" alignItems="end">
                            <Box fontSize="14px" color="gray">
                              Purchase method&nbsp;
                            </Box>
                            <Box>
                              {order.purchaseMethod === "nearbyShop"
                                ? "Nearby shop"
                                : "Online"}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box component="span" fontSize="20px">
                            {orders.length}
                          </Box>
                          &nbsp;
                          {orders.length === 1 ? "Product" : "Products"}
                        </Box>
                      </Box>
                      <Box>
                        <Box
                          display="flex"
                          justifyContent="end"
                          alignItems="center"
                        >
                          <Box display="flex" alignItems="end">
                            <Box fontSize="14px" color="gray">
                              Delivery date&nbsp;
                            </Box>
                            <Box>{order.deliveryDate}</Box>
                          </Box>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Box fontSize="17px" pt="10px">
                Empty
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Orders;
