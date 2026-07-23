const PageHeader = ({title, subtitle, action}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 md:mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-slate-600 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default PageHeader;
