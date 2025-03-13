import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import colorIcon from "../../../Images/color pallate.png";
import './AppointmentStatus.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import swal from 'sweetalert';
const AppointmentStatus = () => {
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [color, setColor] = useState("#ffff");
    const status = [
        {
            id: "1",
            detail: "Arrived in time",
            bgColor: "#F09B38"
        },
        {
            id: "2",
            detail: "Arrived Later",
            bgColor: "#90CB78"
        },
        {
            id: "3",
            detail: "Waiting",
            bgColor: "#F56C60"
        },
        {
            id: "4",
            detail: "On Doctor’s Room",
            bgColor: "#4EAC9B"
        },
        {
            id: "5",
            detail: "Not Attended",
            bgColor: "#A170DA"
        },
    ]
    // const [characters, updateCharacters] = useState(status);
    const [characters, updateCharacters] = useState('');
    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);
    }

    const [render, setRender] = useState('');
    const [allStatusColorData, setAllStatusColorData] = useState([]);
    const [error, setError] = useState('');
    // console.log('all Status error check', error)

    useEffect(() => {
        axios.get(`/get-appointment-status-color`).then(res => {
            if (res.data.status === 200) {
                setAllStatusColorData(res.data.status_color);
                updateCharacters(res.data.status_color);
            }

        });

    }, [render]);

    const [editId, setEditId] = useState('');
    useEffect(() => {
        axios.get(`/edit-appointment-status-color/${editId}`).then(res => {
            if (res.data.status === 200) {
                setAppointmentState(res.data.edit_data);
                setStaticColor(res.data.edit_data.color);
            }

        });
    }, [editId])

    const [appointmentState, setAppointmentState] = useState({
        status_name: '',
        color: '',
        sequence: ''
    });

    const handleInputChange = (e) => {
        setAppointmentState({
            ...appointmentState, [e.target.name]: e.target.value
        })
    }

    const [staticColor, setStaticColor] = useState('')
    const handleColorChange = (e) => {
        setStaticColor(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            status_name: appointmentState.status_name,
            color: staticColor || color,
            sequence: appointmentState.sequence,
        }
        // console.log('statte data check',appointmentState)
        // console.log('static color check',staticColor);
        // console.log('dynamic color check',color);

        // console.log('satte data check', data)
        axios.post(`/appointment-status-color`, data).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setRender(res.data);
                setStaticColor('');
                setError('');
                setAppointmentState({
                    status_name: '',
                    color: '',
                    sequence: ''
                })
                let radios = document.getElementsByName('color');
                console.log('colors', radios);
                for (var checkbox of radios) {
                    if (checkbox.checked) {
                        checkbox.checked = false
                    }
                }
            }
            else if (res.data.status == 400) {
                setError(res.data.errors);

            }


        })

    }
    const updateSubmit = (e) => {
        e.preventDefault();
        const data = {
            status_name: appointmentState.status_name,
            color: staticColor || color,
            sequence: appointmentState.sequence,
        }
        // console.log('statte data check',appointmentState)
        // console.log('static color check',staticColor);
        // console.log('dynamic color check',color);

        // console.log('satte data check', data)
        axios.post(`/update-appointment-status-color/${editId}`, data).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setRender(res.data);
                setStaticColor('');
                setAppointmentState({
                    status_name: '',
                    color: '',
                    sequence: ''
                })
                setError('');
                setEditId('');
                let radios = document.getElementsByName('color');
                console.log('colors', radios);
                for (var checkbox of radios) {
                    if (checkbox.checked) {
                        checkbox.checked = false
                    }
                }
            }
            else if (res.data.status == 400) {
                setError(res.data.errors);

            }


        })

    }
    const handleReset = (e) => {
        e.preventDefault();
        setError('');
        setEditId('');
        let radios = document.getElementsByName('color');
        console.log('colors', radios);
        for (var checkbox of radios) {
            if (checkbox.checked) {
                checkbox.checked = false
            }
        }
        setStaticColor('');
        setAppointmentState({
            status_name: '',
            color: '',
            sequence: ''
        })
        setColor('');

    }
    return (
        <div className='appointment-status-container ms-2'>
            <div className="custom-card mt-2 mb-2 p-2">
                <h5 className="card-title">Appointment Status</h5>
            </div>
            <div className=''>
                <div className="row mt-2">
                    <div className="col-md-6 status-form">
                        <div className="custom-card p-2 clearfix">
                            <form>
                                <div className="row mb-3">
                                    <label className="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm ">Status Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control form-control-sm" value={appointmentState.status_name} onChange={handleInputChange} name="status_name" placeholder="Enter Status Name" />
                                        <span className='text-danger'>{error.status_name}</span>

                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm ">Color</label>
                                    <div className="col-sm-9 d-flex">
                                        <div className="radio-container red mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#FF0000" id="radio-1" name="color" checked={staticColor == "#FF0000"} onChange={handleColorChange} />
                                        </div>
                                        <div className="radio-container green mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#008000" id="radio-1" name="color" checked={staticColor == "#008000"} onChange={handleColorChange} />
                                        </div>
                                        <div className="radio-container yellow mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#FFC100" id="radio-1" name="color" checked={staticColor == "#FFC100"} onChange={handleColorChange} />
                                        </div>
                                        <div className="radio-container info mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#248AFD" id="radio-1" name="color" checked={staticColor == "#248AFD"} onChange={handleColorChange} />
                                        </div>
                                        <div className="radio-container primary mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#3F3E91" id="radio-1" name="color" checked={staticColor == "#3F3E91"} onChange={handleColorChange} />
                                        </div>
                                        <div className="radio-container ex-1 mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#24E71A" id="radio-1" name="color" checked={staticColor == "#24E71A"} onChange={handleColorChange} />
                                        </div>
                                        <div className="radio-container ex-2 mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#02E8D1" id="radio-1" name="color" checked={staticColor == "#02E8D1"} onChange={handleColorChange} />
                                        </div>
                                        <div className="radio-container ex-3 mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#02E8D1" id="radio-1" name="color" checked={staticColor == "#02E8D1"} onChange={handleColorChange} />
                                        </div>
                                        <div className="radio-container ex-4 mt-2 me-2 ms-2 ">
                                            <input type="radio" className="radio-custom" value="#0638FE" id="radio-1" name="color" checked={staticColor == "#0638FE"} onChange={handleColorChange} />
                                        </div>
                                        <div className="radio-container ex-5 mt-2 me-2 ms-2 ">
                                            <input type="radio" className="radio-custom" value="#56575D" id="radio-1" name="color" checked={staticColor == "#56575D"} onChange={handleColorChange} />
                                        </div>

                                        <div onClick={() => { setShowColorPicker(!showColorPicker); setStaticColor('') }} className="color-pallate">
                                            Custom
                                            <img className='ms-1' style={{ width: "30px" }} src={colorIcon} alt="" />
                                        </div>

                                    </div>
                                    {
                                        showColorPicker &&
                                        <div>
                                            <div style={{ width: "130px" }} className="float-end mt-1">
                                                <HexColorPicker color={color} onChange={setColor} />
                                            </div>

                                        </div>
                                    }
                                    <span className='text-danger col-md-9 offset-md-3'>{error.color}</span>

                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm ">Sequence</label>
                                    <div className="col-sm-9">
                                        <select className="form-select form-select-sm" id="autoSizingSelect" value={appointmentState.sequence} onChange={handleInputChange} name="sequence" >
                                            <option >Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                        </select>
                                        <span className='text-danger'>{error.sequence}</span>

                                    </div>


                                </div>

                                {editId == '' ? <button type="submit" onClick={handleSubmit} className="vaital-setup-btn float-end mt-3">Save</button> : <button type="submit" onClick={updateSubmit} className="vaital-setup-btn float-end mt-3">Update</button>}

                                <button type="reset" className="vaital-setup-btn-cancel float-end  me-2 mt-3" OnClick={handleReset}>Reset</button>

                            </form>
                        </div>

                    </div>
                    <div className="col-md-6 status-chart">
                        <div className="custom-card p-2 clearfix">
                            <h6>Sequence Chart</h6>
                            <div className="status-chart-container">
                                <DragDropContext onDragEnd={handleOnDragEnd}>
                                    <Droppable droppableId="characters" direction="horizontal">
                                        {(provided) => (

                                            <div className="row"  {...provided.droppableProps} ref={provided.innerRef}>
                                                {allStatusColorData.map(({ sequence, status_name, color, id }, index) => {
                                                    return (
                                                        <Draggable key={sequence} draggableId={sequence} index={index}>
                                                            {(provided) => (

                                                                <div className="col-4 text-center" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => setEditId(id)}>
                                                                    <button style={{ backgroundColor: `${color}` }} className='round-btn'>{index + 1}</button><br />
                                                                    <button style={{ borderLeft: `4px solid ${color}` }} className="status-btn">{status_name}</button>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>

                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentStatus;