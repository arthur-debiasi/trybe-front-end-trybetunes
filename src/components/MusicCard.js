import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = { isLoading: false };

  handleChange = async () => {
    const { object } = this.props;
    this.setState({ isLoading: true });
    await addSong(object);
    this.setState({ isLoading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <h5>{ trackName }</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
          />
          <span>{isLoading && <Loading />}</span>
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  object: PropTypes.object,
}.isRequired;
