import axios from 'axios';

export const fetchStudents = () => {
  return axios.get(`/api/student`);
};

export const fetchStudentsClass = () => {
  return axios.get(`/api/student/class`);
};

// UPDATED FETCH
export const fetchAllSubject = () => {
  return axios.get(`/api/subject`);
};

// DELETE BELOW
export const fetchSubjectCode = () => {
  return axios.get('/api/subject/code');
};

// DELETE BELOW - DELETED DIRECTORY ALREADY
export const fetchClassYear = (year) => {
  return axios.get(`/api/class/year/${year}`);
};

// DELETE BELOW
export const fetchCriteria = () => {
  return axios.get(`/api/criteria/`);
};

// DELETE BELOW IF NOT USED
export const fetchSubjectClass = () => {
  return axios.get(`/api/subject/class`);
};

export const fetchSubjectClassforCriteria = () => {
  return axios.get(`/api/subject/class/criteria-management`);
};

export const fetchCriteriaOverallList = (id) => {
  return axios.get(`/api/criteria/overall/${id}`);
};

export const fetchStudentsGrade = () => {
  return axios.get(`/api/student/grade/teacher-list`);
};

export const fetchcriteria = () => {
  return axios.get(`/api/faculty/criteria-list`);
};

// UPDATED FETCH
export const fetchStudentsByYearLevel = (year, month) => {
  return axios.get(`/api/faculty/student/${year}/${month}`);
};

// FACULTY && STUDENT
export const fetchCurrentUser = () => {
  return axios.get(`/api/current-user`);
};
