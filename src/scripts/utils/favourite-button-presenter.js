// import FavouriteRestaurantDB from '../data/favourite-source';
import { createCheckFavoriteButtonTemplate, createUncheckFavoriteButtonTemplate } from '../views/templates/template-creator';

const FavoriteButtonPresenter = {
  async init({ favouriteButtonContainer, restaurant, favoriteRestaurants }) {
    this._favouriteButtonContainer = favouriteButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = favoriteRestaurants;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderButtonLiked();
    } else {
      this._renderButtonLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id);
    return !!restaurant;
  },

  _renderButtonLike() {
    this._favouriteButtonContainer.innerHTML = createCheckFavoriteButtonTemplate();

    const likeButton = document.querySelector('.favourite-button');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderButtonLiked() {
    this._favouriteButtonContainer.innerHTML = createUncheckFavoriteButtonTemplate();

    const likeButton = document.querySelector('.favourited-button');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default FavoriteButtonPresenter;
