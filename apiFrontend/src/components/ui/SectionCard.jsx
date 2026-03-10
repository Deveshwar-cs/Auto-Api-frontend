const SectionCard = ({title, children}) => {
  return (
    <div className="bg-[#151026] rounded-xl border border-purple-900/20 p-6">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      )}

      {children}
    </div>
  );
};

export default SectionCard;
