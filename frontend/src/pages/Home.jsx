import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-dark text-white px-10 py-20 rounded-b-3xl">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary-light font-semibold tracking-widest mb-3 text-sm">
            LEARNSPHERE ACADEMY
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Discover. Learn. Grow.
          </h1>
          <p className="text-white/90 mb-8 text-lg">
            A modern learning platform where students explore courses,
            track progress, and earn certificates — built for students,
            teachers, and institutes.
          </p>

          <div className="flex bg-white rounded-lg overflow-hidden max-w-md mx-auto shadow-lg">
            <input
              type="text"
              placeholder="Search for courses..."
              className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
            />
            <button
              style={{ backgroundColor: "#145c3d", color: "#ffffff" }}
              className="px-6 font-medium hover:opacity-90 transition"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-10 py-10 bg-white border-b">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div>
            <h3 className="text-2xl font-bold text-primary-dark">500+</h3>
            <p className="text-gray-500 text-sm">Courses</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary-dark">120+</h3>
            <p className="text-gray-500 text-sm">Expert Teachers</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary-dark">10k+</h3>
            <p className="text-gray-500 text-sm">Students</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary-dark">50+</h3>
            <p className="text-gray-500 text-sm">Institutes</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-10 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-primary-dark mb-2">
            Everything You Need to Learn
          </h2>
          <p className="text-gray-500">
            Built for students, teachers, and institutes alike
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-primary hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2 text-primary-dark">Structured Courses</h3>
            <p className="text-gray-500 text-sm">
              Well organized courses with curriculum, videos, and resources
              designed by expert instructors.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-primary hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2 text-primary-dark">Track Your Progress</h3>
            <p className="text-gray-500 text-sm">
              Monitor your learning progress and stay on top of assignments
              from your personal dashboard.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-primary hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2 text-primary-dark">Earn Certificates</h3>
            <p className="text-gray-500 text-sm">
              Complete courses and receive certificates that showcase your
              new skills and achievements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-10 py-16 bg-primary text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Start Learning?</h2>
        <p className="text-white/90 mb-6">
          Join thousands of students already growing with LearnSphere.
        </p>
        <Link
          to="/register"
          style={{ backgroundColor: "#ffffff", color: "#0d3b28" }}
          className="px-6 py-3 rounded-lg font-medium hover:opacity-90 transition inline-block"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;