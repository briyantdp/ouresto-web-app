import {
  beforeEach,
  describe,
  expect,
  it,
} from '@jest/globals';
import FavouriteRestaurantDB from '../src/scripts/data/favourite-source';
import * as TestFactories from './helpers/testFactories';

describe('checking a favorite restaurant', () => {
  const favoriteButtonContainer = () => {
    document.body.innerHTML = '<div class="restaurant__detail_content__information_favourite-button-container"></div>';
  };

  beforeEach(() => {
    favoriteButtonContainer();
  });

  it('Should show the check widget when the restaurant has not been liked before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="Add this restaurant from your favourite list"]')).toBeTruthy();
  });

  it('Should not show the uncheck button when the restaurant has not been liked before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="Remove this restaurant from your favourite list"]')).toBeFalsy();
  });

  it('Should be able to like the restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    document.querySelector('.favourite-button').dispatchEvent(new Event('click'));
    const restaurant = await FavouriteRestaurantDB.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });
    await FavouriteRestaurantDB.deleteRestaurant(1);
  });

  it('Should not add a restaurant again when its already favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    await FavouriteRestaurantDB.putRestaurant({ id: 1 });
    document.querySelector('.favourite-button').dispatchEvent(new Event('click'));
    expect(await FavouriteRestaurantDB.getAllRestaurants()).toEqual([{ id: 1 }]);
    await FavouriteRestaurantDB.deleteRestaurant(1);
  });

  it('Should not add a restaurant again when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({});
    document.querySelector('.favourite-button').dispatchEvent(new Event('click'));
    expect(await FavouriteRestaurantDB.getAllRestaurants()).toEqual([]);
  });
});
