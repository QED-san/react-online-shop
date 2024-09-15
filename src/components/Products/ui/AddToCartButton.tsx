import { ThemeProvider, Button, Box } from "@mui/material";
import CustomButton from "../../../theme/Products/ProductsButton";
import { ButtonT } from "../../../utils/types/AddToCartButton";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state management/store";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  decrementCartItemQntt,
  incrementCartItemQntt,
  removeFromCart,
} from "../../../state management/Cart/CartSlice";
import { CartReducerCunstructor } from "../../../state management/Cart/Cunstructor";
import Theme from "../../../theme/Theme";

const AddToCartButton = (props: ButtonT) => {
  const cart = useSelector((state: RootState) => state.Cart);
  let isProductInCart;
  let propsId: number;
  if (props.id) {
    isProductInCart = cart.find((i) => i.id === props.id);
    propsId = props.id;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appTheme = Theme();

  return (
    <ThemeProvider theme={CustomButton}>
      {props.id ? (
        isProductInCart ? (
          <Box display="flex" gap="20px">
            <Box
              bgcolor={appTheme === "dark" ? "#1a1a1a" : "#eeeeee"}
              borderRadius="10px"
            >
              <Button
                onClick={() =>
                  isProductInCart.qntt > 1
                    ? dispatch(
                        decrementCartItemQntt(CartReducerCunstructor(propsId))
                      )
                    : dispatch(removeFromCart(CartReducerCunstructor(propsId)))
                }
                sx={{
                  "&.MuiButtonBase-root": {
                    minWidth: "10px",
                    width: "40px",
                    height: "40px",
                    border: "2px solid",
                    borderColor: "gray",
                    borderRadius: "10px",
                  },
                }}
              >
                <Remove />
              </Button>
            </Box>
            <Box
              bgcolor={appTheme === "dark" ? "#1a1a1a" : "#eeeeee"}
              borderRadius="10px"
            >
              <Button
                onClick={() =>
                  dispatch(
                    incrementCartItemQntt(CartReducerCunstructor(propsId))
                  )
                }
                sx={{
                  "&.MuiButtonBase-root": {
                    minWidth: "10px",
                    width: "40px",
                    height: "40px",
                    border: "2px solid",
                    borderColor: "gray",
                    borderRadius: "10px",
                  },
                }}
              >
                <Add />
              </Button>
            </Box>
          </Box>
        ) : (
          <Button
            onClick={() => dispatch(addToCart(CartReducerCunstructor(propsId)))}
            variant="contained"
            color="primary"
            fullWidth={false}
            sx={{
              textTransform: "none",
              "&.MuiButtonBase-root": {
                fontSize: "16px",
                height: "33px",
                borderRadius: "8px",
              },
            }}
          >
            Add To Cart
          </Button>
        )
      ) : (
        <Button
          onClick={() => navigate("/login")}
          variant="contained"
          color="primary"
          fullWidth={false}
          sx={{
            textTransform: "none",
            "&.MuiButtonBase-root": {
              fontSize: "16px",
              height: "33px",
              borderRadius: "8px",
            },
          }}
        >
          Add To Cart
        </Button>
      )}
    </ThemeProvider>
  );
};

export default AddToCartButton;
