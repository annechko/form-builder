import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ZoomOutMapSharpIcon from "@mui/icons-material/ZoomOutMapSharp";
import CloseIcon from "@mui/icons-material/Close";

type ResponsesTableProps = {
  headers: string[],
  rows: { [id: string]: string }
}

export function ResponsesTable(props: ResponsesTableProps) {
  const [open, setOpen] = React.useState(false);
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function ResponsesTable({minWidth = 400, maxWidth = 400}) {
    return <TableContainer component="div" sx={{maxWidth: maxWidth, overflowX: 'scroll'}}>
      <Table sx={{minWidth: minWidth, overflowX: 'scroll'}} aria-label="responses">
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
          {/*{Object.keys(props.rows).forEach((id :string) => (*/}
          {/*  <TableRow*/}
          {/*    key={id}*/}
          {/*  >*/}
          {/*    {props.headers.map((header, headerIndex) =>*/}
          {/*      <TableCell component={headerIndex === 0 ? "th" : "td"} scope="row" key={i + '' + headerIndex}*/}
          {/*        sx={{border: '1px solid rgba(224, 224, 224, 1)'}}>*/}
          {/*        {row[headerIndex]}*/}
          {/*      </TableCell>*/}
          {/*    )}*/}
          {/*  </TableRow>*/}
          {/*))}*/}
        </TableBody>
      </Table>
    </TableContainer>
  }

  return <>
    <React.Fragment>
      <Box mt={0}
        display="flex"
        justifyContent="right"
        sx={{pr: 0}}>
        <IconButton sx={{
          mt: 0,
          mb: 1,
          pb: 0,
          pt: 0,
          pr: 0
        }} aria-label="see" onClick={handleClickOpen}>
          <ZoomOutMapSharpIcon/>
        </IconButton>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        component="div"
        fullWidth
        maxWidth="md"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Responses Preview</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon/>
        </IconButton>
        <DialogContent dividers
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          sx={{minHeight: '70vh'}}
          tabIndex={-1}
        >
          <ResponsesTable minWidth={700} maxWidth={1000}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    <ResponsesTable/>
  </>
}