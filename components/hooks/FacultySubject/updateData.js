import axios from 'axios';

export const updateAddItemCriteriaOverallScores = ({
  classSubject_id,
  item,
  inputValue,
  length,
}) => {
  return axios.post(`/api/criteria/overall/add-score/${classSubject_id}`, {
    item,
    inputValue,
    length,
  });
};

export const updateDeleteItemCriteriaOverallScoresDelete = ({
  classSubject_id,
  item,
  length,
}) => {
  return axios.post(`/api/criteria/overall/delete-score/${classSubject_id}`, {
    item,
    length: length - 1,
  });
};
