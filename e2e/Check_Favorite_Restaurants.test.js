/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const assert = require('assert');

Feature('Check Favorite Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favourite');
});

Scenario('Showing empty favorited restaurants', ({ I }) => {
  I.waitForElement('.restaurant__favourite', 5);
  I.seeElement('.restaurant__favourite');
  I.see('', '.favourite__lists');
});

Scenario('Check favorite restaurant', ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('a.btn__detail', 5);
  I.seeElement('a.btn__detail');
  I.click(locate('a.btn__detail').first());

  I.waitForElement('button.favourite-button', 5);
  I.seeElement('button.favourite-button');
  I.click('button.favourite-button');

  I.amOnPage('/#/favourite');
  I.waitForElement('article.favourite__item');
  I.seeElement('article.favourite__item');
});

Scenario('Uncheck favorite restaurant', ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('a.btn__detail', 5);
  I.seeElement('a.btn__detail');
  I.click(locate('a.btn__detail').first());

  I.waitForElement('button.favourite-button', 5);
  I.seeElement('button.favourite-button');
  I.click('button.favourite-button');

  I.amOnPage('/#/favourite');

  I.waitForElement('article.favourite__item', 5);
  I.seeElement('article.favourite__item');
  I.click(locate('a.btn__detail').first());

  I.waitForElement('button.favourited-button', 5);
  I.seeElement('button.favourited-button');
  I.click('button.favourited-button');

  I.amOnPage('/#/favourite');
  I.waitForElement('.restaurant__favourite', 5);
  I.seeElement('.restaurant__favourite');
  I.see('', '.favourite__lists');
});

Scenario('Searching favorited restaurants', async ({ I }) => {
  I.waitForElement('.restaurant__favourite', 5);
  I.seeElement('.restaurant__favourite');
  I.see('Your favourite restaurant is not available now !', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('a.btn__detail', 5);
  I.seeElement('a.btn__detail');

  const restaurantTitles = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 3; i++) {
    I.click(locate('a.btn__detail').at(i));
    I.waitForElement('button.favourite-button', 5);
    I.seeElement('button.favourite-button');
    I.click('button.favourite-button');

    // eslint-disable-next-line no-await-in-loop
    restaurantTitles.push(await I.grabTextFrom('.restaurant__detail_content__title'));

    I.amOnPage('/');
    I.waitForElement('a.btn__detail', 5);
    I.seeElement('a.btn__detail');
  }

  I.amOnPage('/#/favourite');
  I.waitForElement('#searchRestaurant', 5);
  I.seeElement('#searchRestaurant');

  const visibleFavoritedRestaurants = await I.grabNumberOfVisibleElements('.card__title');
  assert.strictEqual(restaurantTitles.length, visibleFavoritedRestaurants);

  const searchQuery = restaurantTitles[1].substring(1, 3);

  I.fillField('#searchRestaurant', searchQuery);
  I.pressKey('Enter');

  const matchedRestaurants = restaurantTitles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.waitForElement('.favourite__item', 5);
  const visibleSearchedFavoritedRestaurants = await I.grabNumberOfVisibleElements('.favourite__item');
  assert.strictEqual(matchedRestaurants.length, visibleSearchedFavoritedRestaurants);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < matchedRestaurants.length; i++) {
    I.waitForElement('.card__title', 5);
    // eslint-disable-next-line no-await-in-loop
    const visibleTitle = await I.grabTextFrom(locate('.card__title').at(i + 1));
    assert.strictEqual(matchedRestaurants[i], visibleTitle);
  }
});

Scenario('Add a customer review', ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('a.btn__detail', 5);
  I.seeElement('a.btn__detail');
  I.click(locate('a.btn__detail').first());

  I.waitForElement('input#name', 5);
  I.waitForElement('textarea#review', 5);
  I.waitForElement('.submit-button', 5);

  I.seeElement('input#name');
  I.fillField('input#name', 'Bryant D.P');

  I.seeElement('textarea#review');
  I.fillField('textarea#review', 'Restoran ini sangat recommended untuk dikunjungi bersama keluarga');

  I.seeElement('.submit-button');
  I.click('.submit-button');

  I.waitForElement('.card__review', 5);
  I.seeElement('.card__review .card__review_username', '.card__review');
  I.seeElement('.card__review .card__review_content', '.card__review');
});
