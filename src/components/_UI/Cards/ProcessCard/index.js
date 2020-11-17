import React from 'react'
import {
  Container,
  StatusBar,
  Wrapper,
  TopWrapper,
  TextWrapper,
  Title,
  StatusText,
  BottomWrapper,
  TimeColumn,
  TimeText,
  TimeCount
} from './styles'

const ProcessCard = ({ id, name, state, remainingTime, totalTIme, totalMemoryUsed, killProcess }) => {
  return (
    <Container onClick={() => killProcess(id)}>
      <Wrapper>
        <TopWrapper state={state}>
          <TextWrapper>
            <Title>{name}</Title>
          </TextWrapper>
          <StatusText state={state}>{state}</StatusText>
        </TopWrapper>
        <BottomWrapper>
          <TimeColumn state={state}>
            <TimeText> Time Left</TimeText>
            <TimeCount> {remainingTime}s</TimeCount>
          </TimeColumn>
          <TimeColumn state={state}>
            <TimeText> Total Time</TimeText>
            <TimeCount> {totalTIme}s</TimeCount>
          </TimeColumn>
          <TimeColumn state={state} isRight>
            <TimeText> Memory </TimeText>
            <TimeCount> {totalMemoryUsed}</TimeCount>
          </TimeColumn>
        </BottomWrapper>
      </Wrapper>
      <StatusBar state={state} />
    </Container>
  )
}

export default ProcessCard
