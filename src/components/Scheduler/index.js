import React, { useState } from 'react'
import styled from 'styled-components'
import withLogic from './withLogic'
import CoreList from '../CoreList'
import ProcessList from '../ProcessList'
import { Button, Slider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export const Wrapper = styled.div`
  ${({ show }) => show || 'display: none;'}
`

export const HideShowButton = styled(Button)`
  position: fixed;
  bottom: 380px;
  right: 0;
`

export const NewProcessButton = styled(Button)`
  position: fixed;
  bottom: 100px;
  right: 5px;
`

export const DisableProcessButton = styled(Button)`
  position: fixed;
  bottom: 170px;
  right: 5px;
`

export const StopSchedulerButton = styled(Button)`
  position: fixed;
  bottom: 150px;
  right: 5px;
`

export const Container = styled.div`
  display: flex;
`

export const Column = styled.div`
  width: 50%;
`

export const SliderWrapper = styled.div`
  position: fixed;
  bottom: 210px;
  right: 5px;
  width: 300px;
  display: flex;
  color: white;
  justify-content: space-between;
`

export const SliderBarWrapper = styled.div`
  width: 250px;
`

const Scheduler = ({
  coreList,
  processList,
  changeScheduleProcess,
  killProcess,
  stopSchedule,
  terminatedList,
  abortedProcessList,
  onAddProcess,
  isDisableRandom,
  setIsDisableRandom,

  changeTime,
  time
}) => {
  const [show, setShow] = useState(true)
  return (
    <>
      <HideShowButton onClick={() => setShow(!show)}>
        {show ? 'hide' : 'show'}
      </HideShowButton>
      <Wrapper show={show}>
        <NewProcessButton onClick={onAddProcess}>
          <PlusOutlined />
        Process
        </NewProcessButton>
        {/* <DisableProcessButton onClick={() => setIsDisableRandom(!isDisableRandom)}>
          {(isDisableRandom) ? 'Enable' : 'Disable'} Random Process
        </DisableProcessButton> */}
        <StopSchedulerButton onClick={changeScheduleProcess}>
          {stopSchedule ? 'Start' : 'Stop'}
          Scheduler
        </StopSchedulerButton>
        <SliderWrapper>
          <span onClick={() => changeTime(100)}>100 ms</span>
          <SliderBarWrapper>
            <Slider
              min={100}
              max={1000}
              onChange={changeTime}
              value={typeof time === 'number' ? time : 1000}
            />
          </SliderBarWrapper>
          <span onClick={() => changeTime(1000)}>1000 ms</span>
        </SliderWrapper>
      </Wrapper>
      <CoreList coreList={coreList} />
      <Container>
        <Column>
          <ProcessList killProcess={killProcess} processList={processList.filter(proc => proc.state !== 'running')} />
        </Column>
        <Column>
          <ProcessList processList={terminatedList.sort()} title='Finish Process' />
        </Column>
        <Column>
          <ProcessList processList={abortedProcessList.sort()} title='Aborted Processes' />
        </Column>
      </Container>
    </>
  )
}

export default withLogic(Scheduler)
