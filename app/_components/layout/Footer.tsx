"use client";
import Image from "next/image";
import Link from "next/link";
import { phones, socials, email, adresse } from "../data/Contacts";
import GoogleMap from "../data/GoogleMap";

export const Footer = ()=>{
    const year = new Date().getFullYear();

    return(
        <footer className='footer'>
            <div className="container">
                <div className="body footer__title">
                <h2>
                    Нас легко знайти
                </h2>
                <p>{adresse}</p>
                </div>
            </div>
            <section className="green">
            <GoogleMap />
            <div className="container">
                <div className="footer__main body">
                    <div className="body">
                        <div className="footer__contacts col-sm">
                            <Image 
                                className="footer__logo" 
                                src='/assets/logo-white.svg' 
                                alt='logo'
                                width={240} 
                                height={129}
                            />
                            <ul className="footer__links">
                            {phones.map((item, index)=>(
                                <li key={index}>
                                    <a key={index} href={`tel:${item.replaceAll(" ", "")}`}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                            </ul>
                            <ul className="footer__links">
                            <li>
                                <a href={`mailto:${email}`}>{email}</a>
                            </li>
                            </ul>
                            
                        </div>
                        <div className="footer__actions col-bg">
                            <div className="col col-bg">
                                <h5>Квитки на фест</h5>
                                <div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                                <button className="btn btn--medium btn--white ">
                                    Замовити
                                </button>
                            </div>
                            <div className="col col-bg">
                                <h5>Відпочинок</h5>
                                <div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                                <button className="btn btn--medium btn--white ">
                                    Замовити
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="footer__policies">
                    <div className="body">
                        <p>kvitolis.com.ua ⓒ {year}</p>
                            <ul className='footer__policies-nav'>
                            {socials.map((item)=>(
                                <li key={item.slug}>
                                    <Link href={item.to} key={item.slug}>
                                        {item.text}
                                        <Image 
                                            className="footer__icons" 
                                            src={item.icon||''} 
                                            alt={item.text||'logo'} 
                                            width={25} 
                                            height={25}
                                            key={item.slug}
                                        />
                                    </Link>
                                </li>
                            ))}
                            </ul>
                    </div>
                </div>
            </div>
            </section>
        </footer>
    )
}

