import React from 'react';
import { useRouter } from 'next/router';
import FacultyLayout from '@/components/faculty/FacultyLayout';
import { fetchCriteriaOverallList } from '../../../components/hooks/FacultySubject/fetch';
import { useQuery } from '@tanstack/react-query';
import CriteriaButtonElement from '../../../components/faculty/CriteriaButtonElement';

function CriteriaManagementIDScreen() {
  const router = useRouter();

  // Render the criteria with matching class_id
  // Fetch the data needed for criteria
  const { data: criteriaOverallList, isLoading } = useQuery(
    ['criteria', router.query.id],
    () => fetchCriteriaOverallList(router.query.id),
    {
      enabled: !!router.query.id,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  // After mapping push in the criteriaOverALL value  (BUTTON)
  // Once click show the modal

  // STEPS:
  // API for updating the value of the CriteriaOverallScores
  //

  return (
    <FacultyLayout title="Subject Setup">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="title">Class Subject</h1>
        <div className="">
          {isLoading ? (
            'LOADING...'
          ) : (
            <CriteriaButtonElement
              criteriaOverallList={criteriaOverallList}
              classSubject_id={criteriaOverallList.data.classSubject_id}
            />
          )}
        </div>
      </div>
    </FacultyLayout>
  );
}

export default CriteriaManagementIDScreen;
