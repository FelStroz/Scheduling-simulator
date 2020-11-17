import React from 'react'
import Scheduler from '../Scheduler'
import withLogic from './withLogic'
import styled from 'styled-components'
import { Button } from 'antd'
import MemoryManagerUI from '../MemoryManagerUI'

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

const Kernel = ({
  whichAlg,
  nextProcess,
  getProcess,
  reOrderProcess,
  isCoreWorking,
  createProcess,
  reOrderTimes,
  changeIsDisableRandom,
  isDisableRandom,
  setIsDisableRandom,
  coreList,
  processList,
  terminatedProcessList,
  abortedProcessList,
  changeData,
  // Memory
  memoryAllocation,
  totalMemoryUsed,
  freeMemory,
  memoryManager
}) => {
  return (
    <>
      <MemoryManagerUI memoryManager={memoryManager} totalMemoryUsed={totalMemoryUsed} />
      <Scheduler
        whichAlg={whichAlg}
        kernelCreateProcess={createProcess}
        coreList={coreList}
        processList={processList}
        terminatedProcessList={terminatedProcessList}
        abortedProcessList={abortedProcessList}
        kernelChangeData={changeData}
        // Kernel Function
        memoryAllocation={memoryAllocation}
        freeMemory={freeMemory}
      />
    </>
  )
}

export default withLogic(Kernel)
