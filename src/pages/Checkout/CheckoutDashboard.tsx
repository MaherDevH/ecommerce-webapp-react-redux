import { Box, Typography } from "@mui/material";
import { DataGrid, GridSlotsComponentsProps } from "@mui/x-data-grid";
import { useCheckoutColumn } from "./hooks";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { useTranslation } from "react-i18next";
import { PaymentForm } from "./components";

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    cartTotal: number;
  }
}
export function CustomFooterStatusComponent(
  props: NonNullable<GridSlotsComponentsProps["footer"]>
) {
  const { t } = useTranslation();
  return (
    <Box sx={{ p: 1, display: "flex" }}>
      <Typography color="primary.light">
        {t("checkout.total")}:{" "}
        <Typography component="span" color="secondary.main">{`€${props.cartTotal}`}</Typography>
      </Typography>
    </Box>
  );
}

const CheckoutDashboard = () => {
  const columns = useCheckoutColumn();
  const { t } = useTranslation();
  const { cartItems, cartTotal } = useAppSelector(
    selectShoopingCartItemsDetails
  );
  return (
    <>
      <h2
        style={{
          textAlign: "center",
          textTransform: "capitalize",
          color: "#00f",
        }}
      >
        {t("checkout.check_your_order")}
      </h2>

      <Box>
        <DataGrid
          rows={cartItems}
          columns={columns}
          isRowSelectable={(params) => params.row !== undefined}
          autoHeight
          disableRowSelectionOnClick
          slots={{
            footer: CustomFooterStatusComponent,
          }}
          slotProps={{
            footer: { cartTotal },
          }}
        />
      </Box>
      <PaymentForm/>
    </>
  );
};
export default CheckoutDashboard;
