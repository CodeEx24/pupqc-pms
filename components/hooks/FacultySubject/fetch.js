import axios from 'axios';

export const fetchStudents = () => {
  return axios.get(`/api/faculty/student`);
};

export const fetchStudentsClass = () => {
  return axios.get(`/api/faculty/student/class`);
};

// UPDATED FETCH
export const fetchAllSubject = () => {
  return axios.get(`/api/faculty/subject`);
};

// DELETE BELOW IF NOT USED
export const fetchSubjectClass = () => {
  return axios.get(`/api/faculty/subject/class`);
};

export const fetchSubjectClassforCriteria = () => {
  return axios.get(`/api/subject/class/criteria-management`);
};

export const fetchCriteriaOverallList = (id) => {
  return axios.get(`/api/faculty/criteria/overall/${id}`);
};

export const fetchStudentsGrade = () => {
  return axios.get(`/api/faculty/student/grade/teacher-list`);
};

export const fetchcriteria = () => {
  return axios.get(`/api/faculty/criteria-list`);
};

// UPDATED FETCH
export const fetchStudentsByYearLevel = (year, month) => {
  return axios.get(`/api/faculty/student/${year}/${month}`);
};

export const fetchPassedFailedStudent = (year) => {
  return axios.get(`/api/faculty/subject/passed-failed/${year}`);
};

export const fetchAverageClassGradeYearly = (year) => {
  return axios.get(`/api/faculty/class/grade/${year}`);
};

export const fetchHandleClassAndSubject = (year, semester) => {
  return axios.get(`/api/faculty/class/subject/count`, {
    params: { year, semester },
  });
};

// FACULTY && STUDENT
export const fetchCurrentUser = () => {
  return axios.get(`/api/current-user`);
};
