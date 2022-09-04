import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
    isLoaded: false,
    isSubmitDisabled: true,
    isRedirect: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { name, email, image, description } = await getUser();
    this.setState({ name,
      email,
      image,
      description,
      isLoading: false,
      isLoaded: true }, () => this.handleValidation());
  }

  handleValidation = () => {
    const { name, email, image, description } = this.state;
    const regexp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const trueEmail = email.match(regexp);
    if (name && trueEmail && image && description) {
      this.setState({ isSubmitDisabled: false });
    } else {
      this.setState({ isSubmitDisabled: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.handleValidation();
    });
  };

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ isLoading: true });
    await updateUser({ name, email, image, description });
    this.setState({ isRedirect: true });
  };

  render() {
    const {
      name,
      email,
      image,
      description,
      isLoading,
      isLoaded,
      isSubmitDisabled,
      isRedirect,
    } = this.state;
    const profileForm = (
      <form>
        <div>
          <label htmlFor="edit-input-image">
            Imagem:
            {' '}
            <input
              type="text"
              id="edit-input-image"
              data-testid="edit-input-image"
              name="image"
              value={ image }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="edit-input-name">
            Nome:
            {' '}
            <input
              type="text"
              id="edit-input-name"
              data-testid="edit-input-name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="edit-input-email">
            E-mail:
            {' '}
            <input
              type="text"
              id="edit-input-email"
              data-testid="edit-input-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="edit-input-description">
            Descrição:
            {' '}
            <input
              type="text"
              id="edit-input-description"
              data-testid="edit-input-description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="edit-button-save"
          onClick={ this.handleClick }
          disabled={ isSubmitDisabled }
        >
          Salvar

        </button>
      </form>
    );
    if (isRedirect) return <Redirect to="/profile" />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading && <Loading />}
        {isLoaded && profileForm}
      </div>
    );
  }
}
