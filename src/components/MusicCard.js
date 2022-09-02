import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = { isLoading: false, checked: false };

  componentDidMount() {
    this.checkedValidation();
  }

  checkedValidation = () => {
    const { favoriteSongs, object } = this.props;
    const checkedSong = favoriteSongs.some(({ trackId }) => trackId === object.trackId);
    this.setState({ checked: checkedSong });
  };

  handleChange = async () => {
    const { object } = this.props;
    const { checked } = this.state;
    if (checked) {
      this.setState({ isLoading: true });
      await removeSong(object);
      this.setState({ isLoading: false, checked: false });
    } else {
      this.setState({ isLoading: true });
      await addSong(object);
      this.setState({ isLoading: false, checked: true });
      console.log();
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, checked } = this.state;
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
            checked={ checked }
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
