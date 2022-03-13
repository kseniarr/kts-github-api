import React from "react";

type InputProps = {
    value?: string;
    placeholder?: string;
    onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
    value = "",
    placeholder = "Введите название организации!",
    onChange,
}) => {
    const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        []
    );
    return (
        <input
            className="search-bar__input"
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default React.memo(Input);
