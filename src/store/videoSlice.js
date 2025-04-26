import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    videos: []
}

export const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        storeVideo: (state, action) => {

            const video = {
                id: action.payload.id,
                title: action.payload.title,
                thumbnail: action.payload.thumbnail,
                tags: action.payload.tags
            };
            const exists = state.videos.some(video => video.id === action.payload.id);
            if (!exists) {
                state.videos.push(video);

            }

        },

    }
});

export const { storeVideo } = videoSlice.actions;
export default videoSlice.reducer;