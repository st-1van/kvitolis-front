import { title, text } from './data/About'
// import InterMap from './InterMap'
// import { MapLegend } from './data/Map'


export default function About(){
    
    return(
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
            {/* <InterMap 
                title='Мапа території' 
                src="/assets/map/staticMap.svg"
                legend={MapLegend}
            /> */}
        </section>
    )
}
