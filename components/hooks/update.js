import axios from 'axios';

export const updatePassword = (data) => {
  return axios.post(`/api/password/change`, { ...data });
};
