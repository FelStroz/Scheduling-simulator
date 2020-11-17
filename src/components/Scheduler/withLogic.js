import React from 'react'
import { connect } from 'react-redux'
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

const withLogic = Component => withConnect(class extends React.Component {
  constructor(props) {
    super(props)

    this.alertBarRef = React.createRef()

    this.state = {
      isDisableRandom: false,
      coreList: props.coreList,
      processList: props.processList,
      terminatedProcessList: props.terminatedProcessList,
      abortedProcessList: props.abortedProcessList,
      randomInterval: '',
      stopSchedule: false,
      time: 1000
    }
  }

  changeTime = (value) => {
    this.setState({
      time: value
    })
  }

  componentWillMount() {
    switch (this.props.whichAlg.trim()) {
      case 'Round Robin':
        this.roundRobin()
        break;
      case 'SJF':
        this.SJF()
        break;
      case 'FIFO':
        this.FIFO()
        break;
      default:
        this.roundRobin()
        break;
    }
  }

  SJF = () => {
    setTimeout(() => {
      let coreList = this.state.coreList;
      let processList = this.state.processList;
      let terminatedProcessList = this.state.terminatedProcessList;
      let abortedProcessList = this.state.abortedProcessList;
      this.reOrderTimes(processList);

      coreList.forEach((core, index) => {
        if (core.status === 'waiting' && this.nextProcess(processList)) {
          core.status = 'busy';
          if (core.processInExecution === 'none') {
            const process = this.getProcess(processList)
            const processAllocationResponse = this.allocateProcessMemory(process)
            if(processAllocationResponse) {
              core.processInExecution = process;
              core.processTimeLeft = core.processInExecution.totalTIme;
              core.processInExecution.state = 'running'
            }else{
              debugger
              const index = processList.findIndex(p => p.id === process.id);
              processList.splice(index, 1);
              abortedProcessList.push(process);
              core.status = 'waiting';
            }
            // core.processInExecution = this.getProcess(processList);
            // core.processTimeLeft = core.processInExecution.totalTIme;
            // core.processInExecution.state = 'running'
          }
        } else if (core.processInExecution.remainingTime === 0 && !this.state.stopSchedule) {
          core.processInExecution.state = 'terminated';
          const index = processList.findIndex(p => {
            return p.id === core.processInExecution.id
          });
          processList.splice(index, 1);

          this.freeMemoryProcess(core.processInExecution)
          terminatedProcessList.push(core.processInExecution);
          core.status = 'waiting';
          core.processInExecution = 'none';
        } else if (core.processInExecution !== 'none' && !this.state.stopSchedule) {
          core.processInExecution.remainingTime -= 1;
          core.processTimeLeft -= 1
        }
      });

      if (this.isSimulatorFinish(processList).length || this.isCoreWorking(coreList).length) { // é pra continuar ?
        this.setState({
          coreList,
          processList,
          terminatedProcessList
        }, this.SJF)
      } else {
        this.setState({
          coreList,
          processList,
          terminatedProcessList
        })
      }
    }, this.state.time)
  };

  FIFO = () => {
    setTimeout(() => {
      let coreList = this.state.coreList;
      let processList = this.state.processList;
      let terminatedProcessList = this.state.terminatedProcessList;
      let abortedProcessList = this.state.abortedProcessList;

      coreList.forEach((core, index) => {
        if (core.status === 'waiting' && this.nextProcess(processList)) {
          core.status = 'busy';
          if (core.processInExecution === 'none') {
            const process = this.getProcess(processList)
            const processAllocationResponse = this.allocateProcessMemory(process)
            if(processAllocationResponse){
              core.processInExecution = process;
              core.processTimeLeft = core.processInExecution.totalTIme;
              core.status = 'busy';
              core.processInExecution.state = 'running'
            }else{
              debugger
              const index = processList.findIndex(p => p.id === process.id);
              processList.splice(index, 1);
              abortedProcessList.push(process);
              core.status = 'waiting';
            }
            // message.warn(process.memoryPointers[0])
            // Request for Memory
               // chamar malloc

          }
        } else if (core.processInExecution.remainingTime === 0) {
          core.processInExecution.state = 'terminated';

          const index = processList.findIndex(p => p.id === core.processInExecution.id);
          processList.splice(index, 1);

          this.freeMemoryProcess(core.processInExecution)
          terminatedProcessList.push(core.processInExecution);
          core.status = 'waiting';
          core.processInExecution = 'none';
        } else if (core.processInExecution !== 'none' && !this.state.stopSchedule) {
          core.processInExecution.remainingTime -= 1;
          core.processTimeLeft -= 1
        }
      });

      if (this.isSimulatorFinish(processList).length || this.isCoreWorking(coreList).length) { // é pra continuar ?
        this.setState({
          coreList,
          processList,
          terminatedProcessList,
          abortedProcessList
        }, this.FIFO)
      } else {
        this.setState({
          coreList,
          processList,
          terminatedProcessList,
          abortedProcessList
        })
      }
    }, this.state.time);
  };

  roundRobin = () => {
    setTimeout(() => {
      let coreList = this.state.coreList
      let processList = this.state.processList
      let terminatedProcessList = this.state.terminatedProcessList
      let abortedProcessList = this.state.abortedProcessList;

      coreList.forEach((core, index) => {
        if (core.status === 'waiting' && this.nextProcess(processList)) {
          core.status = 'busy'
          if (core.processInExecution === 'none') {
            const process = this.getProcess(processList)
            const processAllocationResponse = this.allocateProcessMemory(process)
            if(processAllocationResponse){
              core.processInExecution = process
              core.processInExecution.state = 'running'
            }else{
              debugger
              console.log('pegou abortados')
              const index = processList.findIndex(p => p.id === process.id);
              processList.splice(index, 1);
              abortedProcessList.push(process);
              core.status = 'waiting';
            }
            // core.processInExecution = this.getProcess(processList)
            // core.processInExecution.state = 'running'
          }
        } else if (core.processTimeLeft === 0 || core.processInExecution.remainingTime <= 0) {
          if (core.processInExecution.remainingTime <= 0) {
            core.processInExecution.state = 'terminated'
            const index = processList.findIndex(p => {
              return p.id === core.processInExecution.id
            });
            processList.splice(index, 1)

            this.freeMemoryProcess(core.processInExecution)
            console.log('terminou o processo')
            terminatedProcessList.push(core.processInExecution)
          } else {
            core.processInExecution.state = 'ready'
            // this.freeMemoryProcess(core.processInExecution)
            this.reOrderProcess(processList, core.processInExecution)
          }
          core.status = 'waiting'
          core.processInExecution = 'none'
          core.processTimeLeft = core.quantum
        } else if (core.processInExecution !== 'none' && !this.state.stopSchedule) {
          core.processInExecution.remainingTime -= 1
          core.processTimeLeft -= 1
        }
      })

      if (this.isSimulatorFinish(processList).length || this.isCoreWorking(coreList).length) { // é pra continuar ?
        this.setState({
          coreList,
          processList,
          terminatedProcessList
        }, this.roundRobin)
      } else {
        this.setState({
          coreList,
          processList,
          terminatedProcessList
        })
        this.props.kernelChangeData({
          coreList,
          processList,
          terminatedProcessList
        })
      }

    }, this.state.time)
  }

  allocateProcessMemory = (process) => process.generateRandomStaticMemoryCall(this.props.memoryAllocation, this.props.freeMemory)

  freeMemoryProcess = (process) => {
    this.props.freeMemory(process.memoryPointers)
    process.memoryPointers = []
    // atualiza o process memory pointer
    // limpa o bloco de memoria

  }

  nextProcess = (processList) => processList.find(process => process.state === 'ready')

  getProcess = (processList) => {
    const process = processList.find(process => process.state === 'ready')
    // const index = processList.findIndex(p => p.id === process.id );
    // processList.splice(index, 1)
    return process
  }

  reOrderProcess = (processList, process) => {
    const index = processList.findIndex(p => {
      return p.id === process.id
    });
    processList.splice(index, 1)
    // if(process.remainingTime === 0)
    // finalizedProcess.push(process)
    // else
    processList.push(process);
  }

  isSimulatorFinish = (processList) => processList.filter(p => p.state !== 'terminated')

  isCoreWorking = (coreList) => coreList.filter(core => core.status === 'busy')

  addNewProcess = () => {
    const process = this.props.kernelCreateProcess()
    if (!this.state.processList.length) {
      this.setState({
        processList: [
          ...this.state.processList,
          process
        ]
      // }, (this.props.whichAlg === "Round Robin") ? this.roundRobin : (this.props.whichAlg === "FIFO") ? this.FIFO : this.SJF)
      }, (this.props.whichAlg === "Round Robin") ? this.roundRobin : (this.props.whichAlg === "FIFO") ? this.FIFO : this.SJF)
    } else {
      this.setState({
        processList: [
          ...this.state.processList,
          process
        ]
      })
    }

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
    // message.info('Random Process ' + ((!value) ? 'Enabled' : 'Disabled'))
    this.setState({ isDisableRandom: value })
  }

  killProcess = id => {
    // message.info(`Process ${id} Deleted`)
    this.setState({
      processList: this.state.processList.filter(proc => proc.id !== id)
    })
  }

  changeScheduleProcess = () => {
    const newTime = this.state.stopSchedule ? 500 : 1000000
    this.setState({
      ...this.state,
      stopSchedule: !this.state.stopSchedule,
      time: newTime
    })
  }

  render() {
    return (
      <Component
        isDisableRandom={this.state.isDisableRandom}
        setIsDisableRandom={this.changeIsDisableRandom}
        coreList={this.state.coreList}
        processList={this.state.processList}
        terminatedList={this.state.terminatedProcessList}
        abortedProcessList={this.state.abortedProcessList}
        onAddProcess={this.addNewProcess}
        killProcess={this.killProcess}
        changeScheduleProcess={this.changeScheduleProcess}
        stopSchedule={this.state.stopSchedule}

        changeTime={this.changeTime}
        time={this.state.time}
      />
    )
  }
})

export default withLogic
