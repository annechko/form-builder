import * as React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

type ResponsesTableProps = {
  headers: string[],
  rows: string[][]
}

export function ResponsesTable(props: ResponsesTableProps) {

  return <TableContainer component="div" sx={{overflowX: 'scroll'}}>
    <Table sx={{minWidth: '30vw', overflowX: 'scroll'}} aria-label="responses">
      <TableHead>
        <TableRow>
          {props.headers.map((header, i) => <TableCell key={i}
            sx={{
              border: '1px solid rgba(224, 224, 224, 1)',
              fontWeight: '550'
            }}>{header}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.rows.map((row, i) => (
          <TableRow
            key={i}
          >
            {props.headers.map((header, headerIndex) =>
              <TableCell component={headerIndex === 0 ? "th" : "td"} scope="row"
                key={i + '' + headerIndex}
                sx={{border: '1px solid rgba(224, 224, 224, 1)'}}>
                {row[headerIndex]}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}