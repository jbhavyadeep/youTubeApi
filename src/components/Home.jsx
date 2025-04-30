import { useEffect, useState } from 'react'
import React from 'react';

import getYoutubeVideos from '../hooks/getYoutubeVideos';
import { useDispatch, useSelector } from 'react-redux';
import { storeVideo } from '../store/videoSlice';
import { Link } from 'react-router-dom';

function Home() {
    const fetchVideos = getYoutubeVideos();
    const { videos } = useSelector((state) => state.videos);
    const dispatch = useDispatch();
    const [filteredVideos, setFilteredVideos] = useState([]);

    useEffect(() => {
        if (fetchVideos?.data?.data) {
            for (let i = 0; i < fetchVideos?.data?.data.length; i++) {
                const item = fetchVideos?.data.data[i]["items"];
                dispatch(storeVideo({
                    id: item.id,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.medium.url,
                    tags: item.snippet.tags || [],
                    description: item.snippet.description
                }));

            }
        }

    }, [fetchVideos])

    useEffect(() => {
        setFilteredVideos(videos);
    }, [videos])

    const searchVideo = () => {
        let string = document.getElementById("search").value;
        let regex = new RegExp(string, "i");
        setFilteredVideos([]);

        videos.map((video) => {

            if (video.title.search(regex) >= 0 || video.tags.includes(string)) {
                setFilteredVideos(prev => [...prev, video]);

            }
        })
    }



    return videos.length !== 0 ? (<div>
        <header className="text-center mb-5 pb-5">
            <p className="text-sm text-gray-300">Click a thumbnail to play the video</p>

        </header>
        <div className='flex flex-row gap-1 items-center justify-center mb-5'>
            <input type='text' placeholder='Search Video...' id="search"
                className='border px-2 py-1 rounded w-64'></input>
            <button
                className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600'
                onClick={() => searchVideo()}>Search</button>
        </div>

        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {

                filteredVideos.map((video) => (
                    <li key={video.id}>
                        <Link to={`/watch/${video.id}`}>
                            <div className='bg-gray-200 bg-opacity-10 text-black p-4 rounded-2xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl duration-300'>

                                <img
                                    className="rounded-xl cursor-pointer mx-auto transition-all duration-300 group-hover:brightness-110" src={video.thumbnail}
                                    alt={video.title} />
                                <p className="mt-3 text-center text-lg font-semibold tracking-wide group-hover:text-pink-400 transition-colors duration-300">
                                    {video.title}
                                </p>
                            </div>
                        </Link>



                    </li>
                ))
            }
        </ul>
    </div>) :
        (<p className='text-4xl text-center mt-5'>Loading...</p>)


}

export default Home;