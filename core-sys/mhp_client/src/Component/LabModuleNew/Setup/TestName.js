import React, { useState, useEffect } from 'react';
import '../LabModule.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import MaterialTable, { MTableToolbar } from 'material-table';
import { Link } from 'react-router-dom';
import Select from "react-select";
function TestName() {

  const [allTestGroup, setallTestGroup] = useState([]);

  const [testList, setTestList] = useState([]);
  const [testListSorted, setTestListSorted] = useState([]);
  const [testCategory, setTestCategory] = useState([]);

  useEffect(() => {
    axios.get(`/new-test-group`).then((res) => {
      if (res.data.status === 200) {
        setallTestGroup(res.data.test_group);
      }
    });
    axios.get(`/new-test-name`).then((res) => {
      if (res.data.status === 200) {
        setTestList(res?.data?.test_name);
        setTestListSorted(res?.data?.test_name);

      }
    });
    axios.get(`/new-test-category`).then(async (res) => {
      setTestCategory(res?.data?.test_category);
    });
  }, []);

  const deleteallTestName = (e, id) => {
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
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/delete-new-test-name/${id}`).then((res) => {
          if (res.data.status === 200) {
            // setTestList(res.data.test_name)

            thisClicked.closest('tr').remove();
            //   swal("Success", res.data.message, "success");
          }
        });
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
  };

  const columns = [
    {
      title: 'Code',
      field: 'item_code',
      width: '40 !important',
    },
    {
      title: 'Test Name',
      field: `test_name`,
      // render: (row) => <div>{row.test_name}</div>,
      cellStyle: {
        width: '30%',
        textAlign: 'center !important',
      },
    },
    {
      title: 'Parameters',
      field: ``,
      cellStyle: {
        width: '20%',
        textAlign: 'center !important',
      },
      render: (row) => (
        <div>
          {row.parameter === ('' || 'null' || null)
            ? 'No Parameter Available'
            : row.parameter.map((item) => <span>{item.parameter_name}, </span>)}
        </div>
      ),
    },
    {
      title: 'Fee',
      field: ``,

      render: (row) => <div>{row.fee}</div>,
    },
    {
      title: 'Test Group',
      cellStyle: {
        width: '15%',
        textAlign: 'center !important',
      },
      render: (row) => <div>{row.group?.test_group_name}</div>,
    },

    {
      title: 'Test Category',
      field: ``,

      render: (row) => <div>{row.category?.test_category_name}</div>,
    },
    {
      title: 'Action',
      field: 'patient',

      render: (row) => (
        <div
          style={{
            width: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Link to={`/lab-module-new/edit-lab-test/${row.id}`}>
            <button
              style={{
                all: 'unset',
                cursor: 'pointer',
                fontSize: '13px',
                color: 'black',
              }}
            >
              {' '}
              <i className='far fa-edit'></i>{' '}
            </button>
          </Link>

          {row.parameter.length > 0 && (
            <Link to={`/lab-module-new/add-lab-parameters/${row.id}`}>
              <button
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: 'black',
                }}
              >
                <i className='far fa-arrow-right'></i>
              </button>
            </Link>
          )}

          <button
            onClick={(e) => deleteallTestName(e, row.id)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {' '}
            <i className='far fa-trash'></i>{' '}
          </button>
        </div>
      ),
      cellStyle: {
        textAlign: 'center',
        width: '250',
      },
    },
  ];
  const ReactSelectStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuPortal: (base) => ({
      ...base,
      borderRadius: "10px",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "white",
      margin: "0px",
      padding: "0px",
      overflowX: "hidden",
      overflowY: "auto",
      maxHeight: "150px",
      // padding: "5px",
      "&::-webkit-scrollbar": {
        width: "7px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#cccccc",
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#fcfcfc",
      },
      scrollbarWidth: "thin",
      scrollbarColor: "#cccccc #fcfcfc",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected || state.isFocused ? "#69B128" : provided.color,
      backgroundColor:
        state.isSelected || state.isFocused
          ? " #fcfcfc"
          : provided.backgroundColor,
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#69B128" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #69B128" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#69B128" : provided.borderColor,
      },
    }),
  };
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const filterTests = (categoryId, groupId, list) => {
    return list.filter((item) => {
      const categoryMatch = categoryId ? Number(item?.test_category_id) === categoryId : true;
      const groupMatch = groupId ? Number(item?.test_group_id) === groupId : true;
      return categoryMatch && groupMatch;
    });
  };

  const handleChangeCategory = async (category) => {
    const categoryId = category ? Number(category?.id) : null;
    const groupId = selectedGroup ? Number(selectedGroup?.id) : null;

    const sorted = filterTests(categoryId, groupId, testList);
    setTestListSorted(sorted);
    setSelectedCategory(category || null);
  };

  const handleChangeGroup = async (group) => {
    const groupId = group ? Number(group?.id) : null;
    const categoryId = selectedCategory ? Number(selectedCategory?.id) : null;

    const sorted = filterTests(categoryId, groupId, testList);
    setTestListSorted(sorted);
    setSelectedGroup(group || null);
  };


  return (
    <div className='row'>
      <Link to='/lab-module-new/add-lab-test'>
        <button type='submit' className='btns float-end mt-2 '>
          Add New
        </button>
      </Link>

      <div className='col-md-12'>
        <h6 className='px-2'>Test Names</h6>
        <div
          style={{
            overflowX: 'auto',
          }}
        >
          <MaterialTable
            columns={columns}
            data={testListSorted}
            options={{
              search: true,
              showTitle: false,
              searchFieldAlignment: 'left',
              pageSize: 20,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [5, 10, 20, 50, 100],
            }}
            components={{
              Toolbar: (props) => (
                <div className="d-flex justify-content-between align-items-center">
                  <MTableToolbar {...props} />

                  <div className="filter me-2">
                    <div style={{ width: '200px' }} className="me-2">
                      <Select
                        options={allTestGroup}
                        getOptionLabel={(option) => option?.test_group_name}
                        getOptionValue={(option) => option?.id}
                        onChange={handleChangeGroup}
                        isClearable
                        placeholder="Select Group"
                        styles={ReactSelectStyles}
                        value={selectedGroup}
                      />
                    </div>
                    <div style={{ width: '200px' }}>
                      <Select
                        options={testCategory}
                        getOptionLabel={(option) => option?.test_category_name}
                        getOptionValue={(option) => option?.test_category_name}
                        onChange={handleChangeCategory}
                        // isDisabled={searchItems !== "test" ? true : false}
                        isClearable
                        placeholder="Select Category"
                        styles={ReactSelectStyles}
                        value={selectedCategory}
                      />
                    </div>

                  </div>

                </div>
              ),
            }}
          />
        </div>
      </div>

    </div>
  );
}

export default TestName;
