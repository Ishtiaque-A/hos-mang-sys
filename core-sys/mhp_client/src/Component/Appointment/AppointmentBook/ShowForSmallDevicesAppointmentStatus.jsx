import useResizeObserver from "../../../hooks/useResizeObserver";

export const ShowForSmallDevicesAppointmentStatus = () => {
  const { width } = useResizeObserver();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${width > 900 ? 10 : 5}, 1fr)`,
        gap: "3px",
        padding: "15px",
        backgroundColor: "#fff",
        margin: "10px 0px",
        borderRadius: "10px",
      }}
    >
      <div className="legendLevel">
        <span className="e-menu-icon fas fa-circle online_patients"></span>
        Tel. Patient
      </div>
      <div className="legendLevel">
        <span className="e-menu-icon fas fa-circle RPatient"></span>
        Reg. Patient
      </div>
      <div className="legendLevel">
        <span className="e-menu-icon fas fa-circle NonRegister"></span>
        Non Reg. Patient
      </div>
      <div className="legendLevel">
        <span className="e-menu-icon fas fa-circle arrived"></span>
        Arrived
      </div>
      <div className="legendLevel">
        <span className="e-menu-icon fas fa-circle unavilable"></span>
        Unavilable
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
      <div className="legendLevel">
        <span className="e-menu-icon fas fa-circle appcompleted"></span>
        Completed
      </div>
    </div>
  );
};
