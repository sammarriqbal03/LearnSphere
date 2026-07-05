import aboutHero from "../assets/about-hero.jpg";

const About = () => {
  return (
    <div>
      {/* Hero Image Section */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={aboutHero}
          alt="About LearnSphere"
          className="w-full h-full object-cover transition duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary-dark/60 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center px-4">
            About LearnSphere Academy
          </h1>
        </div>
      </div>

      <div className="px-10 py-16 max-w-4xl mx-auto text-center">
        <p className="text-gray-600 mb-10">
          LearnSphere Academy is a modern education platform built to help
          students explore courses, track their learning progress, and earn
          certificates — all in one place. We connect students, teachers,
          institutes, and schools through a single, easy to use learning
          system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white border rounded-xl p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <h3 className="font-semibold text-lg text-primary-dark mb-2">
              Our Mission
            </h3>
            <p className="text-gray-500 text-sm">
              Making quality education accessible to everyone, everywhere.
            </p>
          </div>
          <div className="bg-white border rounded-xl p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <h3 className="font-semibold text-lg text-primary-dark mb-2">
              Our Vision
            </h3>
            <p className="text-gray-500 text-sm">
              To become the leading digital learning platform for institutes
              and independent learners.
            </p>
          </div>
          <div className="bg-white border rounded-xl p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <h3 className="font-semibold text-lg text-primary-dark mb-2">
              Our Values
            </h3>
            <p className="text-gray-500 text-sm">
              Quality, accessibility, and a genuine commitment to student
              success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;