const StatCard = ({title, value, icon}) => {
  return (
    <div className="bg-[#151026] p-6 rounded-xl border border-purple-900/20 hover:border-purple-600/40 transition">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm text-gray-400">{title}</h4>
        {icon && <div className="text-purple-400">{icon}</div>}
      </div>

      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

export default StatCard;
