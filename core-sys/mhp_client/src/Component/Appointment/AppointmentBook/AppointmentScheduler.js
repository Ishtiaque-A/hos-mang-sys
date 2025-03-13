import * as React from "react";
import {
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
  ExcelExport,
} from "@syncfusion/ej2-react-schedule";
import { createElement, extend, L10n } from "@syncfusion/ej2-base";
import { SampleBase } from "./sample-base";
import {
  closest,
  isNullOrUndefined,
  remove,
  removeClass,
} from "@syncfusion/ej2-base";
import axios from "axios";
import { Button } from "@syncfusion/ej2-buttons";
import ReactModal from "react-modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import swal from "sweetalert";
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import "./AppointmentBook.css";
import ReactToPrint from "react-to-print";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ComponentToPrint from "./ComponentToPrint";
import Swal from "sweetalert2";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ShowForSmallDevicesAppointmentStatus } from "./ShowForSmallDevicesAppointmentStatus";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import { formatPhoneNumber, formateHN } from "../../../utils/numberHelper";
import { NewModal } from "../../../common/components/NewModal";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Add",
      cancelButton: "Close",
      deleteButton: "Remove Patient",
      save: "Add",
    },
  },
});
export default class AppointmentScheduler extends SampleBase {
  constructor() {
    super(...arguments);

    this.state = {
      scheduleData: [],
      DoctorSearchData: [],
      showModal: false,
      app_type_model: false,
      search: null,
      searchResult: null,
      errorData: null,
      cellData: [],
      existingPatient: null,
      selectedDateNew: new Date().toLocaleDateString(),
      showClender: false,
      searchBYDoctorName: "",
      searchByDepartment: "",
      doctorDepartment: [],
      DoctorSearchDataForDepartment: [],
      showPrint: false,
      patientValueForPrint: [],
      age: "",
      printDoctorData: [],
      appointmentDay: "",
      appointmentTime: "",
      patient_regi_model_show: false,
      patientGenderDropdown: [],
      patientBloodDropdown: [],
      orgBranch: [],
      patientEventData: {
        Subject: "",
      },
      image: [],
      imageUrl: [],
      image_error: "",
      app_type: "Chamber",
      patient_data: {},
      add_app_outside_of_schedule: false,
      start_time: "",
      patient_dob: new Date(),
      days: "",
      months: "",
    };

    this.patient_hn_number = React.createRef();
    this.patient_first_name = React.createRef();
    this.patient_mobile_phone = React.createRef();
    this.patient_email = React.createRef();
    this.patient_dob = React.createRef();
    this.ptn_blood_group_id = React.createRef();
    this.patient_birth_sex_id = React.createRef();
    this.patient_address1 = React.createRef();
    this.saas_branch_id = React.createRef();
    this.patient_image = React.createRef();
    // this.componentRef = React.createRef();

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchHandeler = this.searchHandeler.bind(this);
    this.clearHandle = this.clearHandle.bind(this);
    this.addExistingPatient = this.addExistingPatient.bind(this);

    this.PatientModelColse = this.PatientModelColse.bind(this);
    this.handleSubmitForPatient = this.handleSubmitForPatient.bind(this);

    this.menuItems = [
      {
        text: "Patient Profile",
        iconCss: "fas fa-user-check",
        id: "PatientProfile",
      },
      {
        text: "Edit patient",
        iconCss: "fas fa-user-check",
        id: "updatePatient",
      },
      {
        text: "View Record",
        iconCss: "fas fa-eye",
        id: "viewRecord",
      },
      {
        text: "Start Visit",
        iconCss: "far fa-arrow-alt-circle-right",
        id: "startVisit",
      },
      {
        text: "New Patient Registration",
        iconCss: "fas fa-user-check",
        id: "patient_reg",
      },
      {
        text: "Cancel appointment",
        iconCss: "fas fa-user-times",
        id: "cancle",
      },
      {
        text: "Change Status",
        iconCss: "fas fa-info-circle",
        id: "status",
        items: [
          {
            text: "Arrived",
            iconCss: "fas fa-circle arrived",
            id: "Arrived",
          },
          {
            text: "Unavailable",
            iconCss: "fas fa-circle unavilable",
            id: "Unavailable",
          },
          {
            text: "Waiting",
            iconCss: "fas fa-circle waiting",
            id: "Waiting",
          },
          {
            text: "With Doctors",
            iconCss: "fas fa-circle withdoctors",
            id: "withdoctors",
          },
          {
            text: "At billing",
            iconCss: "fas fa-circle attbilling",
            id: "attbilling",
          },
          {
            text: "Did not attend",
            iconCss: "fas fa-circle notattend",
            id: "notattend",
          },
        ],
      },
      {
        text: "Print Appointment Slip",
        iconCss: "fas fa-print",
        id: "printSlip",
      },
      {
        text: "Today",
        iconCss: "fas fa-clock",
        id: "Today",
      },
    ];
  }

  onMenuItemSelect(args) {
    let selectedMenuItem = args.item.id;
    if (this.selectedTarget.classList.contains("e-appointment")) {
      this.eventObj = this.scheduleObj.getEventDetails(this.selectedTarget);
    }
    // eslint-disable-next-line default-case
    switch (selectedMenuItem) {
      case "Today":
        this.scheduleObj.selectedDate = new Date();
        break;

      case "startVisit":
        // console.log("id",this.eventObj)
        // this.props.goToGD(this.eventObj.Id);
        this.props.goToGD(this.eventObj.Id, this.eventObj.patientID);
        //  localStorage.setItem("StartTime", JSON.stringify(this.eventObj.StartTime));

        // axios.get(`/patient-search/${this.eventObj.Location}`).then(res => {
        //   this.props.goToGD(res.data[0].id)
        // })
        break;
      case "PatientProfile":
        this.props.goToPatientProfile(this.eventObj.patientID);

        // axios.get(`/patient-search/${this.eventObj.Location}`).then(res => {
        //   this.props.goToPatientProfile(res.data[0].id)
        // })
        break;

      case "updatePatient":
        this.props.goToPatientEdit(this.eventObj.patientID);
        // axios.get(`/patient-search/${this.eventObj.Location}`).then(res => {
        //   this.props.goToPatientEdit(res.data[0].id)
        // })

        break;

      case "Arrived":
        this.scheduleObj.saveEvent({
          CategoryColor: "#020131",
          Description: this.eventObj.Description,
          DoctorID: this.eventObj.DoctorID,
          EndTime: this.eventObj.EndTime,
          Id: this.eventObj.Id,
          Location: this.eventObj.Location,
          StartTime: this.eventObj.StartTime,
          Subject: this.eventObj?.Subject,
          appointCreated: this.eventObj.appointCreated,
          patientID: this.eventObj.patientID,
          statusName: "Arrived",
        });
        break;

      case "Unavailable":
        this.scheduleObj.saveEvent({
          CategoryColor: "#6e0711",
          Description: this.eventObj.Description,
          DoctorID: this.eventObj.DoctorID,
          EndTime: this.eventObj.EndTime,
          Id: this.eventObj.Id,
          Location: this.eventObj.Location,
          StartTime: this.eventObj.StartTime,
          Subject: this.eventObj?.Subject,
          appointCreated: this.eventObj.appointCreated,
          patientID: this.eventObj.patientID,
          statusName: "Unavailable",
        });
        break;

      case "Waiting":
        this.scheduleObj.saveEvent({
          CategoryColor: "#ebdb07",
          Description: this.eventObj.Description,
          DoctorID: this.eventObj.DoctorID,
          EndTime: this.eventObj.EndTime,
          Id: this.eventObj.Id,
          Location: this.eventObj.Location,
          StartTime: this.eventObj.StartTime,
          Subject: this.eventObj?.Subject,
          appointCreated: this.eventObj.appointCreated,
          patientID: this.eventObj.patientID,
          statusName: "Waiting",
        });
        break;

      case "withdoctors":
        this.scheduleObj.saveEvent({
          CategoryColor: "#004700",
          Description: this.eventObj.Description,
          DoctorID: this.eventObj.DoctorID,
          EndTime: this.eventObj.EndTime,
          Id: this.eventObj.Id,
          Location: this.eventObj.Location,
          StartTime: this.eventObj.StartTime,
          Subject: this.eventObj?.Subject,
          appointCreated: this.eventObj.appointCreated,
          patientID: this.eventObj.patientID,
          statusName: "withdoctors",
        });
        break;

      case "attbilling":
        this.scheduleObj.saveEvent({
          CategoryColor: "#08f4fc",
          Description: this.eventObj.Description,
          DoctorID: this.eventObj.DoctorID,
          EndTime: this.eventObj.EndTime,
          Id: this.eventObj.Id,
          Location: this.eventObj.Location,
          StartTime: this.eventObj.StartTime,
          Subject: this.eventObj?.Subject,
          appointCreated: this.eventObj.appointCreated,
          patientID: this.eventObj.patientID,
          statusName: "attbilling",
        });
        break;

      case "notattend":
        this.scheduleObj.saveEvent({
          CategoryColor: "#ff0d15",
          Description: this.eventObj.Description,
          DoctorID: this.eventObj.DoctorID,
          EndTime: this.eventObj.EndTime,
          Id: this.eventObj.Id,
          Location: this.eventObj.Location,
          StartTime: this.eventObj.StartTime,
          Subject: this.eventObj?.Subject,
          appointCreated: this.eventObj.appointCreated,
          patientID: this.eventObj.patientID,
          statusName: "notattend",
        });
        // axios.post(`/update-scheduler/${this.eventObj.Id}`,
        //   {
        //     CategoryColor: "#ff0d15",
        //     statusName: "notattend",
        //     doctors_id: this.eventObj.DoctorID.toString(),
        //     patient_name: this.eventObj.Subject,
        //     IsAllDay: false,
        //     StartTime: this.eventObj.StartTime,
        //     EndTime: this.eventObj.EndTime,
        //     patient_mobile: this.eventObj.Location,
        //     notes: this.eventObj.Description,
        //     patientID: this.eventObj.patientID,
        //     appointCreated: this.eventObj.appointCreated
        //   })
        //   .then(res => {
        //     // console.log("Update Data_eventChange", res.data)
        //     window.location.reload(true);
        //   });
        break;

      case "cancle":
        this.scheduleObj.deleteEvent(this.eventObj);
        break;

      case "patient_reg":
        this.setState({
          patient_regi_model_show: true,
          patientEventData: this.eventObj,
        });

        break;

      case "printSlip":
        var date = new Date(this.eventObj.StartTime);
        var appDate =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var apptime = hours + ":" + minutes + " " + ampm;

        this.setState({
          appointmentDay: appDate,
          appointmentTime: apptime,
        });
        axios.get(`/doctor-search-id/${this.eventObj.DoctorID}`).then((res) => {
          console.log(res.data, "printDoctorData");
          this.setState({
            printDoctorData: res.data,
          });
        });
        axios
          .get(`/patient-search-by-id/${this.eventObj.patientID}`)
          .then((res) => {
            var currentYear = new Date().getFullYear();
            var birthDate = new Date(res.data.patient_dob).getFullYear();
            var age = currentYear - birthDate;
            console.log(res.data, "printDoctorData");

            this.setState({
              patientValueForPrint: res.data,
              age: age,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        setTimeout(function () {
          document.getElementById("appointmentSlip").click();
        }, 2000);

        break;
    }
  }

  onContextMenuBeforeOpen(args) {
    let newEventElement = document.querySelector(".e-new-event");
    if (newEventElement) {
      remove(newEventElement);
      removeClass(
        [document.querySelector(".e-selected-cell")],
        "e-selected-cell"
      );
    }
    let targetElement = args.event.target;
    if (closest(targetElement, ".e-contextmenu")) {
      return;
    }
    this.selectedTarget = closest(
      targetElement,
      ".e-appointment,.e-work-cells," +
        ".e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells"
    );
    if (isNullOrUndefined(this.selectedTarget)) {
      args.cancel = true;
      return;
    }

    if (this.selectedTarget.classList.contains("e-appointment")) {
      this.eventObj = this.scheduleObj.getEventDetails(this.selectedTarget);
      if (this.eventObj.RecurrenceRule) {
        // this.menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        // this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
        // this.menuObj.hideItems(['Today', 'PatientProfile', 'status','viewRecord','startVisit','printSlip'], true);
      } else {
        if (
          this.eventObj.patientID === undefined ||
          this.eventObj.patientID === null
        ) {
          //this.menuObj.hideItems(['PatientProfile','printSlip',], true);
          this.menuObj.hideItems(
            [
              "Today",
              "PatientProfile",
              "status",
              "viewRecord",
              "startVisit",
              "printSlip",
              "updatePatient",
            ],
            true
          );
          this.menuObj.showItems(["patient_reg"], true);
        } else {
          this.menuObj.showItems(
            [
              "Today",
              "PatientProfile",
              "status",
              "viewRecord",
              "startVisit",
              "printSlip",
              "cancle",
              "updatePatient",
            ],
            true
          );
          this.menuObj.hideItems(["patient_reg"], true);
        }

        // this.menuObj.hideItems(['ResisterPatient', 'addPatient'], true);
      }
      return;
    }
    this.menuObj.hideItems(
      [
        "Today",
        "PatientProfile",
        "status",
        "viewRecord",
        "startVisit",
        "printSlip",
        "cancle",
        "patient_reg",
        "updatePatient",
      ],
      true
    );
    // this.menuObj.showItems(['ResisterPatient', 'addPatient'], true);
  }

  onEventRendered(args) {
    args.element.style.backgroundColor = args.data.CategoryColor;
  }

  componentDidMount() {
    axios.get(`/gender-dropdown`).then((res) => {
      this.setState({
        patientGenderDropdown: res.data.gender,
      });
    });

    axios.get(`/blood-group`).then((res) => {
      this.setState({
        patientBloodDropdown: res.data.blood_group,
      });
    });
    const SaasBaseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_SAAS_URL
        : process.env.REACT_APP_PRO_SAAS_URL;
    const SaasBaseVersionOne = SaasBaseUrl + "/v1";
    const SaasAuthURL = SaasBaseVersionOne + "/auth";
    axios
      .get(SaasAuthURL + "/branch/service/find-branch-by-organizationId")
      .then((res) => {
        this.setState({ orgBranch: res.data.data });
      });

    //Error: react-modal: App element is not defined. Please use `Modal.setAppElement(el) ReactModal.setAppElement('body');`
    ReactModal.setAppElement("body");

    axios.get("/department").then((res) => {
      this.setState({ doctorDepartment: res.data.department });
    });

    // if (this.state.DoctorSearchData === []) {
    // axios.get('/all-doctors-booking').then(res => {
    //   this.setState({ DoctorSearchData: res.data.doctors })
    // })

    if (JSON.parse(localStorage.getItem("userData")).user_type === "Doctor") {
      axios
        .get(
          `/doctor-search-id/${
            JSON.parse(localStorage.getItem("userData")).user_id
          }`
        )
        .then((res) => {
          this.setState({ DoctorSearchData: res.data });
          console.log("test1", res.data);
        });
    } else {
      axios.get("/all-doctors-booking").then((res) => {
        this.setState({ DoctorSearchData: res.data.doctors });
        console.log("test2", res.data);
      });
    }

    axios.get("/scheduler").then((res) => {
      const result = res.data.scheduleData.map((item) => {
        return {
          Id: item.id,
          Subject: item.patient_name,
          StartTime: item.StartTime,
          EndTime: item.EndTime,
          DoctorID: parseInt(item.doctors_id),
          Location: item.patient_mobile,
          Description: item.notes,
          CategoryColor: item.status_color,
          statusName: item.status_name,
          patientID: item.patient_id,
          appointCreated: item.created_at,
        };
      });
      this.data = extend([], result, null, true);
      this.setState({
        scheduleData: result,
      });

      // if (this.state.existingPatient != null) {
      //   this.data.push(this.state.existingPatient)
      // }
    });
    // }
  }

  clearHandle() {
    this.setState({ searchResult: null });
    this.setState({ search: null });
    this.setState({ errorData: null });

    document.getElementById("output").value = "";
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }
  user = JSON.parse(localStorage.getItem("userData"));

  searchHandeler(event) {
    event.preventDefault();
    if (this.state.search !== null) {
      console.log("serche data", this.state.search);
      axios
        .post(
          `/patient-search-for-doctor/${this.state.search.replace(/\s+/g, "")}`,
          {
            doctor_id: this.user?.user_id,
          }
        )
        .then((res) => {
          this.setState({ searchResult: res.data, errorData: null });
        })
        .catch((err) => {
          this.setState({
            errorData: "No Data Found , Please Check Again?",
            searchResult: null,
          });
        });
    } else {
      alert("Please insert patient mobile or hn number");
    }
  }

  addExistingPatient() {
    if (this.state.add_app_outside_of_schedule) {
      console.log("start_time", this.state.start_time);
      if (!this.state.start_time) {
        return swal(
          "Warning!",
          "Please enter time for this appointment",
          "warning"
        );
      }
      var end_time = new Date(this.state.start_time);
      end_time.setMinutes(end_time.getMinutes() + 10);

      console.log("start_time", this.state.start_time);
      console.log("end_time", this.state.end_time);
      var patientDetailsEisting = {
        Subject: this.state.patient_data.fullName,
        StartTime: this.state.start_time,
        EndTime: end_time,
        DoctorID: JSON.parse(localStorage.getItem("userData")).user_id,
        Location: this.state.patient_data.patient_mobile_phone,
        patientID: this.state.patient_data.id,
        statusName: "Arrived",
        CategoryColor: "#020131",
      };
      this.scheduleObj.addEvent(patientDetailsEisting);
      this.handleCloseModal();
      this.setState({ app_type_model: false });
    } else {
      var patientDetails = {
        Subject: this.state.patient_data.fullName,
        StartTime: this.state.cellData.StartTime,
        EndTime: this.state.cellData.EndTime,
        DoctorID: parseInt(this.state.cellData.doctors_id),
        Location: this.state.patient_data.patient_mobile_phone,
        patientID: this.state.patient_data.id,
        CategoryColor: "#8961ed",
      };
      this.scheduleObj.addEvent(patientDetails);
      this.handleCloseModal();
      this.setState({ app_type_model: false });
    }

    // console.log("exp", patientDetails);
  }
  onActionBegin(args) {
    if (args.requestType === "toolbarItemRendering") {
      let exportItem = {
        align: "Right",
        showTextOn: "Both",
        prefixIcon: "e-icon-schedule-excel-export",
        text: "Excel Export",
        cssClass: "e-excel-export",
        click: this.onExportClick.bind(this),
      };
      args.items.push(exportItem);
    }
    if (args.requestType == "eventCreate") {
      console.log("this.state.app_type", this.state.app_type);
      const patientDetails = {
        doctors_id: args.addedRecords[0].DoctorID.toString(),
        patient_name: args.addedRecords[0]?.Subject,
        IsAllDay: false,
        StartTime: args.addedRecords[0].StartTime,
        EndTime: args.addedRecords[0].EndTime,
        patient_mobile: args.addedRecords[0].Location,
        notes: args.addedRecords[0].Description,
        patient_id: args.addedRecords[0].patientID,
        statusColor:
          this.state.app_type === "Telehealth"
            ? "#ff7345"
            : args.addedRecords[0].CategoryColor,
        app_type: this.state.app_type,
        statusName: this.state.add_app_outside_of_schedule ? "Arrived" : null,
      };
      axios.post("/save-scheduler", patientDetails).then((res) => {
        axios.get("/scheduler").then((res) => {
          const result = res.data.scheduleData.map((item) => {
            return {
              Id: item.id,
              Subject: item.patient_name,
              StartTime: item.StartTime,
              EndTime: item.EndTime,
              DoctorID: parseInt(item.doctors_id),
              Location: item.patient_mobile,
              Description: item.notes,
              CategoryColor: item.status_color,
              statusName: item.status_name,
              patientID: item.patient_id,
              appointCreated: item.created_at,
            };
          });
          this.data = extend([], result, null, true);
          this.setState({
            scheduleData: result,
            app_type: "Chamber",
          });

          // if (this.state.existingPatient != null) {
          //   this.data.push(this.state.existingPatient)
          // }
        });

        if (res.data.saveData.patient_mobile != null) {
          // const sms = `Wellcome to MHP,Thank you ${res.data.saveData.patient_name} for your Appiontment.Your appiontment booking time is: ${res.data.saveData.StartTime}`

          const localData = localStorage.getItem("userData");
          const sms = `Dear Patient,Your appointment has been confirmed to Dr. ${
            this.state.DoctorSearchData?.[0]?.fullName
          } on ${moment(res.data.saveData.StartTime).format(
            "DD-MM-YYYY"
          )} at ${moment(res.data.saveData.StartTime).format(
            "hh:mm A"
          )}.Please come to doctor’s Chamber within designated time. For any queries, please call doctor's contact number. Thanks.`;

          const data = {
            message: sms,
            number: res.data.saveData.patient_mobile,
          };

          axios
            .post(
              `${process.env.REACT_APP_DEV_SAAS_URL}/v1/auth/sms/send-sms`,
              data
            )
            .then((res) => {
              // toast.success(res?.data?.message || "Message sent successfully");
            })
            .catch((err) => console.log(err, "send sms error"));
        }
      });
    } else if (args.requestType == "eventChange") {
      const id = args.changedRecords[0].Id;
      const updatePatientDetails = {
        doctors_id: args.changedRecords[0].DoctorID.toString(),
        doctor_name: this.state?.DoctorSearchData?.[0]?.fullName,
        patient_name: args.changedRecords[0]?.Subject,
        IsAllDay: false,
        StartTime: args.changedRecords[0].StartTime,
        EndTime: args.changedRecords[0].EndTime,
        patient_mobile: args.changedRecords[0].Location,
        notes: args.changedRecords[0].Description,
        CategoryColor: args.changedRecords[0].CategoryColor,
        statusName: args.changedRecords[0].statusName,
        patientID: args.changedRecords[0].patientID,
      };
      axios
        .post(`/update-scheduler/${id}`, updatePatientDetails)
        .then((res) => {
          axios.get("/scheduler").then((res) => {
            const result = res.data.scheduleData.map((item) => {
              return {
                Id: item.id,
                Subject: item.patient_name,
                StartTime: item.StartTime,
                EndTime: item.EndTime,
                DoctorID: parseInt(item.doctors_id),
                Location: item.patient_mobile,
                Description: item.notes,
                CategoryColor: item.status_color,
                statusName: item.status_name,
                patientID: item.patient_id,
                appointCreated: item.created_at,
              };
            });
            this.data = extend([], result, null, true);
            this.setState({
              scheduleData: result,
            });
          });
          // if (res.data.updatedData.patient_mobile != null) {
          //   const sms = `Dear Patient, Your appointment is rescheduled to Dr. ${this.state.DoctorSearchData?.[0]?.fullName
          //     } on ${moment(res.data.updatedData.StartTime).format(
          //       "DD-MM-YYYY"
          //     )} at ${moment(res.data.updatedData.StartTime).format(
          //       "hh:mm A"
          //     )}. Please come to doctor’s Chamber within designated time.For any queries, please call 09638 505 505. Thanks.`;

          //   try {
          //     axios
          //       .post(
          //         `https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390&MsgType=TEXT&receiver=${res.data.updatedData.patient_mobile}&message=${sms}`
          //       )
          //       .then((res) => { });
          //   } catch (error) {
          //     console.log("err", error);
          //   }
          // }
        });
    } else if (args.requestType == "eventRemove") {
      const id = args.deletedRecords[0].Id;

      axios
        .post(`/delete-scheduler/${id}`)
        .then((res) => console.log("Data", res.data));
    }
  }

  onExportClick() {
    this.scheduleObj.exportToExcel();
  }

  onPopupOpen(args) {
    if (args.type === "QuickInfo") {
      if (args.data.Id == null) {
        args.element.getElementsByClassName(
          "e-subject e-field e-input"
        )[0].placeholder = "Add New Patient Name";

        let dialogObj = document.querySelector(".e-quick-popup-wrapper")
          .ej2_instances[0];
        // Fetching the fotter element of the editor window
        let footer = dialogObj.element.querySelector(".e-popup-footer");
        // Creting the button element
        let btnElement = createElement("BUTTON", {
          innerHTML: "Existing Patient",
        });
        // Creting the button object
        let buttonObj = new Button();
        // Appeding the button object to the button element
        buttonObj.appendTo(btnElement);
        // Appendig the creted button to the footer of the editor window.
        footer.appendChild(btnElement);
        // Binding the evnet to the custom button element
        buttonObj.element.onclick = () => {
          this.setState({ showModal: true });
          args.element.ej2_instances[0].close();
        };
      } else {
        if (args.data.patientID !== null) {
          var date = new Date(args.data.StartTime);

          var appDate =
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear();

          // var time = date.getHours() + ":"
          //           + date.getMinutes()

          var hours = date.getHours();
          var minutes = date.getMinutes();

          var ampm = hours >= 12 ? "pm" : "am";
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? "0" + minutes : minutes;
          var apptime = hours + ":" + minutes + " " + ampm;

          this.setState({
            appointmentDay: appDate,
            appointmentTime: apptime,
          });

          axios.get(`/doctor-search-id/${args.data.DoctorID}`).then((res) => {
            this.setState({
              printDoctorData: res.data,
            });
          });

          axios
            .get(`/patient-search-by-id/${args.data.patientID}`)
            .then((res) => {
              var currentYear = new Date().getFullYear();
              var birthDate = new Date(res.data.patient_dob).getFullYear();
              var age = currentYear - birthDate;

              this.setState({
                patientValueForPrint: res.data,
                age: age,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

      const patientDetails = {
        doctors_id: args.data.DoctorID.toString(),
        IsAllDay: false,
        StartTime: args.data.StartTime,
        EndTime: args.data.EndTime,
        patient_mobile: args.data.Location,
      };
      this.setState({
        cellData: patientDetails,
      });
    }

    if (args.type === "Editor") {
      args.element.getElementsByClassName("e-title-text")[0].innerHTML =
        "Patient Information";
    }

    if (args.type === "DeleteAlert") {
      document.getElementById("QuickDialog_title").innerHTML =
        "Delete patient appointment";
      document.getElementById("QuickDialog_dialog-content").innerHTML =
        "Are you sure you want to delete this appointment";
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
      add_app_outside_of_schedule: false,
      searchResult: null,
      search: null,
      errorData: null,
    });
  }

  randomChange() {
    var a = document.getElementById("patient").value;

    if (a == "Mobile") {
      document.getElementsByName("output")[0].placeholder = "Mobile Number";
      document.getElementsByName("output")[0].type = "text";
      document.getElementsByName("output")[0].value = "";
    } else if (a == "HIN") {
      document.getElementsByName("output")[0].placeholder = "HI Number";
      document.getElementsByName("output")[0].type = "text";
      document.getElementsByName("output")[0].value = "";
    } else {
      document.getElementsByName("output")[0].type = "date";
      document.getElementsByName("output")[0].value = "";
    }
  }

  reactToPrintTrigger = () => {
    return (
      <span id="appointmentSlip" className="printSlip">
        <i class="fas fa-print"></i>Appointment Slip
      </span>
    );
  };

  customStyles = {
    content: {
      height: "450px",
    },
  };
  customStylesExitingPat = {
    content: {
      height: "73%",
    },
  };
  customStylesAppTypeModel = {
    content: {
      top: "27%",
      left: "10%",
      height: "26vh",
      width: "450px",
      zIndex: 10,
    },
  };

  PatientModelColse() {
    this.setState({ patient_regi_model_show: false });
  }

  handleImage = (e) => {
    e.persist();
    if (e.target.files[0].size < 2000048) {
      this.setState({ image: e.target.files[0] });
      this.setState({
        image_error: "",
      });
    } else {
      this.setState({
        image_error: "File size must be less than 2 mb !",
      });
    }
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].size < 2000048
    ) {
      this.setState({
        imageUrl: URL.createObjectURL(e.target.files[0]),
      });
      // setDoctors({ ...doctorsInput, doctorImageUrl: URL.createObjectURL(event.target.files[0]) });
    } else {
      this.setState({
        image_error: "File size must be less than 2 mb !",
      });
    }
  };

  handleSubmitForPatient(e) {
    e.preventDefault();

    const userDataPatientAdd = JSON.parse(localStorage.getItem("userData"));
    const formData = new FormData();
    formData.append("image", this.state.image);
    formData.append("age", this.state.age);
    formData.append("day", this.state.days);
    formData.append("month", this.state.months);
    // formData.append("patient_hn_number", this.patient_hn_number.current.value);
    formData.append(
      "patient_first_name",
      this.patient_first_name.current.value
    );
    formData.append(
      "patient_mobile_phone",
      this.patient_mobile_phone.current.value
    );
    formData.append("patient_email", this.patient_email.current.value);
    formData.append("patient_dob", this.state.patient_dob);
    formData.append(
      "ptn_blood_group_id",
      this.ptn_blood_group_id.current.value
    );
    formData.append(
      "patient_birth_sex_id",
      this.patient_birth_sex_id.current.value
    );
    formData.append("patient_address1", this.patient_address1.current.value);
    formData.append("patient_status", "1");
    formData.append("doctor_id", this.user?.user_id || 0);

    if (userDataPatientAdd?.user_type !== "Super_Admin") {
      formData.append("saas_branch_id", userDataPatientAdd?.branch_id);
      formData.append("saas_branch_id", userDataPatientAdd?.branch_name);
    } else {
      formData.append("saas_branch_id", this.saas_branch_id.current.value);
      formData.append(
        "saas_branch_name",
        this.state.orgBranch?.find(
          (b) => b?.id === Number(this.saas_branch_id.current.value)
        )?.name
      );
    }

    axios
      .post(`/save-patients`, formData)
      .then((res) => {
        this.scheduleObj.saveEvent({
          Description: this.state.patientEventData.Description,
          DoctorID: this.state.patientEventData.DoctorID,
          EndTime: this.state.patientEventData.EndTime,
          Id: this.state.patientEventData.Id,
          Location: res.data.patients.patient_mobile_phone,
          StartTime: this.state.patientEventData.StartTime,
          Subject: this.state.patientEventData?.Subject,
          appointCreated: this.state.patientEventData.appointCreated,
          patientID: res.data.patients.id,
          CategoryColor: "#8961ed",
        });

        Swal.fire("Patient Registration Succesfully", "Success..!", "success");
        this.setState({
          patient_regi_model_show: false,
        });

        this.setState({
          imageUrl: "",
        });
      })
      .catch((err) => {
        Swal.fire("Something is wrong", "Error..!", "error");
        console.log("wrong", err.message);
      });
  }
  // age calculation
  // age calculation
  calculateDateFromAge = (days = 0, months = 0, years = 0) => {
    const currentDate = new Date();

    // Subtract the provided values from the current date
    const calculatedDate = new Date(
      currentDate.getFullYear() - years,
      currentDate.getMonth() - months,
      currentDate.getDate() - days
    );

    // Check for invalid date
    if (isNaN(calculatedDate.getTime())) {
      return { error: "Invalid date input" };
    }

    return { date: calculatedDate };
  };
  calculateAgeFromDate = (inputDate) => {
    const givenDate = new Date(inputDate);
    const currentDate = new Date();

    // Check for invalid date input
    if (isNaN(givenDate.getTime())) {
      return { error: "Invalid date input" };
    }

    // Calculate differences
    let years = currentDate.getFullYear() - givenDate.getFullYear();
    let months = currentDate.getMonth() - givenDate.getMonth();
    let days = currentDate.getDate() - givenDate.getDate();

    // Adjust for negative values in months and days
    if (days < 0) {
      months -= 1;
      // Get the number of days in the previous month
      const previousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  };

  handleAge = (days, months, years) => {
    const { date, error } = this.calculateDateFromAge(days, months, years);
    if (!error) {
      this.setState({
        patient_dob: date,
        age: `${years || 0}`,
        days: days,
        months: months,
        years: years,
      });
    } else {
      console.error(error);
    }
  };
  handleDate = (inputDate) => {
    const { years, months, days, error } = this.calculateAgeFromDate(inputDate);
    if (!error) {
      this.handleAge(days, months, years);
    }
  };
  // age calculation

  closeImage = () => {
    this.setState({
      imageUrl: "",
    });
    document.getElementById("PatientImageUrl").value = "";
  };

  render() {
    console.log("doctor", this.state.DoctorSearchData);
    return (
      <>
        <ComponentToPrint
          patientVale={this.state.patientValueForPrint}
          patentAge={this.state.age}
          doctorData={this.state.printDoctorData}
          appointDay={this.state.appointmentDay}
          appointTime={this.state.appointmentTime}
          ref={(el) => (this.componentRef = el)}
        ></ComponentToPrint>
        <NewModal
          isOpen={this.state.patient_regi_model_show}
          onClose={() => this.setState({ patient_regi_model_show: false })}
          size="md"
        >
          <NewModal.Header
            onClose={() => this.setState({ patient_regi_model_show: false })}
          >
            <NewModal.Title>Patient Registration</NewModal.Title>
          </NewModal.Header>

          <form onSubmit={this.handleSubmitForPatient}>
            <NewModal.Body styles={{ minHeight: "400px" }}>
              <div className="ml-1 reg-form-appointment">
                <div className=" row p-1 m-1 mt-3">
                  <div className="col-md-12 mt-3">
                    <div class="row mb-3">
                      <label for="app-reg-label" class="col-sm-2 app-reg-label">
                        Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <div class="col-sm-10">
                        <input
                          type="text"
                          ref={this.patient_first_name}
                          defaultValue={this.state.patientEventData?.Subject}
                          className="form-control form-control-sm"
                          style={{ border: "1px solid red" }}
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label
                        for="app-reg-label"
                        class="col-sm-2 app-reg-label "
                      >
                        Date Of Birth <span style={{ color: "red" }}>*</span>
                      </label>
                      <div class="col-sm-4">
                        <ReactDatePicker
                          dropdownMode="select"
                          selected={
                            this.state?.patient_dob
                              ? this.state?.patient_dob
                              : new Date()
                          }
                          onChange={(date) => {
                            this.handleDate(date);
                          }}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                      <label
                        for="app-reg-label"
                        class="col-sm-2 app-reg-label "
                      >
                        Email
                      </label>
                      <div class="col-sm-4">
                        <input
                          type="email"
                          name="patient_email"
                          ref={this.patient_email}
                          class="form-control form-control-sm"
                          placeholder="Enter Email"
                        />
                      </div>
                      <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label mt-2"
                      >
                        Age
                      </label>
                      <div className="col-sm-10 mt-3">
                        <div className="row">
                          <div className="col-sm-4 row">
                            <div className="col-3">Day</div>
                            <div className="col-9">
                              <input
                                type="number"
                                name="age"
                                max={200}
                                className="form-control form-control-sm"
                                placeholder="Enter Days"
                                value={this.state?.days}
                                onChange={(e) =>
                                  this.handleAge(
                                    e.target.value,
                                    this.state?.months || 0,
                                    this.state?.years || 0
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 row">
                            <div className="col-3">Month</div>
                            <div className="col-9">
                              <input
                                type="number"
                                name="age"
                                max={200}
                                className="form-control form-control-sm"
                                placeholder="Enter Month"
                                value={this.state?.months}
                                onChange={(e) =>
                                  this.handleAge(
                                    this.state?.days || 0,
                                    e.target.value,
                                    this.state?.years || 0
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 row">
                            <div className="col-3">Year</div>
                            <div className="col-9">
                              <input
                                type="number"
                                name="age"
                                max={200}
                                className="form-control form-control-sm"
                                placeholder="Enter Year"
                                value={this.state?.years}
                                onChange={(e) =>
                                  this.handleAge(
                                    this.state?.days || 0,
                                    this.state?.months || 0,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label
                        for="app-reg-label"
                        class="col-sm-2 app-reg-label "
                      >
                        Mobile No. <span style={{ color: "red" }}>*</span>
                      </label>
                      <div class="col-sm-4">
                        <input
                          type="text"
                          name="patient_mobile_phone"
                          ref={this.patient_mobile_phone}
                          class="form-control form-control-sm"
                          placeholder="Enter Mobile No."
                        />
                      </div>

                      <label
                        for="app-reg-label"
                        class="col-sm-2 app-reg-label "
                      >
                        Blood Group
                      </label>
                      <div class="col-sm-4">
                        <select
                          class="form-select form-select-sm"
                          ref={this.ptn_blood_group_id}
                          name="ptn_blood_group_id"
                          id="autoSizingSelect"
                        >
                          <option selected>Select Blood Group</option>

                          {this.state.patientBloodDropdown.map((i) => {
                            return (
                              <option value={i.id}>{i.blood_group_name}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label
                        for="app-reg-label"
                        class="col-sm-2 app-reg-label "
                      >
                        Gender <span style={{ color: "red" }}>*</span>
                      </label>
                      <div
                        class={`${
                          JSON.parse(localStorage.getItem("userData"))
                            ?.user_type === "Super_Admin"
                            ? "col-sm-4"
                            : "col-sm-10"
                        }`}
                      >
                        <select
                          class="form-select form-select-sm"
                          name="patient_birth_sex_id"
                          ref={this.patient_birth_sex_id}
                          id="autoSizingSelect"
                        >
                          <option selected>Select Gender</option>
                          {this.state.patientGenderDropdown.map((item) => {
                            return (
                              <>
                                <option value={item.id}>
                                  {item.birth_sex_name}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {JSON.parse(localStorage.getItem("userData"))
                        ?.user_type === "Super_Admin" ? (
                        <>
                          <label
                            for="app-reg-label"
                            class="col-sm-2 app-reg-label "
                          >
                            Branch <span style={{ color: "red" }}>*</span>
                          </label>
                          <div class="col-sm-4">
                            <select
                              class="form-select form-select-sm"
                              name="patient_birth_sex_id"
                              ref={this.saas_branch_id}
                              id="orgBranch"
                              required
                            >
                              <option selected value={""}>
                                Select branch
                              </option>
                              {this.state.orgBranch.map((item) => {
                                return (
                                  <>
                                    <option value={item.id}>{item.name}</option>
                                  </>
                                );
                              })}
                            </select>
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div class="row mb-2 P_Image">
                      <label
                        for="app-reg-label"
                        class="col-sm-2 app-reg-label "
                      >
                        Address{" "}
                      </label>
                      <div class="col-sm-4">
                        <textarea
                          name="patient_address1"
                          ref={this.patient_address1}
                          class="form-control form-control-sm"
                          rows="3"
                          placeholder="Enter Address"
                        />
                      </div>
                      <label
                        for="app-reg-label"
                        class="col-sm-2 app-reg-label "
                      >
                        Image
                      </label>
                      <div class="col-sm-4">
                        <input
                          className="form-control"
                          id="PatientImageUrl"
                          onChange={this.handleImage.bind(this)}
                          type="file"
                        />

                        {this.state.image_error == "" ? (
                          <p className="doc_image_size">
                            Image size must be less than 2 mb
                          </p>
                        ) : (
                          <p className="docimage_error">
                            {this.state.image_error}
                          </p>
                        )}
                      </div>
                      <div class="col-sm-4">
                        {this.state.imageUrl == "" ? (
                          ""
                        ) : (
                          <div className="docImage">
                            <img
                              src={this.state.imageUrl}
                              className="schedulePaitimage"
                              alt="preview img"
                            />
                            <i
                              onClick={this.closeImage.bind(this)}
                              class="far fa-times-circle"
                            ></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NewModal.Body>
            <NewModal.Footer className="d-flex justify-content-end">
              <button
                onClick={this.PatientModelColse}
                type="button"
                class="vaital-setup-btn-cancel float-end mr-2"
              >
                Cancel
              </button>
              <button type="submit" class="vaital-setup-btn float-end">
                Save
              </button>
            </NewModal.Footer>
          </form>
        </NewModal>
        <NewModal
          // style={this.customStylesExitingPat}
          isOpen={this.state.showModal}
          onClose={this.handleCloseModal}
          // appElement={document.getElementById("app")}
          // contentLabel="Example Modal"
        >
          <NewModal.Header onClose={this.handleCloseModal}>
            <NewModal.Title>Registered Patient List</NewModal.Title>
          </NewModal.Header>
          <NewModal.Body
            styles={{
              minHeight: "400px",
            }}
          >
            <div className="d-flex justify-content-center align-items-center">
              <div className="model_sub_heading">
                <label className="Label1">Chose an option</label>
                <select
                  name="patient"
                  id="patient"
                  onChange={this.randomChange}
                >
                  <option>Mobile</option>
                  <option selected>HN</option>
                  <option>DOB</option>
                </select>
                <input
                  id="output"
                  name="output"
                  type="text"
                  placeholder="Search here..."
                  value={this.state.search}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      this.searchHandeler(e);
                    }
                  }}
                  onChange={this.handleChange}
                />
                <button
                  className="customButton1 search"
                  onClick={this.searchHandeler}
                >
                  Search
                </button>
                <button
                  className="customButton1 clear"
                  onClick={this.clearHandle}
                >
                  Clear
                </button>
              </div>
            </div>

            {this.state.errorData !== null && (
              <h4 className="errorH4" style={{ textAlign: "center" }}>
                {this.state.errorData}
              </h4>
            )}

            {this.state.searchResult !== null && (
              <div>
                <h5 className="h5" style={{ textAlign: "center" }}>
                  Patient Information
                </h5>
                <table className="pTable">
                  <thead>
                    <tr className="tr1">
                      <th className="th1">Patient Name</th>
                      <th className="th1">HN no</th>
                      <th className="th1">Phone no</th>
                      <th className="th1">DOB</th>
                      <th className="th1">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.searchResult != null ? (
                      this.state.searchResult.map((item) => {
                        return (
                          <tr key={item.id} className="tr1">
                            <td className="td1">{item.fullName}</td>
                            <td className="td1">
                              {formateHN(item.patient_hn_number)}
                            </td>
                            <td className="td1">
                              {formatPhoneNumber(item.patient_mobile_phone)}
                            </td>
                            <td className="td1">
                              {moment(item.patient_dob).format("DD/MM/YYYY")}
                            </td>
                            <td className="td1">
                              <span
                                onClick={(e) => {
                                  this.setState({ app_type_model: true });
                                  this.setState({ patient_data: item });
                                  // this.addExistingPatient(e, item)
                                }}
                              >
                                <i class="fas fa-user-plus iconPatient"></i>
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </NewModal.Body>
          {/* </div> */}
        </NewModal>

        <NewModal
          // style={this.customStylesAppTypeModel}
          // className="appointment_type_modal"
          size="sm"
          isOpen={this.state.app_type_model}
          onClose={() => this.setState({ app_type_model: false })}
          // appElement={document.getElementById("app")}
          // contentLabel="Example Modal"
        >
          <NewModal.Header
            onClose={() => this.setState({ app_type_model: false })}
          >
            <NewModal.Title>Appointment Type</NewModal.Title>
          </NewModal.Header>

          <NewModal.Body>
            <div>
              {/* <div className="d-flex justify-content-between">
              <h6>Appointment Type</h6>
              <div onClick={() => this.setState({ app_type_model: false })}>
                <i className="fas fa-times"></i>
              </div>
            </div>
            <div className="Line"></div> */}

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div class="form-check ">
                    <input
                      value="Telehealth"
                      onChange={(e) =>
                        this.setState({ app_type: e.target.value })
                      }
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label>Telehealth</label>
                  </div>
                  <div class="form-check" style={{ marginLeft: "20px" }}>
                    <input
                      class="form-check-input"
                      value="Chamber"
                      onChange={(e) =>
                        this.setState({ app_type: e.target.value })
                      }
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      defaultChecked
                    />
                    <label>Chamber</label>
                  </div>
                  {this.state.add_app_outside_of_schedule && (
                    <div style={{ width: "40%", marginLeft: "6px" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimeField
                          onChange={(v) => this.setState({ start_time: v.$d })}
                          label="Start Time"
                          size="small"
                        />
                      </LocalizationProvider>
                    </div>
                  )}
                </div>
                {this.state.add_app_outside_of_schedule ? (
                  <button
                    onClick={() => this.addExistingPatient()}
                    className="app_btn"
                    style={{ width: "30%" }}
                  >
                    <i
                      style={{ marginRight: "6px", fontSize: "14px" }}
                      class="fas fa-user-plus"
                    ></i>
                    Save App.
                  </button>
                ) : (
                  <button
                    onClick={() => this.addExistingPatient()}
                    className="app_btn"
                  >
                    <i
                      style={{ marginRight: "6px", fontSize: "14px" }}
                      class="fas fa-user-plus"
                    ></i>
                    Add App.
                  </button>
                )}
              </div>
            </div>
          </NewModal.Body>
        </NewModal>

        <div className="appointmentShedule ms-2">
          <div
            className={`sheduleHeader custom-card mt-2 mb-2 ${
              JSON.parse(localStorage.getItem("userData")).user_type !==
              "Doctor"
                ? ""
                : `d-flex justify-content-end`
            }`}
          >
            {JSON.parse(localStorage.getItem("userData")).user_type !==
              "Doctor" && (
              <div className="doctorSearch">
                <div className="docNameSearch">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={this.state.DoctorSearchData}
                    getOptionLabel={(option) => option?.fullName}
                    onChange={(e, newValue) => {
                      if (newValue !== null) {
                        axios
                          .get(
                            `/doctor-search-by-name/${newValue?.dr_given_name}`
                          )
                          .then((res) => {
                            this.setState({
                              DoctorSearchData: res.data,
                            });
                          })
                          .catch((err) => {
                            swal("Warning!", "Data not found", "warning");
                          });
                      } else {
                        axios.get("/all-doctors-booking").then((res) => {
                          this.setState({ DoctorSearchData: res.data.doctors });
                        });
                      }
                    }}
                    sx={{ width: 200 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Doctors" />
                    )}
                  />
                </div>
                <div className="deptSearch">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={this.state.doctorDepartment}
                    getOptionLabel={(option) => option.departments_name}
                    onChange={(e, newValue) => {
                      if (newValue !== null) {
                        axios
                          .get(`/doctor-search/${newValue.id}`)
                          .then((res) => {
                            this.setState({
                              DoctorSearchDataForDepartment: res.data,
                            });
                          })
                          .catch((err) => {
                            swal("Warning!", "Data not found", "warning");
                          });
                      } else {
                        this.setState({
                          DoctorSearchDataForDepartment: false,
                        });
                      }
                    }}
                    sx={{ width: 200 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Department" />
                    )}
                  />
                </div>
                <div>
                  {this.state.DoctorSearchDataForDepartment == false ? (
                    <></>
                  ) : (
                    <>
                      {
                        <Autocomplete
                          multiple
                          id="checkboxes-tags-demo"
                          size="small"
                          options={this.state.DoctorSearchDataForDepartment}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option?.dr_given_name}
                          onChange={(e, value) => {
                            if (value.length > 0) {
                              this.setState({
                                DoctorSearchData: value,
                              });
                            } else {
                              axios.get("/all-doctors-booking").then((res) => {
                                this.setState({
                                  DoctorSearchData: res.data.doctors,
                                });
                              });
                            }
                          }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option?.dr_given_name}
                            </li>
                          )}
                          style={{ width: 200 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Selected Doctors"
                              placeholder="Doctors"
                            />
                          )}
                        />
                      }
                    </>
                  )}
                </div>
              </div>
            )}
            {/* {
              JSON.parse(localStorage.getItem('userData')).user_type !== 'Doctor'
              && <div className='doctorSearch'>
                <div className='docNameSearch'>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={this.state.DoctorSearchData}
                    getOptionLabel={(option) => option?.dr_given_name}
                    onChange={(e, newValue) => {
                      if (newValue !== null) {
                        axios.get(`/doctor-search-by-name/${newValue?.dr_given_name}`).then(res => {

                          this.setState({
                            DoctorSearchData: res.data
                          })

                        }).catch(err => {
                          swal("Warning!", "Data not found", "warning");
                        })
                      } else {
                        axios.get('/all-doctors-booking').then(res => {
                          this.setState({ DoctorSearchData: res.data.doctors })

                        })
                      }


                    }}

                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Doctors" />}
                  />
                </div>
                <div className='deptSearch'>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={this.state.doctorDepartment}
                    getOptionLabel={(option) => option.departments_name}
                    onChange={(e, newValue) => {
                      if (newValue !== null) {
                        axios.get(`/doctor-search/${newValue.id}`).then(res => {
                          this.setState({
                            DoctorSearchDataForDepartment: res.data
                          })
                        }).catch(err => {
                          swal("Warning!", "Data not found", "warning");
                        })
                      } else {
                        this.setState({
                          DoctorSearchDataForDepartment: false
                        })
                      }
                    }}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Department" />}
                  />
                </div>
                <div>

                  {
                    this.state.DoctorSearchDataForDepartment == false ?
                      <></> :
                      <>

                        {

                          <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            size="small"
                            options={this.state.DoctorSearchDataForDepartment}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option?.dr_given_name}
                            onChange={(e, value) => {
                              if (value.length > 0) {
                                this.setState({
                                  DoctorSearchData: value
                                })
                              } else {
                                axios.get('/all-doctors-booking').then(res => {
                                  this.setState({ DoctorSearchData: res.data.doctors })

                                })
                              }

                            }}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={selected}
                                />
                                {option?.dr_given_name}
                              </li>
                            )}
                            style={{ width: 200 }}
                            renderInput={(params) => (
                              <TextField {...params} label="Selected Doctors" placeholder="Doctors" />
                            )}
                          />
                        }
                      </>
                  }

                </div>
              </div>
            } */}

            <>
              <ReactToPrint
                trigger={this.reactToPrintTrigger}
                content={() => this.componentRef}
              />

              <i
                class="fa-solid fa-user-plus"
                onClick={() =>
                  this.setState({
                    showModal: true,
                    add_app_outside_of_schedule: true,
                  })
                }
                style={{
                  marginLeft: "13px",
                  marginTop: "-6px",
                  cursor: "pointer",
                }}
              ></i>
            </>
          </div>
          {this.state.DoctorSearchData === "" ? (
            <div className="schedule-control-section">
              <div className="col-lg-12 control-section">
                <div className="control-wrapper">
                  <ScheduleComponent
                    eventRendered={this.onEventRendered.bind(this)}
                    ref={(t) => (this.scheduleObj = t)}
                    allowResizing={true}
                    timeScale={{ enable: true, interval: 60, slotCount: 6 }}
                    currentView="Day"
                    categorizeSettings-enable={true}
                    minDate={new Date(2020, 12, 12)}
                    // cssClass='group-bychild'
                    width="100%"
                    height="650px"
                    selectedDate={new Date().toLocaleDateString()}
                    eventSettings={{
                      dataSource: this.data,
                      enableTooltip: true,
                      fields: {
                        id: "Id",
                        subject: {
                          name: "Subject",
                          title: "Patient Name",
                          validation: { required: true },
                        },
                        location: {
                          name: "Location",
                          title: "Mobile No",
                          validation: { required: true },
                        },
                        description: { name: "Description", title: "Notes" },
                        startTime: {
                          name: "StartTime",
                          title: "Start Duration",
                          validation: { required: true },
                        },
                        endTime: {
                          name: "EndTime",
                          title: "End Duration",
                          validation: { required: true },
                        },
                      },
                    }}
                    group={{ byGroupID: false, resources: ["Doctors"] }}
                    actionBegin={this.onActionBegin.bind(this)}
                    rowAutoHeight={true}
                    popupOpen={this.onPopupOpen.bind(this)}
                  >
                    <ResourcesDirective>
                      <ResourceDirective
                        field="DoctorID"
                        title="Select Doctors"
                        name="Doctors"
                        allowMultiple={true}
                        dataSource={this.state.DoctorSearchData}
                        textField="fullName"
                        idField="id"
                      ></ResourceDirective>
                    </ResourcesDirective>
                    <ViewsDirective>
                      <ViewDirective
                        option="Day"
                        startHour="00:00"
                        endHour="24:00"
                        timeScale={{ enable: true, slotCount: 6 }}
                      />
                      <ViewDirective
                        option="Week"
                        startHour="00:00"
                        endHour="24:00"
                      />
                      <ViewDirective
                        option="WorkWeek"
                        workDays={[7, 0, 1, 2, 3, 4]}
                        startHour="00:00"
                        endHour="24:00"
                      />
                      <ViewDirective
                        option="Month"
                        startHour="00:00"
                        endHour="24:00"
                      />
                    </ViewsDirective>
                    <Inject
                      services={[
                        Day,
                        Week,
                        WorkWeek,
                        Month,
                        Agenda,
                        Resize,
                        DragAndDrop,
                        ExcelExport,
                      ]}
                    />
                  </ScheduleComponent>
                </div>
                <ContextMenuComponent
                  cssClass="schedule-context-menu"
                  ref={(menu) => (this.menuObj = menu)}
                  target=".e-schedule"
                  beforeOpen={this.onContextMenuBeforeOpen.bind(this)}
                  items={this.menuItems}
                  select={this.onMenuItemSelect.bind(this)}
                />
                {/* <ContextMenuComponent
                 target='.e-schedule' items={this.menuItems}
                 select={this.onMenuItemSelect.bind(this)}
                 /> */}
                {/* <ContextMenuComponent
                 target= '.e-table-container' items={this.menuItems}
                 select={this.onMenuItemSelect.bind(this)}
                 /> */}
                <div className="legendField custom-card">
                  <div className="legendLevel">
                    <span className="e-menu-icon fas fa-circle arrived"></span>
                    Arrived
                  </div>
                  <div className="legendLevel">
                    <span className="e-menu-icon fas fa-circle unavilable"></span>
                    Unavailable
                  </div>
                  <div className="legendLevel">
                    <span className="e-menu-icon fas fa-circle waiting"></span>
                    Waiting
                  </div>
                  <div className="legendLevel">
                    <span className="e-menu-icon fas fa-circle withdoctors"></span>
                    With Doctors
                  </div>
                  <div className="legendLevel">
                    <span className="e-menu-icon fas fa-circle attbilling"></span>
                    At billing
                  </div>
                  <div className="legendLevel">
                    <span className="e-menu-icon fas fa-circle notattend"></span>
                    Did not attend
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="schedule-control-section">
              <div className="control-section">
                <div className="control-wrapper">
                  <ScheduleComponent
                    eventRendered={this.onEventRendered.bind(this)}
                    ref={(t) => (this.scheduleObj = t)}
                    allowResizing={true}
                    currentView="Day"
                    categorizeSettings-enable={true}
                    minDate={new Date(2020, 12, 12)}
                    cssClass="group-bychild"
                    width="100%"
                    height="650px"
                    selectedDate={new Date().toLocaleDateString()}
                    eventSettings={{
                      dataSource: this.data,
                      enableTooltip: true,
                      fields: {
                        id: "Id",
                        subject: {
                          name: "Subject",
                          title: "Patient Name",
                          validation: { required: true },
                        },
                        location: {
                          name: "Location",
                          title: "Mobile No",
                          validation: { required: true },
                        },
                        description: { name: "Description", title: "Notes" },
                        startTime: {
                          name: "StartTime",
                          title: "Start Duration",
                          validation: { required: true },
                        },
                        endTime: {
                          name: "EndTime",
                          title: "End Duration",
                          validation: { required: true },
                        },
                      },
                    }}
                    group={{ byGroupID: false, resources: ["Doctors"] }}
                    actionBegin={this.onActionBegin.bind(this)}
                    rowAutoHeight={true}
                    popupOpen={this.onPopupOpen.bind(this)}
                  >
                    <ResourcesDirective>
                      <ResourceDirective
                        field="DoctorID"
                        title="Select Doctors"
                        name="Doctors"
                        allowMultiple={true}
                        dataSource={this.state.DoctorSearchData}
                        textField="fullName"
                        idField="id"
                      ></ResourceDirective>
                    </ResourcesDirective>
                    <ViewsDirective>
                      <ViewDirective
                        option="Day"
                        startHour="08:00"
                        endHour="24:00"
                        timeScale={{ enable: true, slotCount: 6 }}
                      />
                      <ViewDirective
                        option="Week"
                        startHour="00:0"
                        endHour="24:00"
                      />
                      <ViewDirective
                        option="WorkWeek"
                        workDays={[7, 0, 1, 2, 3, 4]}
                        startHour="00:00"
                        endHour="24:00"
                      />
                      <ViewDirective
                        option="Month"
                        startHour="00:00"
                        endHour="24:00"
                      />
                    </ViewsDirective>
                    <Inject
                      services={[
                        Day,
                        Week,
                        WorkWeek,
                        Month,
                        Agenda,
                        ExcelExport,
                        Resize,
                        DragAndDrop,
                        ExcelExport,
                      ]}
                    />
                  </ScheduleComponent>
                </div>
                <ContextMenuComponent
                  cssClass="schedule-context-menu"
                  ref={(menu) => (this.menuObj = menu)}
                  target=".e-schedule"
                  beforeOpen={this.onContextMenuBeforeOpen.bind(this)}
                  items={this.menuItems}
                  select={this.onMenuItemSelect.bind(this)}
                />
                {/* <ContextMenuComponent
                 target='.e-table-container' items={this.menuItems}
                 select={this.onMenuItemSelect.bind(this)}
                 /> */}
                {/* <ContextMenuComponent
                select={this.onMenuItemSelect.bind(this)}
               target= '.e-work-cells' items={this.menuItems}/> */}

                <ShowForSmallDevicesAppointmentStatus />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
