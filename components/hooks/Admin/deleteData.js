import axios from 'axios';

export const deleteClassSubject = (classSubject_id) => {
  return axios.post(`/api/admin/class-subject/${classSubject_id}`);
};
