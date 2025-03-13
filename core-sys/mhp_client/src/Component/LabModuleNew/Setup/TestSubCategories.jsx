import React, { useState, useEffect } from "react";
import '../LabModule.css'
import Swal from "sweetalert2";
import axios from 'axios';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const TestSubCategories = () => {
    const [allTestGroup, setAllTestGroup] = useState([]);
    const [allTestCategory, setAllTestCategory] = useState([]);
    const [allTestSubCategory, setAllTestSubCategory] = useState([]);

    const [pageView, setPageView] = useState('view');

    useEffect(() => {
        axios.get(`/new-test-group`).then(res => {
            if (res.data.status === 200) {
                setAllTestGroup(res.data.test_group);
            }

        });
        axios.get(`/test-sub-categories`).then(res => {
            if (res.data.status === 200) {
                setAllTestSubCategory(res.data.sub_category);
            }

        });
    }, []);
    const renderCategory = (id) => {
        axios.get(`/new-test-categories-by-id/${id}`).then(res => {
            if (res.data.status === 200) {
                setAllTestCategory(res.data.all_cat);
            }

        });
    }


    function editSub(editId) {
        axios.get(`/test-sub-categories-edit/${editId}`).then(res => {
            if (res.data.status === 200) {
                setTestSubCategory(res.data.sub_category);
            }

        });
    }

    function TestCategoryUpdate(e) {
        const addData = {
            test_group_id: testSubCategory.test_group_id,
            test_category_id: testSubCategory.test_category_id,
            test_sub_category_name: testSubCategory.test_sub_category_name
        }
        e.preventDefault();
        axios.post(`/test-sub-categories-update/${testSubCategory.id}`, addData).then(res => {
            if (res.data.status === 200) {
                toast.success("Success", res.data.message, "success");
                axios.get(`/test-sub-categories`).then(res => {
                    if (res.data.status === 200) {
                        setAllTestSubCategory(res.data.sub_category);
                    }

                });
                setPageView('view');

            }
        })
    }




    const deleteSubTestCategory = (e, id) => {

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
                axios.delete(`/test-sub-categories-delete/${id}`).then(res => {
                    if (res.data.status === 200) {
                        // setallTestCategory(res.data.test_category);
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
            title: "Test Group", field: ``

            ,
            render: (row) => <div>{row.group?.test_group_name}</div>,


        },

        {
            title: "Test Category", field: ``

            ,
            render: (row) => <div>{row.category?.test_category_name}</div>,

            // cellStyle: {
            //     marginLeft: 50,
            //     width: 600
            // },
        },
        {
            title: "Test Sub Category", field: `test_sub_category_name`


        },
        {
            title: "Action", field: "patient",
            render: (row) => <div>
                <button className="btn btn-info btn-sm action-btn"> <i className="fas fa-edit" onClick={(e) => {
                    editSub(row.id);
                    setPageView('edit')

                }} ></i>
                </button>
                <button onClick={(e) => deleteSubTestCategory(e, row.id)} className="btn btn-danger btn-sm action-btn mx-1"> <i className="fas fa-trash"></i> </button></div>
        },
    ];


    //add modal 


    // console.log('test group state', test_group_name)

    const [groupId, setGroupId] = useState('');

    // console.log('hello check', value)
    const [testSubCategory, setTestSubCategory] = useState({
        test_group_id: '',
        test_category_id: '',
        test_sub_category_name: '',
    })

    // console.log('bal',testSubCategory)

    function testCategorySave(e) {

        e.preventDefault();
        const addData = {
            test_group_id: groupId,
            test_category_id: testSubCategory.test_category_id,
            test_sub_category_name: testSubCategory.test_sub_category_name
        }
        axios.post(`/test-sub-categories-save`, addData).then(res => {
            if (res.data.status === 200) {
                toast.success("Success", res.data.message, "success");
                setTestSubCategory({
                    test_group_id: '',
                    test_category_id: '',
                    test_sub_category_name: '',
                });
                axios.get(`/test-sub-categories`).then(res => {
                    if (res.data.status === 200) {
                        setAllTestSubCategory(res.data.sub_category);
                    }

                });
                setPageView('view');
            }
            // else if (res.data.status == 400) {
            //     setbank({ ...bank, error_list: res.data.errors });

            // }

        })
    }



    console.log('yeo', testSubCategory)


    return (
        <div className="">
            <div className="row">


                {
                    pageView === "view" &&
                    <div className="rx-one-button-group">
                        <button type="submit" className="btn float-end mt-2 " onClick={() => setPageView('add')}>
                            Add New
                        </button>
                    </div>
                }
                {/* 
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    > */}


                {

                    pageView === 'add' && <>


                        <div className="card  mt-2 bg-white">
                            <div className='card-header rx-one-button-group'>
                                {/* <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i className="fal fa-times"></i></span> */}

                                <button className="btn  float-end " type="submit" onClick={() => setPageView('view')}>
                                    Back
                                </button>
                                <h6 className=""> <b>Add Test Category</b></h6>

                                {/* <div className="line "></div> */}
                            </div>
                            <div className="card-body">
                                <div className="row ">

                                    <div className="col-md-12">
                                        <div className="mb-3 mt-3">
                                            <label for="exampleFormControlInput1" className="form-label">Test Group Name</label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                size="small"
                                                options={allTestGroup}
                                                getOptionLabel={(option) => option.test_group_name}
                                                onChange={(e, newValue) => {
                                                    setGroupId(newValue.id)
                                                    renderCategory(newValue.id)
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Test Group" />}
                                            />
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label for="exampleFormControlInput1" className="form-label">Test Category Name</label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                size="small"
                                                options={allTestCategory}
                                                getOptionLabel={(option) => option.test_category_name}
                                                onChange={(e, newValue) => {
                                                    setTestSubCategory({ ...testSubCategory, test_category_id: newValue.id })

                                                }}
                                                renderInput={(params) => <TextField {...params} label="Test Category" />}
                                            />
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label for="exampleFormControlInput1" className="form-label">Test Sub Category Name</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => setTestSubCategory({ ...testSubCategory, test_sub_category_name: e.target.value })} value={testSubCategory.test_category_name} name="test_category_name" />
                                        </div>
                                        <div className="rx-one-button-group">

                                            <button className="btn  float-end " type="submit" onClick={testCategorySave}>
                                                Save
                                            </button>
                                        </div>

                                    </div>
                                </div>

                            </div>



                        </div>

                    </>
                }




                {/* </Modal> */}
                {
                    pageView === 'view' && <>

                        <div className="col-md-12">


                            <h6 className="px-2">Test Category</h6>


                            <MaterialTable
                                columns={columns}
                                data={allTestSubCategory}
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
                {pageView === 'edit' &&

                    <div className="card  mt-2 bg-white">
                        <div className='card-header rx-one-button-group'>
                            {/* <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i className="fal fa-times"></i></span> */}

                            <button className="btn  float-end " type="submit" onClick={() => setPageView('view')}>
                                Back
                            </button>
                            <h6 className=""> <b>Edit Sub Category</b></h6>
                        </div>



                        <div className='card-body'>


                            <div className="row ">

                                <div className="col-md-12">
                                    <div className="mb-3 mt-3">
                                        <label for="exampleFormControlInput1" className="form-label">Test Group Name</label>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            size="small"
                                            options={allTestGroup}
                                            getOptionLabel={(option) => option.test_group_name}
                                            onChange={(e, newValue) => {
                                                setGroupId(newValue.id)
                                                renderCategory(newValue.id)
                                            }}
                                            renderInput={(params) => <TextField {...params} label={testSubCategory.group?.test_group_name} />}
                                        />
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <label for="exampleFormControlInput1" className="form-label">Test Category Name</label>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            size="small"
                                            options={allTestCategory}
                                            getOptionLabel={(option) => option.test_category_name}
                                            onChange={(e, newValue) => {
                                                setTestSubCategory({ ...testSubCategory, test_category_id: newValue.id })

                                            }}
                                            renderInput={(params) => <TextField {...params} label={testSubCategory.category?.test_category_name} />}
                                        />
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <label for="exampleFormControlInput1" className="form-label">Test Sub Category Name</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => setTestSubCategory({ ...testSubCategory, test_sub_category_name: e.target.value })} value={testSubCategory.test_sub_category_name} name="test_category_name" />
                                    </div>
                                    <div className="rx-one-button-group">

                                        <button className="btn  float-end " type="submit" onClick={TestCategoryUpdate}>
                                            Update
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                }
                {/* <Modal
                        isOpen={modalEditIsOpen}
                        onRequestClose={closeEditModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    > */}







                {/* </Modal> */}

                {/* {
                    pageView === 'view' && <>

                        <div className="col-md-12">


                            <h6 className="px-2">Test Sub Category</h6>


                            <MaterialTable
                                columns={columns}
                                data={allTestCategory}
                                options={{
                                    search: true,
                                    filtering: filter,
                                    showTitle: false,
                                    searchFieldAlignment: "left",
                                    pageSize: 5,
                                    emptyRowsWhenPaging: false,
                                    pageSizeOptions: [5, 10, 20, 50, 100]
                                }}

                            />

                        </div>

                    </>
                } */}
            </div>

        </div>
    );
};

export default TestSubCategories;