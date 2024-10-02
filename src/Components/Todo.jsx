import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useTodos } from "../Context/todoContext";
import { useAlert } from "../Context/AlertContext";
import { useTranslation } from "react-i18next";

export default function Todo({ todo, handleDeleteShow, handleEditShow }) {
  const { showAlert } = useAlert();
  const { dispatch } = useTodos();
  const { t, i18n } = useTranslation();

  function handleSwitchStatus() {
    dispatch({
      type: "switchState",
      payload: { todo, showAlert, t },
    });

    todo.isComplete
      ? showAlert(t("alert_task_status_changed_to_non_complete"))
      : showAlert(t("alert_task_status_changed_to_complete"));
  }

  return (
    <Card
      className="to-do"
      sx={{
        backgroundColor: "#283593",
        textDecoration: todo.isComplete ? "line-through" : "none",
        color: "white",
        marginTop: "20px",
      }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography
              variant="h5"
              style={{
                textAlign: i18n.language === "ar" ? "right" : "left",
              }}>
              {todo.title}
            </Typography>
            <Typography
              variant="h6"
              style={{
                textAlign: i18n.language === "ar" ? "right" : "left",
                fontSize: "14px",
                whiteSpace: "pre-wrap",
              }}>
              {todo.body}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"5px"}>
            <IconButton
              onClick={handleSwitchStatus}
              className="iconButton"
              size="small"
              style={{
                outline: "none",
                backgroundColor: todo.isComplete ? "#8bc34a" : "white",
                color: todo.isComplete ? "white" : "#8bc34a",
                border: "3px solid #8bc34a",
              }}>
              <CheckOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => handleEditShow(todo)}
              className="iconButton"
              size="small"
              style={{
                outline: "none",
                backgroundColor: "white",
                color: "#1769aa",
                border: "3px solid #1769aa",
              }}>
              <ModeEditOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeleteShow(todo);
              }}
              className="iconButton"
              size="small"
              style={{
                outline: "none",
                backgroundColor: "white",
                color: "#b23c17",
                border: "3px solid #b23c17",
              }}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
