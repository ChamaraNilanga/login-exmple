import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../CopyRight/CopyRight";
import { addDetails, registerUser } from "../../Service/axiosService";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutline } from "@mui/icons-material";
import { useUserContext } from "../../ContextApi/UserContext";
import BasicDatePicker from "../DatePicker/DatePicker";
import BasicTable from "../Table/TableComponent";
const defaultTheme = createTheme();

export default function SignUp() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { userName, setUserName } = useUserContext();

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    const requestBody = {
      capacity: parseInt(data.get("capacity")),
      number: data.get("number"),
      name: data.get("name"),
      from: data.get("from"),
      to: data.get("to"),
      journeyDate: data.get("journeyDate"),
      depature: data.get("depature"),
      arrival: data.get("arrival"),
      type: data.get("type"),
      fare: parseInt(data.get("fare")),
    };
    console.log(requestBody);
    try {
      const response = await addDetails(requestBody);
      if (response.status === 201 || response.status === 200) {
        setMessage("Details Added successfully");
        setMessageType("success");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      setMessage("Details not added");
      setMessageType("error");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {message != "" && (
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity={messageType}
        >
          {message}
        </Alert>
      )}
      <Container
        component="main"
        maxWidth="md"
        style={{ border: "2px solid black", borderRadius: "15px" }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "-60px" }}>
          Add Details
        </h2>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="number"
                  label="Number"
                  name="number"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="capacity"
                  label="Capacity"
                  name="capacity"
                  autoComplete="email"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="from"
                  label="From"
                  type="text"
                  id="from"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="to"
                  label="To"
                  type="text"
                  id="to"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BasicDatePicker text={"Journey Date"} name={"journeyDate"} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BasicDatePicker text={"Depature Date"} name={"depature"} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="arrival"
                  label="Arrival"
                  type="text"
                  id="arrival"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="type"
                  label="Type"
                  type="text"
                  id="type"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="fare"
                  label="Fare"
                  type="number"
                  id="fare"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
      <BasicTable />
    </ThemeProvider>
  );
}
