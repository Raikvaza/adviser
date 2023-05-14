import React, { useState } from 'react';
import { deleteImage, uploadImage } from '../../api/Avatar/Avatar';
import { Box, Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { delay } from '../../api/API';
const ImageUploadForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const imageURL = useSelector((state) => state.image.imageURL);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    const fileSizeLimit = 5 * 1024 * 1024; // 5 MB

    if (selectedFile && allowedExtensions.includes(selectedFile.type) && selectedFile.size <= fileSizeLimit) {
      setFile(selectedFile);
      setErrorMessage('');
    } else {
      setFile(null);
      setErrorMessage('Please upload a png, jpg, or jpeg image with a size of up to 5 MB.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageURL){
      await deleteImage(dispatch);
      // await delay(500);
    }
    
    if (file) {
      const image = await uploadImage(file);
      // await delay(500);
      navigate(0);
    }
  };

  return (
    <Box mt={8}
      sx={{
        display:"flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}
    >
        <FormControl>
          <Input
            id="image-upload"
            type="file"
            inputProps={{ accept: 'image/jpeg, image/png, image/jpg' }}
            onChange={handleImageChange}
          />
          {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
        </FormControl>
        <Button onClick={handleSubmit} variant="contained" color="success">
          Өзгерту
        </Button>
     
    </Box>
  );
};

export default ImageUploadForm;