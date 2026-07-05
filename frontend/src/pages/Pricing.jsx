const plans = [
  {
    name: "Basic",
    price: "Free",
    features: ["Access to free courses", "Community support", "Limited certificates"],
  },
  {
    name: "Pro",
    price: "Rs. 2999/mo",
    features: ["Access to all courses", "Priority support", "Unlimited certificates", "Downloadable resources"],
    highlighted: true,
  },
  {
    name: "Institute",
    price: "Custom",
    features: ["Bulk student accounts", "Dedicated support", "Custom branding", "Progress reports"],
  },
];

const Pricing = () => {
  return (
    <div className="px-10 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">
          Simple, Transparent Pricing
        </h1>
        <p className="text-gray-500">Choose the plan that fits your learning needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-8 border shadow-sm text-center ${
              plan.highlighted
                ? "bg-primary text-white border-primary scale-105"
                : "bg-white text-gray-800"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            <ul className="space-y-3 mb-6 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button
              className={`w-full py-2 rounded-lg font-medium transition ${
                plan.highlighted
                  ? "bg-white text-primary-dark hover:bg-gray-100"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;