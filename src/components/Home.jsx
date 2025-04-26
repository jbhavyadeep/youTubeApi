import { useEffect } from 'react'
import React from 'react';

import getYoutubeVideos from '../hooks/getYoutubeVideos';
import { useDispatch, useSelector } from 'react-redux';
import { storeVideo } from '../store/videoSlice';
import { Link } from 'react-router-dom';
function Home() {
    const fetchVideos = getYoutubeVideos();
    const { videos } = useSelector((state) => state.videos);
    const dispatch = useDispatch();

    useEffect(() => {
        if (fetchVideos?.data?.data) {
            for (let i = 0; i < fetchVideos?.data?.data.length; i++) {
                const item = fetchVideos?.data.data[i]["items"];
                dispatch(storeVideo({
                    id: item.id,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.medium.url,
                    tags: item.snippet.tags || []
                }));

            }
        }
    }, [fetchVideos])



    return (

        <div>
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                {

                    videos.map((video) => (
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
        </div>




    )
}

export default Home;