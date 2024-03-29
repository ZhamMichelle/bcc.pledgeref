import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  AnalysisElements,
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
    tableRow: {
      "&:hover": {
        backgroundColor: "#ccc",
        cursor: "pointer",
      },
    },
  })
);

export const Elements = (props: any) => {
  const classes = useStyles();
  const [wantDelete, setWantDelete] = useState(false);
  const [idWantDelete, setIdWantDelete] = useState(0);
  const [analysis, setAnalysis] = useState([] as AnalysisElements[]);
  const [searchSector, setSearchSector] = useState("");
  const [searchEstate, setSearchEstate] = useState("");
  const [username, setUsername] = useState(new UserContext());
  const [uniqueSector, setUniqueSector] = useState([] as string[]);
  const [uniqueEstate, setUniqueEstate] = useState([] as string[]);
  const [selectHelper, setSelectHelper] = useState("");
  const {
    city,
    formState,
    onSelectedItem,
    filter,
  }: {
    city: string;
    formState: FormState;
    onSelectedItem: (m: AnalysisElements) => void;
    filter: [];
  } = props;

  var services = new Services();
  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("userContext") || "{}"));
  }, []);
  useEffect(() => {
    services
      .getList(city)
      .then((json) => {
        setAnalysis(json);
        setSelectHelper("Rest");
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [city]);

  useEffect(() => {
    var sectors: string[] = new Array();
    var fhelper: boolean = false;
    var shelper: boolean = false;
    sectors.push(analysis?.[0]?.sector || "");
    for (let i = 1; i < analysis.length; i++) {
      for (let j = 0; j < sectors.length; j++) {
        if (analysis?.[i].sector != sectors[j]) {
          fhelper = true;
        }
        if (analysis?.[i].sector == sectors[j]) {
          shelper = true;
        }
      }
      if (fhelper && !shelper) {
        sectors.push(analysis?.[i].sector || "");
        fhelper = false;
      }
      shelper = false;
    }

    //setUniqueSector(
    //   sectors.sort(function(a, b) {
    //   return a - b;
    // })
    //);

    setUniqueSector(sectors.sort());

    var estates: string[] = new Array();
    fhelper = false;
    shelper = false;
    estates.push(analysis?.[0]?.typeEstateByRef || "");
    for (let i = 1; i < analysis.length; i++) {
      for (let j = 0; j < estates.length; j++) {
        if (analysis?.[i].typeEstateByRef != estates[j]) {
          fhelper = true;
        }
        if (analysis?.[i].typeEstateByRef == estates[j]) {
          shelper = true;
        }
      }
      if (fhelper && !shelper) {
        estates.push(analysis?.[i].typeEstateByRef || "");
        fhelper = false;
      }
      shelper = false;
    }
    setUniqueEstate(estates);
  }, [selectHelper, analysis?.[0]?.city]);

  useEffect(() => {
    if (
      (searchSector != undefined && searchEstate == undefined) ||
      (searchSector == undefined && searchEstate != undefined) ||
      (searchSector != undefined && searchEstate != undefined)
    ) {
      services
        .getBySearchEstate(city, searchSector, searchEstate)
        .then((json) => {
          setAnalysis(json);
        });
    }
  }, [searchEstate, searchSector]);

  //useEffect(()=>{console.log('uniqueSector',uniqueSector)},[uniqueSector])

  const onClickItem = (element: AnalysisElements) => {
    history.push(`/${element.id}`);
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
                  <th>Город</th>
                  {/* <th><InputGroup
                    type="search"
                    // leftIcon={IconNames.SEARCH}
                    placeholder="Сектор"
                    value={searchSector}
                    onChange={(e: any) => setSearchSector(e.target.value)}
                  /></th> */}
                  <th>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Select
                        native
                        value={searchSector}
                        onChange={(e: any) => {
                          setSearchSector(e.currentTarget.value);
                        }}
                        style={{ height: "30px", width: "100px" }}
                      >
                        <option>Сектор</option>
                        {uniqueSector.map((m, i) => (
                          <option key={i} value={m}>
                            {m}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </th>
                  <th>Описание сектора</th>
                  {/* <th>Тип недвижимости</th> */}
                  {/* <th><InputGroup
                    type="search"
                    // leftIcon={IconNames.SEARCH}
                    placeholder="Тип недвижимости по справочнику"
                    value={searchEstate}
                    onChange={(e: any) => setSearchEstate(e.target.value)}
                  /></th> */}
                  <th>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Select
                        native
                        value={searchEstate}
                        onChange={(e: any) => {
                          setSearchEstate(e.currentTarget.value);
                        }}
                        style={{ height: "30px", width: "200px" }}
                      >
                        <option>Тип недвижимости по справочнику</option>
                        {uniqueEstate.map((m, i) => (
                          <option key={i} value={m}>
                            {m}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </th>
                  <th>Планировка</th>
                  <th>Материал стен</th>
                  <th>Детализация площади по жилому дому</th>
                  <th>Стоимость за кв.м. Min</th>
                  <th>Стоимость за кв.м. Max</th>
                  <th>Стоимость за кв.м., min значение c торгом </th>
                  <th>Стоимость за кв.м. max значение c торгом</th>
                  <th>Дата начала параметра</th>
                  <th>Дата окончания параметра</th>
                  <th>Настройки</th>
                </tr>
              </thead>
              <tbody>
                {analysis.map(
                  (m, i) =>
                    !filter?.some((f) => f == m.id) && (
                      <tr
                        key={i}
                        onClick={() => onClickItem(m)}
                        className={classes.tableRow}
                      >
                        {/* <tr key={i}> */}
                        <td>{i + 1}</td>
                        <td>{m.city}</td>
                        <td>{m.sector}</td>
                        <td>{m.sectorDescription}</td>
                        <td>{m.typeEstateByRef}</td>
                        <td>{m.apartmentLayout}</td>
                        <td>{m.wallMaterial}</td>
                        <td>{m.detailArea}</td>
                        <td>
                          {new Intl.NumberFormat("ru-RU").format(
                            m.minCostPerSQM || 0
                          )}
                        </td>
                        <td>
                          {new Intl.NumberFormat("ru-RU").format(
                            m.maxCostPerSQM || 0
                          )}
                        </td>
                        <td>
                          {new Intl.NumberFormat("ru-RU").format(
                            m.minCostWithBargain || 0
                          )}
                        </td>
                        <td>
                          {new Intl.NumberFormat("ru-RU").format(
                            m.maxCostWithBargain || 0
                          )}
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
                              history.push(`/${m.id}/edit`);
                              e.stopPropagation();
                            }}
                          />
                          <Button
                            className={Classes.MINIMAL}
                            icon={IconNames.REMOVE}
                            intent={Intent.DANGER}
                            onClick={(e: any) => {
                              // setWantDelete(true);
                              // setIdWantDelete(m.id || 1);
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
