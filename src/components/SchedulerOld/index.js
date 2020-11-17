import React from 'react'
import styled from 'styled-components'
import withLogic from './withLogic'
import CoreList from '../CoreList'
import ProcessList from '../ProcessList'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export const NewProcessButton = styled(Button)`
  position: fixed;
  top: 100px;
  right: 30px;
`

export const DisableProcessButton = styled(Button)`
  position: fixed;
  top: 170px;
  right: 30px;
`

export const Container = styled.div`
  display: flex;
`

export const Column = styled.div`
  width: 50%;
`

const Scheduler = ({ coreList, processList, killProcess, terminatedList, onAddProcess, isDisableRandom, setIsDisableRandom }) => {
  return (
    <>
      <NewProcessButton onClick={onAddProcess}> <PlusOutlined /> Add New Process</NewProcessButton>
      <DisableProcessButton onClick={() => setIsDisableRandom(!isDisableRandom)}>{(isDisableRandom) ? 'Enable' : 'Disable'} Random Process</DisableProcessButton>

      <CoreList coreList={coreList} />
      <Container>
        <Column>
          <ProcessList killProcess={killProcess} processList={processList.filter(proc => proc.state !== 'running')} />
        </Column>
        <Column>
          <ProcessList processList={terminatedList} title='Finish Process' />
        </Column>
      </Container>
    </>
  )
}

export default withLogic(Scheduler)
