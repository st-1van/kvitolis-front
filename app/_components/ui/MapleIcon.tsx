
type SvgIconProps = {
    type: 'filled' | 'outlined'
}

export default function MapleIcon({ type }: SvgIconProps) {
    return(
        <svg className={`svg-icon ${type}`} width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1076_348)">
                <path 
                    d="M21.4479 6.61527L17.974 7.43091L17.7895 5.24442L14.9993 7.78386L15.8076 2.73622L13.4207 3.57453L11.4321 0.498108L9.44361 3.57453L7.05673 2.73622L7.865 7.78386L5.07476 5.24442L4.89032 7.43091L1.41635 6.61527L2.61681 10.346L0.722656 11.2486L6.09401 15.4304L5.49838 17.8283L10.8046 16.9652V21.9171H12.0597V16.9652L17.3659 17.8283L16.7703 15.4304L22.1416 11.2486L20.2475 10.346L21.4479 6.61527Z"
                    className="bg"
                    fill="white"
                />
            </g>
            <defs>
            <clipPath id="clip0_1076_348">  
            <rect width="21.419" height="21.419" fill="white" transform="translate(0.722656 0.498108)"/>
            </clipPath>
            </defs>
        </svg>
    )
} 