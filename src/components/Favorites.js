import React, { Component } from 'react';
import uuid from 'react-uuid';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

export default class Favorites extends Component {
  state = {
    isLoading: false,
    isLoaded: false,
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ favorites, isLoading: false, isLoaded: true });
  }

  render() {
    const { isLoading, favorites, isLoaded } = this.state;
    const musicCard = favorites.map((e) => (
      <MusicCard
        key={ uuid() }
        trackName={ e.trackName }
        previewUrl={ e.previewUrl }
        trackId={ e.trackId }
        object={ e }
        favoriteSongs={ favoriteSongs }
      />
    ));
    return (
      <div>
        <div>Favorites</div>
        {isLoading && <Loading />}
        {isLoaded && musicCard}
      </div>
    );
  }
}
