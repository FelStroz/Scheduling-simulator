import React from 'react'
import Core from '../../../../struct/Core'
import Process from '../../../../struct/Process'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import CoreCard from './'

const core = new Core({
  id: 1,
  name: 'Core ' + 1,
  status: 'waiting',
  processInExecution: new Process({
    id: 1,
    name: 'Process ' + 1,
    state: 'ready'
  }),
  quantum: 2,
  processTimeLeft: 2
})

storiesOf('UI|Card/ Core', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}>
      <CoreCard {...core}/>
    </div>
  ))
