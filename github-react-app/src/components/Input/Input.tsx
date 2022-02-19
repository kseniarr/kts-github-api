type InputProps = {
    value: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
    value = "",
    placeholder = "",
    onChange,
}) => {
    return (
        <input
            className="search-bar__input"
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Input;
