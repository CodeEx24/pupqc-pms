import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import db from '@/utils/db';
import StudentPassers from '@/models/StudentPassers';

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

  const studentPassers = await StudentPassers.find({});

  function calculateYearlyCount(studentPassers) {
    const yearlyCount = {};
    let highestCount = 0;
    let lowestCount = 0;

    studentPassers.forEach((student) => {
      const year = student.year;
      if (year in yearlyCount) {
        yearlyCount[year]++;
      } else {
        yearlyCount[year] = 1;
      }

      // Update highest count
      if (yearlyCount[year] > highestCount) {
        highestCount = yearlyCount[year];
      }

      // Update highest count
      if (yearlyCount[year] < lowestCount) {
        lowestCount = yearlyCount[year];
      }
    });

    // Calculate the interval
    const numberOfIntervals = 5;
    const interval = Math.ceil(
      (highestCount - lowestCount) / numberOfIntervals
    );

    // Convert the result into the desired format
    const result = Object.entries(yearlyCount).map(([year, count]) => ({
      year: parseInt(year), // Convert year to a number (optional)
      count,
    }));

    return { result, highestCount, interval };
  }

  // Call the function with your studentPassers array
  const { result, highestCount, interval } =
    calculateYearlyCount(studentPassers);

  await db.disconnect();

  res
    .status(200)
    .json({ result, highestCount: highestCount + interval, interval }); // Send the updated data in the response
};

export default handler;
