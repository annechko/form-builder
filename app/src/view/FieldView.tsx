import * as React from "react";
import {FieldType, FieldViewProps} from "../configuration/FieldConfiguration";

export function FieldView(options: FieldViewProps) {
  if (options.type === FieldType.input) {
    return <>
      input
    </>
  } else if (options.type === FieldType.textarea) {
    return <>
      textarea
    </>
  }

}