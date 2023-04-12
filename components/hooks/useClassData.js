import axios from 'axios';
import { useQueries, useQuery } from '@tanstack/react-query';

const fetchClass = (class_id) => {
  return axios.get(`http://localhost:3000/api/class/${class_id}`);
};

const fetchClassYear = (year) => {
  return axios.get(`http://localhost:3000/api/class/year/${year}`);
};

// useClassDataQueries.js

export const useClassDataQueries = (class_ids) => {
  const classListId = class_ids ? class_ids : [];
  return useQueries(
    classListId.map((id) => ({
      queryKey: ['class', id],
      queryFn: () => fetchClass(id),
    }))
  ).map((data) => data.data?.data);
};

export const useClassYearData = (year) => {
  console.log('RENDER CLASS YEARS');
  return useQuery(['class', year], () => fetchClassYear(year));
};
