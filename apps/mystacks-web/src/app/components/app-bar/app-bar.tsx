import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, InputAdornment, TextField } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import AppLogo from '../../../assets/app-logo.png';
import { useNavigate } from 'react-router-dom';
import CabinIcon from '@mui/icons-material/Cabin';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';

/* eslint-disable-next-line */
export interface AppBarProps {
    children: React.ReactNode;
    logoSize: "sm" | "lg"
}



export const CustomAppBar = (props: AppBarProps) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const topBarSize = useMediaQuery(theme.breakpoints.up('md'));

    const handleHomeClick = () => {
        navigate('/');
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            {topBarSize && <StyledAppBar position="static" elevation={0}>
                {props.logoSize == "lg" ? 
                    <CustomToolbar onClick={handleHomeClick}>
                        <img
                            src={AppLogo}
                            alt={"app-logo"}
                            style={{cursor: "pointer", width: "90px", height: "auto", filter: "invert(100%)"}}
                        />
                    </CustomToolbar>
                :
                    <CustomToolbar onClick={handleHomeClick}>
                        {/* <img
                            src={AppLogo}
                            alt={"app-logo"}
                            style={{cursor: "pointer", width: "60px", height: "auto", filter: "invert(100%)"}}
                        /> */}
                        <Typography 
                            variant="h3" 
                            component="h1"
                            sx={{
                                fontWeight: "600",
                                color: "white",
                                position: "absolute",
                                top: "6px",
                                left: "80px"
                            }}
                        >
                           the stacks.
                        </Typography>
                        <StyledSearchField
                            id="input-with-icon-textfield"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{color: "white"}}/>
                                    </InputAdornment>
                                ),
                                
                            }}

                        />
                    </CustomToolbar>
                }
            </StyledAppBar>}
            <ContentContainer sx={{marginBottom: "200px"}}>
                {props.children}
            </ContentContainer>
            {!topBarSize && <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleHomeClick}>
                        <CabinIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>}
        </Box>
    )
}

export interface LoginAppBarProps {
    children: React.ReactNode;
}

export const LoginAppBar = (props: LoginAppBarProps) => {
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0} color="transparent">
                <Toolbar>
                    <img
                        src={AppLogo}
                        alt={"app-logo"}
                        style={{cursor: "pointer", width: "90px", height: "auto"}}
                    />
                </Toolbar>
            </AppBar>
            <ContentContainer>
                {props.children}
            </ContentContainer>
        </Box>
    )
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#006300",
    height: "50px"
}));


const ContentContainer = styled(Box)(({ theme }) => ({
    display: "flex", 
    justifyContent: "center"
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: "flex-end",
}));

const StyledSearchField = styled(TextField)(({ theme }) => ({
    margin: "0 0 12px 0",

    '& fieldset': {
        borderColor: '#FFF',
        borderWidth: 3,
        borderRadius: "10px"
    },
    '& .MuiFormControl-root': {
        color: "#FFF"
    },
    '& .MuiInputBase-input': {
        color: "#FFF",
    },

    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: '#FFF',
        },
    },

}));