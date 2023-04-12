import axios from 'axios';

export const addSubjectData = (subject) => {
  return axios.post(`http://localhost:3000/api/subject/insert`, subject);
};
