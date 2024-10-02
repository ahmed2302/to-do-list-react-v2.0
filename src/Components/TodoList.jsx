import {
  Divider,
  Card,
  CardContent,
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Todo from "./Todo";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "../Context/AlertContext";
import { useTodos } from "../Context/todoContext";

export default function TodoList() {
  const [todoInput, setTodoInput] = useState({ title: "", body: "" });
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [alignment, setAlignment] = useState("all");
  const [todo, setTodo] = useState("");
  const { t, i18n } = useTranslation();
  const { showAlert } = useAlert();
  const { todos, dispatch } = useTodos();

  function handleAlignment(event, newAlignment) {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  }

  function handleLanguageToggle() {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
    showAlert(t("alert_switch_Lang"));
  }

  function handleAddTodo() {
    if (todoInput.title !== "") {
      dispatch({
        type: "addTodo",
        payload: { todoInput },
      });
      setTodoInput({ body: "", title: "" });
      showAlert(t("alert_task_added"));
    } else {
      showAlert(t("alert_task_empty"), "warning");
    }
  }

  function handleDelete() {
    setOpenDelete(false);
    dispatch({
      type: "deleteTodo",
      payload: { todo },
    });
    showAlert(t("alert_task_deleted"));
  }

  function handleEdit() {
    setOpenEdit(false);
    dispatch({
      type: "editTodo",
      payload: { todo },
    });
    showAlert(t("alert_task_edited"));
  }

  function handleDeleteDailogShow(todo) {
    setOpenDelete(true);
    setTodo(todo);
  }

  function handleEditDailogShow(todo) {
    setOpenEdit(true);
    setTodo(todo);
  }

  const targetList = useMemo(() => {
    if (alignment === "non-completed") {
      return todos.filter((todo) => !todo.isComplete);
    } else if (alignment === "completed") {
      return todos.filter((todo) => todo.isComplete);
    } else {
      return todos;
    }
  }, [todos, alignment]);

  const showList = targetList
    .slice()
    .reverse()
    .map((todo) => (
      <Todo
        key={todo.id}
        todo={todo}
        handleDeleteShow={handleDeleteDailogShow}
        handleEditShow={handleEditDailogShow}
      />
    ));

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      {/* ======================Edit Modal================= */}
      <Dialog
        style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}>
        <DialogTitle>{t("edit_task")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("please_enter_title_details")}
          </DialogContentText>
          <TextField
            margin="dense"
            autoFocus
            label={t("task_title")}
            fullWidth
            variant="standard"
            value={todo.title}
            onChange={(e) => {
              setTodo((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
          <TextField
            margin="dense"
            label={t("task_body")}
            fullWidth
            variant="standard"
            multiline
            value={todo.body}
            onChange={(e) => {
              setTodo((prev) => ({
                ...prev,
                body: e.target.value,
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ outline: "none" }}
            onClick={() => {
              setOpenEdit(false);
            }}>
            {t("cancel")}
          </Button>
          <Button style={{ outline: "none" }} onClick={handleEdit}>
            {t("edit")}
          </Button>
        </DialogActions>
      </Dialog>
      {/* ======================Edit Modal================= */}

      {/* ======================Delete Modal================= */}
      <Dialog
        style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
        }}>
        <DialogTitle>{t("delete_task_confirmation")}</DialogTitle>{" "}
        <DialogContent>
          <DialogContentText>{t("cannot_undo_delete")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ outline: "none" }}
            onClick={() => {
              setOpenDelete(false);
            }}>
            {t("close")}
          </Button>
          <Button style={{ outline: "none" }} onClick={handleDelete} autoFocus>
            {t("yes_delete")}
          </Button>
        </DialogActions>
      </Dialog>
      {/* ======================Delete Modal================= */}

      <Container>
        <Card
          className="to-do-list"
          sx={{
            maxHeight: "90vh",
            overflow: "auto",
            scrollbarWidth: "none",
            position: "relative",
          }}>
          <CardContent>
            <Typography
              color="primary"
              variant="h2"
              style={{ fontWeight: "bold" }}>
              {t("my_tasks")}
            </Typography>
            <Button
              onClick={handleLanguageToggle}
              style={{
                position: "absolute",
                left: i18n.language === "ar" ? "10px" : "auto",
                right: i18n.language === "ar" ? "auto" : "10px",
                top: "10px",
              }}>
              {i18n.language === "ar"
                ? "Switch to English"
                : "تبديل إلى العربية"}
            </Button>
            <Divider />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleAlignment}
              style={{
                marginTop: "30px",
              }}>
              <ToggleButton
                value="all"
                style={{
                  outline: "none",
                }}>
                {t("all")}
              </ToggleButton>
              <ToggleButton
                value="completed"
                style={{
                  outline: "none",
                }}>
                {t("completed")}
              </ToggleButton>
              <ToggleButton
                value="non-completed"
                style={{
                  outline: "none",
                }}>
                {t("non_completed")}
              </ToggleButton>
            </ToggleButtonGroup>
            {showList}
          </CardContent>
          <Grid container spacing={0}>
            <Grid item xs={8} style={{ margin: "10px 0", padding: "0 15px" }}>
              <TextField
                value={todoInput.title}
                required
                onChange={(e) =>
                  setTodoInput((prev) => ({ ...prev, title: e.target.value }))
                }
                style={{ width: "100%" }}
                id="outlined-basic"
                label={t("task_title")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4} style={{ margin: "10px 0", padding: "0 15px" }}>
              <Button
                onClick={handleAddTodo}
                style={{ width: "100%", height: "100%", outline: "none" }}
                variant="contained">
                {t("add_task")}
              </Button>
            </Grid>
            <Grid item xs={12} style={{ margin: "10px 0", padding: "0 15px" }}>
              <TextField
                multiline
                value={todoInput.body}
                onChange={(e) =>
                  setTodoInput((prev) => ({ ...prev, body: e.target.value }))
                }
                style={{ width: "100%" }}
                id="outlined-basic"
                label={t("task_body")}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}
