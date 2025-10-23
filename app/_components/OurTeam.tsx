import Image from "next/image";

const teamMembers = [
    {
        name: "Олександр Подзізей",
        photo:'',
        role: "Засновник та керівник проекту",
        bio: "Олександр має понад 10 років досвіду у сфері ландшафтного дизайну та урбаністики. Він вірить у створення зелених просторів, які об'єднують людей.",
    },
    {
        name: "Марія Петренко", 
        photo:''   ,
        role: "Менеджер проекту",
        bio: "Марія спеціалізується на догляді за рослинами та має глибокі знання про місцеву флору. Вона відповідає за здоров'я та красу нашого саду.",
    },
    {
        name: "Любомир Ковальчук", 
        photo:'',
        role: "Ландшафтний Дизайн",
        bio: "Любомир спеціалізується на догляді за рослинами та має глибокі знання про місцеву флору. Він відповідає за здоров'я та красу нашого саду.",
    },
    {
        name: "Іван Іваненко",
        photo:'',
        role: "Розробка та підтримка",
        bio: "Іван має понад 10 років досвіду у сфері ландшафтного дизайну та урбаністики. Він вірить у створення зелених просторів, які об'єднують людей.",
    },
    {
        name: "Марія Фоменко", 
        photo:'',
        role: "Менеджер",
        bio: "Марія спеціалізується на догляді за рослинами та має глибокі знання про місцеву флору. Вона відповідає за здоров'я та красу нашого саду.",
    },
]

// type TeamMember = {
//     name: string;
//     photo: string;
//     role: string;
//     bio: string;
// };

export default function OurTeam({title, desc}: {title?:string, desc?:string}) {
    return (
        <section className="ourTeam container animate fade-in-up">
            <h2>{title ?? "Наша команда"}</h2>
            <p>{desc ?? "Ми - команда професіоналів, які працюють над створенням найкращих рішень для вас."}</p>
            <div className="container ourTeam__grid">
                {teamMembers.map((member, index) => (
                    <div key={index} className="ourTeam__member col card">
                        <div className="ourTeam__photo">
                            <Image src={member.photo??'/assets/people/default-person1.jpg'} 
                                alt={member.name} 
                                layout="fill" 
                                objectFit="cover"
                            />
                        </div>
                        <div className="ourTeam__info">
                            <h3>{member.name}</h3>
                            <p className="ourTeam__role">{member.role}</p>
                            <p className="ourTeam__bio">{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}





