import React from 'react';
import { useQuery } from '@tanstack/react-query';

import FacultyLayout from '@/components/faculty/FacultyLayout';

import { fetchSubjectClass } from '../../../components/hooks/FacultySubject/fetch';
import { useMemo } from 'react';

import ClassSubjectList from '../../../components/faculty/grid/ClassSubjectList';

function ClassSubjectScreen() {
  const {
    data: subjectClass,

    isLoading,
  } = useQuery(['subjectClass'], fetchSubjectClass, {
    refetchOnWindowFocus: false,
  });

  const SubjectClassMemoized = useMemo(
    () => <ClassSubjectList subjectClass={subjectClass?.data} />,
    [subjectClass]
  );

  return (
    <FacultyLayout title="Subject Setup">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Class Subject</h1>

        <div className="w-full">
          {isLoading ? 'Loading...' : SubjectClassMemoized}
        </div>
      </div>
    </FacultyLayout>
  );
}

ClassSubjectScreen.auth = {
  role: 'faculty',
};

export default ClassSubjectScreen;
