import ReactMarkdown from 'react-markdown'
import AnimatedOnScroll from './ui/AnimatedScroll'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'


export default function About({text}:{text:string}) { 
    
    return(
        <AnimatedOnScroll animationClass="fade-in-up">
            <section id='about' className="about green" style={{marginBottom:"0"}}>
                <div className='container'>
                    <div className='body'>
                        <div className='content'>
                            <h2>
                                Про парк:
                            </h2>
                            
                            <ReactMarkdown
                                rehypePlugins={[rehypeSanitize]}
                                remarkPlugins={[remarkGfm]}
                                >
                                {text}
                            </ReactMarkdown>
                            
                        </div>
                    </div>
                </div>
            </section>
        </AnimatedOnScroll>
    )
}