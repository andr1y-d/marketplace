import {BASE_API_URL} from "./api";

export const getAllProducts = async () => {
  const response = await fetch(`${BASE_API_URL}/products/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to get products');
  }

  return response.json();
}

export const getAllUserProducts = async (id) => {
  const response = await fetch(`${BASE_API_URL}/users/${id}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to get user products');
  }

  return response.json();
}

export const getLatestProducts = async () => {
  const response = await fetch(`${BASE_API_URL}/products/latest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to get latest products');
  }

  return response.json();
}

export const showProduct = async (id) => {
  const response = await fetch(`${BASE_API_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to get product data');
  }

  return response.json();
}

export const addProduct = async (data, token) => {
  const response = await fetch(`${BASE_API_URL}/products`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: data
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create product');
  }

  return response.json();
}

export const updateProduct = async (data, token) => {
  const formData = data.data;
  formData.append('_method', 'PUT');

  const response = await fetch(`${BASE_API_URL}/products/${data.id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product');
  }

  return response.json();
}

export const deleteProduct = async (id, token) => {
  const response = await fetch(`${BASE_API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product');
  }

  return response.json();
}