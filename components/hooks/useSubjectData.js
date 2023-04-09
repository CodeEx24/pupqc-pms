import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSubject = ({ queryKey }) => {
  const teacherId = queryKey[1];
  return axios.get(`http://localhost:3000/api/subject/${teacherId}`);
};

export const useSubjectData = (teacherId) => {
  return useQuery(['subject', teacherId], fetchSubject);
};
