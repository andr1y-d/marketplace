import {BASE_API_URL} from './api';

export const getFavourites = async (token) => {
  const response = await fetch(`${BASE_API_URL}/favourites`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to get favourites');
  }

  return response.json();
}

export const addToFavourites = async (data, token) => {
  const response = await fetch(`${BASE_API_URL}/favourites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add product to favourites');
  }

  return response.json();
}

export const deleteFavourite = async (id, token) => {
  const response = await fetch(`${BASE_API_URL}/favourites/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed delete product from favourites');
  }

  return response.json();
}