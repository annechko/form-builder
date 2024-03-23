import * as React from "react";
import {
  FieldSettingsList,
  FieldSettingsListType,
  FieldType
} from "../configuration/FieldConfiguration";
import {ResponsesTable} from "./ResponsesTable";
import {FieldViewListType} from "./FieldView";

export type ResponsesViewValuesType = {
  date: string,
  values: FieldViewListType
}

type ResponsesViewProps = {
  fieldsSettings: FieldSettingsList,
  formValues: ResponsesViewValuesType[]
}

export function ResponsesView(props: ResponsesViewProps) {
  const settings: FieldSettingsListType = props.fieldsSettings.values
  const values: ResponsesViewValuesType[] = props.formValues
  let tableHeaders: string[] = ['#']
  let tableRows: string [][] = []
  values.forEach((values: ResponsesViewValuesType, i) => {
    tableRows[i] = [values.date]
  })

  Object.keys(settings).forEach((fieldId: string) => {
    if (settings[fieldId].type === FieldType.title) {
      return;
    }
    tableHeaders.push(settings[fieldId].label || '')
    values.forEach((values: ResponsesViewValuesType, vIndex: number) => {
      tableRows[vIndex].push(values.values[fieldId])
    })
  })

  return <ResponsesTable headers={tableHeaders} rows={tableRows}/>
}