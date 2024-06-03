import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "User",
    initialState: {
        value: {
            email: "",
            idToken: "",
            localId: "",
            profileImage: "",
            services: [],
            notes: [],
            favorite: "",
            location: {
                latitude: "",
                longitude: ""
            },
            location2: {
                latitude: "",
                longitude: ""
            },
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        signOut: (state) => {
            state.value = {
                email: "",
                idToken: "",
                localId: "",
                services: [],
                notes: [],
                favorite: "",
                profileImage: "",
                location: {
                    latitude: "",
                    longitude: ""
                },
                location2: {
                    latitude: "",
                    longitude: ""
                },
            }
        },
        saveImage: (state, action) => {
            state.value.profileImage = action.payload
        },
        setUserLocation: (state, action) => {
            state.value.location = action.payload
        },  
        setUserLocation2: (state, action) => {
            state.value.location2 = action.payload
        },
        setUserFavorite: (state, action) => {
            state.value.favorite = action.payload 
        },
        setUserServices: (state, action) => {
            state.value.services = action.payload 
        },
        setUserNotes: (state, action) => {
            state.value.notes = action.payload
        }
    }
})

export const {
    setUser, 
    signOut, 
    saveImage,
    setUserLocation,
    setUserLocation2,
    setUserFavorite,
    setUserServices,
    setUserNotes,
} = userSlice.actions

export default userSlice.reducer