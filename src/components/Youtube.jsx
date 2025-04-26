import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Youtube() {
    const { slug } = useParams();
    const { videos } = useSelector((state) => state.videos)
    const [currentTag, setTags] = useState([]);
    useEffect(() => {

        videos.map((video) => {
            if (video.id === slug) {
                console.log(video.tags);
            }
        }

        )

    }, [slug, videos])



    return (
        <div className="flex mt-5">
            <div className="w-full max-w-3xl rounded-lg overflow-hidden shadow-lg mr-4">
                <YouTube videoId={slug} className="w-full" opts={{ width: "100%", height: "400" }} />
            </div>

            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8'>
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


export default Youtube