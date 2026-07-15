const PageHeader = ({ title, description, children }) => {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

        {description && <p className="mt-1 text-slate-500">{description}</p>}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default PageHeader;
