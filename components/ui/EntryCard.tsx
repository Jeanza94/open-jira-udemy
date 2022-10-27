import { DragEvent, FC, useContext } from "react";
import { useRouter } from "next/router";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { Entry } from '../../interfaces';
import { UiContext } from "../../context/ui";
import { dateFunctions } from "../../utils";

interface Props {
    entry: Entry;
    children?: JSX.Element;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UiContext)
    const router = useRouter();

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {

        event.dataTransfer.setData('text', entry._id);
        startDragging();

        //todo modificar el estado para saber que estoy haciendo drag
    }

    const onDragEnd = () => {
        //todo fin del drag
        endDragging();
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            sx={{ marginBottom: 1 }}
            //eventos de drag
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onClick}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{dateFunctions.getFormatDistancetoNow(entry.createdAt)}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
