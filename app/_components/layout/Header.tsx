"use client"
import Image from "next/image";
import Link from "next/link"
import { navItems } from "../data/Navigation";
import { phones } from "../data/Contacts";
import MenuButton from "./MenuButton";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"
import  FacebookIcon from '../ui/FacebookIcon'
import InstagramIcon from "../ui/InstagramIcon";

export const Header = () => {
    const path = usePathname()?.split("#")[0];

    const [open, setOpen] = useState(false);

    const clickMenu = () => {
        setOpen(!open);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    };

    useEffect(() => {
        document.getElementsByTagName('html')[0].style.overflow = open ? 'hidden' : 'auto';
      }, [open]);

    return (
        <header className="header">
            <div className="header__top">
                <div className="header__socials">
                    <a href="#">
                        <FacebookIcon type='filled' />
                    </a>
                    <a href="#">
                        <InstagramIcon type='filled' />
                    </a>
                </div>
                <Image
                    className="header__logo"
                    src="/assets/logo.svg"
                    alt="logo"
                    width={240}
                    height={129}
                />
                <div className="header__phones">
                    {phones.map((item, index) => (
                        <a key={index} href={`tel:${item.replaceAll(" ", "")}`}>
                            {item}
                        </a>
                    ))}
                </div>
                <MenuButton onClick={clickMenu} open={open} />
                <Humburger open={open} closeMenu={() => setOpen(false)} />
            </div>
            <div>
                <ul className="header__nav">
                    {navItems.map((item) => (
                        <li key={item.slug}>
                            <Link
                                href={item.slug}
                                className={path === item.slug ? "active" : ""}
                            >
                                {item.display}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

const Humburger = ({ open, closeMenu }: { open: boolean, closeMenu: () => void }) => {
    return (
        <div className={`humburger ${open ? "open" : ""}`}>
            <div className="humburger__top">
                <Image
                    className="humburger__logo"
                    src="/assets/logo.svg"
                    alt="logo"
                    width={240}
                    height={129}
                />
            </div>
            <div className="humburger__mid">
                <ul className="humburger__nav">
                    {navItems.map((item) => (
                        <li key={item.slug}>
                            <Link href={item.slug} onClick={closeMenu}>
                                {item.display}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="humburger__contacts">
                {phones.map((item, index) => (
                    <a key={index} href={`tel:${item.replaceAll(" ", "")}`}>
                        {item}
                    </a>
                ))}
            </div>
            <div className="humburger__socials">
                <a href="#">
                    <FacebookIcon type='filled' />
                </a>
                <a href="#">
                    <InstagramIcon type='filled' />
                </a>
            </div>
        </div>
    );
};

