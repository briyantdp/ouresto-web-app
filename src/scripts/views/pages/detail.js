/* eslint-disable import/no-extraneous-dependencies */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import FavouriteRestaurantDB from '../../data/favourite-source';

import { createDetailRestaurantItemTemplate, createReviewPostItemTemplate } from '../templates/template-creator';

import FavoriteButtonPresenter from '../../utils/favourite-button-presenter';
import RemoveSkeletonLoading from '../../utils/remove-skeleton-loading';

const Detail = {
  async render() {
    return `
      <section class="restaurant__detail" tabindex="0" aria-label="Section Restaurant Detail"></section>
      <section class="review__form"></section>
    `;
  },

  async afterRender() {
    const restaurantDetailContainer = document.querySelector('.restaurant__detail');
    const restaurant = await this.getRestaurantDetailFromId();
    restaurantDetailContainer.innerHTML = createDetailRestaurantItemTemplate(restaurant);

    FavoriteButtonPresenter.init({
      favouriteButtonContainer: document.querySelector('.restaurant__detail_content__information_favourite-button-container'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
      favoriteRestaurants: FavouriteRestaurantDB,
    });

    this.showFoodMenu();
    this.showDrinkMenu();
    this.showCustomerReviews();
    this.getRestaurantIdForCustomerReview();

    RemoveSkeletonLoading();
  },

  async getRestaurantDetailFromId() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { restaurant } = await RestaurantSource.detailRestaurant(url.id);
    return restaurant;
  },

  async showFoodMenu() {
    const restaurant = await this.getRestaurantDetailFromId();
    const foodListContainer = document.querySelector('.restaurant__detail_content__menu_foods');
    restaurant.menus.foods.forEach((food) => {
      const listElement = document.createElement('li');
      listElement.setAttribute('tabindex', '0');
      listElement.setAttribute('aria-label', food.name);
      listElement.innerText = food.name;

      foodListContainer.appendChild(listElement);
    });
  },

  async showDrinkMenu() {
    const restaurant = await this.getRestaurantDetailFromId();
    const drinkListContainer = document.querySelector('.restaurant__detail_content__menu_drinks');
    restaurant.menus.drinks.forEach((drink) => {
      const listElement = document.createElement('li');
      listElement.setAttribute('tabindex', '0');
      listElement.setAttribute('aria-label', drink.name);
      listElement.innerText = drink.name;

      drinkListContainer.appendChild(listElement);
    });
  },

  async showCustomerReviews() {
    const restaurant = await this.getRestaurantDetailFromId();
    const customerReviewContainer = document.querySelector('.restaurant__detail__review_container');
    customerReviewContainer.innerHTML = '';
    restaurant.customerReviews.forEach((customerReview) => {
      const cardReviewElement = document.createElement('div');
      cardReviewElement.classList.add('card__review');
      cardReviewElement.innerHTML = `
        <div class="card__review_information">
          <p class="card__review_username" tabindex="0" aria-label="Username">${customerReview.name}</p>
          <p class="card__review_date" tabindex="0" aria-label="Date Created">${customerReview.date}</p>
        </div>
        <div class="card__review_content" tabindex="0" aria-label="Review">
          ${customerReview.review}
        </div>
      `;
      customerReviewContainer.appendChild(cardReviewElement);
    });
  },

  async getRestaurantIdForCustomerReview() {
    const restaurant = await this.getRestaurantDetailFromId();
    const reviewPostContainer = document.querySelector('.review__form');
    reviewPostContainer.innerHTML = createReviewPostItemTemplate(restaurant.id);

    RemoveSkeletonLoading();

    this.postCustomerReview();
  },

  postCustomerReview() {
    const form = document.querySelector('#form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const restaurantIdValue = document.querySelector('input#restaurantId').value;
      const usernameValue = document.querySelector('input#name').value;
      const reviewValue = document.querySelector('textarea#review').value;

      this.renderCustomerReview(restaurantIdValue, usernameValue, reviewValue);
    });
  },

  async renderCustomerReview(id, username, review) {
    await RestaurantSource.postCustomerReview(id, username, review)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          // eslint-disable-next-line max-len
          const lastDataFromCustomerReviews = data.customerReviews[data.customerReviews.length - 1];
          const customerReviewContainer = document.querySelector('.restaurant__detail__review_container');
          const cardReview = document.createElement('div');
          cardReview.classList.add('card__review');

          cardReview.innerHTML = `
            <div class="card__review_information">
              <p class="card__review_username" tabindex="0" aria-label="Username">${lastDataFromCustomerReviews.name}</p>
              <p class="card__review_date" tabindex="0" aria-label="Date Created">${lastDataFromCustomerReviews.date}</p>
            </div>
            <div class="card__review_content" tabindex="0" aria-label="Review">
              ${lastDataFromCustomerReviews.review}
            </div>
          `;
          customerReviewContainer.appendChild(cardReview);
        }
      })
      .catch((error) => {
        console.log('Cannot add your review', error);
      });
  },
};

export default Detail;
