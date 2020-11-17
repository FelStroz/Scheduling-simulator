import React from 'react'
import {
  Container,
  StatusBar,
  Wrapper,
  TopWrapper,
  TextWrapper,
  Title,
  SubTitle,
  StatusText,
  BottomWrapper,
  TimeColumn,
  TimeText,
  TimeCount
} from './styles'

const CoreCard = ({ name, status, processTimeLeft, processInExecution }) => {
  return (
    <Container>
      <Wrapper>
        <TopWrapper status={status}>
          <TextWrapper>
            <Title>{name}</Title>
            <SubTitle>{processInExecution.name || 'No Process'}</SubTitle>
          </TextWrapper>
          <StatusText status={status}>{status}</StatusText>
        </TopWrapper>
        <BottomWrapper>
          <TimeColumn status={status}>
            <TimeText> Core Time Left</TimeText>
            <TimeCount> {processTimeLeft}s</TimeCount>
          </TimeColumn>
          <TimeColumn status={status} isRight>
            <TimeText> Process Time Left</TimeText>
            <TimeCount> {processInExecution.remainingTime || 'N/A'}s</TimeCount>
          </TimeColumn>

        </BottomWrapper>
      </Wrapper>
      <StatusBar status={status} />
    </Container>
  )
}

export default CoreCard
