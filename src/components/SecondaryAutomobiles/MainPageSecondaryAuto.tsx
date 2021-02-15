import React, { useState, ChangeEvent, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Services,
  FormState,
  UserContext,
  AnalysisElements,
} from "../../api/Services";
import {
  FormControl,
  Select,
  InputLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import { ElementsSecondaryAuto } from "./ElementsSecondaryAuto";
import { AppContext, history } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { changeCity } from "../../store/Actions";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    inputStyle: {
      height: 50,
      boxSizing: "border-box",
    },
    period: {
      margin: "0 15px",
    },
    periodInput: {
      height: "50px",
      width: "280px",
    },
  })
);
export const MainPageSecondaryAuto = (props: any) => {
  const { match: _match }: { match: any } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);

  const [uploadResult, setUploadResult] = useState("");
  const [username, setUsername] = useState(new UserContext());
  const [helperAlert, setHelperAlert] = useState(false);
  const [validYear, setValidYear] = useState(10);
  var services = new Services();

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("userContext") || "{}"));
  }, []);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const obj = { hello: "world" };
    const blob1 = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });
    var file = e.target.files;
    var formData = new FormData();
    formData.append("body", file?.[0] || blob1);
    if (!!file) {
      services
        .postExcelSecondaryAuto(formData, username.user?.fullName || "")
        .then((json) => {
          setUploadResult(json);
          setHelperAlert(!helperAlert);
        });
    }
  };
  useEffect(() => {
    if (uploadResult === "Ok") {
      alert("Файл загружен");
    } else if (uploadResult.includes("Пустое"))
      alert(`Ошибка! ${uploadResult}`);
    else if (uploadResult.includes("формат")) alert(`Ошибка! ${uploadResult}`);
    else if (uploadResult === "Error") alert("Ошибка в формате данных!");
  }, [helperAlert]);

  const onDeleteCity = () => {
    var con = window.confirm("Вы действительно хотите удалить?");
    if (con) {
      services.deleteCity(city, username.user?.fullName || "").then(() => {
        // setAnalysis(analysis.filter((m) => m.id !== id));
      });
      window.location.reload();
    }
  };
  return (
    <React.Fragment>
      <h2 style={{ textAlign: "center" }}>
        Заполнение и корректировка справочника для Вторичного Автотранспорта
      </h2>
      <TextField
        required
        variant="outlined"
        label="Срок валидности"
        value={validYear || ""}
        className={classes.period}
        InputProps={{
          className: classes.periodInput,
        }}
        onChange={(e: any) => setValidYear(e.target.value)}
      />
      <button
        className="pxbutton"
        onClick={() => {
          history.push(`/secondaryAuto/create`);
        }}
        style={{
          marginTop: 0,
        }}
      >
        Добавить данные
      </button>
      <button
        className="pxbutton"
        style={{
          position: "relative",
          float: "right",
          margin: "0 16px 0 0",
        }}
        onClick={() => {}}
      >
        <input
          type="file"
          id="input"
          style={{
            opacity: 0,
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: "100%",
          }}
          onChange={(e) => onFileChange(e)}
        />
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <PublishIcon />
          </Grid>
          <Grid item style={{ marginLeft: 8 }}>
            Загрузить файл
          </Grid>
        </Grid>
      </button>
      <ElementsSecondaryAuto validYear={validYear} formState={FormState.READ} />
      <Grid container className={classes.paper}>
        <Grid item xs={2}>
          {/* <div style={{ textAlign: "left" }}>
            <button
              className="pxbutton"
              onClick={() => {
                onDeleteCity();
              }}
            >
              Удалить все по авто
            </button>
          </div> */}
        </Grid>
        <Grid item xs={8}>
          <div style={{ textAlign: "center" }}>
            <button
              className="pxbutton"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
