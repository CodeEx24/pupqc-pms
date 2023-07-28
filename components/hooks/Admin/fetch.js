import axios from 'axios';

export const fetchTeacherList = () => {
  return axios.get(`/api/admin/teacher-list`);
};

export const fetchSubjectCode = () => {
  return axios.get('/api/admin/subject/code');
};

export const fetchSubjectList = () => {
  return axios.get('/api/admin/subject');
};

export const fetchClassYear = (year) => {
  return axios.get(`/api/admin/class/year/${year}`);
};

export const fetchTeacher = () => {
  return axios.get(`/api/admin/teacher/active`);
};

export const fetchCriteria = () => {
  return axios.get(`/api/admin/criteria`);
};

export const fetchSubjectClass = () => {
  return axios.get(`/api/admin/subject/class`);
};

export const fetchAllClass = () => {
  return axios.get(`/api/admin/class/list`);
};

export const fetchAllActiveData = () => {
  return axios.get(`/api/admin/all-active`);
};

export const fetchCourseStudentCount = () => {
  return axios.get(`/api/admin/course/student/count`);
};

export const fetchGradeYearly = () => {
  return axios.get(`/api/admin/grade/yearly`);
};

export const fetchGraduatedStudent = (year) => {
  return axios.get(`/api/admin/student/graduated/${year}`);
};

export const fetchStudentPassers = () => {
  return axios.get(`/api/admin/student/passers`);
};

export const fetchStudentPassersList = () => {
  return axios.get(`/api/admin/student/passers/list`);
};
