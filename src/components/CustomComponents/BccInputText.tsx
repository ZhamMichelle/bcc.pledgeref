import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import { InputLabelProps } from "@material-ui/core/InputLabel";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { InputAdornment } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "1px solid #E8E8E8",
      overflow: "hidden",
      borderRadius: 2,
      backgroundColor: "#FFFFFF",
      boxSizing: "border-box",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:hover": {
        backgroundColor: "#fff",
      },
      "&$focused": {
        backgroundColor: "#fff",
        border: "2px solid #1F7042",
      },
      "& label.Mui-focused": {
        color: "green",
      },
    },
    focused: {},
    disabled: {
      backgroundColor: "#fff",
      color: "#8B98A7",
    },
  })
);

const useStylesBottomSlider = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "1px solid #E8E8E8",
      borderBottom: 0,
      overflow: "hidden",
      borderRadius: 2,
      backgroundColor: "#FFFFFF",
      boxSizing: "border-box",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:hover": {
        backgroundColor: "#fff",
      },
      "&$focused": {
        backgroundColor: "#fff",
      },
      "& label.Mui-focused": {
        color: "green",
      },
    },
    focused: {},
    disabled: {
      backgroundColor: "#fff",
      color: "#8B98A7",
    },
  })
);

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "-6px",
      marginBottom: "1px",
    },
  })
);

declare module "react-number-format" {
  interface NumberFormatProps {
    allowLeadingZeros?: boolean;
  }
}

interface NumberFormatCustomProps extends NumberFormatProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, allowLeadingZeros, onChange, ...other } = props;

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
      isNumericString
      allowLeadingZeros
    />
  );
};

const NumberFormatCustomSeparator = (props: NumberFormatCustomProps) => {
  const { inputRef, allowLeadingZeros, onChange, ...other } = props;

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
      isNumericString
      allowLeadingZeros={false}
      thousandSeparator={" "}
    />
  );
};

const BccInputText = (
  props: TextFieldProps & {
    isNumeric?: boolean;
    maxLength?: number;
    shrink?: boolean;
    allowLeadingZeros?: boolean;
    thousandSeparator?: boolean;
    unit?: string;
    endAdornment?: React.ReactNode;
    bottomSlider?: boolean;
    onSubmitMax?: (value: string) => void;
  }
) => {
  const {
    isNumeric,
    thousandSeparator,
    maxLength,
    shrink,
    inputProps,
    InputProps,
    unit,
    endAdornment,
    bottomSlider,
    onChange,
    onSubmitMax,
    ...others
  } = props;

  const classes = useStyles();
  const classesBottomSlider = useStylesBottomSlider();
  const classes2 = useStyles2();

  return (
    <TextField
      {...others}
      inputProps={{
        ...inputProps,
        maxLength,
      }}
      InputLabelProps={
        {
          classes: classes2,
          required: false,
          shrink: !!props.value || props.value === 0,
        } as Partial<InputLabelProps>
      }
      InputProps={
        {
          ...(InputProps as Partial<OutlinedInputProps>),
          classes: bottomSlider ? classesBottomSlider : classes,
          disableUnderline: true,
          inputComponent: isNumeric
            ? thousandSeparator
              ? NumberFormatCustomSeparator
              : (NumberFormatCustom as any)
            : undefined,
          endAdornment: !endAdornment ? (
            !!unit ? (
              <InputAdornment position="end">{unit}</InputAdornment>
            ) : (
              InputProps?.endAdornment
            )
          ) : (
            endAdornment
          ),
        } as Partial<OutlinedInputProps>
      }
      onChange={(e: any) => {
        if (!!onChange) {
          onChange(e);
        }
        if (isNumeric && !!onSubmitMax) {
          if (e.target.value.length == maxLength) {
            onSubmitMax(e.target.value);
          }
        }
      }}
    />
  );
};

export default BccInputText;
