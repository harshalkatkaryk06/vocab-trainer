const InputField = ({ type, placeholder, value, onChange, icon }) => {
  return (
    <div className="mb-4 relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none"
      />
      <i className={'bx ${icon} absolute left-3 top-3 text-gray-600'} />
    </div>
  );
};

export default InputField;