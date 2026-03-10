const EmptyState = ({title, description, action}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

      <p className="text-sm text-gray-400 mb-6 max-w-sm">{description}</p>

      {action}
    </div>
  );
};

export default EmptyState;
