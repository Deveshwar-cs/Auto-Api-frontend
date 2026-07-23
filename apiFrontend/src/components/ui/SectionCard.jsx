const SectionCard = ({title, children}) => {
  return (
<<<<<<< HEAD
    <div className="bg-[#151026] rounded-xl border border-purple-900/20 p-0 sm:p-6">
=======
    <div className="bg-white dark:bg-[#151026] rounded-xl border border-slate-200 dark:border-purple-900/20 p-6 shadow-sm dark:shadow-none">
>>>>>>> b5e3ffa (feat: Adding dark and light mode completely)
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
