import React from "react";
import LabBillingReport from "./LabBillingReport";
import LabMarketerReport from "./LabMarketerReport";
import LabEmployeeShiftReport from "./LabEmployeeShiftReport";
import LabTestWiseReport from "./LabTestWiseReport";

export default function GreatLabBillingReport() {
  return (
    <div>
      <div className="custom-card my-2 mx-2 p-2 ">
        <div className="card-header">
          <div
            className="card-header cns-container"
            style={{ background: "white" }}
          >
            <div
              id="v-pills-tab"
              role="tablist"
              className="nav nav-pills d-flex align-items-center"
              aria-orientation="horizontal"
            >
              <button
                class="nav-link text-start active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                Billing Report
              </button>
              <button
                class="nav-link text-start"
                id="v-pills-details-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-details"
                type="button"
                role="tab"
                aria-controls="v-pills-details"
                aria-selected="true"
              >
                Marketer Report
              </button>
              <button
                class="nav-link text-start"
                id="v-pills-employee-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-employee"
                type="button"
                role="tab"
                aria-controls="v-pills-employee"
                aria-selected="true"
              >
                User Report
              </button>
              <button
                class="nav-link text-start"
                id="v-pills-test-wise-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-test-wise"
                type="button"
                role="tab"
                aria-controls="v-pills-test-wise"
                aria-selected="true"
              >
                Test Wise Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-card mx-2 p-2">
        <div id="v-pills-tabContent" class="tab-content">
          <div
            class="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <LabBillingReport />
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-details"
            role="tabpanel"
            aria-labelledby="v-pills-details-tab"
          >
            <LabMarketerReport />
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-employee"
            role="tabpanel"
            aria-labelledby="v-pills-employee-tab"
          >
            <LabEmployeeShiftReport />
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-test-wise"
            role="tabpanel"
            aria-labelledby="v-pills-test-wise-tab"
          >
            <LabTestWiseReport />
          </div>
        </div>
      </div>
    </div>
  );
}
