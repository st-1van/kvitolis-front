import Image from "next/image";

const teamMembers = [
    {
        name: "Олександр Подзізей",
        role: ["Ідея", 'Стратегія'],
        photo:'/assets/team/oleksandr_podzizey.jpg',
    },
    {
        name: "Тетяна Пашковська", 
        role: ["Проєктний менеджмент", 'Стратегія'],
        photo:'/assets/team/tetyana_pashkovska.jpg',
    },
    {
        name: "Любомир Сінчук", 
        role: ["Ландшафтний Дизайн", "Візуалізація", 'Стратегія'],
        photo:'/assets/team/lyubomyr_sinchuk.jpg',
    },
    {
        name: "Світлана", 
        role: ["Менеджмент", 'Стратегія', 'Контент'],
        photo:'/assets/team/svitlana.jpg',
    },
    {
        name: "кафедри фіолології, релігії, філософії, культурознавства, історії ВНУ імені Лесі Українки",
        role: ["Наукові консультації"],
        photo:'/assets/team/VNU_logo.jpg',
    },
    {
        name: "Іван Стельмах",
        role: ["Розробка сайту", 'Стратегія'],
        photo:'/assets/team/Ivan_Stelmakh.jpg',
    },

    {
        name: "Ганна Личак",
        role: ["Брендинг і дизайн", 'Стратегія'],
        photo:'/assets/team/Hanna_Lychak.jpg',
    },
    {
        name: "Ірина Сінкевич",
        role: ["Брендинг і дизайн", 'Контент'],
        photo:'/assets/team/iryna_sinkevuch.jpg',
    },

]

const rolesArray = [
        'Ідея',
        'Стратегія',
        'Проєктний менеджмент',
        'Брендинг і дизайн',
        'Ландшафтний Дизайн',
        'Візуалізація',
        'Наукові консультації',
        'Розробка сайту',
        'Менеджмент',
        'Контент'
    ]

const XY = [
    {left: '300px', top: '-50px'},
    {left: '85px', top: '65px'},
    {left: '250px', top: '300px'},
    {left: '450px', top: '390px'},
    {left: '80vw', top: '0px'},
    {left: '70vw', top: '360px'},
    {left: '78vw', top: '245px'},
    {left: '68vw', top: '200px'},
]

const membersArrayWithPositions = teamMembers.map((member, index) => ({
    src: member.photo,
    style: {
        left: XY[index].left,
        top: XY[index].top,
    },
    className: `animate up-and-down_${(index % 3) + 1}`,
}));


export function SimpleOurTeam(){
    return (
        <section className="ourTeam animate fade-in-up">
            <div className="container">
                <div className="ourTeam__content">
                <h5>Команда проєкту:</h5>
                {rolesArray.map((role, index) => (
                    <p key={index} className="ourTeam__roles">
                        {role}: {teamMembers.filter(member => member.role.includes(role)).map(member => member.name).join(', ')}
                    </p>
                ))}
                </div>
            </div>
            <div className="ourTeam__bg">
                {membersArrayWithPositions.map((photo, index) => (
                    <Image 
                        src={photo.src} 
                        key={index}
                        alt={`Team member ${index + 1}`} 
                        loading="lazy"
                        className={photo.className}
                        width={120} 
                        height={120}    
                        style={photo.style}
                    />
                ))}
            </div>
        </section>
    );
}





