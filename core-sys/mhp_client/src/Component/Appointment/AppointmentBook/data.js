import React, { Component } from 'react';
import axios from "axios";
import swal from "sweetalert";

const scheduleData = axios.get('http://127.0.0.1:8000/api/scheduler');

class data extends Component {


    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default data;