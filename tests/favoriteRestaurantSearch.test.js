/* eslint-disable max-len */
import {
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
// import FavouriteRestaurantDB from '../src/scripts/data/favourite-source';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/favorited-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/favorited-restaurants/favorite-restaurant-view';

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const searchRestaurantInput = document.querySelector('#searchRestaurant');
    searchRestaurantInput.value = query;

    searchRestaurantInput.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({ favoriteRestaurants, view });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('Should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restoran a');

      expect(presenter.latestQuery).toEqual('restoran a');
    });

    it('Should ask the model to search for favorited restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restoran a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restoran a');
    });

    it('Should show the restaurants found by favorite restaurants', (done) => {
      document.querySelector('.favourite__lists').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.favourite__item').length).toEqual(3);

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'm') {
          return [
            { id: 'rqdv5juczeskfw1e867', name: 'Melting Pot' },
            { id: 'ygewwl55ktckfw1e867', name: 'Istana Emas' },
            { id: 'fnfn8mytkpmkfw1e867', name: 'Makan mudah' },
          ];
        }

        return [];
      });

      searchRestaurants('m');
    });

    it('Should show the name of the restaurants found by favorite restaurants', (done) => {
      document.querySelector('.favourite__lists').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.card__title');

        expect(restaurantTitles.item(0).textContent).toEqual('Melting Pot');
        expect(restaurantTitles.item(1).textContent).toEqual('Istana Emas');
        expect(restaurantTitles.item(2).textContent).toEqual('Makan mudah');

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'm') {
          return [
            { id: 'rqdv5juczeskfw1e867', name: 'Melting Pot' },
            { id: 'ygewwl55ktckfw1e867', name: 'Istana Emas' },
            { id: 'fnfn8mytkpmkfw1e867', name: 'Makan mudah' },
          ];
        }

        return [];
      });

      searchRestaurants('m');
    });

    // it('Should show - when the restaurant returned does not contain a title', (done) => {
    //   document.querySelector('.favourite__lists').addEventListener('restaurants:updated', () => {
    //     const restaurantTitles = document.querySelectorAll('h2.card__title');
    //     console.log(restaurantTitles);
    //     expect(restaurantTitles.item(0).textContent).toEqual('-');

    //     done();
    //   });

    //   favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
    //     if (query === 'restoran a') {
    //       return [{ id: 6 }];
    //     }
    //     return [];
    //   });

    //   searchRestaurants('restoran a');
    // });
  });

  describe('When query is empty', () => {
    it('Should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants('   ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('Should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants('');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('Should show the empty message', (done) => {
      document.querySelector('.favourite__lists').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      // eslint-disable-next-line no-unused-vars
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restoran a');
    });

    it('Should not show any restaurant', (done) => {
      document.querySelector('.favourite__lists').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.favourite__item').length).toEqual(0);
        done();
      });

      // eslint-disable-next-line no-unused-vars
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restoran a');
    });
  });
});
