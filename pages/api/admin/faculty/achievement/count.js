import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import FacultyAchievement from '@/models/FacultyAchievement';

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (session.user.isAdmin === 1 || session.user.isAdmin === 0) {
      return res.status(401).send('Unauthorized Access');
    }
  } else {
    return res.status(401).send('Signin required');
  }

  await db.connect();

  const currentYear = new Date().getFullYear();
  const previousYears = [
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ];

  const facultyAchievement = await FacultyAchievement.find({
    year: { $in: [...previousYears, currentYear] },
  });

  function calculateYearlyCount(facultyAchievement) {
    const yearlyCount = {};
    let highestCount = 0;
    let lowestCount = Infinity;

    facultyAchievement.forEach((teacher) => {
      const year = teacher.year;
      const title = teacher.achievementType;

      if (year in yearlyCount) {
        yearlyCount[year][title] = (yearlyCount[year][title] || 0) + 1;
      } else {
        yearlyCount[year] = { year };

        // Initialize all achievement types to 0
        const achievementTypes = [
          'Publish Research',
          'PhD',
          'Awards',
          'Grants',
        ];
        achievementTypes.forEach((type) => {
          yearlyCount[year][type] = 0;
        });

        yearlyCount[year][title] = 1;
      }

      // Update highest and lowest counts
      const currentCount = yearlyCount[year][title];
      if (currentCount > highestCount) {
        highestCount = currentCount;
      }
      if (currentCount < lowestCount) {
        lowestCount = currentCount;
      }
    });

    // Calculate the interval
    const numberOfIntervals = 5;
    const interval = Math.ceil(
      (highestCount - lowestCount) / numberOfIntervals
    );

    // Convert the result into the desired format
    const result = Object.values(yearlyCount);

    return { result, highestCount, interval };
  }

  // Call the function with your studentPassers array
  const { result, highestCount, interval } =
    calculateYearlyCount(facultyAchievement);

  await db.disconnect();

  res.status(200).json({ result, highestCount, interval }); // Send the updated data in the response
};

export default handler;
