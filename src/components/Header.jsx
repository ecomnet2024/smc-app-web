import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";


const Header = ({ title, subtiltle }) => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
    <Box mb="30px">
        <Typography 
            variant="h2" 
            color="black"
            fontWeight="bold" sx={{ mb: "5px"}}
        >
            {title}
        </Typography>

        <Typography variant="h5" color={colors.greenAccent[400]}>
            {subtiltle}
        </Typography>
    </Box>)
}


export default Header;