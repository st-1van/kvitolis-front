import { title, text } from './data/About'
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
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AnimatedOnScroll>
    )
}
