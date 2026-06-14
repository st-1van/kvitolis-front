import TikTokIcon from "../ui/TikTokIcon"
import YouTubeIcon from "../ui/YoutubeIcon"
import FacebookIcon from "../ui/FacebookIcon"
import InstagramIcon from "../ui/InstagramIcon"
export const navItems = [
        {
            display:'Головна',
            slug: '/'
        },
        // {
        //     display:'Про парк',
        //     slug: '/#about'
        // },
        {
            display:'Фестивалі',
            slug: '/#festivals'
        },
        {
            display:'Сад Українства',
            slug: '/garden'
        },
        {
            display:'Мапа парку',
            slug: '/#map'
        },
        {
            display:'Контакти',
            slug: '#contacts'
        },
    ]

export const socilalLinks = [
        {
            name:'facebook',
            link: 'https://www.facebook.com/kvitolis/',
            icon:<FacebookIcon type='filled' />
        },
        {
            name:'instagram',
            link: 'https://www.instagram.com/kvitolis/',
            icon:<InstagramIcon type='filled' />
        },
        {
            name:'tiktok',
            link:'https://www.tiktok.com/@kvitolis',
            icon:<TikTokIcon type='filled' />
        },
        {
            name:'youtube',
            link:'https://www.youtube.com/@Kvitolis',
            icon:<YouTubeIcon type='filled' />
        },
    ]


