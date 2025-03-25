import Image from "next/image";

const text ='“Ми вказівник, а не відповідь. Через сад ми бачимо красу минулого і теперішнього, що через садівництво вказує на майбутнє. Це може стати таки парком українства”'

export default function SeoQoute (){
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
                        
                        <p className="qoute__text">
                            {text}
                        </p>
                        <p className="sub">
                            Олександр Подзізей
                        </p>
                        <i>
                            Засновник парку
                        </i>
                    </div>
                    <div className="qoute__ceo">
                        <Image
                            src='/assets/ceo.png' 
                            alt='seo'
                            width={722} 
                            height={629} 
                        />
                    </div>
                    <div className="qoute__background  green"></div>
                    
                </div>

            </div>
        </section>
    )
}