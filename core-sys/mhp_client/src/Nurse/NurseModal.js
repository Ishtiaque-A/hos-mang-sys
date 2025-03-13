import React, { useState } from 'react';
import Modal from 'react-modal';

const NurseModal = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const customStyles = {
            content: {
                top: '35%',
                left: '30%',
                height: '80vh',
                width: '80%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgb(243, 242, 239)'
        },
    };
    
    //modal 
    function openModal() {
        setModalIsOpen(true);
    }
    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Click Here to Open</button>
             <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <span className='float-end' style={{
                        fontSize: "15px",
                        cursor: "pointer"
                    }} onClick={closeModal}><i className="fal fa-times"></i></span>
                    <h6 style={{fontSize: "14px"}}>IPD-In Patient</h6>
                    <hr />
            </Modal>
        </div>
    );
};

export default NurseModal;