import Image from "next/image";
import { ReactNode } from "react";


interface SeoQouteProps {
    text: ReactNode;
    name: string;
    role: string;
    img?: string;
}

export default function SeoQoute ({text, name, role, img}: SeoQouteProps){
    return(
        <section className="qoute">
            <div className="container">
                <div className="content row">
                    <div className="col col-bg green">
                        <Image
                            src='/assets/qoutes.svg' 
                            alt='qoute' 
                            width={69} 
                            height={61}
                            className="qoute__icon"                            
                            />
                        {text}
                        <p className="sub">
                            {name}
                        </p>
                        <i>
                            {role}
                        </i>
                    </div>
                    <div className="qoute__ceo">
                        <Image
                            src={img ?? '/assets/ceo2.png'} 
                            alt='seo'
                            width={598} 
                            height={639} 
                        />
                    </div>
                    <div className="qoute__background  green"></div>
                    
                </div>

            </div>
        </section>
    )
}