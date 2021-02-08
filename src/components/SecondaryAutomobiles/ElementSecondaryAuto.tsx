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
  SecondaryAutoAnalysisElements,
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
  })
);

export const ElementSecondaryAuto = (props: any) => {
  const classes = useStyles();
  const [analysis, setAnalysis] = useState(new SecondaryAutoAnalysisElements());
  const [username, setUsername] = useState(new UserContext());

  const { match, formState } = props;
  var services = new Services();
  useEffect(() => {
    if (formState === FormState.EDIT || formState === FormState.READ) {
      services
        .getIdElementSecAuto(match.params.id)
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
                  style={{ width: "450px" }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, code: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Марка авто"
                  value={analysis.carBrand || ""}
                  style={{ width: "450px" }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, carBrand: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Модель авто"
                  value={analysis.carModel || ""}
                  style={{ width: "450px" }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, carModel: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Год выпуска"
                  value={analysis.produceYear || ""}
                  style={{ width: "450px" }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, produceYear: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Рыночная стоимость"
                  value={analysis.marketCost || ""}
                  style={{ width: "450px" }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, marketCost: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  required
                  variant="outlined"
                  label="Max % отклонения/коридор"
                  value={analysis.maxPercentageDeviation || ""}
                  style={{ width: "450px" }}
                  onChange={(e: any) =>
                    setAnalysis({
                      ...analysis,
                      maxPercentageDeviation: e.target.value,
                    })
                  }
                />
                {/* <br/><br/>
              <TextField required variant="outlined"  label="Статус" value={analysis.typeEstateCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, typeEstateCode: e.target.value })
              }/> */}
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
                  style={{ width: "450px" }}
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
                  style={{ width: "450px" }}
                  onChange={(e: any) =>
                    setAnalysis({ ...analysis, endDate: e.target.value })
                  }
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
