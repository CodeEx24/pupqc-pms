import axios from 'axios';

export const addSubjectData = (data) => {
  return axios.post(`/api/admin/subject/insert`, data);
};

export const addSubjectClassData = (data) => {
  return axios.post(`/api/admin/class-subject/insert`, data);
};
