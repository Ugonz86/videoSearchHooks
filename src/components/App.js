import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import './App.css';

const KEY = 'AIzaSyASdAXfv2bMZfjxsjh-GDRfAZ9Ev7Yjc_Q';

class App extends React.Component {
  state = { videos: [], selectedVideo: null, errorMessage: '' };

  //default result
  componentDidMount() {
    this.onTermSubmit('buildings');
  }

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

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
    // if (this.state.videos.length == 0) this.setState({ errorMessage: 'No results found! Try again' });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className="ui container" style={{marginTop: '25px'}}>
        <SearchBar  onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div style={{backgroundColor: '#f7f7f7', width: '345px'}}>
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
