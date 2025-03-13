import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './PastObservation.css';


const PastObservation = (props) => {
  let patientId = props.patientId
  const [observation, setObservation] = useState({
    patient_id: patientId,
    date: "",
    pulse: "",
    route: "",
    bp_sitting_left: "",
    bp_sitting_right: "",
    bp_standing_left: "",
    bp_standing_right: "",
    bp_lying_left: "",
    bp_lying_right: "",
    res_rate: "",
    sat: "",
    temp: "",
    type: "",
    weight: "",
    height: "",
    waist: "",
    hip: "",
    chest_insp: "",
    chest_exp: "",
    bsl: "",
    bsl_right_select: "",
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      patient_id: props.patient_id,
      date: observation.date,
      pulse: observation.pulse,
      route: observation.route,
      bp_sitting_left: observation.bp_sitting_left,
      bp_sitting_right: observation.bp_sitting_right,
      bp_standing_left: observation.bp_standing_left,
      bp_standing_right: observation.bp_standing_right,
      bp_lying_left: observation.bp_lying_left,
      bp_lying_right: observation.bp_lying_right,
      res_rate: observation.res_rate,
      sat: observation.sat,
      temp: observation.temp,
      type: observation.type,
      weight: observation.weight,
      height: observation.height,
      waist: observation.waist,
      hip: observation.hip,
      chest_insp: observation.chest_insp,
      chest_exp: observation.chest_exp,
      bsl: observation.bsl,
      bsl_right_select: observation.bsl_right_select,

    }
    axios.post('/save-greatdoc-past-obserbation', data).then(res => {

      if (res.data.status === 200) {
        Swal.fire(
          res.data.message,
          'Success..!',
          'success'
        )

      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.data.error_msg.email,
        })
      }



    })
  }

  return (
    <div className='pastObservation_Container'>
      <form onSubmit={handleSubmit}>
        <div className="row mx-5 pt-2">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Date</label>
              <div className="col-sm-8">
                <input type="date" onChange={(e) => setObservation({ ...observation, date: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="col-form-label-sm" required />
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Pulse</label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, pulse: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="Pulse" required />
              </div>
            </div>
          </div>
          <div className="col-6">

            <select onChange={(e) => setObservation({ ...observation, type: e.target.value })} className="form-select form-select-sm" aria-label=".form-select-sm example" required>
              <option defaultValue>Regular</option>
              <option value="1">Irregular</option>
              <option value="2">Irregularly Irregular</option>
              <option value="3">Occasional extrasystole</option>
              <option value="3">Frequent extrasystoles</option>
              <option value="3">Mobitz 1</option>
              <option value="3">Mobitz 2</option>
              <option value="3">Mobitz 3</option>
            </select>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> BP Sitting </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, bp_sitting_left: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-1 col-form-label col-form-label-sm text-center"> / </label>
              <div className="col-sm-11">
                <input type="text" onChange={(e) => setObservation({ ...observation, bp_sitting_right: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> BP Standing </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, bp_standing_left: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-1 col-form-label col-form-label-sm text-center"> / </label>
              <div className="col-sm-11">
                <input type="text" onChange={(e) => setObservation({ ...observation, bp_standing_right: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> BP Lying </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, bp_lying_left: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-1 col-form-label col-form-label-sm text-center"> / </label>
              <div className="col-sm-11">
                <input type="text" onChange={(e) => setObservation({ ...observation, bp_lying_right: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> Resp. rate </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, bp_res_rate: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">O2 Sat.</label>
              <div className="col-sm-10">
                <input type="text" onChange={(e) => setObservation({ ...observation, sat: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> Temp </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, temp: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
          <div className="col-6">
            <select onChange={(e) => setObservation({ ...observation, route: e.target.value })} className="form-select form-select-sm" aria-label=".form-select-sm example">
              <option defaultValue>Oral</option>
              <option value="Axillary">Axillary</option>
              <option value="Tympanic">Tympanic</option>
              <option value="Rectal">Rectal</option>
              <option value="Remporal artery">Remporal artery</option>
            </select>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> Weight </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, weight: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> Height </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, height: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> Waist </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, waist: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> Hip </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, hip: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> Chest (Insp.) </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, chest_insp: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> Chest (Exp.) </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, chest_exp: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-5">
          <div className="col-6">
            <div className="row mb-3">
              <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm"> BSL </label>
              <div className="col-sm-8">
                <input type="text" onChange={(e) => setObservation({ ...observation, bsl: e.target.value })} className="form-control form-control-sm" id="colFormLabelSm" placeholder="" required />
              </div>
            </div>
          </div>
          <div className="col-6">
            <select onChange={(e) => setObservation({ ...observation, bsl_right_select: e.target.value })} className="form-select form-select-sm" aria-label=".form-select-sm example">
              <option defaultValue>Select</option>
            </select>
          </div>
        </div>


        <div className='pastObservation_btn mb-5'>
          <button className='pastObservation_btn_right' onClick={props.closePastObservationModal}>Cancel</button>
          <button className='pastObservation_btn_left' type='submit'>Save</button>
        </div>
      </form>
    </div>
  );
};

export default PastObservation;