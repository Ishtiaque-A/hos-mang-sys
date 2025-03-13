const Input = ({
  type = "text",
  name = "",
  value = "",
  onChange = () => {},
  onKeyPress = () => {},
  onKeyDown = () => {},
  onKeyUp = () => {},
  onBlur = () => {},
  onFocus = () => {},

  placeholder = "",
  className = "",
  style = {},
  id = "input",
  width = "100%",
  isInvalid = false,
  isValid = null,
  required = false,
  ...props
}) => {
  return (
    <input
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={onBlur}
      required={required}
      onFocus={onFocus}
      type={type}
      name={name}
      id={id}
      value={value}
      {...props}
      onChange={onChange}
      placeholder={placeholder}
      className={`form-control ${className}`}
      style={{
        width: width,
        padding: "0.25rem 0.75rem",
        fontSize: "14px",
        lineHeight: "1.5",
        borderRadius: "0.25rem",
        // marginBottom: "0.5rem",
        border: "1px solid #ced4da",
        ...props.style,
        ...style,
      }}
    />
  );
};
export default Input;
