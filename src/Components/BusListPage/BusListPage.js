import React from 'react'
import AddFormModal from '../AddFormModal/AddFormModal'
import BasicTable from '../Table/TableComponent'
import { useState } from 'react';

const BusListPage = (props) => {
  const {open, handleClose , handleOpenModal} = props;
  const [busList,setBusList] = useState([]);
  const [updateBusRow , setUpdateBusRow] = useState([]);
  return (
    <div>
      <AddFormModal open={open} handleClose={handleClose} busList={busList} setBusList={setBusList} updateBusRow={updateBusRow} setUpdateBusRow={setUpdateBusRow}/>
      <BasicTable busList={busList} setBusList={setBusList} setUpdateBusRow={setUpdateBusRow} handleOpenModal={handleOpenModal}/>
    </div>
  )
}

export default BusListPage