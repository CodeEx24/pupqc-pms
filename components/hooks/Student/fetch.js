import axios from 'axios';

export const fetchStudentGrade = () => {
  return axios.get(`/api/student/grade`);
};

export const fetchStudentPerformance = (id) => {
  return axios.get(`/api/student/own-performance/${id}`);
};
