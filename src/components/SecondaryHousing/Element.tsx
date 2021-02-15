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
  AnalysisElements,
  Services,
  UserContext,
} from "../../api/Services";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import moment from "moment";
import Alert from "@material-ui/lab/Alert";
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

const PropertyType = [
  { type: "Квартира", code: "001" },
  { type: "Жилой дом", code: "002" },
  { type: "Встроенное помещение", code: "003" },
];

const Layout = [
  { type: "Обычная (кухня < 8 кв.м)", code: "001" },
  { type: "Улучшенная (кухня >= 8 кв.м)", code: "002" },
];

const DetailArea = [
  { type: "до 100 кв.м.", code: "001" },
  { type: "от 100-200 кв.м.", code: "002" },
  { type: ">200 кв.м.", code: "003" },
];

export const Element = (props: any) => {
  const classes = useStyles();
  const [analysis, setAnalysis] = useState(new AnalysisElements());
  const [username, setUsername] = useState(new UserContext());

  const { match, formState } = props;
  var services = new Services();
  useEffect(() => {
    if (formState === FormState.EDIT || formState === FormState.READ) {
      services.getIdElement(match.params.id).then((json) => setAnalysis(json));
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
      services.postElement(analysis, username.user?.fullName || "").then(() => {
        // showToast();
        // alert("Успешно добавлен")
        history.goBack();
      });
    } else if (formState === FormState.EDIT) {
      services.putElement(analysis, username.user?.fullName || "").then(() => {
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
          .archAndNewElement(analysis, username.user?.fullName || "")
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
            <Grid item className={classes.paper} justify="center" container>
              <Grid item xs={6}>
                <TextField
                  required
                  variant="outlined"
                  label="Код строки"
                  value={analysis.code || ""}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, code: e.target.value })
                  }
                  InputProps={{
                    className: classes.cellStyle,
                  }}
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
                    className={classes.cellStyle}
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
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, cityCodeKATO: e.target.value })
                  }
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Код сектора города"
                  value={analysis.sectorCode || ""}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, sectorCode: e.target.value })
                  }
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Сектор города"
                  value={analysis.sector || ""}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, sector: e.target.value })
                  }
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                />
                <br />
                <br />
                <TextField
                  variant="outlined"
                  label="Относительность расположения"
                  value={analysis.relativityLocation || ""}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      relativityLocation: e.target.value,
                    })
                  }
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Описание сектора города"
                  value={analysis.sectorDescription || ""}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      sectorDescription: e.target.value,
                    })
                  }
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                />
                <br />
                <br />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Тип недвижимости по справочнику
                  </InputLabel>
                  <Select
                    native
                    required
                    value={analysis.typeEstateByRef || ""}
                    onChange={(e: any) => {
                      setAnalysis({
                        ...analysis,
                        typeEstateByRef: e.target.value,
                        typeEstateCode: PropertyType.filter(
                          (m) => m.type == e.target.value
                        )[0].code,
                      });
                    }}
                    label="Тип недвижимости по справочнику"
                    className={classes.cellStyle}
                  >
                    <option></option>
                    {PropertyType.map((m, i) => (
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
                  label="Код Типа недвижимости"
                  value={analysis.typeEstateCode || ""}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, typeEstateCode: e.target.value })
                  }
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                />
                <br />
                <br />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Планировка квартир
                  </InputLabel>
                  <Select
                    native
                    required={
                      analysis.typeEstateByRef == "Квартира" ? true : false
                    }
                    value={analysis.apartmentLayoutCode || ""}
                    onChange={(e: any) => {
                      setAnalysis({
                        ...analysis,
                        apartmentLayout: Layout.filter(
                          (m) => m.code == e.target.value
                        )[0].type,
                        apartmentLayoutCode: e.target.value,
                      });
                    }}
                    label="Планировка квартир"
                    className={classes.cellStyle}
                  >
                    <option></option>
                    {Layout.map((m, i) => (
                      <option key={i} value={m.code}>
                        {m.type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <br />
                <TextField
                  required={
                    analysis.typeEstateByRef == "Квартира" ? true : false
                  }
                  variant="outlined"
                  label="Код Планировка квартир"
                  value={analysis.apartmentLayoutCode || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      apartmentLayoutCode: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required={
                    analysis.typeEstateByRef == "Квартира" ? true : false
                  }
                  variant="outlined"
                  label="Код Материал стен"
                  value={analysis.wallMaterialCode || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      wallMaterialCode: parseInt(e.target.value),
                    })
                  }
                />
                <br />
                <br />
                <TextField
                  required={
                    analysis.typeEstateByRef == "Квартира" ? true : false
                  }
                  variant="outlined"
                  label="Материал стен"
                  value={analysis.wallMaterial || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, wallMaterial: e.target.value })
                  }
                />
                <br />
                <br />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Детализация площади по жилому дому
                  </InputLabel>
                  <Select
                    native
                    required={
                      analysis.typeEstateByRef == "Жилой дом" ? true : false
                    }
                    value={analysis.detailArea || ""}
                    onChange={(e: any) => {
                      setAnalysis({
                        ...analysis,
                        detailArea: e.target.value,
                        detailAreaCode: DetailArea.filter(
                          (m) => m.type == e.target.value
                        )[0].code,
                      });
                    }}
                    label="Детализация площади по жилому дому"
                    className={classes.cellStyle}
                  >
                    <option></option>
                    {DetailArea.map((m, i) => (
                      <option key={i} value={m.type}>
                        {m.type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <br />
                <TextField
                  required={
                    analysis.typeEstateByRef == "Жилой дом" ? true : false
                  }
                  variant="outlined"
                  label="Код детализации площади по жилому дому"
                  value={analysis.detailAreaCode || ""}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, detailAreaCode: e.target.value })
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
                  inputProps={{ maxLength: 2, minLength: 1 }}
                  required
                  variant="outlined"
                  label="Торг, %"
                  value={analysis.bargain || 0}
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      bargain: parseFloat(e.target.value),
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
                  label="Стоимость за кв.м., мин значение c торгом"
                  value={analysis.minCostWithBargain || ""}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      minCostWithBargain: parseInt(e.target.value),
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
                  label="Стоимость за кв.м. макс значение c торгом"
                  value={analysis.maxCostWithBargain || ""}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      maxCostWithBargain: parseInt(e.target.value),
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
                  className={classes.cellStyle}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, beginDate: e.target.value })
                  }
                  InputProps={{
                    className: classes.cellStyle,
                  }}
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
                  className={classes.cellStyle}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, endDate: e.target.value })
                  }
                  InputProps={{
                    className: classes.cellStyle,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.paper} justify="center">
              <Grid item xs={2}>
                <div style={{ marginRight: 12 }}>
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
