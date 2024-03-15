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
import { addDetails, registerUser, updateDetails } from "../../Service/axiosService";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutline } from "@mui/icons-material";
import { useUserContext } from "../../ContextApi/UserContext";
import BasicDatePicker from "../DatePicker/DatePicker";
import BasicTable from "../Table/TableComponent";
import { useEffect } from "react";
import dayjs from "dayjs";
const defaultTheme = createTheme();

export default function AddForm(props) {
  const { handleClose , busList , setBusList , updateBusRow , setUpdateBusRow } = props;
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { userName, setUserName } = useUserContext();
  const initialStates = {
            name: "",
            number: "",
            capacity: 0,
            from: "",
            to: "",
            journeyDate: "",
            depature: "",
            arrival: "",
            type: "",
            fare: 0,
            seatsBooked: [],
            status: "",
            createdAt: "",
            updatedAt: "",
            __v: 0
  };
  const [updateData,setUpdateData] = useState(updateBusRow.length > 0 ? updateBusRow[0] : initialStates);
  const [journeyDate,setJourneyDate] = useState(dayjs().format('MM/DD/YYYY'));
  const [depature,setDepature] = useState(dayjs().format('MM/DD/YYYY'));
  console.log("Journey Date : ", updateData.length);

  const onChanges = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
    console.log(updateData);
  };



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
      if(!updateData._id){
      const response = await addDetails(requestBody);
      if (response.status === 201 || response.status === 200) {
        setMessage("Details Added successfully");
        setBusList((prevData)=>[...prevData, {...requestBody , 
          _id : response.data.data._id ,
           createdAt : response.data.data.createdAt ,
           updatedAt : response.data.data.updatedAt ,
           __v : response.data.data.__v,
           seatsBooked : response.data.data.seatsBooked,
           status: response.data.data.status
          }].reverse());
        console.log("Bus List : ", busList.reverse());
        setMessageType("success");
        setTimeout(() => {
          setMessage("");
          handleClose();
        }, 3000);
      }} else {
        console.log("updateDataUp:",updateData);
      const response = await updateDetails(updateData._id , updateData);
      console.log("Response New: ", response);
      if (response.status === 201 || 200) {
        setMessage(response.data.message);
        setBusList(busList.map((item) => item._id === updateData._id ? updateData : item));
        console.log("Bus List : ", busList.reverse());
        setMessageType("success");
        setTimeout(() => {
          setMessage("");
          handleClose();
        }, 3000);
      }}
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
        style={{ border: "2px solid black", borderRadius: "15px" , backgroundColor: "white"}}
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
                  value={updateData._id ? updateData.name : ""}
                  onChange={(e)=>onChanges(e)}
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
                  value={updateData._id? updateData.number : ""}
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
                  value={updateData._id? updateData.capacity : ""}
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
                  value={updateData._id? updateData.from : ""}
                  id="from"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="to"
                  label="To"
                  value={updateData._id? updateData.to : ""}
                  type="text"
                  id="to"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BasicDatePicker text={"Journey Date"} name={"journeyDate"} defaultValue={updateData._id? updateData.journeyDate : journeyDate}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <BasicDatePicker value={"30/03/2024"} text={"Depature Date"} name={"depature"} defaultValue={updateData._id? updateData.depature : depature}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="arrival"
                  label="Arrival"
                  type="text"
                  value={updateData._id? updateData.arrival : ""}
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
                  value={updateData._id? updateData.type : ""}
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
                  value={updateData._id? updateData.fare : ""}
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
    </ThemeProvider>
  );
}
