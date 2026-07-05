const events = [
  { title: "Web Development Bootcamp", date: "July 15, 2026", type: "Workshop" },
  { title: "AI in Education Webinar", date: "July 22, 2026", type: "Webinar" },
  { title: "Career Guidance Session", date: "August 3, 2026", type: "Seminar" },
];

const Events = () => {
  return (
    <div className="px-10 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">
          Upcoming Events
        </h1>
        <p className="text-gray-500">Join our webinars, workshops, and seminars</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {events.map((event, index) => (
          <div key={index} className="bg-white border rounded-xl shadow-sm p-6">
            <span className="inline-block bg-primary/10 text-primary-dark text-xs font-medium px-3 py-1 rounded-full mb-3">
              {event.type}
            </span>
            <h3 className="font-semibold text-lg text-primary-dark mb-2">
              {event.title}
            </h3>
            <p className="text-gray-500 text-sm">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;