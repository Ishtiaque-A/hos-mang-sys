import React from "react";
import moment from "moment";

function MedicenDetails(props) {
  return (
    <>
      <div>
        <h6>{props.medicenDetails.drug_name} :-</h6>
        <table className="mimsDataTable" style={{ width: "500px" }}>
          <tr>
            <td>Drugs Name</td>
            <td>{props.medicenDetails.drug_name}</td>
          </tr>

          <tr>
            <td>Drug generic name</td>
            <td>{props.medicenDetails.drug_generic_name}</td>
          </tr>

          <tr>
            <td>Dose</td>
            <td>{props.medicenDetails.dose}</td>
          </tr>

          <tr>
            <td>Frequency</td>
            <td>{props.medicenDetails.frequency}</td>
          </tr>
          <tr>
            <td>Food</td>
            <td>{props.medicenDetails.food}</td>
          </tr>
          <tr>
            <td>Others</td>
            <td>{props.medicenDetails.others}</td>
          </tr>
          <tr>
            <td>Route</td>
            <td>{props.medicenDetails.route}</td>
          </tr>
          <tr>
            <td>Reason</td>
            <td>{props.medicenDetails.condition}</td>
          </tr>
          <tr>
            <td>Complex instruction</td>
            <td>{props.medicenDetails.Complex_instruction}</td>
          </tr>
          <tr>
            <td>Extra instruction</td>
            <td>{props.medicenDetails.extra_instruction}</td>
          </tr>
          <tr>
            <td>Prescribed As</td>
            <td>{props.medicenDetails.prescribedAs}</td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td>{props.medicenDetails.quantity}</td>
          </tr>
          <tr>
            <td>Repeats</td>
            <td>{props.medicenDetails.repeats}</td>
          </tr>
          <tr>
            <td>Tabs Inistraction</td>
            <td>{props.medicenDetails.tabs_inistraction}</td>
          </tr>
          <tr>
            <td>Ragulation 24</td>
            <td>{props.medicenDetails.is_Regulation == 1 ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>iSAllergyCheck</td>
            <td>{props.medicenDetails.iSAllergyCheck == 1 ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>General note</td>
            <td>{props.medicenDetails.general_note}</td>
          </tr>

          <tr>
            <td>Prescribed this mediacation at</td>
            <td>{moment(props.medicenDetails.created_at).format("lll")}</td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default MedicenDetails;
