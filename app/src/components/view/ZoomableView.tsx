import * as React from "react";
import {ReactNode} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ZoomOutMapSharpIcon from "@mui/icons-material/ZoomOutMapSharp";
import CloseIcon from "@mui/icons-material/Close";

type ZoomableViewProps = {
  title: string,
}
type PropsWithChildren<P> = P & { children?: ReactNode };

export function ZoomableView(props: PropsWithChildren<ZoomableViewProps>) {
  const [open, setOpen] = React.useState(false);
  const descriptionElementRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return <>
    <React.Fragment>
      <Box mt={0}
        display="flex"
        justifyContent="right">
        <IconButton sx={{
          m: 0,
        }} aria-label="see" size="small" onClick={handleClickOpen}>
          <ZoomOutMapSharpIcon scale={0.5}/>
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
        <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
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
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    {props.children}
  </>

}