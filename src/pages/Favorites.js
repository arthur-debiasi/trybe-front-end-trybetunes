import React, { Component } from 'react';
// import uuid from 'react-uuid';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.handleFavoriteSongs();
  }

  async shouldComponentUpdate(_, nextState) {
    const { favoriteSongs } = this.state;
    return favoriteSongs !== nextState.favoriteSongs;
  }

  async componentDidUpdate() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  }

  handleFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, isLoading: false });
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;
    const musicCard = favoriteSongs.map((e) => (
      <MusicCard
        key={ e.trackId }
        trackName={ e.trackName }
        previewUrl={ e.previewUrl }
        trackId={ e.trackId }
        object={ e }
        favoriteSongs={ favoriteSongs }
      />
    ));
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        {isLoading ? <Loading /> : musicCard}

      </div>
    );
  }
}
