import { title } from './data/About'
import AnimatedOnScroll from './ui/AnimatedScroll'


export default function About(){
    
    return(
        <AnimatedOnScroll animationClass="fade-in-up">
            <section id='about' className="about green" style={{marginBottom:"0"}}>
                <div className='container'>
                    <div className='body'>
                        <div className='content'>
                            <h2>
                                {title}
                            </h2>
                            <p>
                            В 2018 році вперше організувавши фестивалі Волиньска Голандія, а потім Волинська Лавандія, ми отримали настільки сильний позитивний заряд від відвідувачів, що дозволило проводити фестивалі наступні 8-м років та зробити повноцінний парк.
                            <br/>
                            <br/>
                            Парк Квітоліс — це сезонний простір, де природа говорить мовою кольору, аромату й гармонії.
                            <br/>
                            Навесні — тюльпанове море, влітку — лавандові поля та буяння літніх квітів, восени — яскраві килими з айстр, майорів і хризантем.
                            <br/>
                            Парк облаштований для сімейного відпочинку, активного дозвілля, фотосесій та гастрономічного релаксу.
                            <br/>
                            Завітайте до Квітолісу — відчуйте кожну пору року на смак і на дотик.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AnimatedOnScroll>
    )
}
