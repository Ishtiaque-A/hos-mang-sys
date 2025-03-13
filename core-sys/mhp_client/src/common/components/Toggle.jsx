const Toggle = ({ value, onChange, id, disabled = false, ...props }) => {
  return (
    <div
      style={{
        backgroundColor: value && !disabled ? "#69b1283b" : "#d5d5d5",
        borderRadius: "20px",
        padding: "5px",
        width: "40px",
        height: "20px",
        position: "relative",
        border: "2px solid",
        cursor: disabled ? "not-allowed" : "pointer",
        borderColor: value && !disabled ? "#69B128" : "grey",
        transition: "all 0.3s ease",
        display: "inline-block",
        boxShadow: "0 0 0 1px #808080ab",
      }}
      id={id ? id : ""}
      {...props}
      onClick={() => onChange(!value)}
    >
      <input
        type="checkbox"
        value={value}
        disabled={disabled}
        id={id ? id : ""}
        onChange={() => onChange(!value)}
        style={{ display: "none" }}
      />
      <span
        style={{
          position: "absolute",
          height: "15px",
          width: "17px",
          backgroundColor: value && !disabled ? "#69B128" : "#fff",
          borderRadius: "50%",
          top: "50%",
          transform: "translateY(-50%)",
          left: value ? "50%" : "3px",
          right: value ? "3px" : "48%",
          transition: "all 0.3s ease",
        }}
      ></span>
    </div>
  );
};

export default Toggle;
