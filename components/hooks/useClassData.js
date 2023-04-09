import axios from 'axios';
import { useQueries } from 'react-query';

const fetchClass = (class_id) => {
  return axios.get(`http://localhost:3000/api/class/${class_id}`);
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
