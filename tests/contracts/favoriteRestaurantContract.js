import { expect, it } from '@jest/globals';

const favoriteRestaurantModel = (favoriteRestaurants) => {
  it('Should return the restaurant that has been added', async () => {
    favoriteRestaurants.putRestaurant({ id: 1 });
    favoriteRestaurants.putRestaurant({ id: 2 });

    expect(await favoriteRestaurants.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurants.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurants.getRestaurant(3)).toBeUndefined();
  });

  it('Should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriteRestaurants.putRestaurant({ exampleProperty: 'property' });

    expect(await favoriteRestaurants.getAllRestaurants()).toEqual([]);
  });

  it('Should remove favorite restaurant', async () => {
    favoriteRestaurants.putRestaurant({ id: 1 });
    favoriteRestaurants.putRestaurant({ id: 2 });
    favoriteRestaurants.putRestaurant({ id: 3 });

    await favoriteRestaurants.deleteRestaurant(1);

    expect(await favoriteRestaurants.getAllRestaurants()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('Should handle request to remove a restaurant even though restaurant has nit been added', async () => {
    favoriteRestaurants.putRestaurant({ id: 1 });
    favoriteRestaurants.putRestaurant({ id: 2 });
    favoriteRestaurants.putRestaurant({ id: 3 });

    await favoriteRestaurants.deleteRestaurant(4);

    // eslint-disable-next-line max-len
    expect(await favoriteRestaurants.getAllRestaurants()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('Should be able to search for restaurants', async () => {
    favoriteRestaurants.putRestaurant({ id: 1, name: 'restoran a' });
    favoriteRestaurants.putRestaurant({ id: 2, name: 'restoran b' });
    favoriteRestaurants.putRestaurant({ id: 3, name: 'restoran c' });

    expect(await favoriteRestaurants.getAllRestaurants()).toEqual([
      { id: 1, name: 'restoran a' },
      { id: 2, name: 'restoran b' },
      { id: 3, name: 'restoran c' },
    ]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { favoriteRestaurantModel };
