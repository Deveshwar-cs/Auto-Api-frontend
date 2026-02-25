const Pricing = () => {
  const plans = ["Free", "Pro $29", "Team $99"];

  return (
    <section className="bg-slate-950 text-white px-8 py-20 text-center">
      <h2 className="text-3xl font-bold mb-10">Pricing</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p}
            className="bg-slate-900 p-8 rounded-xl border border-slate-700"
          >
            {p}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
