import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../app/theme";

const Header = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            onClick={()=> navigate("/profile")}
            sx={{
                ":hover":{
                    opacity:0.8
                }
            }}
        >
            <img
                alt="profile-user"
                width="45px"
                height="45px"
                src={`../../assets/user.png`}
                style={{ cursor: "pointer", borderRadius: "50%" }}
            />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;