import styles from "../../App.module.css";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

export enum TabConfigIds {
  Fields = 0,
  FormSettings = 1,
}

export enum TabViewIds {
  Preview = 0,
  Responses = 1,
}

export interface AppTabPanelProps {
  children?: React.ReactNode;
  index: TabConfigIds | TabViewIds,
  value: TabConfigIds | TabViewIds,
}

export function tabProps(index: TabConfigIds | TabViewIds) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export function AppTabPanel(props: AppTabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      className={styles.card}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3, pt: 1}}>
          <Typography component="div" sx={{
            overflowY: 'scroll',
            maxHeight: '70vh',
            minHeight: '70vh',
            minWidth: '40vh',
            height: 'fit-content'
          }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}