"use client"
import Image from "next/image";
import Link from "next/link"
import { navItems } from "../data/Navigation";
import { phones, socials } from "../data/Contacts";
// import { usePathname } from "next/navigation"

export const Header = ()=>{
    // const path = usePathname();
    
    return(
        <header className="header">
            <div className="header__top">
                <div className="header__icons">
                {socials.map((item, index)=>(
                    <a href={item.to} key={index}>
                        <Image className="header__socials" src={item.icon} key={index} alt='logo' width={35} height={35}/>
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
            </div>
            <div>
                <ul className="header__nav">           
                    {navItems.map((item)=>(
                        <li key={item.slug}>
                            <Link href={item.slug}>
                                <h5 className="sub">{item.display}</h5>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>  
        </header>
    )
}