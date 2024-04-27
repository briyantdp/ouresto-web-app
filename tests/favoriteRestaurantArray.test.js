import { afterEach, describe } from '@jest/globals';
import { favoriteRestaurantModel } from './contracts/favoriteRestaurantContract';

let favoriteRestaurants = [];

const FavouriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return favoriteRestaurants.find((restaurant) => restaurant.id === id);
  },

  getAllRestaurants() {
    return favoriteRestaurants;
  },

  putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return favoriteRestaurants.push(restaurant);
  },

  deleteRestaurant(id) {
    favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id !== id);
  },

  searchRestaurants(query) {
    return this.getAllRestaurants().filter((restaurant) => {
      const loweredCaseRestaurantTitle = (restaurant.name || '-').toLowerCase();
      const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

describe('Favorite restaurant array contract test implementation', () => {
  afterEach(() => {
    favoriteRestaurants = [];
  });

  favoriteRestaurantModel(FavouriteRestaurantArray);
});
