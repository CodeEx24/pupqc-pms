import axios from 'axios';

export const addSubjectClassData = (data) => {
  return axios.post(`/api/admin/class-subject/insert`, data);
};
