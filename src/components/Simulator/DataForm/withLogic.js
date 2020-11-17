import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addList as addCoreList } from '../../../redux/actions/core'
import { addList as addProcessList } from '../../../redux/actions/process'
import { message } from 'antd'
const withConnect = Component => {
  const actions = {
    addCoreList,
    addProcessList
  }
  return connect(
    null,
    actions
  )(Component)
}

const initialState = {
  whichAlg: 'Round Robin',
  quantum: 2,
  coresNumber: 1,
  processesNumber: 100,
  numberQuickList: 2,
  numberMemoryCalls: 2,
  memoryAllocationAlg: 'first fit',
  totalInstalledMemory: 10000 // one million
}

export default Component => withConnect(props => {
  const [state, setState] = useState(initialState)

  const handleSelectAlg = (value, option) => {
    setState({
      ...state,
      [option.props.name]: value
    })
    props.changeWhichAlg(value)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setState({
      ...state,
      [name]: value
    })
  }

  const handleClose = () => {
    handleClear()
    props.closeDrawer()
  }

  const handleClear = () => {
    setState(initialState)
  }

  const handleStartSimulation = () => {
    props.setData(state)
    if ((state.quantum < 2 || state.quantum > 20) || state.quantum === '') {
      return message.error('Numero de Quantum deve ser maior que 1 menor que 21')
    }

    if ((state.coresNumber <= 1 || state.coresNumber > 64) && state.coresNumber === '') {
      return message.error('Numero de cores deve ser maior que 0 menor que 64')
    }

    props.addCoreList(Number(state.coresNumber), state.whichAlg, state.quantum)
    props.addProcessList(Number(state.processesNumber))
    handleClose()
  }

  return (
    <Component
      state={state}
      setState={setState}
      onSelectAlg={handleSelectAlg}
      onChange={handleChange}
      onClose={handleClose}
      onClear={handleClear}
      onStartSimulation={handleStartSimulation}
    />
  )
})
