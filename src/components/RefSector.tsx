import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Grid,
  TextField,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Pos,
  Services,
  UserContext,
  KatoModel,
  KatoBaseModel,
  CodeValue,
} from "../api/Services";

const localities: string[] = ["Каргалы", "Акжар", "Кызылжар"];
const typeLocalities: string[] = ["село", "поселок"];

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
      width: "95%",
    },
    formControl2: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
export const RefSector = () => {
  const classes = useStyles();

  const [regions, setRegions] = useState([] as KatoModel[]);
  const [region, setRegion] = useState(new KatoModel());
  const [districts, setDistricts] = useState(new KatoBaseModel());
  const [district, setDistrict] = useState(new KatoModel());
  const [cityKato, setCityKato] = useState(new KatoModel());
  const [cityPart, setCityPart] = useState(new KatoModel());
  const [cityParts, setCityParts] = useState(new KatoBaseModel());
  const [cityZone, setCityZone] = useState("");
  const [streetType, setStreetType] = useState(new CodeValue());
  const [streetTypes, setStreetTypes] = useState([] as CodeValue[]);
  const [housingEstate, setHousingEstate] = useState("");

  useEffect(() => {
    services.getKatoRegion().then((json) => setRegions(json));
  }, []);

  useEffect(() => {
    services.getKatoDistrict(region?.te || "").then((json) => {
      setDistricts(json);
    });
    setCityParts({ ...cityParts, villages: [] });
  }, [region?.te]);

  useEffect(() => {
    services.getKatoDistrict(district?.te || "").then((json) => {
      setCityParts(json);
      setDistricts({ ...districts, cities: [] });
    });
  }, [district?.te]);

  useEffect(() => {
    services.getStreetType().then((json) => setStreetTypes(json));
  }, []);

  const [city, setCity] = useState("Актобе");
  const [typeLocCity, setTypeLocCity] = useState("Город");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [sector, setSector] = useState("");
  const [result, setResult] = useState("");
  const [uploadResult, setUploadResult] = useState("");
  const [username, setUsername] = useState(new UserContext());
  const [helperAlert, setHelperAlert] = useState(false);
  const [pos, setPos] = useState([] as Pos[]);
  const [cityDelete, setCityDelete] = useState("");
  const [typeDelete, setTypeDelete] = useState("");
  const [fileName, setFileName] = useState("");
  const [existCities, setExistCities] = useState([] as string[]);
  const [streetTypeHE, setStreetTypeHE] = useState(new CodeValue());

  useEffect(() => {
    services.getExistCitiesCoordinates().then((json) => setExistCities(json));
  }, []);
  var services = new Services();
  const onSubmit = (e: any) => {
    e.preventDefault();
    services
      .YandexApi(
        region.rus_name || "",
        city,
        cityZone,
        streetType.value || "",
        housingEstate,
        streetTypeHE?.value || "",
        street,
        house
      )
      .then((str) => setResult(str));
  };

  const onDeleteSector = (e: any) => {
    e.preventDefault();
    services.DeleteSector(cityDelete, typeDelete).then((json) => {
      setUploadResult(json);
      setHelperAlert(!helperAlert);
    });
  };

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("userContext") || "{}"));
  }, []);
  useEffect(() => {
    var XMLParser = require("react-xml-parser");
    if (!!result) {
      var xml = new XMLParser().parseFromString(result);
      setPos(xml.getElementsByTagName("pos"));
    }
  }, [result]);

  useEffect(() => {
    if (!!pos[0]?.value) {
      services
        .getSector(pos[0]?.value, city, typeLocCity)
        .then((json) => setSector(json));
    }
  }, [pos]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    //debugger;
    const obj = { hello: "world" };
    const blob1 = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });
    var file = e.target.files;
    setFileName(file?.[0]?.name || "");
    var formData = new FormData();
    formData.append("body", file?.[0] || blob1);
    if (!!file) {
      services
        .postExcelCoordinates(formData, username.user?.fullName || "")
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
    else if (uploadResult.includes("Сектор")) alert(`Ошибка! ${uploadResult}`);
    else if (uploadResult === "Error") alert("Ошибка в формате данных!");
    else if (uploadResult === "Deleted") alert("Удалено успешно!");
    else if (uploadResult === "NoData") alert("Не найден данный сектор!");
    else if (uploadResult === "Error delete") alert("Произошла ошибка!");
  }, [helperAlert]);
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Тест и загрузка секторов</h2>
      <Grid className={classes.paper} container spacing={1}>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="region">Область</InputLabel>
            <Select
              native
              required
              value={region?.rus_name}
              onChange={(e: any) => {
                setRegion(
                  regions.filter((m) => m?.rus_name == e.target.value)[0]
                );
              }}
              label="Область"
            >
              <option></option>
              {regions.map((m, i) => (
                <option key={i} value={m.rus_name}>
                  {m.rus_name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="city">Район</InputLabel>
            <Select
              native
              required
              value={district?.rus_name}
              onChange={(e: any) => {
                setDistrict(
                  districts.districts!.filter(
                    (m) => m?.rus_name == e.target.value
                  )[0]
                );
              }}
              label="Район"
            >
              <option></option>
              {districts?.districts?.map((m, i) => (
                <option key={i} value={m.rus_name}>
                  {m.rus_name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="city">Город</InputLabel>
            <Select
              native
              required
              value={cityKato}
              onChange={(e: any) => {
                setCityKato(e.target.value);
              }}
              label="Город"
            >
              <option></option>
              {districts?.cities?.map((m, i) => (
                <option key={i} value={m.rus_name}>
                  {m.rus_name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="city">Населенный пункт</InputLabel>
            <Select
              native
              required
              value={cityPart}
              onChange={(e: any) => {
                setCityPart(e.target.value);
              }}
              label="Населенный пункт"
            >
              <option></option>
              {cityParts?.villages?.map((m, i) => (
                <option key={i} value={m.rus_name}>
                  {m.rus_name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            className={classes.formControl}
            value={cityZone}
            onChange={(e: any) => {
              setCityZone(e.target.value);
            }}
            label="Микрорайон"
          ></TextField>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="streetType">Тип улицы</InputLabel>
            <Select
              native
              required
              value={streetType?.value}
              onChange={(e: any) => {
                setStreetType(
                  streetTypes.filter((m) => m?.value == e.target.value)[0]
                );
              }}
              label="Тип улицы"
            >
              <option></option>
              {streetTypes?.map((m, i) => (
                <option key={i} value={m.value}>
                  {m.value}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {streetType.code == "ж/м" ? (
          <>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <TextField
                //required
                id="outlined-basic"
                variant="outlined"
                className={classes.formControl}
                label="Наименование ж/м"
                value={housingEstate}
                onChange={(e: any) => setHousingEstate(e.target.value)}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="streetType">Тип улицы</InputLabel>
                <Select
                  native
                  required
                  value={streetTypeHE?.value}
                  onChange={(e: any) => {
                    setStreetTypeHE(
                      streetTypes.filter((m) => m?.value == e.target.value)[0]
                    );
                  }}
                  label="Тип улицы"
                >
                  <option></option>
                  {streetTypes?.map((m, i) => (
                    <option key={i} value={m.value}>
                      {m.value}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        ) : (
          <></>
        )}
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <TextField
            //required
            id="outlined-basic"
            variant="outlined"
            className={classes.formControl}
            label="Улица"
            value={street}
            onChange={(e: any) => setStreet(e.target.value)}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            className={classes.formControl}
            label="Дом"
            value={house}
            onChange={(e: any) => setHouse(e.target.value)}
          />
        </Grid>
      </Grid>
      <form onSubmit={(e: any) => onSubmit(e)}>
        <Grid className={classes.paper} container spacing={3}>
          <Grid item xs={12} className={classes.formControl}></Grid>
          <Grid item xs={12}>
            <div style={{ textAlign: "center" }}>
              <input
                type="submit"
                value="Получить сектор"
                className="pxbutton"
              />
            </div>
          </Grid>
        </Grid>
      </form>
      <Grid item xs={12}>
        {!!sector ? (
          <h2 style={{ paddingLeft: "40px" }}>Сектор {sector}</h2>
        ) : (
          <></>
        )}
      </Grid>
      <hr />
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={(e: any) => onDeleteSector(e)}>
        <Grid>
          <div style={{ paddingLeft: "20px" }}>
            Выберите город и тип нас. пункта для удаления указанного
            сектора(ов):
          </div>
        </Grid>
        <br />
        <Grid item xs={12} className={classes.formControl2}>
          {" "}
          <FormControl variant="outlined" className={classes.formControl2}>
            <InputLabel htmlFor="city">Город</InputLabel>
            <Select
              native
              required
              value={cityDelete}
              onChange={(e: any) => {
                setCityDelete(e.target.value);
              }}
              label="Город"
              style={{ width: "150px" }}
            >
              <option></option>
              {existCities.map((m, i) => (
                <option key={i} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl2}>
            <InputLabel htmlFor="locality">Тип нас. пункта</InputLabel>
            <Select
              native
              required
              value={typeDelete}
              onChange={(e: any) => {
                setTypeDelete(e.target.value);
              }}
              label="Тип нас. пункта"
              style={{ width: "160px" }}
            >
              <option></option>
              <option key={1} value={"Город"}>
                Город
              </option>
              <option key={2} value={"НП"}>
                НП
              </option>
            </Select>
          </FormControl>
          <input
            type="submit"
            value="Удалить сектор"
            className="pxbutton"
            style={{ height: "55px" }}
          />
        </Grid>
      </form>
      <br />
      <br />
      <br />
      <br />
      <Grid>
        <div style={{ paddingLeft: "20px" }}>Загрузить сектор(а):</div>
        <br />
        <input
          type="file"
          id="input"
          style={{ paddingLeft: "20px" }}
          onChange={(e) => onFileChange(e)}
        />
      </Grid>
    </>
  );
};
