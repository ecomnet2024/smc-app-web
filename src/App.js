import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import TopBar from "./pages/global/Topbar"
import  Sidebar  from "./pages/global/Sidebar";
import  Dashboard from "./pages/dashboard"
import  Team from "./pages/team"
import  Consultations from "./pages/consultations"
import Clinics from "./pages/clinics";
import AddClinic from "./pages/crudpages/addClinic";
import  Patients from "./pages/patients"
import  Patient from "./pages/patient"
import  Consultation from "./pages/consultation"
import  UpdateUser from "./pages/crudpages/updateuser"
import  AddPatient from "./pages/crudpages/addpatient"
import  AddConsultation from "./pages/crudpages/addconsultation"
import  Locations from "./pages/locations"
import  Login from "./pages/login"
import Users from "./pages/users"
import Roles from "./pages/roles";
import AddRole from "./pages/crudpages/addrole";
// import  Bar from "./scenes/bar"
import  Form from "./pages/form"

import  FAQ from "./pages/faq"



// App.js
import { useEffect } from 'react';



import { useQuery, gql } from '@apollo/client';
import User from "./pages/user";
import UpdateConsultation from "./pages/crudpages/updateconsultation";

const ALL_USERS = gql`
      query UserMany {
        userMany {
          country
          createdAt
          email
        }
      }
    `



function App() {

  const startTokenTimer = (expirationTime) => {
    const timeout = expirationTime - Date.now();
  
    if (isNaN(timeout) || timeout <= 0) {
      console.error("Problème : Timeout est NaN ou déjà expiré.");
      alert("Votre session a expiré. Veuillez vous reconnecter.");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      window.location.href = "/login";
      return;
    }
  
    
    setTimeout(() => {
      alert("Votre session a expiré. Veuillez vous reconnecter.");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      window.location.href = "/login";
    }, timeout);
  };
  
  useEffect(() => {
    const tokenExpiration = localStorage.getItem("expirationTime");
    console.log("Expiration time ", tokenExpiration)
  
    if (!tokenExpiration) {
      console.error("TokenExpiration introuvable dans le localStorage.");
      window.location.href = "/login";
      return;
    }
  
    const expirationTime = parseInt(tokenExpiration, 10);
    if (isNaN(expirationTime)) {
      console.error("ExpirationTime invalide :", tokenExpiration);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      window.location.href = "/login";
      return;
    }
  
    startTokenTimer(expirationTime);
  }, []);
  


  const { loading, error, data } = useQuery(ALL_USERS);
  const [theme, colorMode] = useMode()

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">

          <Sidebar />

          <main className="content overflow-y-scroll">
            <TopBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/consultations" element={<Consultations/>} />
              <Route path="/locations" element={<Locations/>} />
              <Route path="/form" element={<Form />} />
              <Route path="/user" element={<User/>} />
              <Route path="/updateuser" element={<UpdateUser/>} />
              <Route path="/addClinic" element={<AddClinic />} />
              <Route path="/faq" element={<FAQ/>} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/patient/:id" element={<Patient />} />
              <Route path="/consultation/:id" element={<Consultation />} />
              <Route path="/updateconsultation/:id" element={<UpdateConsultation />} />
              <Route path="/addpatient" element={<AddPatient />} />
              <Route path="/login" element={<Login />} />
              <Route path="/users" element={<Users />} />
              <Route path="/clinics" element={<Clinics />} />
              <Route path="/addconsultation" element={<AddConsultation />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/addRole" element={<AddRole />} />
            </Routes>
          </main>
        </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
