import { afterEach, describe } from '@jest/globals';
import { favoriteRestaurantModel } from './contracts/favoriteRestaurantContract';
import FavouriteRestaurantDB from '../src/scripts/data/favourite-source';

describe('Favorite restaurant IDB contract test implementation', () => {
  afterEach(async () => {
    (await FavouriteRestaurantDB.getAllRestaurants()).forEach(async (restaurant) => {
      await FavouriteRestaurantDB.deleteRestaurant(restaurant.id);
    });
  });

  favoriteRestaurantModel(FavouriteRestaurantDB);
});
