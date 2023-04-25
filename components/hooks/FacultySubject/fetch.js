import axios from 'axios';

export const fetchStudents = () => {
  return axios.get(`/api/student/`);
};

// UPDATED FETCH
export const fetchAllSubject = () => {
  return axios.get(`/api/subject`);
};

export const fetchSubjectCode = () => {
  return axios.get('/api/subject/code');
};

export const fetchClassYear = (year) => {
  return axios.get(`/api/class/year/${year}`);
};

export const fetchCriteria = () => {
  return axios.get(`/api/criteria/`);
};

export const fetchSubjectClass = () => {
  return axios.get(`/api/subject/class`);
};

export const fetchCurrentUser = () => {
  return axios.get(`/api/current-user`);
};
