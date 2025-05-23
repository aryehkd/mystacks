import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button } from '@mui/material';

export interface CoverImageProps {
    imgUrl?: string;
    alt?: string;
    canEdit?: boolean;
    onEdit?: (newImgUrl: string) => void;
}

export const CoverImage = (props: CoverImageProps) => {
    const [editing, setEditing] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState(props.imgUrl || '');
    
    const handleImageClick = () => {
        if (props.canEdit) {
            setEditing(!editing);  // Toggle editing mode
        }
    };

    const handleSave = () => {
        if (props.onEdit) {
            props.onEdit(imageUrl);  // Trigger the onEdit callback with the new URL
        }
        setEditing(false);  // Exit editing mode
    };

    const handleCancel = () => {
        setImageUrl(props.imgUrl || '');  // Reset the URL to the original one
        setEditing(false);  // Exit editing mode
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(event.target.value);  // Update the image URL state as user types
    };

    console.log(props.imgUrl);

    return (
        <Box>
            {props.imgUrl ? (
                <>
                    <img
                        src={`${props.imgUrl}?w=164&h=164&fit=crop&auto=format`}
                        alt={props.alt + "-img"}
                        style={{ cursor: "pointer", height: "auto", width: "150px" }}
                        onClick={handleImageClick}
                    />
                    {editing && (
                        <Box mt={2}>
                            <TextField
                                label="Image URL"
                                value={imageUrl}
                                onChange={handleUrlChange}
                                fullWidth
                            />
                            <Box mt={1}>
                                <Button variant="contained" color="primary" onClick={handleSave}>
                                    Save
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 1 }}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    )}
                </>
            ) : (
                <NoImage />
            )}
        </Box>
    );
};

export default CoverImage;

const NoImage = styled(Box)(({ theme }) => ({
    background: "grey",
    height: "164px",
    width: "120px",
}));