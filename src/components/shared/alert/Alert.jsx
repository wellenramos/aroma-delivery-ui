import React, {useEffect} from "react";
import PropTypes from "prop-types";
import "./alert.css";

const Alert = ({message, type = "info", duration = 3000, onClose}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const alertClasses = `alert alert-${type}`;

  return <div className={alertClasses}>{message}</div>;
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Alert;
