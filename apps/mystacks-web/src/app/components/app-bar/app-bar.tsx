import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppLogo from '../../../assets/app-logo.png';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface AppBarProps {
    children: React.ReactNode;
    logoSize: "sm" | "lg"
}

export const CustomAppBar = (props: AppBarProps) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                {props.logoSize == "lg" ? 
                    <CustomToolbar onClick={handleLogoClick}>
                        <img
                            src={AppLogo}
                            alt={"app-logo"}
                            style={{cursor: "pointer", width: "90px", height: "auto"}}
                        />
                    </CustomToolbar>
                :
                    <CustomToolbar onClick={handleLogoClick}>
                        <img
                            src={AppLogo}
                            alt={"app-logo"}
                            style={{cursor: "pointer", width: "60px", height: "auto"}}
                        />
                        <Typography 
                            variant="h4" 
                            component="h1"
                            sx={{
                                fontWeight: "500"
                            }}
                        >
                            In My Stacks
                        </Typography>
                    </CustomToolbar>
                }
            </AppBar>
            <ContentContainer>
                {props.children}
            </ContentContainer>
        </Box>
    )
}


const ContentContainer = styled(Box)(({ theme }) => ({
    display: "flex", 
    justifyContent: "center"
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
    padding: "20px 0 0 20px", 
}));