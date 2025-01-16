import { Box, useTheme, Typography } from "@mui/material"
import Header from "../../components/Header"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { tokens } from "../../theme"


const FAQ = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return(
        <Box m="20px">

            {/* <Header title="FAQ" subtiltle="Frequently asked Questiolnss Pages"/> */}

            {/* <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        An Importan Question
                    </Typography>
                </AccordionSummary> 
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        An Importan Question
                    </Typography>
                </AccordionSummary> 
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        An Importan Question
                    </Typography>
                </AccordionSummary> 
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        An Importan Question
                    </Typography>
                </AccordionSummary> 
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur.
                    </Typography>
                </AccordionDetails>
            </Accordion> */}

            <div className="w-full ">
                <h1 className="text-center text-3xl font-bold">No data for the moment</h1>
                <img src="/assets/nodata.jpg" alt="" />
            </div>
        </Box>
    )

}


export default FAQ