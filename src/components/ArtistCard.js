import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ArtistCard extends Component {
  render() {
    const { collectionName, artworkUrl100, artistName } = this.props;
    return (
      <div>
        <h4>{collectionName}</h4>
        <p>{artistName}</p>
        <img src={ artworkUrl100 } alt={ collectionName } />

      </div>
    );
  }
}

ArtistCard.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
}.isRequired;
