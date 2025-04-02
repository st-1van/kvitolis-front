"use client";
interface MenuButtonProps {
    open: boolean;
    onClick: () => void;
}

export default function MenuButton({ open, onClick }: MenuButtonProps) {


    return (
            <div onClick={onClick} id="menu-button" className={open ? 'open' : ""}>
                <span></span>
                <span></span>
                <span></span>
            </div>
    );
}
