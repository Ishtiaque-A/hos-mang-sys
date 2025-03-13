import React, { useState } from 'react';
import Modal from 'react-modal';
import room_booked from "../Images/room_booked.png";
import floor_im from "../Images/floor_im.png";
import bed_kingsite from "../Images/bed_kingsite.png";
import Side_screen from "../Images/Side_screen.png";
import SquareL from "../Images/SquareL.png";
import features from "../Images/features.png";

const RoomDetails = () => {
    const [deluxeKingSuite, setDeluxeKingSuite] = useState([
        { id: 1, image: bed_kingsite, name: "Type", title: "King Suite" },
        { id: 2, image: Side_screen, name: "Side", title: "Left Side" },
        { id: 3, image: floor_im, name: "Floor", title: "6th Floor" },
        { id: 4, image: SquareL, name: "Size", title: "220 SqFt" },
    ]);
    const [featuresAmenities, setFeaturesAmenities] = useState([
        { id: 1, image: features, name: "Balcony" },
        { id: 2, image: features, name: "IOT Light" },
        { id: 3, image: features, name: "Refrigerator" },
        { id: 4, image: features, name: "IOT TV" },
        { id: 5, image: features, name: "Free Wi-Fi" },
        { id: 6, image: features, name: "Free Wi-Fi" },
        { id: 7, image: features, name: "Free Wi-Fi" },
        { id: 8, image: features, name: "Free Wi-Fi" },
        { id: 9, image: features, name: "Free Wi-Fi" },
    ]);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            position: "absolute",
            inset: "50% auto auto 50%",
            border: "1px solid rgb(204, 204, 204)",
            background: "rgb(255, 255, 255)",
            borderRadius: "4px",
            outline: "none",
            padding: "5px",
            transform: "translate(-75%, -84%)",
            height: "320px",
            width: "60%",
        },
        overflow: "hidden",
    };
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className="border rounded">
            <div className="row">
                <div className="col-7">
                    <div className="room-detail-bg p-1">
                        <p className="deluxe-text">Room No.- 103</p>
                        <h6 className="deluxe-header">Deluxe King Suite</h6>
                        <div className="border rounded deluxe-bg">
                            <div className="row">
                                {
                                    deluxeKingSuite.length > 0 && deluxeKingSuite.map((item, id) => {
                                        return (
                                            <div key={id} className="col-6">
                                                <div className="mb-0">
                                                    <div className="row g-0">
                                                        <div className="col-md-4">
                                                            <img src={item.image} className="img-fluid rounded-start" alt="image" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="">
                                                                <p className="deluxe-text">{item.name}</p>
                                                                <p className="deluxe-title">{item.title}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="pt-2">
                            <h6 className="deluxe-header">Description</h6>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dictum potenti urna sagittis, pulvinar ornare volutpat,
                                elit. Gravida malesuada interdum bibendum cras pharetra. Vulputate tempus consectetur tincidunt mus. Magna turpis
                                viverra sit massa consequat vulputate eget. Aliquet malesuada semper ac quisque ut at volutpat. Auctor dui, egestas
                                maecenas nec etiam cursus. Tellus consectetur ultricies elementum, tortor nibh nisl quam curabitur augue. Lectus
                                egestas eget dictum vitae elit.
                            </p>
                        </div>
                        <div className="pt-2">
                            <h6 className="deluxe-header">Features & Amenities</h6>
                            <div className="row">

                                {
                                    featuresAmenities.length > 0 && featuresAmenities.map((item, id) => {
                                        return (
                                            <div className="col-4">
                                                <div className="features-list">
                                                    <ul className="list-unstyled ">
                                                        <li>
                                                            <span className="list-img"><img src={item.image} className="img-fluid" alt="image" /></span>
                                                            <span className="pl-2">{item.name}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <h6 className="deluxe-header pt-1">Room View</h6>
                    <div className="">
                        <img src={room_booked} className="image-fluid" style={{ width: "100%", height: "300px" }} alt="image" />
                    </div>
                    <div className="row g-2 pt-3">
                        <div className="col-auto">
                            <img src={room_booked} className="image-fluid" style={{ width: "63px", height: "63px" }} alt="image" />
                        </div>
                        <div className="col-auto">
                            <img src={room_booked} className="image-fluid" style={{ width: "63px", height: "63px" }} alt="image" />
                        </div>
                        <div className="col-auto">
                            <img src={room_booked} className="image-fluid" style={{ width: "63px", height: "63px" }} alt="image" />
                        </div>
                        <div className="col-auto">
                            <img src={room_booked} className="image-fluid" style={{ width: "63px", height: "63px" }} alt="image" />
                        </div>
                        <div className="col-auto">
                            <img src={room_booked} className="image-fluid" style={{ width: "63px", height: "63px" }} alt="image" />
                        </div>
                    </div>
                    <div className="pt-4">
                        <button className="ipd-room-btn" onClick={openModal}>Book Now</button>
                        <div className="delauxe-container">
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <div class="deluxe-modal">
                                    <div class="modal-header">
                                        <h6 class="modal-title">Book Now</h6>
                                        <span className='float-end' style={{ fontSize: "16px", cursor: "pointer" }} onClick={closeModal}><i class="fa-solid fa-xmark"></i></span>
                                    </div>
                                </div>
                                <form>
                                    <div className="row p-2 mb-2">
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="inputName" className="col-sm-3 col-form-label col-form-label-sm">Name</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control form-control-sm" id="inputName" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="inputHNNo" className="col-sm-3 col-form-label col-form-label-sm">HN No.</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control form-control-sm" id="inputHNNo" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="inputPhoneNo" className="col-sm-3 col-form-label col-form-label-sm">Phone No.</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control form-control-sm" id="inputPhoneNo" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="inputEmail" className="col-sm-3 col-form-label col-form-label-sm">Email</label>
                                                <div className="col-sm-9">
                                                    <input type="email" className="form-control form-control-sm" id="inputEmail" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="inputGender" className="col-sm-3  col-form-label col-form-label-sm">Gender</label>
                                                <div className="col-md-9">
                                                    <select id="inputGender" className="form-select form-select-sm">
                                                        <option selected>Select</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="inputDate" className="col-sm-3 col-form-label col-form-label-sm">Arrival Date</label>
                                                <div className="col-sm-9">
                                                    <input type="date" className="form-control form-control-sm" id="inputDate" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="floatingAddress2" className="col-sm-3 col-form-label col-form-label-sm">Address</label>
                                                <div className="col-sm-9">
                                                    <textarea className="form-control" placeholder="Write here ..." id="floatingAddress2" rows="3"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="floatingNotes3" className="col-sm-3 col-form-label col-form-label-sm">Notes</label>
                                                <div className="col-sm-9">
                                                    <textarea className="form-control" placeholder="Write here ..." id="floatingNotes3" rows="3"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <div className="float-end ">
                                                <button className="ipd-btn me-3">Save</button>
                                                <button className="ipd-btn-cancel">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default RoomDetails;