const SectionCard = ({title, children}) => {
  return (
    <div className="bg-white dark:bg-[#151026] rounded-xl border border-slate-200 dark:border-purple-900/20 p-6 shadow-sm dark:shadow-none">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
          {title}
        </h3>
      )}

      {children}
    </div>
  );
};

export default SectionCard;
