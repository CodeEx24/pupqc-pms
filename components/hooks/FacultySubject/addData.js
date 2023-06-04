import axios from 'axios';

export const addSubjectData = (data) => {
  return axios.post(`/api/subject/insert`, data);
};

// DELETE BELOW
export const addSubjectClassData = (data) => {
  return axios.post(`/api/class/insert`, data);
};
