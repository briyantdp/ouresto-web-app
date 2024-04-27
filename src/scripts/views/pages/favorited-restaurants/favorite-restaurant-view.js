/* eslint-disable class-methods-use-this */
import { createFavouritedRestaurantItemTemplate } from '../../templates/template-creator';

import RemoveSkeletonLoading from '../../../utils/remove-skeleton-loading';

class FavoriteRestaurantView {
  getTemplate() {
    return `
    <section class="restaurant__favourite" tabindex="0" aria-label="Your Favourite Restaurant List">
        <h1 class="restaurant__favourite_title skeleton">
            Your Favourite Restaurant
        </h1>
        <p class="restaurant__favourite_description skeleton">Find your favorite restaurant that you have been looking for here</p>
        <div class="input-search skeleton">
          <input type="search" id="searchRestaurant" placeholder="Search your favorite..." />
        </div>
        <section class="favourite__lists"></section>
    </section>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('searchRestaurant').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createFavouritedRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
      document.querySelector('.favourite__lists').style.display = 'block';
    }
    document.querySelector('.favourite__lists').innerHTML = html;
    document.querySelector('.favourite__lists').dispatchEvent(new Event('restaurants:updated'));

    RemoveSkeletonLoading();
  }

  _getEmptyRestaurantTemplate() {
    return `
      <h1 class="restaurant-item__not__found skeleton">
        Your favourite restaurant is not available now !
      </h1>
    `;
  }
}

export default FavoriteRestaurantView;
