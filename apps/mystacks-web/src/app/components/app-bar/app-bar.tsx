import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, InputAdornment, TextField, Autocomplete } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import AppLogo from '../../../assets/app-logo.png';
import CabinIcon from '@mui/icons-material/Cabin';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';
import { useAppBar } from '@mystacks/book-search-form';
import { BookSearchItem, AppStateType } from '@mystacks/types';

/* eslint-disable-next-line */
export interface AppBarProps {
    children: React.ReactNode;
    appState:  AppStateType
    logoSize: "sm" | "lg"
}



export const CustomAppBar = (props: AppBarProps) => {
    const theme = useTheme();
    const topBarSize = useMediaQuery(theme.breakpoints.up('md'));
    const { searchItems, handleSearchFieldSelect, handleHomeClick, customSearchFilter, handleTextFieldValueChange } = useAppBar(props.appState) 

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
                    <CustomToolbar>
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
                                left: "80px",
                            }}
                            onClick={handleHomeClick}
                        >
                           the stacks.
                        </Typography>
                        <Autocomplete
                                freeSolo
                                sx={{minWidth: "300px"}}
                                id="free-solo-2-demo"
                                disableClearable
                                filterOptions={customSearchFilter}
                                options={searchItems.map((option: BookSearchItem) => option.title+" by "+option.author)}
                                renderInput={(params: any) => (
                                    <StyledSearchField
                                        {...params}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleTextFieldValueChange}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{color: "white"}}/>
                                                </InputAdornment>
                                            ),
                                            type: 'search',
                                    
                                        }}
                                    />
                                )}
                                onChange={(event: any, newValue: string | null) => {
                                    handleSearchFieldSelect(newValue)
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

// TODO: fix hover / focus issue

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