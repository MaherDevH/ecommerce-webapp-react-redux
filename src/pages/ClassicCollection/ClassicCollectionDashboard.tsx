import { Box, Grid } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { selectMappedCategories } from "store/localProducts/localProductsSelector";
import { useAppSelector } from "utils/redux/hooks";
import {
  FilterPanel,
  ShopByAllCategories,
  ShopByCategory,
  ShopNav,
} from "shared/components";
import _ from "lodash";
import { useSortOptions } from "shared";
import { Product } from "types";

const ClassicCollectionDashboard = () => {
  const categories = useAppSelector(selectMappedCategories);
  const [searchParams] = useSearchParams();
  const activeCategoryLabel = searchParams.get("category");
  const searchBy = searchParams.get("search");
  const sortBy = searchParams.get("sort") ?? "default";

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        _.isNull(searchBy)
          ? category
          : category.title.toLowerCase().includes(searchBy.toLowerCase())
      ),
    [categories, searchBy]
  );

  const comparisonFn = useCallback(
    (a: Product, b: Product) => {
      if (sortBy === "asc") return a.price - b.price;
      return b.price - a.price;
    },
    [sortBy]
  );

  const SortedCategories =
    sortBy === "default"
      ? filteredCategories
      : _.cloneDeep(filteredCategories).sort(comparisonFn);

  const mainCategoriesLabels = useMemo(
    () =>
      filteredCategories.reduce<Array<string>>((res, category) => {
        if (!res.includes(category.categoryLabel)) {
          res.push(category.categoryLabel);
        }
        return res;
      }, []),
    [filteredCategories]
  );

  const activeCategoryItems = useMemo(
    () =>
    SortedCategories.filter(
        (cat, index) => cat.categoryLabel === activeCategoryLabel
      ),
    [SortedCategories, activeCategoryLabel]
  );

  const sortOptions = useSortOptions();
  return (
    <Box>
      <ShopNav
        mainCategoriesLabels={mainCategoriesLabels}
        activeCategoryLabel={activeCategoryLabel ?? ""}
      />
      <FilterPanel sortOptions={sortOptions} />
      <Grid container>
        <Grid
          item
          sx={{
            height: "inherit",
            overflow: "auto",
            width: "100%",
            pr: 1,
          }}
        >
          {activeCategoryLabel ? (
            <ShopByCategory
              activeCategoryLabel={activeCategoryLabel}
              activeCategoryItems={activeCategoryItems}
            />
          ) : (
            <ShopByAllCategories
              mainCategoriesLabels={mainCategoriesLabels}
              categories={SortedCategories}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassicCollectionDashboard;
