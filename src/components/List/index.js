import React, { useContext } from 'react'
import { Container } from './styles'
import { MdAdd } from 'react-icons/md'
import Card from '../Card'
import { useDrop } from 'react-dnd'
import BorderContext from '../Board/context'

const List = ({ data, index: listIndex }) => {
  const { move, lists } = useContext(BorderContext)

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover (item) {

      if (item.listIndex !== listIndex) {
        const newIndex = lists[listIndex].cards.length
        console.log(item.index, newIndex, item.listIndex, listIndex)

        move(item.index, newIndex, item.listIndex, listIndex)
        item.index = newIndex
        item.listIndex = listIndex
    }
      }
  })

  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type='button'>
            <MdAdd size={24} color='#FFF' />
          </button>
        )}
      </header>
      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} listIndex={listIndex} index={index} data={card} />
        ))}
      </ul>
      <span className="drop-area" ref={dropRef}/>
    </Container>
  )
}

export default List
