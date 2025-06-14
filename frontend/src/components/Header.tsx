import React, { useState, useRef } from "react";
import {
  Avatar,
  Box,
  Stack,
  ClickAwayListener,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { colors, ROUTES } from "../constants";
import { getInitials } from "../utils";
import ProfileTab from "./ProfileTab";
import { FaGraduationCap } from "react-icons/fa6";
import CustomButton from "./CustomButton";
import { LoginOutlined, LogoutOutlined } from "@mui/icons-material";
import client from "../apolloClient";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!user?.userId;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const popperRef = useRef<HTMLDivElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if (popperRef.current && popperRef.current.contains(event.target as Node)) {
      return;
    }
    handleClose();
  };

  const handleLogout = () => {
    client.clearStore();
    logoutUser();
    navigate(ROUTES.LOGIN);
  };

  const open = Boolean(anchorEl);

  const navItems = [
    { label: "Features", path: ROUTES.FEATURES },
    { label: "Pricing", path: ROUTES.PRICING },
    { label: "Demo", path: ROUTES.DEMO },
    { label: "Support", path: ROUTES.SUPPORT },
  ];

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          px: 4,
          py: 2,
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          position: "sticky",
          bgcolor: colors.white,
        }}
      >
        <Link to={isLoggedIn ? ROUTES.DASHBOARD : ROUTES.LANDING}>
          <Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <FaGraduationCap size={30} color={colors.primary} />
              <Typography variant="h6" fontWeight="bold" color={colors.primary}>
                SkoolSynch
              </Typography>
            </Box>
          </Box>
        </Link>

        {!isMobile ? (
          <Stack direction="row" spacing={4} alignItems="center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Typography
                  key={item.path}
                  variant="body1"
                  sx={{
                    cursor: "pointer",
                    borderBottom: isActive
                      ? `2px solid ${colors.primary}`
                      : "none",
                    color: isActive ? colors.primary : colors.dark,
                    fontWeight: isActive ? 600 : 400,
                    pb: "2px",
                    "&:hover": {
                      color: colors.primary,
                    },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Typography>
              );
            })}

            {!isLoggedIn && (
              <Stack direction={"row"} gap={2}>
                <CustomButton
                  buttonText="Sign In"
                  startIcon={<LoginOutlined />}
                  onClick={() => navigate(ROUTES.LOGIN)}
                  priority="secondary"
                />
                <CustomButton
                  buttonText="Sign Up"
                  startIcon={<LoginOutlined />}
                  onClick={() => navigate(ROUTES.REGISTER)}
                />
              </Stack>
            )}
          </Stack>
        ) : (
          <IconButton
            edge="end"
            onClick={() => setDrawerOpen(true)}
            sx={{ color: colors.primary }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {isLoggedIn && !isMobile && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <Avatar
                sx={{
                  width: "40px",
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: 500,
                  backgroundColor: colors.primary,
                  color: colors.white,
                  cursor: "pointer",
                }}
                onClick={handleAvatarClick}
              >
                {getInitials(user.username)}
              </Avatar>
              <ProfileTab
                open={open}
                anchorEl={anchorEl}
                popperRef={popperRef}
                handleClose={handleClose}
              />
            </div>
          </ClickAwayListener>
        )}
      </Stack>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <List
            component="nav"
            sx={{
              p: 0,
              "& .MuiListItemIcon-root": {
                minWidth: 32,
                color: colors.black,
              },
            }}
          >
            {navItems.map((item) => (
              <Box key={item.label}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(item.path);
                      setDrawerOpen(false);
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: location.pathname === item.path ? 600 : 400,
                        color:
                          location.pathname === item.path
                            ? colors.primary
                            : colors.dark,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ my: 0.5, mx: 1 }} />
              </Box>
            ))}
            {!isLoggedIn ? (
              <>
                <ListItem>
                  <CustomButton
                    buttonText="Sign In"
                    startIcon={<LoginOutlined />}
                    onClick={() => {
                      navigate(ROUTES.LOGIN);
                      setDrawerOpen(false);
                    }}
                    priority="secondary"
                    style={{ width: "100%" }}
                  />
                </ListItem>
                <ListItem>
                  <CustomButton
                    buttonText="Sign Up"
                    startIcon={<LoginOutlined />}
                    onClick={() => {
                      navigate(ROUTES.REGISTER);
                      setDrawerOpen(false);
                    }}
                    style={{ width: "100%" }}
                  />
                </ListItem>
              </>
            ) : (
              <ListItem>
                <CustomButton
                  buttonText="Logout"
                  startIcon={<LogoutOutlined />}
                  onClick={() => {
                    handleLogout();
                    setDrawerOpen(false);
                  }}
                  style={{ width: "100%" }}
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
