import { FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material"
import { EntriesContext } from "../../context/entries";
import { UiContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./"

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus;
    children?: JSX.Element;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UiContext)

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

    const allowDrop = (event: DragEvent) => {
        event.preventDefault()
    }

    const onDropEntry = (event: DragEvent) => {
        const id = event.dataTransfer?.getData('text');
        const entry = entries.find(e => e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();

    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px' }}>

                {/* todo : cambiara dependiendo de si estoy haciendo drag o o  */}
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
