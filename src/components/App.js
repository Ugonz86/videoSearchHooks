import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import './App.css';

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideos] = useState(null);

  useEffect(() => {
    onTermSubmit('buildings');
  }, []);

  const onTermSubmit = async term => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: "snippet",
        maxResults: 5,
        type: 'video',
        key: KEY
      }
    });

    setVideos(response.data.items);
    setSelectedVideos(response.data.items[0]);

  };

  return (
    <div className="ui container" style={{ marginTop: '25px' }}>
      <SearchBar onFormSubmit={onTermSubmit} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div style={{ backgroundColor: '#f7f7f7', width: '345px' }}>
            <VideoList
              onVideoSelect={setSelectedVideos}
              videos={videos}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

