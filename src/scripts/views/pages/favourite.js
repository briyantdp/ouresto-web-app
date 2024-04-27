/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-new */
/* eslint-disable max-len */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import FavouriteRestaurantDB from '../../data/favourite-source';
import FavoriteRestaurantView from './favorited-restaurants/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './favorited-restaurants/favorite-resetaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './favorited-restaurants/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();

const Favourite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavouriteRestaurantDB });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavouriteRestaurantDB });
  },
};

export default Favourite;
