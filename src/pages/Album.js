import React, { Component } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    albumCollection: {},
    albumTracks: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumData = await getMusics(id);
    const albumCollection = albumData.filter((_, i) => i === 0)[0];
    const albumTracks = albumData.filter((_, i) => i !== 0);
    this.setState({ albumCollection, albumTracks });
  }

  render() {
    const { albumCollection, albumTracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h4 data-testid="artist-name">{albumCollection.artistName}</h4>
        <h2 data-testid="album-name">{albumCollection.collectionName}</h2>
        {albumTracks.map((e) => (
          <MusicCard
            key={ uuid() }
            trackName={ e.trackName }
            previewUrl={ e.previewUrl }
            trackId={ e.trackId }
            object={ e }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;
