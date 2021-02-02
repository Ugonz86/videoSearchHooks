import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import './App.css';

const KEY ='AIzaSyASdAXfv2bMZfjxsjh-GDRfAZ9Ev7Yjc_Q';

class App extends React.Component {
  state = { videos: [], selectedVideo: null };

  //asynchronous api request
  onTermSubmit = async term => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: "snippet",
        maxResults: 5,
        type: 'video',
        key: KEY
      }
    });
    this.setState({ videos: response.data.items })
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
        onVideoSelect={this.onVideoSelect} 
        videos={this.state.videos} />
      </div>
    );
  }
}

export default App;
