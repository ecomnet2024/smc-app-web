import { Box, Button, CircularProgress, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";


import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";

import StatBox from "../../components/StatBox";

import { CONSULTATION_MANY, PATIENT_MANY, USER_MANY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import BarChart from "../../components/BarChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { loading : loadingconsultation, error : errorconsultation, data : dataconsultation } = useQuery(CONSULTATION_MANY);
  const { loading : loadinguser, error : erroruser , data : datauser} = useQuery(USER_MANY);
  const { loading : loadingpatient, error : errorpatient, data : datapatient} = useQuery(PATIENT_MANY);
  

  if( loadingconsultation | loadingpatient | loadinguser ) {
    return (
      <Box sx={{ width: '100%', height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress color="secondary" size="3rem"/>
      </Box>
    );
  }

  if(errorconsultation | errorpatient | erroruser){
    return <p className="text-red-400">Server error</p>
  }
  
  console.log("data dashboard ", datauser)
  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box 
          gridColumn="span 6" 
          className="w-full flex flex-nowrap justify-between gap-2"
          >
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="w-full sm:w-1/3"
          >
            <StatBox
              title=""
              subtitle="Patients"
              progress="0.75"

            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="w-full sm:w-1/3"
          >
            <StatBox
              title=""
              subtitle="Users"
              progress="0.50"
              // increase="+21%"
              // icon={
              //   <PointOfSaleIcon
              //     sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              //   />
              // }
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="w-full sm:w-1/3"
          >
            <StatBox
              title=""
              subtitle="consultations"
              progress="0.30"
              increase="+5%"
            />
          </Box>
        </Box>


        {/* ROW 2 */}
        
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors="black"
            p="15px"
          >
            <Typography color="black" variant="h5" fontWeight="600">
              Recent consultations
            </Typography>
          </Box>
          
          {dataconsultation.consultationMany.map((consultation) => (
            <>
              { consultation.status == "New" && (
              <Box
                key={consultation._id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`2px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color="black"
                    variant="h5"
                    fontWeight="600"
                  >
                    {consultation.patient.sn}
                  </Typography>

                </Box>
                <Box color="black">{new Date(consultation.createdAt).toISOString().split("T")[0]}</Box>
                <Box color="black">{(new Date(consultation.createdAt).toISOString().split("T")[1]).split('.')[0]}</Box>
                <Box color="black">{consultation.status}</Box>
                <Box
                  
                  p="5px 10px"
                  borderRadius="4px"
                >
                        <a href={`/consultation/${consultation._id}`} className="flex items-center justify-center">
                          <Button type="submit" variant="contained" color="secondary">
                            open
                          </Button>
                        </a>
                </Box>

              </Box>
              )}
            </>
          ))}
        </Box>

        {/* ROW 3 */}


        {/* <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors="black"
            p="15px"
          >
            <Typography color="black" variant="h5" fontWeight="600">
              Consultations in review
            </Typography>
          </Box>
          
          {dataconsultation.consultationMany.map((consultation) => (
            <>
              { consultation.status == "In_Review" && (
              <Box
                key={consultation._id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`2px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color="black"
                    variant="h5"
                    fontWeight="600"
                  >
                    
                  </Typography>

                </Box>
                <Box color="black">{new Date(consultation.createdAt).toISOString().split("T")[0]}</Box>
                <Box color="black">{(new Date(consultation.createdAt).toISOString().split("T")[1]).split('.')[0]}</Box>
                <Box color="black">{consultation.status}</Box>
                <Box
                  
                  p="5px 10px"
                  borderRadius="4px"
                >
                        <a href={`/consultation/${consultation._id}`} className="flex items-center justify-center">
                          <Button type="submit" variant="contained" color="secondary">
                            open
                          </Button>
                        </a>
                </Box>

              </Box>
              )}
            </>
          ))}
        </Box> */}

      </Box>



    </Box>
  );
};

export default Dashboard;