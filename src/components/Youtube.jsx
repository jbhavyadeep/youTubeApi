import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import getYoutubeVideos from '../hooks/getYoutubeVideos';
import { storeVideo } from '../store/videoSlice';


function Youtube() {
    const { slug } = useParams();
    const fetchVideos = getYoutubeVideos();
    const dispatch = useDispatch();
    const { videos } = useSelector((state) => state.videos)
    //const [currentTag, setTags] = useState([]);
    useEffect(() => {


    }, [slug, videos])
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


    return (
        <div className="flex flex-col md:flex-row mt-10">
            <div className="w-full max-w-3xl rounded-lg overflow-hidden shadow-lg mr-4">
                <YouTube videoId={slug} className="w-full" opts={{ width: "100%", height: "400" }} />
                {
                    videos.map((video) => (
                        video.id === slug ?
                            <p key={slug}
                                className=" opacity-50 shadow-2xl whitespace-pre-line bg-black text-white p-2 rounded-xl m-2 font-bold text-xl">{video.description}</p> : null
                    ))
                }
            </div>

            <ul className='grid md:flex-row sm:grid-cols-1 gap-8'>
                {


                    videos.slice(0, 4).map((video) => (
                        <li key={video.id}>
                            <Link to={`/watch/${video.id}`}>
                                <div className='max-w-[250px] bg-gray-200 opacity-80 text-black p-4 rounded-2xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl duration-300'>

                                    <img
                                        className="rounded-xl cursor-pointer mx-auto transition-all duration-300 group-hover:brightness-110" src={video.thumbnail}
                                        alt={video.title} />
                                    <p className="truncate mt-3 text-center text-lg font-semibold tracking-wide group-hover:text-pink-400 transition-colors duration-300">
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


export default Youtube