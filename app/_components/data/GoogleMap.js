export default function GoogleMap(){
    return(
        <iframe className='footer__map'
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2757.436315536168!2d25.110825012418427!3d51.032100771591146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4725c9b48227f85b%3A0x7ff7f5c7c42e42b3!2z0JLQvtC70LjQvdGB0YzQutCwINCT0L7Qu9C70LDQvdC00ZbRjw!5e1!3m2!1suk!2sua!4v1739786263262!5m2!1suk!2sua" 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
        >
        </iframe>
    )
}