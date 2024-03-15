import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteDetails, getDetails } from "../../Service/axiosService";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function BasicTable(props) {
  const [rows,setRows] = useState([]);
  const {busList, setBusList ,setUpdateBusRow , handleOpenModal} = props;

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      const response = await getDetails();
      console.log("Response : ", response);
      setRows(response.data.data);
      setBusList(response.data.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id) => {
    console.log("Delete id : ", id);
    try {
      const response = await deleteDetails(id);
      console.log(response);
      if (response.status === 200) {
        setBusList((prevData) => prevData.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateBus = (id) => {
    console.log("Update id : ", id);
    setUpdateBusRow(busList.filter((item) => item._id === id));
    // setUpdateBusRow(id);
    handleOpenModal();
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 10 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Number</TableCell>
            <TableCell align="right">Journey Date</TableCell>
            <TableCell align="right">Depature Date</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {busList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {row.name}
              </TableCell>
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right">{row.journeyDate}</TableCell>
              <TableCell align="right">{row.depature}</TableCell>
              <TableCell align="right">{row.from}</TableCell>
              <TableCell align="right">{row.to}</TableCell>
              <TableCell align="right" style={{justifyContent:'space-between'}}>
              <Button variant="outlined" style={{marginRight:'5px'}} onClick={()=>updateBus(row._id)}>Update</Button>
              <Button  variant="outlined" color="error" onClick={()=>onDelete(row._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
