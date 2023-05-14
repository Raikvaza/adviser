import { createSlice } from '@reduxjs/toolkit';

//REDUX slice for AUTHENTICATION HANDLING

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      username: null,
      isAuth: false,
    },
    reducers: {
      loginSuccess: (state, action) => {
        state.username = action.payload.username;
        state.isAuth = true;
      },
      logout: (state) => {
        state.username = null;
        state.isAuth = false;
      },
    },
  });
 

  
  // export const handleLogout = () => async (dispatch) => {
  //   try {
  //     const response = await fetch('/logout', { method: 'POST' });
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     dispatch(logout());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;