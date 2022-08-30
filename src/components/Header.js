import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    loading: true,
    userName: 'xabla',
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    const { name } = await getUser();
    this.setState({ loading: false, userName: name });
  };

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Arthunes</h1>
        <h3
          data-testid="header-user-name"
        >
          { loading ? <Loading /> : <p>{ userName }</p>}
        </h3>
        <Link to="/search"><p data-testid="link-to-search">Search</p></Link>
        <Link to="/favorites"><p data-testid="link-to-favorites">Favorites</p></Link>
        <Link to="/profile"><p data-testid="link-to-profile">Profile</p></Link>
      </header>
    );
  }
}
