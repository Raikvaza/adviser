import { createSlice } from '@reduxjs/toolkit';
import { fetchImage } from '../../api/Avatar/Avatar';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    imageURL: null
  },
  reducers: {
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    }
  }
});

export const { setImageURL } = imageSlice.actions;

export const fetchAndSetImageURL = (avatarName) => async (dispatch) => {
  try {
    const url = await fetchImage(avatarName);
    dispatch(setImageURL(url));
  } catch (error) {
    console.error(error);
  }
};

export default imageSlice.reducer;