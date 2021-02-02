import axios from 'axios';

require('dotenv').config()

const KEY = `${process.env.YOUTUBE_API_KEY}`;

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    param: {
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: KEY
    }
});