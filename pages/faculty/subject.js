import React from 'react';
import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useQuery } from '@tanstack/react-query';
import { fetchAllSubject } from '../../components/hooks/FacultySubject/fetch';
import SubjectList from '../../components/faculty/grid/SubjectList';
import { useMemo } from 'react';

function SubjectScreen() {
  //  Get the subject code and the subject name
  const { data: subjects, isLoading } = useQuery(['subject'], fetchAllSubject, {
    refetchOnWindowFocus: false,
  });

  const SubjectListMemoized = useMemo(
    () => <SubjectList subjects={subjects} />,
    [subjects]
  );

  return (
    <FacultyLayout title="Subject Setup">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Subject Lists</h1>

        <div className="flex items-end gap-3">
          {isLoading ? 'Loading...' : SubjectListMemoized}
        </div>
      </div>
    </FacultyLayout>
  );
}

SubjectScreen.auth = {
  role: 'faculty',
};

export default SubjectScreen;
