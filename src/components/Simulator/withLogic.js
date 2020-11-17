import React, { useState } from 'react'
import { useSelector, connect } from 'react-redux'

const withConnect = Component => {
  const actions = {
  }
  return connect(
    null,
    actions
  )(Component)
}

export default Component => withConnect(props => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(true)
  const coreList = useSelector(state => state.core.list)
  const [whichAlg, setWhichAlg] = useState('FIFO')
  const [data, setData] = useState({

  })

  return (
    <Component
      isDrawerVisible={isDrawerVisible}
      setIsDrawerVisible={setIsDrawerVisible}
      showScheduler={(coreList.length > 0)}
      changeWhichAlg={setWhichAlg}
      whichAlg={whichAlg}
      data={data}
      setData={setData}
    />
  )
})
