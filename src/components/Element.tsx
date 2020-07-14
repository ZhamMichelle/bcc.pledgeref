import React, {useState, useEffect} from 'react'
import { AppContext, history } from "../App";
import {  FormState, AnalysisElements, GetIdService, PostService, PutService } from '../api/Services';
import {
    InputGroup,
    Checkbox,
    NumericInput,
    Button,
    HTMLSelect,
    Classes,
    Intent,
    HTMLTable,
    Divider,
    Position,
    Drawer,
    Spinner,
    TextArea,
  } from "@blueprintjs/core";

export const Element = (props: any) =>{
    const [analysis, setAnalysis] = useState(new AnalysisElements());

  const { match, formState } = props;
var getIdService = new GetIdService();
  useEffect(() => {
    if (formState === FormState.EDIT || formState === FormState.READ) {
        getIdService.getIdElement(match.params.id).then((json) => setAnalysis(json.data));
    }
  }, []);
var postService = new PostService();
var putService = new PutService();

  const onSubmit = (e: any, showToast: () => void) => {
    e.preventDefault();
    if (formState === FormState.CREATE) {
      postService.postElement(analysis).then(() => {
        showToast();
        history.back();
      });
    } else if (formState === FormState.EDIT) {
      putService.putElement(analysis).then(() => {
        showToast();
        history.back();
      });
    }
  };
    return(
        <AppContext.Consumer>
 {({ showToastCreate, showToastEdit }) => (
        <fieldset
          style={{ border: 0, padding: 0 }}
          disabled={formState === FormState.READ}
        >
          <form
            onSubmit={(e: any) =>
              onSubmit(
                e,
                formState === FormState.CREATE ? showToastCreate : showToastEdit
              )
            }
          >
            <InputGroup
              value={analysis.city}
              required
              placeholder="Город"
              onChange={(e: any) =>
                setAnalysis({ ...analysis, city: e.target.value })
              }
            />
          </form>
          </fieldset>
        )}
        </AppContext.Consumer>
    )
}