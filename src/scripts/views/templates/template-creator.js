/* eslint-disable no-unused-expressions */
import CONFIG from '../../globals/config';

const createBenefitItemTemplate = (benefit) => `
    <article class="benefit__item">
        <div class="card">
            <div class="card__icon skeleton">
                <i class="fas ${benefit.classIcon}"></i>
            </div>
            <div class="card__content">
                <h2 class="card__title skeleton" tabindex="0">${benefit.title}</h2>
                <span class="card__description skeleton" tabindex="0">${benefit.description}</span>
            </div>
            <button type="submit" class="btn__view skeleton" tabindex="0">
                View Details <i class="fas fa-angle-right"></i>
            </button>
        </div>
    </article>
`;

const createRestaurantItemTemplate = (restaurant) => `
    <article class="popular__item">
        <div class="card skeleton">
            <div class="card__bg">
                <img
                    data-src="${CONFIG.BASE_MEDIUM_IMAGE_URL}/${restaurant.pictureId}"
                    alt="${restaurant.name} picture" 
                    tabindex="0"
                    crossorigin="anonymous"
                    class="lazyload"
                />
            </div>
            <div class="card__content">
            <div class="card__desription">
                <i class="fas fa-star"></i>
                <span class="rating-star" tabindex="0" aria-label="Rating ${restaurant.rating}">${restaurant.rating}</span>
                <h2 class="card__title" tabindex="0" aria-label="Restaurant ${restaurant.name}">${restaurant.name}</h2>
                <i class="fas fa-map-marker-alt"></i>
                <span class="location" tabindex="0" aria-label="${restaurant.city} City">${restaurant.city}</span>
            </div>
            <a href="/#/detail/${restaurant.id}" class="btn__detail" tabindex="0" aria-label="Detail ${restaurant.name}">
                <i class="fas fa-arrow-right"></i>
            </a>
            </div>
        </div>
    </article>
`;

const createDetailRestaurantItemTemplate = (restaurant) => `
    <div class="restaurant__detail_image skeleton">
        <img 
            src="${CONFIG.BASE_MEDIUM_IMAGE_URL}/${restaurant.pictureId}" 
            alt="${restaurant.name} picture"
            tabindex="0"
            crossorigin="anonymous"
        />
    </div>
    <div class="restaurant__detail_content">
        <h1 class="restaurant__detail_content__title skeleton" tabindex="0">${restaurant.name}</h1>
        <div class="restaurant__detail_content__information">
            <div class="restaurant__detail_content__information_address skeleton">
                <i class="fas fa-map-marker-alt skeleton"></i>
                <span class="restaurant__detail_content__location" tabindex="0" aria-label="${restaurant.name} Address">${restaurant.address}, ${restaurant.city}</span>
            </div>
            <div class="restaurant__detail_content__information_rating skeleton">
                <i class="fas fa-star"></i>
                <span class="restaurant__detail_content__rating" tabindex="0" aria-label="Rating ${restaurant.rating}">${restaurant.rating}</span>
            </div>
            <div class="restaurant__detail_content__information_favourite-button-container skeleton"></div>
        </div>
        <div class="restaurant__detail_content__description">
            <h2 class="restaurant__detail_content__description_title skeleton" tabindex="0" aria-label="Description">Description</h2>
            <p class="restaurant__detail_content__description_content skeleton" tabindex="0" aria-label="${restaurant.name} Restaurant Desription">${restaurant.description}</p>
        </div>
    </div>
    <div class="restaurant__detail_content__menu">
        <h2 tabindex="0" aria-label="Foods" class="skeleton">Foods</h2>
        <ul class="restaurant__detail_content__menu_foods skeleton" tabindex="0" aria-label="${restaurant.name} Foods"></ul>

        <h2 tabindex="0" aria-label="Drinks" class="skeleton">Drinks</h2>
        <ul class="restaurant__detail_content__menu_drinks skeleton" tabindex="0" aria-label="${restaurant.name} Drinks"></ul>
    </div>
    <div class="restaurant__detail__review">
        <h2 class="skeleton" tabindex="0" aria-label="${restaurant.name}Reviews">Reviews</h2>
        <div class="restaurant__detail__review_container skeleton"></div>
    </div>
`;

const createReviewPostItemTemplate = (id) => `
        <h2 class="skeleton" tabindex="0" aria-label="Give Your Review Now !">Give Your Review Now !</h2>
        <form id="form">
            <div class="input-id">
                <input type="text" id="restaurantId" value="${id}" disabled style="display: none" />
            </div>
            <div class="input-username skeleton">
                <label for="name">Username</label>
                <br>
                <input type="text" id="name" placeholder="Enter your username..." required />
            </div>
            <div class="textarea-review skeleton">
                <label for="review">Review</label>
                <br>
                <textarea id="review" rows="10" placeholder="Enter your review..." required></textarea>
            </div>
            <button class="submit-button skeleton" type="submit">
                <i class="fa-solid fa-arrow-right"></i>
                Submit
            </button>
        </form>

`;

const createCheckFavoriteButtonTemplate = () => `
    <button class="favourite-button" aria-label="Add this restaurant from your favourite list">
        <i class="fa-regular fa-thumbs-up"></i>
        Favourite
    </button>
`;

const createUncheckFavoriteButtonTemplate = () => `
    <button class="favourited-button" aria-label="Remove this restaurant from your favourite list">
        <i class="fa-solid fa-thumbs-up"></i>
        Favourited
    </button>
`;

const createFavouritedRestaurantItemTemplate = (restaurant) => `
<article class="favourite__item">
    <div class="card skeleton">
        <div class="card__bg">
            <img
                data-src="${CONFIG.BASE_MEDIUM_IMAGE_URL}/${restaurant.pictureId}"
                alt="${restaurant.name} picture" 
                tabindex="0"
                crossorigin="anonymous"
                class="lazyload"
            />
        </div>
        <div class="card__content">
            <div class="card__desription">
                <i class="fas fa-star"></i>
                <span class="rating-star" tabindex="0" aria-label="Rating ${restaurant.rating}">${restaurant.rating}</span>
                <h2 class="card__title" tabindex="0" aria-label="${restaurant.name} Restaurant">${restaurant.name}</h2>
                <span class="skeleton">
                    <i class="fas fa-map-marker-alt"></i>
                </span>
                <span class="location" tabindex="0" aria-label="${restaurant.city} City">${restaurant.city}</span>
            </div>
            <a href="/#/detail/${restaurant.id}" class="btn__detail" tabindex="0" aria-label="Detail ${restaurant.name}">
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</article>
`;

export {
  createBenefitItemTemplate,
  createRestaurantItemTemplate,
  createDetailRestaurantItemTemplate,
  createReviewPostItemTemplate,
  createUncheckFavoriteButtonTemplate,
  createCheckFavoriteButtonTemplate,
  createFavouritedRestaurantItemTemplate,
};
