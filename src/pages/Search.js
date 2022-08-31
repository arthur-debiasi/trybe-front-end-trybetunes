import PropTypes from 'prop-types';
import React, { Component } from 'react';
import uuid from 'react-uuid';
import ArtistCard from '../components/ArtistCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    searchText: '',
    searchedArtist: '',
    isBtnDisabled: true,
    isLoading: false,
    isLoaded: false,
    response: '' };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 2;
    this.setState({ [name]: value }, () => {
      this.setState({ isBtnDisabled: value.length < minLength });
    });
  };

  handleRequisition = async (searchText) => {
    this.setState({ isLoading: true, searchedArtist: searchText });
    const response = await searchAlbumsAPI(searchText);
    this.setState({ isLoaded: true, response, isLoading: false, searchText: '' });
    // console.log(response);
  };

  artistCard = (response) => {
    if (response.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return response
      .map(({ collectionName, artworkUrl100, artistName }) => (
        <ArtistCard
          key={ uuid() }
          collectionName={ collectionName }
          artworkUrl100={ artworkUrl100 }
          artistName={ artistName }
        />
      ));
  };

  render() {
    const { searchText,
      isBtnDisabled,
      isLoading,
      isLoaded,
      response,
      searchedArtist } = this.state;
    const isFound = response.length > 0;
    const searchTitle = <p>{`Resultado de álbuns de: ${searchedArtist}`}</p>;
    const formConditional = (
      <form>
        <input
          type="text"
          data-testid="search-artist-input"
          name="searchText"
          value={ searchText }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isBtnDisabled }
          onClick={ () => this.handleRequisition(searchText) }
        >
          Pesquisar
        </button>
      </form>
    );

    return (
      <div data-testid="page-search">
        <Header />
        { !isLoading ? formConditional : null }
        { isLoading && <Loading /> }
        { isLoaded && !isLoading && isFound && searchTitle }
        { isLoaded && this.artistCard(response) }
      </div>
    );
  }
}

Search.propTypes = {
  response: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
