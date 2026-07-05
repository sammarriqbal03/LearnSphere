import { useState } from "react";

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer: "Simply register for an account, browse our courses, and click 'Enroll Now' on any course you like.",
  },
  {
    question: "Are certificates provided after course completion?",
    answer: "Yes, you receive a certificate automatically once you complete all lessons in a course.",
  },
  {
    question: "Can teachers create their own courses?",
    answer: "Yes, teachers can register with a teacher account and create courses from their dashboard.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, our Basic plan gives you free access to a selection of courses.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-10 py-16 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500">Everything you need to know</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg bg-white overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-5 py-4 flex justify-between items-center font-medium text-gray-800 hover:bg-gray-50"
            >
              {faq.question}
              <span className="text-primary text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-500 text-sm">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;