import Typography from "@mui/material/Typography";
import {FieldConfiguration, FieldSettings, FieldSettingsList} from "./FieldConfiguration";
import {Box, Divider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided
} from "@hello-pangea/dnd";

type FormConfigurationProps = {
  fieldsSettings: FieldSettingsList,
  onFieldSettingsChanged: (id: string) => (newFieldSettings: FieldSettings) => void,
  onFieldSettingsListChanged: (newSettingsList: FieldSettingsList) => void,
  onFieldDeleted: (id: string) => () => void,
  onFieldAdded: (event: object) => void,
}
const reorder = (
  list: FieldSettings[],
  startIndex: number,
  endIndex: number
): FieldSettings[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function FormConfiguration(props: FormConfigurationProps) {
  function onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      props.fieldsSettings.values,
      result.source.index,
      result.destination.index
    );

    props.onFieldSettingsListChanged(new FieldSettingsList(items))
  }

  return <>
    <Typography variant="body1" component="div" sx={{mt: 2, minWidth: '30vw'}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided, snapshot: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {props.fieldsSettings.values.map((s: FieldSettings, index: number) => (
                <Draggable key={s.id} draggableId={s.id} index={index}>
                  {(provided: DraggableProvided, snapshot: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >

                      <Box component="section" sx={{
                        p: 1,
                        pb: 0,
                        pt: 2,
                        mb: 1,
                      }}>
                        <FieldConfiguration settings={s}
                          onSettingsChanged={props.onFieldSettingsChanged(s.id)}
                          onFieldDeleted={props.onFieldDeleted(s.id)}
                        />
                      </Box>
                      <Divider/>

                    </div>
                  )}

                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <IconButton aria-label="delete" onClick={props.onFieldAdded}>
        <AddIcon/>
      </IconButton>
    </Typography>
  </>;
}