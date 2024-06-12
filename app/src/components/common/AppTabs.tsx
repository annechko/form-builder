import styles from "../../App.module.css";
import {Badge, Box} from "@mui/material";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {AppTabPanel, tabProps} from "./AppTabPanel";

export enum TabViewIds {
  ViewForm = 0,
  ViewResponses = 1,
}

export enum TabConfigIds {
  ConfigForm = 0,
  ConfigSettings = 1,
}

export type AppTabsProps<TabTypeId extends number> = {
  tabsData: SingleTab<TabTypeId>[],
  onTabSelected?: (id: TabTypeId) => void
}
export type SingleTab<TabTypeId extends number> = {
  id: TabTypeId,
  title: string,
  content: React.JSX.Element,
  badgeContent?: number
}

export function AppTabs<TabTypeId extends number>(props: AppTabsProps<TabTypeId>) {

  const [selectedTabId, setSelectedTabId] = React.useState<TabTypeId>(props.tabsData[0].id);

  const onTabSelected = (event: React.SyntheticEvent, id: TabTypeId) => {
    setSelectedTabId(id);
    if (props.onTabSelected) {
      props.onTabSelected(id)
    }
  };
  return (
    <Box className={styles.card}>
      <Box sx={{borderBottom: 1, borderColor: 'divider', p: 0}}>
        <Tabs value={selectedTabId} onChange={onTabSelected} aria-label="tabs configuration">
          {props.tabsData.map((tabData: SingleTab<TabTypeId>) => {
              if (tabData?.badgeContent !== undefined) {
                return <Tab key={tabData.id as number} label={
                  <Badge variant="dot" badgeContent={tabData?.badgeContent} color="primary"
                    {...tabProps(tabData.id as number)}
                    sx={{textTransform: 'none',}}>
                    {tabData.title}
                  </Badge>}/>
              } else {
                return <Tab key={tabData.id as number}
                  label={tabData.title} {...tabProps(tabData.id as number)} sx={{textTransform: 'none',}}/>
              }
            }
          )}
        </Tabs>
      </Box>

      {props.tabsData.map((tabData: SingleTab<TabTypeId>) =>
        <AppTabPanel key={tabData.id as number} value={selectedTabId as number} index={tabData.id as number}>
          {tabData.content}
        </AppTabPanel>
      )}


    </Box>
  );
}