import StudentLayout from '@/components/student/StudentLayout';
import Link from 'next/link';
import React from 'react';

function TuitionScreen() {
  return (
    <StudentLayout title="Home">
      <div className="text-yellow-500 font-bold text-3xl">
        <Link href="/api/auth/signout">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    </StudentLayout>
  );
}

export default TuitionScreen;
