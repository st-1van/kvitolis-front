import Image from "next/image";
import AnimatedOnScroll from "./ui/AnimatedScroll";

const text ='Є місця, де зупиняється час. Де земля говорить голосами предків, а кожен крок перегукується з відлуннями століть. Таким місцем буде наш Сад Українства — не просто парк, а простір, у якому оживає ідентичність нації.'
const text2 =`Тут ти не просто відпочиваєш. Тут ти, мов бджола, що не тільки збирає мед, а й запилює цвіт — переносиш сенси, даруєш життя ідеям, які проростають у майбутнє. Ми створюємо сад не тільки  для спокою, а для пам’яті і натхнення. Через дерева, стежки і постаті ми вкорінюємо минуле у ґрунт сьогодення, аби зростити майбутнє.
Недаремно в центрі саду буде стояти млин — символ хліба, праці і часу. Як зернина стає хлібом, так і кожна людина, кожна постать нашої історії, яку ми вшановуємо в алеях, зрощувала дух нації впродовж віків, навіть тоді, коли ми не мали власної держави.`

export default function SimpleQoute (){
    return(
       
        <section className="simleQoute">
            <div className="container">
                <AnimatedOnScroll animationClass="fade-sides">
                <div className="content row">
                    <div className="col col-bg">
                        <Image
                            src='/assets/qoutes-green.svg' 
                            alt='qoute' 
                            width={69} 
                            height={61}
                            className="simpleQoute__icon"                            
                            />
                        {/* <span>&quot;</span> */}
                        <p className="simpleQoute__text">
                            {text}
                        </p>
                    </div>
                    <div className="col col-bg">
                        <p className="simpleQoute__text">
                            {text2}
                        </p>    
                    </div>
                </div>
                </AnimatedOnScroll>
            </div>
        </section>
    )
}