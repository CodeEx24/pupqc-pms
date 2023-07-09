import axios from 'axios';

export const updateAddItemCriteriaOverallScores = ({
  classSubject_id,
  item,
  inputValue,
  length,
}) => {
  return axios.post(
    `/api/faculty/criteria/overall/add-score/${classSubject_id}`,
    {
      item,
      inputValue,
      length,
    }
  );
};

export const updateDeleteItemCriteriaOverallScores = (data) => {
  return axios.post(`/api/faculty/criteria/overall/delete`, data);
};

export const updateCriteriaOverallScores = (data) => {
  return axios.post(`/api/faculty/criteria/overall/update`, data);
};
