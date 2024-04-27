/* eslint-disable import/no-extraneous-dependencies */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import dataBenefit from '../../../public/data/benefit.json';
import RestaurantSource from '../../data/restaurant-source';

import { createBenefitItemTemplate, createRestaurantItemTemplate } from '../templates/template-creator';

import RemoveSkeletonLoading from '../../utils/remove-skeleton-loading';

const Home = {
  async render() {
    return `
      <div class="hero__image skeleton">
        <picture>
          <source 
            media="(max-width: 600px)" 
            type="image/jpeg" 
            srcset="./images/heros/hero-image_2-small.jpg" 
            alt="Tables filled with luxurious food and drinks"
            tabindex="0" 
          />
          <source 
            media="(max-width: 1000px)"
            type="image/jpeg"
            srcset="./images/heros/hero-image_2-large.jpg"
            alt="Tables filled with luxurious food and drinks"
            tabindex="0"
          />
          <img
            src="./images/heros/hero-image_2.jpg"
            alt="Tables filled with luxurious food and drinks"
            tabindex="0"
          />
        </picture>
      </div>
      <section class="benefit">
        <div class="benefit__title">
          <h1 class="benefit__heading skeleton" tabindex="0">Why Should Choose Us?</h1>
        </div>
        <div class="benefit__lists"></div>
      </section>
      <section class="popular">
        <div class="popular__title">
            <h1 class="popular__heading skeleton" tabindex="0">
            Most Popular Restaurants
            </h1>
            <p class="popular__description skeleton" tabindex="0">
            The best restaurant in our opinion is how much customers like it
            terms in place, price, comfort, and of course the taste of the food
            itself.
            </p>
            <button type="submit" class="btn__view skeleton" tabindex="0">
            View All Restaurant <i class="fas fa-angle-right"></i>
            </button>
        </div>
        <div class="popular__lists"></div>
      </section>
    `;
  },

  async afterRender() {
    const benefitListContainer = document.querySelector('.benefit__lists');
    const restaurantListContainer = document.querySelector('.popular__lists');

    try {
      benefitListContainer.innerHTML = '';
      dataBenefit.benefits.forEach((benefit) => {
        benefitListContainer.innerHTML += createBenefitItemTemplate(benefit);
      });
      restaurantListContainer.innerHTML = '';
      const restaurantList = await RestaurantSource.listRestaurants();
      restaurantList.forEach((restaurant) => {
        restaurantListContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
      RemoveSkeletonLoading();
    } catch (error) {
      RemoveSkeletonLoading();
      console.log('An error has accured at : ', error);
    }
  },
};

export default Home;
