import React from "react";

const Themetoggle = ({ bg, border, theme }) => {
    const changeTheme = (newTheme) => {
        document.documentElement.setAttribute("data-theme", newTheme);
        document.documentElement.classList.toggle("light", newTheme === "light");
    };

    return (
        <div
            onClick={() => changeTheme(theme)}
            className="theme-option"
            style={{ backgroundColor: bg, borderColor: border }}
        ></div>
    );
};

export default Themetoggle;