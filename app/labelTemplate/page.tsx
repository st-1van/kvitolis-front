import Image from "next/image";
import alleyData from "../_components/data/alleyData/actualData";
import { generateQRCodeForPerson } from "../../utils/qr-code-generator";

type Props = {
    alleySlug: string;
    name: string;
    desc: string;
}

async function Label({alleySlug, name, desc}: Props) {

    const QrCodeSVG = await generateQRCodeForPerson({
        name,
        alleySlug
    })
    return(
        <div>
           <div style={{border: "1px solid black", width: "700px", height: "300px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <div className="col" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Image
                    className="header__logo"
                    src="/assets/logo.svg"
                    alt="logo"
                    width={75}
                    height={47}
                />
                <div dangerouslySetInnerHTML={{ __html: QrCodeSVG }} />
            </div>
                <div className="col" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                    <p style={{fontSize: "14px", fontWeight: "500"}}>Сад української ідентичності</p>
                    <p style={{fontSize: "26px", fontWeight: "800"}}>{name}</p>
                    <p style={{fontSize: "14px", fontWeight: "500"}}>{desc}</p>
                </div>
            </div> 

        </div>
    )
}


export default function LabelTemplate() {
    return (
      <main>
        <div style={{display:'flex', flexDirection:'row', width:'1600px', flexWrap: 'wrap', height:'100%', gap:'5px'}}>
       
        {alleyData[0].famousPeople.map((person) => {
            return <Label 
                name={person.name} 
                desc={person.desc} 
                alleySlug={alleyData[0].slug}
                key={person.name}
            />
        })}
        </div>
      </main>
    );
}