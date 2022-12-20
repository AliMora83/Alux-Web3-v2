import React from "react";

type Props = {
    children: React.ReactNode;
};

function ButtonNeon({ children }: Props) {
    return (
        <div className="group relative">
            <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#2c2b2b] to-[#2c2b2b]
                dark:bg-gradient-to-r dark:from-[#855d0c] dark:to-[#e0aa53] opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
            {children}
        </div>
    );
}

export default ButtonNeon;
