import { useState, useEffect } from 'react'
import React from 'react';
import YouTube from "react-youtube";

import getYoutubeVideos from './hooks/getYoutubeVideos'
import YoutubeClip from './components/Youtube';
import { useDispatch, useSelector } from 'react-redux';
import { storeVideo } from './store/videoSlice';
import { Link, Outlet } from 'react-router-dom';

//need video thumbnail medium
// video id
//tags to search
//title


function App() {



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      <header className="text-center pt-10">
        <Link to={"/"}>
          <h1 className="text-4xl p-2 md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            YouTube Videos to Learn Programming
          </h1>
        </Link>

      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App
