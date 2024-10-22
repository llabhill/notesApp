import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


//value=pastes
const initialState = {
  value: localStorage.getItem("value")
    ? JSON.parse(localStorage.getItem("value")) //value is a key
    : []
}


export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    add_to_value: (state, action) => {
      const datatoadd = action.payload;
      // state.value.push(datatoadd)//adding data to value 
      // //local storage me data key value pair ki form me store hoga.....here "paste is key"
      // localStorage.setItem("pastes", JSON.stringify(state.value)); //local storage me data add krdiya
      // toast("Paste created successfully")
      const index = state.value.findIndex((item) => item._id === datatoadd._id)

      if (index >= 0) {
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("Note already exist")
        return
      }
      // If the course is not in the Pastes, add it to the Pastes
      state.value.push(datatoadd)
      
      // Update to localstorage
      localStorage.setItem("value", JSON.stringify(state.value))
      // show toast
      toast.success("Note added successfully!!")
    },
    update_value: (state, action) => {
      const datatoupdate = action.payload;
      const index = state.value.findIndex((item) => item._id === datatoupdate._id)
      if (index >= 0) {
        state.value[index] = datatoupdate;
        localStorage.setItem("value", JSON.stringify(state.value));
        toast.success("Note updated successfully!!")
      }
    },
    reset_value: (state, action) => {
      state.value = []
      localStorage.removeItem("value")
    },
    remove_value: (state, action) => {
      const pasteid = action.payload;
      console.log(pasteid)
      const index = state.value.findIndex((item) => item._id === pasteid)
      if (index >= 0) {
        state.value.splice(index, 1);
        localStorage.setItem("value", JSON.stringify(state.value));
        toast.success("Note deleted successfully!!")
      }
    },
  },
})

export const { add_to_value, reset_value, remove_value, update_value } = pasteSlice.actions

export default pasteSlice.reducer