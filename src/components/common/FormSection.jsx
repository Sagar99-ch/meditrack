const FormSection = ({ title, children }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">{title}</h2>

      {children}
    </div>
  );
};

export default FormSection;
