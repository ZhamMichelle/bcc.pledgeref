import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Grid,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Input,
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
export const TestSector = () => {
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
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  var services = new Services();

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

  return (
    <>
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
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
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
            label="Дом"
            value={house}
            onChange={(e: any) => setHouse(e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
};
