const InfoRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-none last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
};

export default InfoRow;
