"use client"
import Image from "next/image";
import Link from "next/link"
import { navItems } from "../data/Navigation";
import { phones, socials } from "../data/Contacts";
import MenuButton from "./MenuButton";
import { useState } from "react";
import { usePathname } from "next/navigation"

export const Header = ()=>{
    const path = usePathname()?.split("#")[0];
    console.log(path)

    const [open, setOpen] = useState(false);

    const clickMenu = () => {
        setOpen(!open);
    };
    
    return(
        <header className="header">
            <div className="header__top">
                <div className="header__socials">
                {socials.map((item, index)=>(
                    <a href={item.to} key={index}>
                        <Image className="header__icon" src={item.icon} key={index} alt='logo' width={35} height={35}/>
                    </a>
                ))} 
                </div>
                <Image 
                    className="header__logo" 
                    src='/assets/logo.svg' 
                    alt='logo'
                    width={240} 
                    height={129} 
                />
                <div className="header__phones">
                    {phones.map((item, index)=>(
                        <a key={index} href={`tel:${item.replaceAll(" ", "")}`}>
                            {item}
                        </a>
                    ))}
                </div>
                <MenuButton onClick={clickMenu} open={open}/>
                <Humburger open={open}/>
            </div>
            <div>
                <ul className="header__nav">           
                    {navItems.map((item)=>(
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
    )
}

const Humburger = ({ open }: { open: boolean }) => {
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
                            <Link href={item.slug}>
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
                {socials.map((item, index)=>(
                    <a href={item.to} key={index}>
                        <Image className="header__icon" src={item.icon} key={index} alt='logo' width={35} height={35}/>
                    </a>
                ))} 
                </div>
        </div>
    );
};
