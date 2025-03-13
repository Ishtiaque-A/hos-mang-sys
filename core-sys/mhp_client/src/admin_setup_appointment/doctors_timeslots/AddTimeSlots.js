import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import AddDashboard from "../AddDashboard/AddDashboard";

function AddTimeSlots() {
    const [inputList, setInputList] = useState(
        [
            { firstName: "", lastName: "" }
        ]
    );

    const [countryInput, setCountry] = useState({
        country_name: '',
    });

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { firstName: "", lastName: "" }]);
    };

    return (
        <>
 <Sidebar1></Sidebar1>
 <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <AddDashboard></AddDashboard>
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title">Add Time Slot
                                <Link to={"/ethnicity"} className="btn btn-sm btn-primary float-end">Back</Link>
                            </h6>

                        </div>
                        <div className="card-body">
                            <form>
                                <div className="card-body">


                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="city_name" className="col-form-label-sm">Time Slots</label>
                                            <input type="text" className="form-control" name="city_name" />
                                        </div>
                                        <div className="float-right">
                                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                className="fas fa-save"></i> Save
                                            </button>
                                        </div>
                                    </div>


                                    <div className="col-md-12">


                                        {inputList.map((x, i) => {
                                            return (

                                                <div className="box">
                                                    <div className="form-group">
                                                        <label htmlFor="city_name" className="col-form-label-sm">Time Slots</label>
                                                        <input type="text" className="form-control" value={x.firstName}
                                                            onChange={e => handleInputChange(e, i)} name="city_name" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="city_name" className="col-form-label-sm">Time Slots</label>
                                                        <input type="text" className="form-control" value={x.lastName}
                                                            onChange={e => handleInputChange(e, i)} name="city_name" />
                                                    </div>

                                                    <div className="btn-box">
                                                        {inputList.length !== 1 && <button
                                                            className="mr10"
                                                            onClick={() => handleRemoveClick(i)}>Remove</button>}
                                                        {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                                                    </div>

                                                </div>
                                            );
                                        })}

                                        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}


                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</>

       


    );
}

export default AddTimeSlots;