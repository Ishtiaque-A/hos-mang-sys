import React, { useState, useEffect } from "react";
import '../LabModule.css'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from 'axios';
import MaterialTable from 'material-table';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

function TestGroup() {


    const [stateView, setStateView] = useState('view');


    const [allTestGroup, setallTestGroup] = useState([]);

    const [allTestGroupRender, setAllTestGroupRender] = useState('');

    useEffect(() => {
        axios.get(`/new-test-group`).then(res => {
            if (res.data.status === 200) {
                setallTestGroup(res.data.test_group);
            }

        });

    }, [allTestGroupRender]);

    const [editTestGroupId, setEditTestGroupId] = useState('');
    // console.log('editTestId', editTestGroupId)

    const [editLabTestGroup, setEditlabTestGroup] = useState('');
    // console.log('data', editLabTestGroup)

    useEffect(() => {
        axios.get(`/edit-new-test-group/${editTestGroupId}`).then(res => {
            if (res.data.status === 200) {
                setEditlabTestGroup(res.data.test_group.test_group_name);
            }

        });

    }, [editTestGroupId]);

    function editTestGroup(e, editId) {
        e.preventDefault();
        setEditTestGroupId(editId);
    }


    function TestGroupUpdate(e) {
        const test_name = {
            'test_group_name': editLabTestGroup
        }
        e.preventDefault();
        axios.post(`/update-new-test-group/${editTestGroupId}`, test_name).then(res => {
            if (res.data.status == 200) {
                toast.success("Success", res.data.message, "success");
                setEditlabTestGroup('');
                setEditTestGroupId('');
                setAllTestGroupRender(res.data);
                closeEditModal();
                setStateView('view');
            }
            // else if (res.data.status == 400) {
            //     setbank({ ...bank, error_list: res.data.errors });

            // }

        })
    }




    const deleteallTestGroup = (e, id) => {

        e.preventDefault();
        const thisClicked = e.currentTarget;
        //  thisClicked.innerText = "Deleting";

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-new-test-group/${id}`).then(res => {
                    if (res.data.status === 200) {

                        thisClicked.closest("tr").remove();

                        //   swal("Success", res.data.message, "success");

                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })


    }



    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

            width: "40 !important"
        },
        {
            title: "Test Group", field: `test_group_name`

            ,

            cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },


        {
            title: "Action", field: "patient",
            render: (row) => <div>
                <button className="btn btn-info btn-sm action-btn"> <i className="fas fa-edit" onClick={(e) => {
                    editTestGroup(e, row.id); EditMoalOpen(e, row.id); setStateView('edit')
                }} ></i>
                </button>
                <button onClick={(e) => deleteallTestGroup(e, row.id)} className="btn btn-danger btn-sm action-btn mx-1"> <i className="fas fa-trash"></i> </button></div>,
            // cellStyle: {
            //     textAlign: "center"
            // },
        },
    ];


    //add modal 

    const customStyles = {
        content: {
            top: '35%',
            left: '30%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "30%",
            height: "300px",
            background: "#ffffff",
        },
        overlay: { zIndex: 1000 }

    };

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function AddMoalOpen(e) {
        e.preventDefault();
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);

    }




    const [modalEditIsOpen, setEditIsOpen] = React.useState(false);
    function EditMoalOpen(e, editId) {
        e.preventDefault();
        setEditIsOpen(true);
        setEditTestGroupId(editId)
    }


    function closeEditModal() {
        setEditIsOpen(false);

    }

    const [test_group_name, settest_group_name] = useState('');
    // console.log('test group state', test_group_name)

    function TestGroupSave(e) {
        const test_name = {
            'test_group_name': test_group_name
        }
        e.preventDefault();
        axios.post(`/save-new-test-group`, test_name).then(res => {
            if (res.data.status == 200) {
                toast.success("Success", res.data.message, "success");
                settest_group_name('');
                setAllTestGroupRender(res.data);
                closeModal();
                setStateView('view');
            }
            // else if (res.data.status == 400) {
            //     setbank({ ...bank, error_list: res.data.errors });

            // }

        })
    }
    return (
        <div className="row bg-white pb-4">

            {
                stateView === 'view' && <div className="rx-one-button-group">
                    <button type="submit" className="btns float-end mt-2 " onClick={
                        () => {
                            // AddMoalOpen();
                            setStateView('AddPage');
                        }}>
                        Add New
                    </button>
                </div>
            }

            {
                stateView === 'AddPage' && <>

                    <div className="card bg-white mt-2">


                        <div className='card-header rx-one-button-group'>


                            <button className="btn  float-end " type="submit" onClick={() => setStateView('view')}>
                                Back
                            </button>

                            <h6 className=""> <b>Add Test Group</b></h6>

                            {/* <div className="line "></div> */}

                        </div>

                        <div className="card-body">
                            <div className="">
                                <div className="mb-3 mt-3">
                                    <label for="exampleFormControlInput1" className="form-label">Test Group Name</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => { settest_group_name(e.target.value) }} value={test_group_name} name="test_group_name" />
                                </div>
                                <div className="rx-one-button-group">
                                    <button className="btn  float-end " type="submit" onClick={TestGroupSave}>
                                        Save
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </>
            }

            {
                stateView === 'view' && <>

                    <div className="col-md-12">




                        <h6 className="px-2">Test Group</h6>


                        <MaterialTable
                            columns={columns}
                            data={allTestGroup}
                            options={{
                                search: true,
                                // filtering: filter,
                                showTitle: false,
                                searchFieldAlignment: "left",
                                pageSize: 5,
                                emptyRowsWhenPaging: false,
                                pageSizeOptions: [5, 10, 20, 50, 100]
                            }}

                        />

                    </div>
                </>
            }


            {/* /* {edit modal} */}
            {



                stateView === 'edit' && <>
                    <div className='card bg-white mt-2'>
                        <div className="card-header rx-one-button-group">


                            <button className="btn  float-end " type="submit" onClick={() => setStateView('view')}>
                                Back
                            </button>
                            <h5 className=""> <b>Edit Test Group</b></h5>

                            {/* <div className="line "></div> */}
                        </div>
                        <div className="row ">
                            <div className="card-body">

                                <div className="col-md-12">
                                    <div className="mb-3 mt-3">
                                        <label for="exampleFormControlInput1" className="form-label">Test Group Name</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => { setEditlabTestGroup(e.target.value) }} value={editLabTestGroup} name="test_group_name" />
                                    </div>
                                    <div className="rx-one-button-group">

                                        <button className="btn  float-end " type="submit" onClick={TestGroupUpdate}>
                                            Update
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>



                    </div>

                </>
            }


            {/* </Modal> */}
        </div>
    );
}

export default TestGroup;