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
import { useScrollLock } from "../context/scroll-lock-context";

export const Header = () => {
    const path = usePathname()?.split("#")[0];
    const [ showBurger, setShowBurger ] = useState(false);

    const clickOnMenu = () => {
        setShowBurger(!showBurger);
    };

    return (
        <header className="header">
            <div className="header__top container">
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
                <MenuButton onClick={clickOnMenu} open={showBurger} />
                <Humburger open={showBurger} onClose={() => setShowBurger(false)} />
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

type BurgerProps = {
    open: boolean;
    onClose: () => void;
  };

const Humburger = ({ open, onClose }: BurgerProps) => {
    const { lockScroll, unlockScroll } = useScrollLock();


    useEffect(() => {
        if (open) lockScroll();
        else unlockScroll();
      
        return () => unlockScroll();
      }, [open, lockScroll, unlockScroll]);

      if (!open) return null;
   
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
                            <Link href={item.slug} onClick={onClose}>
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

