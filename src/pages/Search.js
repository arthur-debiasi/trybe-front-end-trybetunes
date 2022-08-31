import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = { searchText: '', isBtnDisabled: true };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 2;
    this.setState({ [name]: value }, () => {
      this.setState({ isBtnDisabled: value.length < minLength });
    });
  };

  render() {
    const { searchText, isBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
