import StudentLayout from '@/components/student/StudentLayout';
import Image from 'next/image';

function HomeScreen() {
  return (
    <StudentLayout title="Home">
      <div className="bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-h4 text-primary mb-8">
          Polytechnic University of the Philippines Quezon City
        </h1>
        <div className="flex">
          <div className="w-1/2">
            <div className="mr-10">
              <Image
                className="w-full rounded-lg mb-8"
                width={300}
                height={300}
                src={`https://www.pup.edu.ph/quezoncity/images/image2.jpg`}
                alt="PUP Image"
              />
              <Image
                className="w-full rounded-lg"
                width={300}
                height={300}
                src={`https://www.pup.edu.ph/quezoncity/images/image4.jpg`}
                alt="PUP Image"
              />
            </div>
          </div>
          <div className="w-8/12">
            <h5 className="text-h5 text-primary mb-2">Vision: </h5>
            <p className="px-2 mb-8 font-poppins">
              PUP: The National Polytechnic University PUP: Pambansang
              Politeknikong Unibersidad
            </p>
            <h5 className="text-h5 text-primary mb-2">Mission:</h5>
            <p className="px-2 font-poppins">
              Ensuring inclusive and equitable quality education and promoting
              lifelong learning opportunities through a re-engineered
              polytechnic university by committing to:
            </p>
            <ul className="list-disc px-10 font-poppins">
              <li>
                Provide democratized access to educational opportunities for the
                holistic development of individuals with global perspective
              </li>
              <li>
                Offer industry-oriented curricula that produce highly-skilled
                professionals with managerial and technical capabilities and a
                strong sense of public service for nation building
              </li>
              <li>Embed a culture of research and innovation</li>
              <li>
                Continuously develop faculty and employees with the highest
                level of professionalism
              </li>
              <li>
                Engage public and private institutions and other stakeholders
                for the attainment of social development goal
              </li>
              <li>
                Establish a strong presence and impact in the international
                academic community
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

HomeScreen.auth = {
  role: 'student',
};

export default HomeScreen;
