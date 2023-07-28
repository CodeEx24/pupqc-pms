// /api/admin/teacher/facultytype - USED

import db from '@/utils/db';
import Teacher from '@/models/Teacher';

const handler = async (req, res) => {
  await db.connect();

  try {
    // Use the updateMany method to set the default facultyType for all faculty members
    const updateResult = await Teacher.updateMany(
      {},
      { $set: { facultyType: 1 } }
    );

    console.log('Update result:', updateResult); // Log the update result

    res.send({
      message:
        'All faculty members updated to have the default faculty type successfully.',
    });
  } catch (error) {
    console.error('Error updating faculty members:', error);
    res
      .status(500)
      .send({ error: 'An error occurred during faculty member update.' });
  } finally {
    await db.disconnect();
  }
};

export default handler;
