import {BASE_API_URL} from "./api";

export const getUser = async (id) => {
  const response = await fetch(`${BASE_API_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to get user');
  }

  return response.json();
}

export const editUser = async (data, token) => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("phone", data.phone);
  formData.append("id", data.id);
  if (data.avatar instanceof File) {
    formData.append("avatar", data.avatar);
  }

  const response = await fetch(`${BASE_API_URL}/users/${data.id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to edit user');
  }

  return response.json();
}
