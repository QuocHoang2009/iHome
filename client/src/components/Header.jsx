import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../app/theme";
import { getImg } from "../const/API";

const Header = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

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
      <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            width="45px"
            height="45px"
        >
          <IconButton 
            width="100%"
            height="100%" 
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Box>
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            width="45px"
            height="45px"
        >
          <IconButton 
            width="100%"
            height="100%"
          >
            <NotificationsOutlinedIcon />
          </IconButton>
        </Box>
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            onClick={()=> navigate("/profile")}
            paddingLeft="8px"
            sx={{
                ":hover":{
                    opacity:0.8
                }
            }}
        >
          {user.picturePath ? (
            <img
              alt="profile-user"
              width="45px"
              height="45px"
              src={getImg + `${user.picturePath}`}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
          ):(
            <img
              alt="profile-user"
              width="45px"
              height="45px"
              src={`../../assets/user.png`}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;