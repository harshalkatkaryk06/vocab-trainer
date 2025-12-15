const InputField = ({ type, placeholder, value, onChange, icon }) => {
  return (
    <div className="input-box">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
      />
      <i className={'bx ${icon}'}></i>
    </div>
  );
};

export default InputField;