"use client";
import Image from "next/image";
import { phones, email, adresse } from "../data/Contacts";
import GoogleMap from "../data/GoogleMap";
import Link from "next/link";
import { socilalLinks } from "../data/Navigation";

export const Footer = ()=>{
    const year = new Date().getFullYear();

    return(
        <footer id="contacts" className='footer'>
            <div className="container">
                <div className="footer__title">
                    <h2>
                        Наше розташування
                    </h2>
                    <p>{adresse}</p>
                </div>
            </div>
            <div className="green">
            <GoogleMap />
            
            <div className="container">
                <div className="footer__main">
                    <div className="body">
                        <div className="col">
                            <Image 
                                className="footer__logo" 
                                src='/assets/logo-white.svg' 
                                alt='logo'
                                width={240} 
                                height={129}
                            />                            
                        </div>
                        <div className="footer__actions col-bg">
                            <div className="footer__contacts col">
                                <h5>Плануєте захід?</h5>
                                <div>
                                    <p>
                                        Пишіть нам на пошту або телефонуйте
                                    </p>
                                </div>
                                <Link href='events#about-events'>
                                    <button className="btn btn--medium btn--white ">
                                            Дізнатись більше
                                    </button>
                                </Link>
                            </div>
                            <div className="footer__contacts col">
                                <h5>Квитки</h5>
                                <div>
                                    <p>
                                    Можна придбати на вході 
                                    </p>

                                </div>
                                {/* <button className="btn btn--medium btn--white ">
                                        Замовити
                                </button> */}
                            </div>
                            <div className="col">
                                <h5>Контакти</h5>
                                <div className="footer__links">
                                    <ul>
                                        {phones.map((item, index)=>(
                                            <li key={index}>
                                                <a key={index} href={`tel:${item.replaceAll(" ", "")}`}>
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul>
                                        <li>
                                            <a href={`mailto:${email}`}>{email}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="footer__policies">
                    <div className="body">
                        <Link href='/'>kvitolis.com.ua ⓒ {year}</Link>
                        <ul>
                            <li>
                                <a href={socilalLinks.facebook}>
                                    facebook
                                </a>
                            </li>
                            <li>
                                <a href={socilalLinks.instagram}>
                                    instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </footer>
    )
}

