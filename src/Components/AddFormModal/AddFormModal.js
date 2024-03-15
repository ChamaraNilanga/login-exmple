import { Modal } from '@mui/material';
import React from 'react';
import AddForm from '../Form/AddForm';

const AddFormModal = (props) => {
    const {open, handleClose , busList , setBusList , updateBusRow , setUpdateBusRow} = props;
    const handleCloseNew = () => {
        handleClose();
        setUpdateBusRow([]);
    };
  return (
    <Modal
        open={open}
        onClose={handleCloseNew}
        style={{backgroundColor: 'white', padding: '20px', margin: 'auto', marginTop: '100px', width: '50%'}}
        >
        <AddForm 
            handleClose={handleClose} 
            busList={busList} 
            setBusList={setBusList} 
            updateBusRow={updateBusRow}
            setUpdateBusRow={setUpdateBusRow} />
    </Modal>
  )
}

export default AddFormModal