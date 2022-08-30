import React, { Component } from 'react';
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
      </header>
    );
  }
}
