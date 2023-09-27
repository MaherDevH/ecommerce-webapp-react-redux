import Drawer from "@mui/material/Drawer";
import {
  IconButton,
  Box,
  Typography,
  ListItemButton,
  Button,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import Logo from "assets/images/logo";
import { LinkInfo } from "types";
import { signOutUser } from "utils/firebase";
import { UserInfo } from "firebase/auth";
import { StyledList } from "./components";
import { useTranslation } from "react-i18next";

type CustomDrawerProps = {
  links: Array<LinkInfo>;
  isSmallScreen: boolean;
  currentUser: null | UserInfo;
  handleCloseLnaguageMenu: (e: MouseEvent<HTMLDivElement>) => void;
};

export const CustomDrawer = ({
  links,
  isSmallScreen,
  currentUser,
  handleCloseLnaguageMenu,
}: CustomDrawerProps) => {
  const [open, setOpen] = useState(false);
  const drawerLinks: Array<LinkInfo> = [...links, { path: "", label: "" }];
  const { t } = useTranslation();
  return (
    <>
      {isSmallScreen ? (
        <>
          <IconButton
            aria-label="Open menu drawer"
            onClick={() => setOpen(true)}
          >
            <MenuOutlinedIcon></MenuOutlinedIcon>
          </IconButton>

          <Drawer
            sx={{ width: "180px" }}
            open={open}
            anchor="left"
            onClose={() => setOpen(false)}
            PaperProps={{ sx: { backgroundColor: "rgb(92, 80, 231)" } }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ marginTop: "5px", color: "#fff" }}>
                <Logo />
              </Typography>
            </Box>
            <StyledList
              sx={{ width: "100%", maxWidth: 360 }}
              aria-labelledby="nested-list-subheader"
            >
              {drawerLinks.map((link, index) => {
                if (link.label !== "")
                  return (
                    <ListItemButton key={index} onClick={() => setOpen(false)}>
                      <Link style={{ width: "100%" }} to={link.path}>
                        {t(link.label)}
                      </Link>
                    </ListItemButton>
                  );
                return <div key={index}>&nbsp;</div>;
              })}
              <ListItemButton
                onClick={handleCloseLnaguageMenu}
                className="language-menu-btn"
              >
                {t("languages.language")}
              </ListItemButton>

              {currentUser ? (
                <ListItemButton
                  onClick={() => {
                    signOutUser();
                    setOpen(false);
                  }}
                >
                  <Link style={{ width: "100%" }} to={"/auth"}>
                    {t("auth.signout")}
                  </Link>
                </ListItemButton>
              ) : (
                <ListItemButton onClick={() => setOpen(false)}>
                  <Link style={{ width: "100%" }} to={"/auth"}>
                    {t("auth.signin")}
                  </Link>
                </ListItemButton>
              )}
            </StyledList>
          </Drawer>
        </>
      ) : null}
    </>
  );
};
