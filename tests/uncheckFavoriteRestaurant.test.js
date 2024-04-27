import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
} from '@jest/globals';
import FavouriteRestaurantDB from '../src/scripts/data/favourite-source';
import * as TestFactories from './helpers/testFactories';

describe('Unchecking a favorite restaurant', () => {
  const favoriteButtonContainer = () => {
    document.body.innerHTML = '<div class="restaurant__detail_content__information_favourite-button-container"></div>';
  };

  beforeEach(async () => {
    favoriteButtonContainer();
    await FavouriteRestaurantDB.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavouriteRestaurantDB.deleteRestaurant(1);
  });

  it('Should display uncheck widget when the favorite restaurant has been checked', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="Remove this restaurant from your favourite list"]')).toBeTruthy();
  });

  it('Should not display check widget when the favorite restaurant has been checked', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="Add this restaurant from your favourite list"]')).toBeFalsy();
  });

  it('Should be able to remove favorite restaurant from the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    document.querySelector('.favourited-button').dispatchEvent(new Event('click'));
    expect(await FavouriteRestaurantDB.getAllRestaurants()).toEqual([]);
  });

  it('Should not throw error when user click uncheck widget if the favorite restaurant is not in the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    await FavouriteRestaurantDB.deleteRestaurant(1);
    document.querySelector('.favourited-button').dispatchEvent(new Event('click'));
    expect(await FavouriteRestaurantDB.getAllRestaurants()).toEqual([]);
  });
});
