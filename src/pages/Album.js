import React, { Component } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    isLoading: false,
    albumCollection: {},
    albumTracks: [],
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    console.log(favoriteSongs);
    const albumData = await getMusics(id);
    const albumCollection = albumData.filter((_, i) => i === 0)[0];
    const albumTracks = albumData.filter((_, i) => i !== 0);
    console.log(albumTracks);
    this.setState({ albumCollection, albumTracks, favoriteSongs, isLoading: false });
  }

  render() {
    const { albumCollection, albumTracks, favoriteSongs, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h4 data-testid="artist-name">{albumCollection.artistName}</h4>
        <h2 data-testid="album-name">{albumCollection.collectionName}</h2>
        { isLoading && <Loading /> }
        {albumTracks.map((e) => {
          const checked = favoriteSongs.some((s) => s.trackId === e.trackId);
          console.log(checked);
          return (
            <MusicCard
              key={ uuid() }
              trackName={ e.trackName }
              previewUrl={ e.previewUrl }
              trackId={ e.trackId }
              object={ e }
              checked={ checked }
            />
          );
        })}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;
