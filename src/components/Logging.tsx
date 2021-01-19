import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FormControl, Select, InputLabel } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { InputGroup } from "@blueprintjs/core";
import {
  LoggingElements,
  Services,
  FormState,
  UserContext,
  PaginationParams,
} from "../api/Services";
import { saveAs } from "file-saver";
import Pagination from "@material-ui/lab/Pagination";

const actions: string[] = ["Удаление", "Редактирование", "Добавление", "Excel"];
const status: string[] = ["Действ.", "Арх."];
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      textAlign: "center",
    },
    paper2: {
      padding: theme.spacing(2),
      margin: "auto",
      textAlign: "right",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    paper3: {
      padding: theme.spacing(5),
      margin: "auto",
      textAlign: "center",
      marginTop: theme.spacing(2),
    },
  })
);
export const Logging = (props: any) => {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [housingType, setHousingType] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [searchStatus, setSearchStatus] = useState();
  const [size, setSize] = useState(10);
  const [pagResult, setPagResult] = useState(new PaginationParams());
  const [pageP, setPageP] = useState(1);
  const {
    formState,
    onSelectedItem,
    filter,
  }: {
    formState: FormState;
    onSelectedItem: (m: LoggingElements) => void;
    filter: [];
  } = props;
  const [existCities, setExistCities] = useState([] as string[]);
  var services = new Services();

  useEffect(() => {
    services.getExistCitiesLogging().then((json) => setExistCities(json));
  }, []);

  useEffect(() => {
    var status = "";
    setSearchCode("");
    services
      .getLogPage(pageP, size, searchCode, status, city, housingType)
      .then((json) => {
        setPagResult(json);
      });
  }, []);

  useEffect(() => {
    var status =
      searchStatus == "Действ." ? "0" : searchStatus == "Арх." ? "1" : "";
    var type = housingType == "Тип жилья" ? "" : housingType;

    services
      .getLogPage(pageP, size, searchCode, status, city, type)
      .then((json) => {
        setPagResult(json);
      });
  }, [searchCode, searchStatus, city, housingType]);

  const handleChangePage = (event: any, newPage: number) => {
    event.preventDefault();
    var status =
      searchStatus == "Действ." ? "0" : searchStatus == "Арх." ? "1" : "";
    var type = housingType == "Тип жилья" ? "" : housingType;
    services
      .getLogPage(newPage, size, searchCode, status, city, type)
      .then((json) => setPagResult(json));
    setPageP(newPage);
  };

  const extractFileName = (contentDispositionValue) => {
    var filename = "";
    if (
      contentDispositionValue &&
      contentDispositionValue.indexOf("attachment") !== -1
    ) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDispositionValue);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    return filename;
  };
  const downloadFile = () => {
    services
      .Download()
      .then((response) => {
        var filename = "History"; //xtractFileName(response.headers['content-disposition']);
        saveAs(response.data, filename);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          console.log("Error", error.response.status);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  useEffect(() => {
    console.log("pagresult", pagResult);
  }, [pagResult]);
  return (
    <>
      <React.Fragment>
        <h2 style={{ textAlign: "center" }}>История действий</h2>
        <div style={{ paddingLeft: "15px" }}>
          <button
            className="pxbutton"
            onClick={(e: any) => {
              downloadFile();
            }}
          >
            Выгрузить данные
          </button>
        </div>
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
                <th>
                  <InputGroup
                    type="search"
                    placeholder="Код"
                    value={searchCode}
                    onChange={(e: any) => {
                      setSearchCode(e.target.value);
                      setPageP(1);
                    }}
                  />
                </th>
                <th>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      native
                      value={city}
                      onChange={(e: any) => {
                        setCity(e.currentTarget.value);
                        setPageP(1);
                      }}
                      style={{ height: "30px", width: "120px" }}
                    >
                      <option>Город</option>
                      {existCities.map((m, i) => (
                        <option key={i} value={m}>
                          {m}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </th>
                <th>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      native
                      value={housingType}
                      onChange={(e: any) => {
                        setHousingType(e.currentTarget.value);
                        setPageP(1);
                      }}
                      style={{ height: "30px", width: "120px" }}
                    >
                      <option>Тип жилья</option>
                      <option>Первичка</option>
                      <option>Вторичка</option>
                    </Select>
                  </FormControl>
                </th>
                <th>Наименование ЖК</th>
                <th>Факт. адрес</th>
                <th>Уровень кач-ва отделки</th>
                <th>Сектор</th>
                <th>Описание сектора</th>
                <th>Тип недвижимости по справочнику</th>
                <th>Планировка</th>
                <th>Материал стен</th>
                <th>Детализация площади по жилому дому</th>
                <th>Стоимость за кв.м. Min</th>
                <th>Стоимость за кв.м. Max</th>
                <th>Стоимость за кв.м., min значение c торгом </th>
                <th>Стоимость за кв.м. max значение c торгом</th>
                <th>Дата начала параметра</th>
                <th>Дата окончания параметра</th>
                <th>Действие</th>
                <th>Исполнитель</th>
                <th>Дата изменения</th>
                <th>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      native
                      value={searchStatus}
                      onChange={(e: any) => {
                        setSearchStatus(e.currentTarget.value);
                        setPageP(1);
                      }}
                      style={{ height: "30px", width: "100px" }}
                    >
                      <option>Статус</option>
                      {status.map((m, i) => (
                        <option key={i} value={m}>
                          {m}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </th>
              </tr>
            </thead>
            <tbody>
              {pagResult.results?.map(
                (m, i) =>
                  !filter?.some((f) => f == m.id) && (
                    <tr key={i}>
                      <td>{m.id}</td>
                      <td>{m.code}</td>
                      <td>{m.city}</td>
                      <td>{m.type}</td>
                      <td>{m.rcName}</td>
                      <td>{m.actualAdress}</td>
                      <td>{m.finQualityLevel}</td>
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
                      <td>{m.action}</td>
                      <td>{m.username}</td>
                      <td>
                        {m.changeDate != null
                          ? moment(m.changeDate, moment.ISO_8601, true).format(
                              "DD.MM.YYYY"
                            )
                          : m.changeDate}
                      </td>
                      <td>
                        {!!m.isArch && m.isArch == "0" ? (
                          <>Действ.</>
                        ) : (
                          <>Арх.</>
                        )}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </Grid>
        <br />
        <Grid container className={classes.paper}>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <Pagination
              style={{ justifyContent: "right" }}
              count={
                !!pagResult.rowCount && pagResult?.rowCount % 10 == 0
                  ? pagResult?.rowCount / 10
                  : Math.ceil((pagResult?.rowCount || 0) / 10)
              }
              variant="outlined"
              page={pageP}
              onChange={(e: any, page: number) => {
                handleChangePage(e, page);
              }}
            />
          </Grid>
        </Grid>
        <br />
        <br />
      </React.Fragment>
    </>
  );
};
