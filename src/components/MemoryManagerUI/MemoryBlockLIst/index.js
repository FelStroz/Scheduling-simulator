import React from 'react'
import styled from 'styled-components'
import MemoryBlockCard from '../../_UI/MemoryBlock'

export const Container = styled.div`
  padding: 10px 0;
`

export const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 20px;
`

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const MemoryBlockList = ({ memory, title, killProcess }) => {
  return (
    <Container>
      <Title>{title || 'Process List'}</Title>
      <List>
        {(memory || []).map((memoryBlock, index) => (
          <MemoryBlockCard key={index} {...memoryBlock} killProcess={killProcess} />
        ))}
      </List>
    </Container>
  )
}

export default MemoryBlockList
