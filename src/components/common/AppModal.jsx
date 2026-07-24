const AppModal = ({
  open,
  onClose,
  title,
  size = "max-w-2xl",
  children,
  footer,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className={`w-full ${size} overflow-hidden rounded-3xl bg-white shadow-2xl`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="text-3xl font-light text-slate-500 transition hover:text-red-500"
          >
            ×
          </button>
        </div>

        {/* Body */}

        <div className="max-h-[75vh] overflow-y-auto p-6">{children}</div>

        {/* Footer */}

        {footer && <div className="border-t bg-slate-50 p-6">{footer}</div>}
      </div>
    </div>
  );
};

export default AppModal;
