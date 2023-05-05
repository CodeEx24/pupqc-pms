import axios from 'axios';

export const updateCriteriaOverallScores = ({
  classSubject_id,
  item,
  inputValue,
  length,
}) => {
  return axios.post(`/api/criteria/overall/update/${classSubject_id}`, {
    item,
    inputValue,
    length,
  });
};
