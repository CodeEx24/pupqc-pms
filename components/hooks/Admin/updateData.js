import axios from 'axios';

export const updateAllClassSubject = (data) => {
  return axios.post(`/api/admin/class-subject/update`, data);
};
