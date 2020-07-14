import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AnalysisElements, ListService, FormState, Element } from '../api/Services';
import Grid from '@material-ui/core/Grid';
import {FormControl, Select, InputLabel} from "@material-ui/core";
import {Elements} from './Elements'

const cities: string[] = [
    "Алматы",
    "Актау",
    "Нур-Султан",
    "Нур-Султан Элит",
    "Актобе",
    "Атырау",
    "Жезказган",
    "Караганда",
    "Кокшетау",
    "Костанай",
    "Кызылорда",
    "Павлодар",
    "Петропавловск",
    "Рудный",
    "Семей",
    "Талдыкорган",
    "Тараз",
    "Усть-Каменогорск",
    "Уральск",
    "Шымкент",
    "Туркестан",
  ];
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    }, 
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
  }),
);
export const MainPage = ()=>{
    const classes = useStyles();
const [elements, setElements] = useState([] as AnalysisElements[])
const [city, setCity] = useState("");
const [sector, setSector] = useState("");


// const onBind = (element: AnalysisElements, showToast: () => void) => {
//     var con = window.confirm("Вы дейтсвительно хотите прикрепить команду?");
//     if (con) {
//       api.colvirRest.bind(model.id, command.id).then(() => {
//         showToast();
//         setModel(
//           iassign(
//             model,
//             c => c.commands,
//             p => {
//               p?.push({ commandId: command.id, command });
//               return p;
//             }
//           )
//         );
//       });
//     }
//   };

return (
        <React.Fragment>
<h2 style={{textAlign: 'center'}}>Заполнение и корректировка справочника</h2>
<FormControl variant="outlined" className={classes.formControl}>
<InputLabel htmlFor="outlined-age-native-simple">Город</InputLabel>
        <Select
          native
          value={city}
          onChange={(e: any) => {
            setCity( e.currentTarget.value );
          }}
          label="Филиал"
          style={{ height: "50px", width: "280px" }}
        >
          <option>Выберите город</option>
          {cities.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
        </Select>
        </FormControl>

        <Elements city="Актау"
              formState={FormState.READ}
            />
        </React.Fragment>
    )
}