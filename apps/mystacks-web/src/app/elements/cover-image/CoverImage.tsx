import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button } from '@mui/material';

export const COVER_IMAGE_SIZES = {
    default: { width: 120, height: 180 },
    large: { width: 200, height: 300 },
} as const;

export type CoverImageSize = keyof typeof COVER_IMAGE_SIZES;

export interface CoverImageProps {
    imgUrl?: string;
    alt?: string;
    canEdit?: boolean;
    onEdit?: (newImgUrl: string) => void;
    size?: CoverImageSize;
}

export const CoverImage = (props: CoverImageProps) => {
    const [editing, setEditing] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState(props.imgUrl || '');
    const sizeKey = props.size ?? 'default';
    const { width, height } = COVER_IMAGE_SIZES[sizeKey];

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

    return (
        <Box>
            {props.imgUrl ? (
                <>
                    <StyledImg
                        src={`${props.imgUrl}?w=240&h=360&fit=crop&auto=format`}
                        alt={(props.alt ?? '') + '-img'}
                        $width={width}
                        $height={height}
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
                <NoImage $width={width} $height={height} />
            )}
        </Box>
    );
};

export default CoverImage;

const StyledImg = styled('img')<{ $width: number; $height: number }>(({ $width, $height }) => ({
    cursor: 'pointer',
    width: `${$width}px`,
    height: `${$height}px`,
    objectFit: 'cover',
    display: 'block',
}));

const NoImage = styled(Box)<{ $width: number; $height: number }>(({ $width, $height }) => ({
    background: 'grey',
    width: `${$width}px`,
    height: `${$height}px`,
}));