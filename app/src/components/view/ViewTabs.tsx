import * as React from "react";
import {FieldSettingsList} from "../configuration/FieldConfiguration";
import {FieldViewListType} from "./FieldView";
import {FormView} from "./FormView";
import {TextFieldVariants} from "@mui/material/TextField/TextField";
import {AppTabs, SingleTabType, TabViewIds} from "../common/AppTabs";
import {ZoomableView} from "./ZoomableView";
import {ResponsesView, ResponsesViewValuesType} from "./ResponsesView";

type ViewTabsProps = {
  formStyle: TextFieldVariants,
  fieldsSettings: FieldSettingsList
}


export function ViewTabs(props: ViewTabsProps) {
  const [newResponsesCount, setNewResponsesCount] = React.useState<number>(0);
  const [formValues, setFormValues] = React.useState<ResponsesViewValuesType[]>([]);

  function handleFormSubmit(newValues: FieldViewListType): void {
    const v: ResponsesViewValuesType = {date: new Date().toLocaleString(), values: newValues}
    formValues.push(v)
    setFormValues([...formValues])
    setNewResponsesCount(newResponsesCount + 1)
  }

  const onTabSelected = (newValue: TabViewIds) => {
    if (newValue === TabViewIds.ViewResponses) {
      setNewResponsesCount(0)
    }
  };

  const tabsData: SingleTabType<TabViewIds>[] = [
    {
      id: TabViewIds.ViewForm,
      title: 'Preview',
      content: <ZoomableView title="Form Preview">
        <FormView formStyle={props.formStyle} fieldsSettings={props.fieldsSettings}
          onSubmit={handleFormSubmit}
        />
      </ZoomableView>
    },
    {
      id: TabViewIds.ViewResponses,
      title: 'Responses',
      badgeContent: newResponsesCount,
      content: <ZoomableView title="Responses Preview">
        <ResponsesView fieldsSettings={props.fieldsSettings} formValues={formValues}/>
      </ZoomableView>
    },
  ]
  return <>
    <AppTabs tabsData={tabsData} onTabSelected={onTabSelected}/>
  </>
}