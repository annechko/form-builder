import * as React from "react";
import {FieldSettings, FieldSettingsList, FieldType} from "../configuration/FieldConfiguration";
import {ResponsesTable} from "./ResponsesTable";
import {FieldViewList} from "./FieldView";

export type ResponsesViewValues = {
  date: string,
  values: FieldViewList
}

// todo move logic
export function buildTableRows(
  settings: FieldSettingsList,
  values: ResponsesViewValues[]
): string [][] {

  let tableHeaders: string[] = ['#']
  let tableRows: string [][] = []
  values.forEach((values: ResponsesViewValues, i) => {
    tableRows[i] = [values.date]
  })

  settings.values.forEach((fieldSettings: FieldSettings) => {
    if (fieldSettings.type === FieldType.title) {
      return;
    }
    const fieldId = fieldSettings.id
    tableHeaders.push(fieldSettings.label || '')
    values.forEach((values: ResponsesViewValues, vIndex: number) => {
      tableRows[vIndex].push(values.values[fieldId])
    })
  })
  return [
    tableHeaders,
    ...tableRows
  ]
}

export function ResponsesView(props: {
  fieldsSettings: FieldSettingsList,
  formValues: ResponsesViewValues[]
}) {
  const settings: FieldSettingsList = props.fieldsSettings
  const values: ResponsesViewValues[] = props.formValues
  const rows = buildTableRows(settings, values)
  const tableHeaders: string[] = rows.at(0) as string[]
  const tableRows: string [][] = rows.splice(1, rows.length)

  return <ResponsesTable headers={tableHeaders} rows={tableRows}/>
}