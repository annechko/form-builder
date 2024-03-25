import * as React from "react";
import {FieldSettings, FieldSettingsList, FieldType} from "../configuration/FieldConfiguration";
import {ResponsesTable} from "./ResponsesTable";
import {FieldViewListType} from "./FieldView";

export type ResponsesViewValuesType = {
  date: string,
  values: FieldViewListType
}

// todo move logic
export function buildTableRows(
  settings: FieldSettingsList,
  values: ResponsesViewValuesType[]
): string [][] {

  let tableHeaders: string[] = ['#']
  let tableRows: string [][] = []
  values.forEach((values: ResponsesViewValuesType, i) => {
    tableRows[i] = [values.date]
  })

  settings.values.forEach((fieldSettings: FieldSettings, fIndex: number) => {
    if (fieldSettings.type === FieldType.title) {
      return;
    }
    const fieldId = fieldSettings.id
    tableHeaders.push(fieldSettings.label || '')
    values.forEach((values: ResponsesViewValuesType, vIndex: number) => {
      tableRows[vIndex].push(values.values[fieldId])
    })
  })
  return [
    tableHeaders,
    ...tableRows
  ]
}

type ResponsesViewProps = {
  fieldsSettings: FieldSettingsList,
  formValues: ResponsesViewValuesType[]
}

export function ResponsesView(props: ResponsesViewProps) {
  const settings: FieldSettingsList = props.fieldsSettings
  const values: ResponsesViewValuesType[] = props.formValues
  const rows = buildTableRows(settings, values)
  const tableHeaders: string[] = rows.at(0) as string[]
  const tableRows: string [][] = rows.splice(1, rows.length)

  return <ResponsesTable headers={tableHeaders} rows={tableRows}/>
}