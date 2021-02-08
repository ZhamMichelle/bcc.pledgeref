import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  SecondaryAutoAnalysisElements,
  Services,
  FormState,
  UserContext,
} from "../../api/Services";
import { Button, Classes, Intent, Alert, InputGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AppContext, history, PATH_REFERENCE_BOOK } from "../../App";
import moment from "moment";
import { FormControl, Select, InputLabel, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
    },
    formControl: {
      margin: theme.spacing(1),
    },
  })
);

export const ElementsSecondaryAuto = (props: any) => {
  const classes = useStyles();
  const [wantDelete, setWantDelete] = useState(false);
  const [idWantDelete, setIdWantDelete] = useState(0);
  const [analysis, setAnalysis] = useState(
    [] as SecondaryAutoAnalysisElements[]
  );
  const [username, setUsername] = useState(new UserContext());
  const {
    validYear,
    formState,
    onSelectedItem,
    filter,
  }: {
    validYear: number;
    formState: FormState;
    onSelectedItem: (m: SecondaryAutoAnalysisElements) => void;
    filter: [];
  } = props;

  var services = new Services();
  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("userContext") || "{}"));
  }, []);
  useEffect(() => {
    services
      .getListSecondaryAuto()
      .then((json) => {
        setAnalysis(json);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [validYear]);

  const onClickItem = (element: SecondaryAutoAnalysisElements) => {
    history.push(`/${element.id}/secauto`);
  };

  const onConfirm = (showToast: () => void) => {
    services
      .deleteElement(idWantDelete, username.user?.fullName || "")
      .then(() => {
        showToast();
        setAnalysis(analysis.filter((m) => m.id !== idWantDelete));
      });
  };

  const onDelete = (id: any) => {
    var con = window.confirm("Вы действительно хотите удалить?");
    if (con) {
      services.deleteElement(id, username.user?.fullName || "").then(() => {
        setAnalysis(analysis.filter((m) => m.id !== id));
      });
    }
  };

  return (
    <AppContext.Consumer>
      {({ showToastDelete, showToastError }) => (
        <React.Fragment>
          <Alert
            icon={IconNames.TRASH}
            cancelButtonText="Нет"
            confirmButtonText="Да"
            intent={Intent.DANGER}
            isOpen={wantDelete}
            onCancel={() => setWantDelete(false)}
            onConfirm={() => onConfirm(showToastDelete)}
            onClose={() => setWantDelete(false)}
          >
            <p>
              Внимание!!!
              <br /> Вы уверены что хотите удалить ?
            </p>
          </Alert>
          <Grid item xs={12} className={classes.paper}>
            <table
              style={{
                width: "100%",
                textAlign: "center",
                border: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th>№</th>
                  <th>Марка авто</th>
                  <th>Модель авто</th>
                  <th>Год выпуска</th>
                  <th>Рыночная стоимость</th>
                  <th>Max % отклонения/коридор</th>
                  <th>Статус</th>
                  <th>Дата начала параметра</th>
                  <th>Дата окончания параметра</th>
                  <th>Настройки</th>
                </tr>
              </thead>
              <tbody>
                {analysis.map(
                  (m, i) =>
                    !filter?.some((f) => f == m.id) && (
                      <tr key={i} onClick={() => onClickItem(m)}>
                        <td>{i + 1}</td>
                        <td>{m.carBrand}</td>
                        <td>{m.carModel}</td>
                        <td>{m.produceYear}</td>
                        <td>{m.marketCost}</td>
                        <td>{m.maxPercentageDeviation}</td>
                        <td>
                          {new Date().getFullYear() - m.produceYear < validYear
                            ? "Валиден"
                            : "Не валиден"}
                        </td>
                        <td>
                          {m.beginDate != null
                            ? moment(m.beginDate, moment.ISO_8601, true).format(
                                "DD.MM.YYYY"
                              )
                            : m.beginDate}
                        </td>
                        <td>
                          {m.endDate != null
                            ? moment(m.endDate, moment.ISO_8601, true).format(
                                "DD.MM.YYYY"
                              )
                            : m.endDate}
                        </td>

                        <td style={{ width: "88px" }}>
                          <Button
                            className={Classes.MINIMAL}
                            icon={IconNames.EDIT}
                            intent={Intent.PRIMARY}
                            onClick={(e: any) => {
                              history.push(`/${m.id}/secauto/edit`);
                              e.stopPropagation();
                            }}
                          />
                          <Button
                            className={Classes.MINIMAL}
                            icon={IconNames.REMOVE}
                            intent={Intent.DANGER}
                            onClick={(e: any) => {
                              onDelete(m.id);
                              e.stopPropagation();
                            }}
                          />
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </Grid>
        </React.Fragment>
      )}
    </AppContext.Consumer>
  );
};
