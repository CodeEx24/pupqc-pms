import axios from 'axios';

export const fetchStudentGrade = () => {
  return axios.get(`/api/student/grade`);
};
