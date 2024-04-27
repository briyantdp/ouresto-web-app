import FavoriteButtonPresenter from '../../src/scripts/utils/favourite-button-presenter';
import FavouriteRestaurantDB from '../../src/scripts/data/favourite-source';

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  await FavoriteButtonPresenter.init({
    favouriteButtonContainer: document.querySelector('.restaurant__detail_content__information_favourite-button-container'),
    favoriteRestaurants: FavouriteRestaurantDB,
    restaurant,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createFavoriteButtonPresenterWithRestaurant };
