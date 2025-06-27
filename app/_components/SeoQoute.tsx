import Image from "next/image";

const text ='Чому саме сад? Бо дерева надихають. Бо квіти говорять мовою, яку розуміють і старі, й малі. Бо сад — це образ дому, у якому є місце всім: і тендітній лілії, і потужному дубу, що проживе століття, і незламній калині, і траві, що як килим під ногами. Тут кожен знайде своє місце, свій прихисток. І цього ж хочу побажати нашій Україні.'

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
                            src='/assets/ceo2.png' 
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