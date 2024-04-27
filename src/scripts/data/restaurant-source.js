import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();

    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));

    return response.json();
  }

  static async postCustomerReview(id, name, review) {
    const customerReview = {
      id,
      name,
      review,
    };

    const response = await fetch(API_ENDPOINT.CUSTOMER_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerReview),
    });

    return response;
  }
}

export default RestaurantSource;
