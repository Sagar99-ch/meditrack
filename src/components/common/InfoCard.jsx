const InfoCard = ({ icon, title, children }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
        <span className="text-xl">{icon}</span>

        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      </div>

      <div className="space-y-4 p-6">{children}</div>
    </div>
  );
};

export default InfoCard;
