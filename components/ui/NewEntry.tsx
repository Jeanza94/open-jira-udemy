import { ChangeEvent, useContext, useState } from "react"
import { Box, Button, TextField } from "@mui/material"
import { AddCircleOutlineOutlined, SaveOutlined } from "@mui/icons-material"
import { EntriesContext } from "../../context/entries"
import { UiContext } from "../../context/ui"


export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext(UiContext)

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if (inputValue.length === 0) return;

        addNewEntry(inputValue);
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    }

    return (
        <Box sx={{ mb: 2, paddingX: 2 }}>

            {
                isAddingEntry
                    ? (
                        <>
                            <TextField
                                fullWidth
                                sx={{ mt: 2, mb: 1 }}
                                placeholder='Nueva Entrada'
                                autoFocus
                                multiline
                                label='Nueva Entrada'
                                helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                                error={inputValue.length <= 0 && touched}
                                value={inputValue}
                                onChange={onTextFieldChanged}
                                onBlur={() => setTouched(true)}
                            />

                            <Box display='flex' justifyContent='space-between'>
                                <Button
                                    variant='outlined'
                                    onClick={() => setIsAddingEntry(false)}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    endIcon={<SaveOutlined />}
                                    onClick={onSave}
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </>
                    )
                    : (
                        <Button
                            startIcon={<AddCircleOutlineOutlined />}
                            fullWidth
                            variant='outlined'
                            onClick={() => setIsAddingEntry(true)}
                        >
                            Agregar tarea
                        </Button>
                    )

            }

        </Box>
    )
}
