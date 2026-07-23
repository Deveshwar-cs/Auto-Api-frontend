const StatCard = ({title, value, icon}) => {
  return (
    <div className="bg-white dark:bg-[#151026] p-6 rounded-xl border border-slate-200 dark:border-purple-900/20 hover:border-purple-400/60 dark:hover:border-purple-600/40 transition shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm text-slate-600 dark:text-gray-400">{title}</h4>
        {icon && (
          <div className="text-purple-500 dark:text-purple-400">{icon}</div>
        )}
      </div>

      <p className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
