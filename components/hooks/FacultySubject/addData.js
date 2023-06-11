import axios from 'axios';

// DELETE BELOW
export const addSubjectData = (data) => {
  return axios.post(`/api/subject/insert`, data);
};

// DELETE BELOW
export const addSubjectClassData = (data) => {
  return axios.post(`/api/class/insert`, data);
};
