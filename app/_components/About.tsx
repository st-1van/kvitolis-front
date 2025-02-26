import { title, text } from './data/About'
import InterMap from './InterMap'


export default function About(){
    
    return(
        <section className="about green">
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

            <InterMap />
            
        </section>
    )
}
