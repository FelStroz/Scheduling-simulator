import React from 'react'
import { connect } from 'react-redux'
import Process from '../../struct/Process'
import MemoryManager from '../../struct/MemoryManager'
import { message } from 'antd'

const withConnect = Component => {
  const mapStateToProps = state => (
    {
      core: state.core,
      process: state.process,
      simulator: state.process,
    })
  const actions = {}

  return connect(
    mapStateToProps,
    actions
  )(Component)
}

const withLogic = Component => withConnect(class extends React.Component { // class kernel
  constructor(props) {
    super(props)

    this.alertBarRef = React.createRef()
    console.log(props)
    this.state = {
      isDisableRandom: false,
      coreList: props.core.list,
      processList: props.process.list,
      terminatedProcessList: [],
      abortedProcessList: [],
      lastPid: props.core.list.length + 1,
      memoryManager: new MemoryManager(props)
      // MemoryManagerSinalized
    }
  }

  componentWillMount() {
    const interval = setInterval(() => {
      if ((Math.floor(Math.random() * 4) === 1) && !this.state.isDisableRandom) {
        // message.success('Random Process Added')
        // this.createProcess()
      }
    }, 3000)
    this.setState({
      randomInterval: interval
    })
  }

  nextProcess = (processList) => processList.find(process => process.state === 'ready')

  getProcess = (processList) => processList.find(process => process.state === 'ready')

  reOrderProcess = (processList, process) => {
    const index = processList.findIndex(p => {
      return p.id === process.id
    });
    processList.splice(index, 1)
    processList.push(process);
  }

  isCoreWorking = (coreList) => coreList.filter(core => core.status === 'busy')

  createProcess = () => {
    const process = new Process({
      id: this.state.processList.length,
      name: 'Process ' + (this.state.lastPid + 1),
      state: 'ready',
    })
    this.setState({
      ...this.state,
      lastPid: this.state.lastPid + 1
    })
    return process
  }

  memoryAllocation = (requiredMemory, pid) => {
    const { memoryManager} = this.state
    const memoryPointer = memoryManager.malloc(requiredMemory, pid)
    // console.log(memoryManager.memory)
    // console.log(memoryManager.memory.length)
    // TODO: Visual Part
    this.setState({
      ...this.state,
      memoryManager
    })
    return memoryPointer
  }

  freeMemory = (memoryAddresses) => {
    message.success(`livra o endereco ${memoryAddresses}  pra mim ae`)
    const { memoryManager} = this.state
    memoryAddresses.map(memoryAddress => memoryManager.free(memoryAddress) )
    this.setState({
      ...this.state,
      memoryManager
    })
    // call memory manager #free passing index of memory block
  }

  reOrderTimes = (processList) => {
    processList.sort(function (a, b) {
      if (a.totalTIme > b.totalTIme) {
        return 1;
      }
      if (a.totalTIme < b.totalTIme) {
        return -1;
      }
      return 0;
    });
  };

  changeIsDisableRandom = (value) => {
    message.info('Random Process ' + ((!value) ? 'Enabled' : 'Disabled'))
    this.setState({ isDisableRandom: value })
  }

  killProcess = id => {
    message.info(`Process ${id} Deleted`)
    this.setState({
      processList: this.state.processList.filter(proc => proc.id !== id)
    })
  }

  changeData = (data, callback = null ) => {
    this.setState(data, callback)
  }

  render() {
    return (<Component
      whichAlg={this.props.whichAlg}
      coreList={this.state.coreList}
      processList={this.state.processList}
      terminatedProcessList={this.state.terminatedProcessList}
      abortedProcessList={this.state.abortedProcessList}
      //
      nextProcess={this.nextProcess}
      getProcess={this.getProcess}
      reOrderProcess={this.reOrderProcess}
      isCoreWorking={this.isCoreWorking}
      createProcess={this.createProcess}
      reOrderTimes={this.reOrderTimes}
      changeIsDisableRandom={this.changeIsDisableRandom}
      isDisableRandom={this.state.isDisableRandom}
      setIsDisableRandom={this.changeIsDisableRandom}
      changeData={this.changeData}
      // kernel methods to memory
      memoryAllocation={this.memoryAllocation}
      freeMemory={this.freeMemory}
      // Memory Manager Ui Data
      totalMemoryUsed={this.state.memoryManager.occupiedMemory}
      memoryManager={this.state.memoryManager}
    />)
  }
})

export default withLogic
