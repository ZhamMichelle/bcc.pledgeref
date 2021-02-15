import React, { useState, ChangeEvent, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Services,
  FormState,
  UserContext,
  AnalysisElements,
} from "../../api/Services";
import { FormControl, Select, InputLabel, Grid } from "@material-ui/core";
import { ElementsPrimary } from "./ElementsPrimary";
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
    optionStyle: {
      textTransform: "capitalize",
    },
  })
);
export const MainPagePrimary = (props: any) => {
  const { match: _match }: { match: any } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);

  const [uploadResult, setUploadResult] = useState("");
  const [username, setUsername] = useState(new UserContext());
  const [helperAlert, setHelperAlert] = useState(false);
  const [existCities, setExistCities] = useState([] as string[]);
  var services = new Services();

  useEffect(() => {
    services
      .getExistCitiesPrimaryHousing()
      .then((json) => setExistCities(json));
  }, []);

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
        .postExcelPrimary(formData, username.user?.fullName || "")
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
      services
        .deleteCityPrimary(city, username.user?.fullName || "")
        .then(() => {
          // setAnalysis(analysis.filter((m) => m.id !== id));
        });
      window.location.reload();
    }
  };
  return (
    <React.Fragment>
      <h2 style={{ textAlign: "center" }}>
        Заполнение и корректировка справочника для Первичного жилья
      </h2>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Город</InputLabel>
        <Select
          native
          value={city}
          onChange={(e: any) => {
            dispatch(changeCity(e.currentTarget.value));
          }}
          label="Филиал"
          style={{ height: "50px", width: "280px", marginLeft: 8 }}
        >
          <option>Выберите город</option>
          {existCities
            .sort((a, b) => (a > b ? 1 : b > a ? -1 : 0))
            .map((m, i) => (
              <option className={classes.optionStyle} key={i} value={m}>
                {m.toLocaleLowerCase()}
              </option>
            ))}
        </Select>
      </FormControl>
      <button
        className="pxbutton"
        onClick={() => {
          history.push(`/primary/create`);
        }}
      >
        Добавить данные
      </button>
      <button
        className="pxbutton"
        style={{ position: "relative", float: "right", marginRight: 16 }}
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
      <ElementsPrimary city={city} formState={FormState.READ} />
      <Grid container className={classes.paper}>
        <Grid item xs={2}>
          <div style={{ textAlign: "left" }}>
            <button
              className="pxbutton"
              onClick={() => {
                onDeleteCity();
              }}
            >
              Удалить все по городу
            </button>
          </div>
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
