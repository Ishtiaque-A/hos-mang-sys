import { useRef } from "react";
import { Modal as ReactModal } from "react-responsive-modal";
import { RxCross2 } from "react-icons/rx";
export const Modal = ({
  children,
  isOpen,
  onClose,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  center = true,
  width = "800px",
}) => {
  const modalRef = useRef(null);
  return (
    <ReactModal
      open={isOpen}
      onClose={() => onClose()}
      blockScroll
      closeOnEsc={closeOnEsc}
      closeOnOverlayClick={closeOnOverlayClick}
      center={center}
      showCloseIcon={false}
      container={modalRef.current}
      styles={{
        modal: {
          width: `${width} !important`,
          borderRadius: "10px",
          overflow: "hidden",
          padding: "0px",
        },
      }}
    >
      {children}
    </ReactModal>
  );
};
const Body = ({ children, className = "", styles = {} }) => {
  return (
    <div
      style={{
        padding: "20px 15px",
        maxHeight: "calc(100vh - 220px)",
        overflowY: "auto",
        overflowX: "hidden",
        width: "100%",
        ...styles,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
const Footer = ({ children, className = "", styles = {} }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        gap: "15px",
        alignItems: "center",
        padding: "10px 15px",
        borderTop: "1px solid #C3C3C3",
        ...styles,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
const Header = ({
  children,
  onClose,
  isShowCloseIcon = true,
  className = "",
  styles = {},
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        borderBottom: "1px solid #C3C3C3",
        ...styles,
      }}
      className={className}
    >
      {children}
      {isShowCloseIcon && (
        <span
          style={{
            cursor: "pointer",
          }}
        >
          <RxCross2 size={20} onClick={() => onClose()} />
        </span>
      )}
    </div>
  );
};
const Title = ({ children, className = "", styles = {} }) => {
  return (
    <h2
      style={{
        fontSize: "18px",
        fontWeight: "500",
        margin: "0",
        padding: "0",
        ...styles,
      }}
      className={className}
    >
      {children}
    </h2>
  );
};
Modal.Title = Title;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
