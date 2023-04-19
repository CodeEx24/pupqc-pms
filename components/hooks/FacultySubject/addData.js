import axios from 'axios';

export const addSubjectData = (data) => {
  return axios.post(`/api/subject/insert`, data);
};

export const addSubjectClassData = (data) => {
  return axios.post(`/api/class/insert`, data);
};
