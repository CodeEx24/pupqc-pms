import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchCriteria = () => {
  return axios.get(`http://localhost:3000/api/criteria/`);
};

export const useCriteriaData = () => {
  return useQuery({
    queryKey: ['criteria'],
    queryFn: fetchCriteria,
  });
};
