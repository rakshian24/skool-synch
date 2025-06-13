import React, { useState, useRef } from "react";
import { Avatar, Box, Stack, ClickAwayListener } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { colors } from "../constants";
import { getInitials } from "../utils";
import ProfileTab from "./ProfileTab";
import { FaGraduationCap } from "react-icons/fa6";
import Logo from "../assets/pngs/logo.png";

const Header = () => {
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const open = Boolean(anchorEl);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        px: 10,
        py: 2,
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
        position: "sticky",
        bgcolor: colors.white,
      }}
    >
      <Link to={"/"}>
        <Box>
          <img src={Logo} width={"200px"} alt="logo" />
        </Box>
      </Link>
      {user?.userId && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <Avatar
              sx={{
                width: "40px",
                height: "40px",
                fontSize: "16px",
                fontWeight: 500,
                backgroundColor: colors.blue1,
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
  );
};

export default Header;
