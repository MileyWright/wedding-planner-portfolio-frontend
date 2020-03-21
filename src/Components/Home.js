import React, { useContext } from 'react';
import WeddingCard from './WeddingCard';
import '../App.css';
import weddingEventContext from '../Contexts/WeddingEventContext';

export default function Home() {
  const { weddingEvent, setWeddingEvent } = useContext(weddingEventContext);

  return (
    <div>
      <h1>Wedding Planner Portfolio</h1>
      <div className='home'>
        {weddingEvent.map(event => (
          <WeddingCard
            key={event.id}
            image={event.image}
            description={event.description}
            location={event.location}
            theme={event.theme}
            vendors={event.vendors}
          />
        ))}
      </div>
    </div>
  );
}
