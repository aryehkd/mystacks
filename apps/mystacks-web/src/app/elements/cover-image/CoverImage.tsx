import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export interface CoverImageProps {
    imgUrl?: string
    alt?: string
}

export const CoverImage = (props: CoverImageProps) => {
    return (
        <Box>
            {props.imgUrl ? 
            <img
                src={`${props.imgUrl}?w=164&h=164&fit=crop&auto=format`}
                alt={props.alt+"-img"}
                style={{cursor: "pointer", height: "auto"}}
            /> 
            : 
            <NoImage/>
            }
        </Box>
    );
};


export default CoverImage;

const NoImage = styled(Box)(({ theme }) => ({
    background: "grey",
    height: "164px",
    width: "120px",
}));