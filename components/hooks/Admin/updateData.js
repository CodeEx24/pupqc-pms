import axios from 'axios';

export const finalizeSomeClassSubject = (data) => {
  return axios.post(`/api/admin/class-subject/update`, data);
};

export const revokeSomeClassSubject = (data) => {
  return axios.post(`/api/admin/class-subject/revoke`, data);
};
