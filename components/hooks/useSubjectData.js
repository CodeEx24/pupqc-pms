import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSubject = ({ queryKey }) => {
  const teacherId = queryKey[1];
  return axios.get(`/api/subject/${teacherId}`);
};

export const fetchSubjectClass = ({ queryKey }) => {
  const teacherId = queryKey[1];
  return axios.get(`/api/subject/class/${teacherId}`);
};

export const useSubjectData = (teacherId) => {
  return useQuery(['subject', teacherId], fetchSubject);
};
