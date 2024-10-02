import { Alert, Slide, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

const AlertContext = createContext("");

export default function AlertProvider({ children }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const { t } = useTranslation();

  function showAlert(msg, severity = "success") {
    setAlertSeverity(severity);
    setAlertMsg(msg);
    setOpenAlert(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  return (
    <AlertContext.Provider
      value={{
        showAlert,
      }}>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity={alertSeverity} variant="filled">
          {alertMsg}
        </Alert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
