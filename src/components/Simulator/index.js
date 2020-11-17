import React from 'react'
import { Drawer } from 'antd'
import withLogic from './withLogic'
import { PlusOutlined } from '@ant-design/icons'
import DataForm from './DataForm'
import {
  Container,
  NewSimulationButton
} from './styles'
import Kernel from '../Kernel'

const Simulator = ({ isDrawerVisible, data, setIsDrawerVisible, showScheduler, changeWhichAlg, whichAlg, setData }) => {
  return (
    <Container>
      {/* <NewSimulationButton type='primary' onClick={() => setIsDrawerVisible(true)}>
        <PlusOutlined /> New Simulation
      </NewSimulationButton> */}
      <Drawer
        title='Formulário para nova Simulação'
        width={500}
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        footer={
          <div />
        }
      >
        <DataForm changeWhichAlg={changeWhichAlg} setData={setData} closeDrawer={() => setIsDrawerVisible(false)} />
      </Drawer>
      {/* {showScheduler &&
        <Scheduler whichAlg={whichAlg} />} */}
      {showScheduler &&
        <Kernel whichAlg={whichAlg} {...data} />}
    </Container>
  )
}

// export default Simulator

export default withLogic(Simulator)
