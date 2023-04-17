import axios from 'axios';

export const addSubjectData = (data) => {
  return axios.post(`http://localhost:3000/api/subject/insert`, data);
};

export const addSubjectClassData = (data) => {
  return axios.post(`http://localhost:3000/api/class/insert`, data);
};
