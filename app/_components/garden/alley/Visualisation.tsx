import AnimatedOnScroll from "../../ui/AnimatedScroll";

interface VisualisationProps {
    videoId:string,
    title?:string,
  }

export default function Visualisation ({videoId, title}:VisualisationProps){

    return(
        <AnimatedOnScroll animationClass="fade-in-up">
            <section id='visualisation'>
                <h2>{title||''}</h2>
                    <div className="container">
                            <iframe id="youtube-video" 
                                src={`https://www.youtube.com/embed/${videoId}?color=white`}
                                allowFullScreen
                                loading="lazy"
                            />
                    </div>
            </section>
        </AnimatedOnScroll>
    )
}