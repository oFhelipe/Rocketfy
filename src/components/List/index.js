import React, { useContext } from 'react'
import { Container } from './styles'
import { MdAdd } from 'react-icons/md'
import Card from '../Card'
import { useDrop } from 'react-dnd'
import BorderContext from '../Board/context'

const List = ({ data, index: listIndex }) => {
  const { move } = useContext(BorderContext)

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover (item) {
      if (!data.cards[0]) {
        move(item.index, 0, item.listIndex, listIndex)
        item.index = 0
        item.listIndex = listIndex
      }
    }
  })

  return (
    <Container done={data.done} ref={dropRef}>
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
    </Container>
  )
}

export default List
