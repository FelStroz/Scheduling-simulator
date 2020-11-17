import React from 'react'
import styled from 'styled-components'
import ProcessCard from '../_UI/Cards/ProcessCard'

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

const ProcessList = ({ processList, title, killProcess }) => {
  return (
    <Container>
      <Title>{title || 'Process List'}  N˚{processList.length} </Title>
      <List>
        {(processList || []).map((proc, index) => (
          <ProcessCard key={index} {...proc} killProcess={killProcess} />
        ))}
      </List>
    </Container>
  )
}

export default ProcessList
