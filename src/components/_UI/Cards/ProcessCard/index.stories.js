import React from 'react'
import Core from '../../../../struct/Core'
import Process from '../../../../struct/Process'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import ProcessCard from './'

const process = new Process({
  id: 1,
  name: 'Process ' + 1,
  state: 'ready'
})

storiesOf('UI|Card/ Process', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}>
      <ProcessCard {...process} />
    </div>
  ))
