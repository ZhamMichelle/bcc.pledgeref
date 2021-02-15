import React, { useState, useEffect, useContext } from "react";
import { AppContext, history } from "../../App";
import {
  Grid,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Input,
} from "@material-ui/core";
import {
  FormState,
  PrimaryAnalysisElements,
  Services,
  UserContext,
} from "../../api/Services";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import moment from "moment";
import NumberFormat from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator={" "}
      decimalSeparator={"."}
      isNumericString
      prefix={props.prefix} //"$"
    />
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
    },
    container: {
      maxHeight: 440,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      "& > div": {
        flexBasis: "auto",
      },
    },
    input: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    cellStyle: {
      width: 450,
    },
  })
);

const cities: string[] = [
  "Алматы",
  "Актау",
  "Нур-Султан",
  "Актобе",
  "Атырау",
  "Жезказган",
  "Караганда",
  "Кокшетау",
  "Костанай",
  "Кызылорда",
  "Павлодар",
  "Петропавловск",
  "Семей",
  "Талдыкорган",
  "Тараз",
  "Усть-Каменогорск",
  "Уральск",
  "Шымкент",
  "Туркестан",
];

const FinQualityLevelList = [
  { type: "чистовая", code: "001" },
  { type: "предчистовая", code: "002" },
  { type: "черновая", code: "003" },
];

export const ElementPrimary = (props: any) => {
  const classes = useStyles();
  const [analysis, setAnalysis] = useState(new PrimaryAnalysisElements());
  const [username, setUsername] = useState(new UserContext());

  const { match, formState } = props;
  var services = new Services();
  useEffect(() => {
    if (formState === FormState.EDIT || formState === FormState.READ) {
      services
        .getIdElementPrimary(match.params.id)
        .then((json) => setAnalysis(json));
    }
    setUsername(JSON.parse(localStorage.getItem("userContext") || "{}"));
  }, []);

  // useEffect(()=>{
  //   if(analysis.city!=null){
  //     services.getKatoCityCode(analysis.city || "").then(json=>setAnalysis({...analysis, cityCodeKATO:json.toString()}))
  //   }

  // },[analysis.city])

  const onSubmit = (e: any, showToast: () => void) => {
    e.preventDefault();
    if (formState === FormState.CREATE) {
      services
        .postElementPrimary(analysis, username.user?.fullName || "")
        .then(() => {
          // showToast();
          // alert("Успешно добавлен")
          history.goBack();
        });
    } else if (formState === FormState.EDIT) {
      services
        .putElementPrimary(analysis, username.user?.fullName || "")
        .then(() => {
          // alert("Успешно изменен")
          // showToast();
          history.goBack();
        });
    }
  };

  const archAndNew = (e: any) => {
    e.preventDefault();
    if (!!analysis.beginDate) {
      var con = window.confirm(
        "Вы действительно хотите архивировать и создать новый?"
      );
      if (con) {
        services
          .archAndNewElementPrimary(analysis, username.user?.fullName || "")
          .then(() => {
            history.goBack();
          });
      }
    } else alert('Заполните поле "Дата начала параметра"');
  };

  return (
    <AppContext.Consumer>
      {({ showToastCreate, showToastEdit }) => (
        <fieldset
          style={{ border: 0, padding: 0 }}
          disabled={formState === FormState.READ}
        >
          <form
            className={classes.input}
            onSubmit={(e: any) =>
              onSubmit(
                e,
                formState === FormState.CREATE ? showToastCreate : showToastEdit
              )
            }
          >
            <h2 style={{ textAlign: "center" }}>
              {formState == FormState.READ ? (
                <>Просмотр</>
              ) : formState == FormState.EDIT ? (
                <>Редактирование</>
              ) : (
                <>Добавление</>
              )}
            </h2>
            <Grid
              item
              xs={6}
              className={classes.paper}
              justify="center"
              container
              spacing={3}
            >
              <Grid item xs={6}>
                <TextField
                  required
                  variant="outlined"
                  label="Код строки"
                  value={analysis.code || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, code: e.target.value })
                  }
                />
                <br />
                <br />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="city">Город</InputLabel>
                  <Select
                    native
                    required
                    value={analysis.city || ""}
                    onChange={(e: any) => {
                      setAnalysis({ ...analysis, city: e.target.value });
                    }}
                    label="Город"
                    style={{ width: "450px" }}
                  >
                    <option></option>
                    {cities.map((m, i) => (
                      <option key={i} value={m}>
                        {m}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Код города КАТО"
                  value={analysis.cityCodeKATO || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, cityCodeKATO: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Код наименования ЖК"
                  value={analysis.rcNameCode || ""}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      rcNameCode: parseInt(e.target.value),
                    })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Наименование ЖК"
                  value={analysis.rcName || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, rcName: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  variant="outlined"
                  label="Фактический адрес"
                  value={analysis.actualAdress || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, actualAdress: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Уровень качества отделки
                  </InputLabel>
                  <Select
                    native
                    required
                    value={analysis.finQualityLevel || ""}
                    onChange={(e: any) => {
                      setAnalysis({
                        ...analysis,
                        finQualityLevel: e.target.value,
                        finQualityLevelCode: FinQualityLevelList.filter(
                          (m) => m.type == e.target.value
                        )[0].code,
                      });
                    }}
                    label="Уровень качества отделки"
                    style={{ width: "450px" }}
                  >
                    <option></option>
                    {FinQualityLevelList.map((m, i) => (
                      <option key={i} value={m.type}>
                        {m.type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Код уровня качества отделки"
                  value={analysis.finQualityLevelCode || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      finQualityLevelCode: e.target.value,
                    })
                  }
                />

                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Стоимость за кв.м., мин значение"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    className: classes.cellStyle,
                  }}
                  value={analysis.minCostPerSQM || ""}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      minCostPerSQM: parseInt(e.target.value),
                    })
                  }
                />
                <br />
                <br />
                <TextField
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    className: classes.cellStyle,
                  }}
                  required
                  variant="outlined"
                  label="Стоимость за кв.м. макс значение"
                  value={analysis.maxCostPerSQM || ""}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      maxCostPerSQM: parseInt(e.target.value),
                    })
                  }
                />

                <br />
                <br />
                <TextField
                  variant="outlined"
                  label="Дата начала параметра"
                  type="date"
                  name="date"
                  value={moment(
                    analysis.beginDate,
                    moment.ISO_8601,
                    true
                  ).format("YYYY-MM-DD")}
                  InputLabelProps={{ shrink: true, required: true }}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, beginDate: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  variant="outlined"
                  label="Дата окончания параметра"
                  type="date"
                  name="date"
                  value={moment(analysis.endDate, moment.ISO_8601, true).format(
                    "YYYY-MM-DD"
                  )}
                  InputLabelProps={{ shrink: true, required: true }}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, endDate: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Grid container className={classes.paper} justify="center">
              <Grid item xs={2}>
                <div style={{ marginRight: "12px" }}>
                  {formState != FormState.READ &&
                  formState != FormState.CREATE ? (
                    <input
                      type="button"
                      value="Архивировать и создать новый"
                      className="pxbutton"
                      onClick={(e: any) => {
                        archAndNew(e);
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </Grid>
              <Grid item xs={8}>
                <div>
                  {formState != FormState.READ ? (
                    <input
                      type="submit"
                      value="Сохранить"
                      className="pxbutton"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </Grid>
            </Grid>
          </form>
        </fieldset>
      )}
    </AppContext.Consumer>
  );
};
