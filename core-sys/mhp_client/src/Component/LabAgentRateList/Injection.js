import React from 'react';
import CustomTable from "../Shared/CustomTable"
import ShareBtnContainer from '../Shared/ShareBtnContainer';
const Injection = () => {
    const pathologyOnSide = [{
        _id: "1001a",
        code: 458,
        category: "Hematology",
        testName: "Complete blood count (CBC)",
        gender: "Male",
        fee: 100,
        revenue: 0,
        preBooking: "Yes",
        details: "A complete blood count (CBC), also known as a full blood count (FBC)"
    },
    {
        _id: "1002ab",
        code: 368,
        category: "Antinuclear antibody",
        testName: "Blood sugar level",
        gender: "Female",
        fee: 200,
        revenue: 10,
        preBooking: "No",
        details: "Glycaemia, also known as blood sugar level, blood sugar concentration, or blood glucose level"
    },
    {
        _id: "1003abc",
        code: 303,
        category: "Hemorheology",
        testName: "Lipid profile",
        gender: "Male",
        fee: 300,
        revenue: 0,
        preBooking: "Yes",
        details: "A lipid profile or lipid panel is a panel of blood tests"
    },
    {
        _id: "1004abcd",
        code: 567,
        category: "Hematology",
        testName: "Complete blood count (CBC)",
        gender: "Male",
        fee: 100,
        revenue: 0,
        preBooking: "Yes",
        details: "A complete blood count (CBC), also known as a full blood count (FBC)"
    },
    ];
    return (
        <>
            <CustomTable rateList={pathologyOnSide} />
            <ShareBtnContainer />
        </>
    );
};

export default Injection;