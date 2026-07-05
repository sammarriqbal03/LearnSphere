import blog1 from "../assets/blog-1.jpg";
import blog2 from "../assets/blog-2.jpg";
import blog3 from "../assets/blog-3.jpg";

const posts = [
  {
    image: blog1,
    title: "5 Tips to Stay Consistent While Learning Online",
    excerpt:
      "Online learning takes discipline. Here are proven tips to keep you on track.",
    date: "June 20, 2026",
  },
  {
    image: blog2,
    title: "Why Certificates Matter in Today's Job Market",
    excerpt:
      "Certifications can boost your resume. Here's why they matter more than ever.",
    date: "June 12, 2026",
  },
  {
    image: blog3,
    title: "How to Choose the Right Course for Your Career",
    excerpt:
      "With hundreds of courses available, here's how to pick the right one for you.",
    date: "June 5, 2026",
  },
];

const Blog = () => {
  return (
    <div className="px-10 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Blog</h1>
        <p className="text-gray-500">
          Tips, guides, and updates from LearnSphere
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl shadow-sm overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition duration-500 hover:scale-110"
              />
            </div>
            <div className="p-5">
              <p className="text-gray-400 text-xs mb-2">{post.date}</p>
              <h3 className="font-semibold text-lg text-primary-dark mb-2">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;