import React from 'react'
import { connect } from 'react-redux'
import Process from '../../struct/Process'
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
      coreList: props.core.list,
      processList: props.process.list,
      terminatedProcessList: [],
      randomInterval: ''
    }
  }

  componentWillMount() {
    const interval = setInterval(() => {
      if ((Math.floor(Math.random() * 4) === 1) && !this.state.isDisableRandom) {
        message.success('Random Process Added')
        this.addNewProcess()
      }
    }, 3000)
    switch (this.props.whichAlg) {
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
    this.setState({
      randomInterval: interval
    })
  }

  SJF = () => {
    setTimeout(() => {
      let coreList = this.state.coreList;
      let processList = this.state.processList;
      let terminatedProcessList = this.state.terminatedProcessList;

      this.reOrderTimes(processList);

      coreList.forEach((core, index) => {
        if (core.status === 'waiting' && this.nextProcess(processList)) {
          core.status = 'busy';
          if (core.processInExecution === 'none') {
            core.processInExecution = this.getProcess(processList);
            core.processTimeLeft = this.getProcess(processList).totalTIme;
            core.processInExecution.state = 'running'
          }
        } else if (core.processInExecution.remainingTime === 0) {
          core.processInExecution.state = 'terminated';
          const index = processList.findIndex(p => {
            return p.id === core.processInExecution.id
          });
          processList.splice(index, 1);
          terminatedProcessList.push(core.processInExecution);
          core.status = 'waiting';
          core.processInExecution = 'none';
        } else if (core.processInExecution !== 'none') {
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
    }, 1000)
  };

  FIFO = () => {
    setTimeout(() => {
      let coreList = this.state.coreList;
      let processList = this.state.processList;
      let terminatedProcessList = this.state.terminatedProcessList;

      coreList.forEach((core, index) => {
        if (core.status === 'waiting' && this.nextProcess(processList)) {
          core.status = 'busy';
          if (core.processInExecution === 'none') {
            core.processInExecution = this.getProcess(processList);
            core.processTimeLeft = this.getProcess(processList).totalTIme;
            core.processInExecution.state = 'running'
          }
        } else if (core.processInExecution.remainingTime === 0) {
          core.processInExecution.state = 'terminated';
          const index = processList.findIndex(p => {
            return p.id === core.processInExecution.id
          });
          processList.splice(index, 1);
          terminatedProcessList.push(core.processInExecution);
          core.status = 'waiting';
          core.processInExecution = 'none';
        } else if (core.processInExecution !== 'none') {
          core.processInExecution.remainingTime -= 1;
          core.processTimeLeft -= 1
        }
      });

      if (this.isSimulatorFinish(processList).length || this.isCoreWorking(coreList).length) { // é pra continuar ?
        this.setState({
          coreList,
          processList,
          terminatedProcessList
        }, this.FIFO)
      } else {
        this.setState({
          coreList,
          processList,
          terminatedProcessList
        })
      }
    }, 1000);
  };

  roundRobin = () => {
    setTimeout(() => {
      let coreList = this.state.coreList
      let processList = this.state.processList
      let terminatedProcessList = this.state.terminatedProcessList

      coreList.forEach((core, index) => {
        if (core.status === 'waiting' && this.nextProcess(processList)) {
          core.status = 'busy'
          if (core.processInExecution === 'none') {
            core.processInExecution = this.getProcess(processList)
            core.processInExecution.state = 'running'
          }
        } else if (core.processTimeLeft === 0 || core.processInExecution.remainingTime <= 0) {
          if (core.processInExecution.remainingTime <= 0) {
            core.processInExecution.state = 'terminated'
            const index = processList.findIndex(p => {
              return p.id === core.processInExecution.id
            });
            processList.splice(index, 1)
            terminatedProcessList.push(core.processInExecution)
          } else {
            core.processInExecution.state = 'ready'
            this.reOrderProcess(processList, core.processInExecution)
          }
          core.status = 'waiting'
          core.processInExecution = 'none'
          core.processTimeLeft = core.quantum
        } else if (core.processInExecution !== 'none') {
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
      }

    }, 1000)
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
    const process = new Process({
      id: this.state.processList.length,
      name: 'Process ' + (this.state.processList.length + this.state.terminatedProcessList.length + 1),
      state: 'ready',
    })
    if (!this.state.processList.length) {
      this.setState({
        processList: [
          ...this.state.processList,
          process
        ]
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
    message.info('Random Process ' + ((!value) ? 'Enabled' : 'Disabled'))
    this.setState({ isDisableRandom: value })
  }

  killProcess = id => {
    message.info(`Process ${id} Deleted`)
    this.setState({
      processList: this.state.processList.filter(proc => proc.id !== id)
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
        onAddProcess={this.addNewProcess}
        killProcess={this.killProcess}
      />
    )
  }
})

export default withLogic
