import axios from 'axios';

export const fetchSubjectClass = ({ queryKey }) => {
  const teacherId = queryKey[1];
  return axios.get(`/api/subject/class/${teacherId}`);
};

export const fetchClassYear = (year) => {
  return axios.get(`/api/class/year/${year}`);
};

export const fetchCriteria = () => {
  return axios.get(`/api/criteria/`);
};

export const fetchStudents = () => {
  return axios.get(`/api/student/`);
};
