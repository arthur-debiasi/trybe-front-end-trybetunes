import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    profileName: '',
    isSaveBtnDisabled: true,
    loading: false,
    redirect: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { profileName } = this.state;
      const minProfileNameLength = 3;
      if (profileName.length >= minProfileNameLength) {
        this.setState({ isSaveBtnDisabled: false });
      } else {
        this.setState({ isSaveBtnDisabled: true });
      }
    });
  };

  handleClick = async () => {
    const { profileName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: profileName });
    this.setState({ redirect: true });
  };

  render() {
    const { profileName, isSaveBtnDisabled, loading, redirect } = this.state;
    return (
      redirect ? <Redirect to="/search" />
        : (
          <div data-testid="page-login">
            { !loading
              ? (
                <form>
                  <input
                    name="profileName"
                    value={ profileName }
                    data-testid="login-name-input"
                    type="text"
                    onChange={ this.handleChange }
                  />
                  <button
                    data-testid="login-submit-button"
                    type="button"
                    disabled={ isSaveBtnDisabled }
                    onClick={ this.handleClick }
                  >
                    Entrar
                  </button>
                </form>
              )
              : <Loading />}
          </div>
        )
    );
  }
}
