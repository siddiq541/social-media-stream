import api from "./axios";

export const updateUserApi = async (userData, token) => {
  const res = await api.put("/users/me", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.user;
};
