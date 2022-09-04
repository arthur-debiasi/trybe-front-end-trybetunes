import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = { name: '', email: '', image: '', description: '', isLoading: false };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { name, email, image, description } = await getUser();
    this.setState({ name, email, image, description, isLoading: false });
  }

  render() {
    const { name, email, image, description, isLoading } = this.state;
    const profileHtml = (
      <div>
        <div>
          <img
            data-testid="profile-image"
            id="profile-image"
            src={ image }
            alt={ `foto de ${name}` }
          />
        </div>
        <div>
          <label htmlFor="profile-name">
            Nome:
            {' '}
            <span id="profile-name">{name}</span>
          </label>
        </div>
        <div>
          <label htmlFor="profile-email">
            E-mail:
            {' '}
            <p id="profile-email">{email}</p>
          </label>
        </div>
        <div>
          <label htmlFor="profile-description">
            Descrição:
            {' '}
            <p id="profile-description">{description}</p>
          </label>
        </div>
        <Link to="profile/edit"><p>Editar perfil</p></Link>
      </div>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : profileHtml}
      </div>
    );
  }
}
