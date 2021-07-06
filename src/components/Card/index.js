import React, { useRef, useContext } from 'react';
import { Container, Label } from './styles';
import { useDrag, useDrop } from 'react-dnd'
import BoardContext from '../Board/context'

const Card = ({ data, index, listIndex }) => {

  const ref = useRef()
  const { move } = useContext(BoardContext)

  //card que segura
  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  //card que o mouse fica em cima
  const [ ,dropRef] = useDrop({
    accept: 'CARD',
    hover (item, monitor) {

      //id da lista que está saindo, lista de origem
      const draggedListIndex = item.listIndex;

      // id da lista que está recebendo
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }
      //getBoundingClientRectpega a posição do item
      const targetSize = ref.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2

      //pega posição do mouse na tela X e Y
      const draggedOffset = monitor.getClientOffset()

      //a distancia do elemento segurado do topo da tela 
      // - 
      //a distancia do elento hover do topo da tela
      //resulta em quanto que um card entrou no outro
      const draggedTop = draggedOffset.y - targetSize.top

      if (draggedIndex < targetIndex && draggedTop < targetCenter && draggedListIndex === targetListIndex) {
        return
      }
      
      if (draggedIndex > targetIndex && draggedTop > targetCenter && draggedListIndex === targetListIndex) {
        return
      }


      move(draggedIndex, targetIndex, draggedListIndex, targetListIndex)
      item.index = targetIndex
      item.listIndex = targetListIndex
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