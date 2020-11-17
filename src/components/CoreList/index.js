import React from 'react'
import styled from 'styled-components'
import CoreCard from '../_UI/Cards/CoreCard'

export const Container = styled.div`
  padding: 10px 0;
  color: white;
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

const CoreList = ({ coreList }) => {
  return (
    <Container>
      <Title>Core List N˚{coreList.length}</Title>
      <List>
        {(coreList || []).map((core, index) => (
          <CoreCard key={index} {...core} />
        ))}
      </List>
    </Container>
  )
}

export default CoreList
