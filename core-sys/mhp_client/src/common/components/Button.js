import React from "react";
import "./button.css";

const Button = ({
  isLoading = false,
  type = "submit",
  children,
  onClick,
  onDoubleClick,
  className,
  style,
  isDisabled = false,
  variant = "primary",
  ...props
}) => {
  let colorVariant = {
    primary: {
      backgroundColor: "#69B128",
      color: "#fff",
    },
    danger: {
      backgroundColor: "red",
      color: "#fff",
    },
  };

  return (
    <button
      style={{
        padding: "5px 17px",
        margin: "5px 0",
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: "400",
        borderRadius: "7px",
        border: 0,
        outline: 0,

        ...colorVariant[variant],
        ...style,
      }}
      disabled={isDisabled || isLoading}
      className={`core-button-class ${className}`}
      type={type}
      {...props}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {isLoading ? (
        <>
          {children}
          <Loading color={colorVariant.color} />
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

export const Loading = ({ color }) => {
  return (
    <div
      class="spinner-border"
      style={{
        color: color || "#69B128",
        width: "12px",
        height: "12px",
        marginLeft: "5px",
        borderWidth: "2px",
      }}
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  );
};
