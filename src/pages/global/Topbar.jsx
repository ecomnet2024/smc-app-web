import { Box, Button, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Logout } from "@mui/icons-material";
import { Navigate } from "react-router-dom";





const Topbar = () => {


    const logout = () => {
        localStorage.removeItem("token")

        window.location.reload();
    }


    const theme = useTheme();

    const colors = tokens(theme.palette.mode)

    const colorMode = useContext(ColorModeContext)


    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box 
                display="flex" 
                backgroundColor={colors.primary[400]} 
                borderRadius="3px"
            >
                {/* <InputBase sx={{ ml: 2, flex: 1}} placeholder="Search"/> */}

                {/* <IconButton type="button" sx={{ p: 1}}> 

                    <SearchIcon />

                </IconButton> */}
            </Box>
            

            {/* ICONS */}
            <Box display="flex">

                {/* <IconButton conClick = {colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ): (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                    
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton> */}

                {/* <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton> */}

                <IconButton>
                    <PersonOutlinedIcon  />
                </IconButton>
                
                
                <IconButton onClick={logout}>
                    <Button variant="contained" color="error">
                        disconnect <Logout />
                    </Button>
                </IconButton>

            </Box>
        </Box>
    )

}

export default Topbar;