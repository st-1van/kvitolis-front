import { TreeVertical } from '@/app/_components/garden/alley/TreeDescription';
import Persons from '@/app/_components/garden/alley/Persons';
import type { TreeDescProps } from '@/app/_components/garden/alley/TreeDescription';
import type { PersonsProps } from '@/app/_components/garden/alley/Persons';
import AnimatedOnScroll from '../../ui/AnimatedScroll';

type AboutAlleyProps = {
    treeData: TreeDescProps;
    personsData: PersonsProps['famousPeople'];
    alleyName:string;
  };

export default function AboutAlley ({ treeData, personsData, alleyName }: AboutAlleyProps){
    
    return(
        <section className='aboutAlley'>
          <div className="container">
            <AnimatedOnScroll animationClass="fade-sides">
              <div className="row" 
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1rem'}}>
                <TreeVertical {...treeData} />
                <Persons famousPeople={personsData} alleyName={alleyName}/>
              </div>
            </AnimatedOnScroll>
           </div>
      </section>
    )
}