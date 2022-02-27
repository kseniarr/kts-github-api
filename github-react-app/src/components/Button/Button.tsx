import React from "react";

type ButtonProps = {
    onClick: (e: React.MouseEvent) => void;
    children: React.ReactNode;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    disabled = false,
}) => {
    return (
        <button
            className="search-bar__search-button"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default React.memo(Button);
