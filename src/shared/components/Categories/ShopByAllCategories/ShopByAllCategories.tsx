import { Box } from "@mui/material";
import { Product } from "types";
import { ShopSubCategoryList } from "./components";
import { NoItemsFound } from "shared/components/NoItemsFound";

type ShopByAllCategoriesProps = {
  mainCategoriesLabels: Array<string>;
  categories: Array<Product>;
  isLoading?: boolean
};
export const ShopByAllCategories = ({
  mainCategoriesLabels,
  categories,
  isLoading=false
}: ShopByAllCategoriesProps) => {
  return (
    <Box className="shop-category-container" data-testid="ShopByAllCategories-div">
      {mainCategoriesLabels.map((categoryLabel, index) => {
        const categoryDetails = categories.filter(
          (item) => item.categoryLabel === categoryLabel
        );
        return (
          <>
            <ShopSubCategoryList
              key={index}
              currentCategoryLabel={categoryLabel}
              subCategories={categoryDetails}
            ></ShopSubCategoryList>
          </>
        );
      })}
      {categories.length === 0 && !isLoading &&(
        <NoItemsFound/>
      )}
    </Box>
  );
};
