import axios from 'axios';

const KEY ='AIzaSyASdAXfv2bMZfjxsjh-GDRfAZ9Ev7Yjc_Q';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    param: {
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: KEY
    }
});