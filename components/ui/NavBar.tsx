
import NextLink from 'next/link'

import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { UiContext } from '../../context/ui';

export const NavBar = () => {

    const { openSideMenu } = useContext(UiContext);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton size="large" edge="start" onClick={openSideMenu} >
                    <MenuOutlined />
                </IconButton>

                <NextLink href='/' passHref>
                    <Link underline = 'none' color= 'white'>
                        <Typography variant="h6">OpenJira</Typography>
                    </Link>
                </NextLink>

            </Toolbar>
        </AppBar>
    )
}
