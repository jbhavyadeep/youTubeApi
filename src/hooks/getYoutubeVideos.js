import { useEffect, useState } from "react";

function getYoutubeVideos() {
    const [data, setData] = useState();

    const url = 'https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=1000&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest';
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    useEffect(() => {
        fetch(url, options)
            .then((res) => res.json())
            .then(res => setData(res))
            .catch(error => console.log(error));
    }, []);

    return data;

}

export default getYoutubeVideos;