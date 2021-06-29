import React, { useRef } from 'react';
import { Container, Label } from './styles';
import { useDrag, useDrop } from 'react-dnd'

const Card = ({ data, index }) => {

  const ref = useRef()

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  const [ ,dropRef] = useDrop({
    accept: 'CARD',
    hover (item, monitor) {
      
    }
  })

  dragRef(dropRef(ref))
  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label}/>)}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="avatar"/>}
    </Container>
  );
}

export default Card;