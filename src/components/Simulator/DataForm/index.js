import React from 'react'
import Form from 'antd/lib/form/Form'
import {
  Container,
  ButtonsContainer,
  ButtonsWrapper,
  Label
} from './styles'
import SelectSimple from '../../_UI/Input/SelectSimple'
import { Input, Button } from 'antd'
import withLogic from './withLogic'

const DataForm = ({ onChange, onSelectAlg, state, onClose, onClear, onStartSimulation }) => {
  const fields = React.useMemo(() => [
    {
      label: 'Algoritmo de Escalonamento',
      name: 'whichAlg',
      isSelect: true,
      selectFields: ['Round Robin', 'SJF', 'FIFO']
    },
    {
      label: 'Algoritmo de Alocacao de memoria',
      name: 'memoryAllocationAlg',
      isSelect: true,
      selectFields: ['First Fit', 'Best Fit', 'Quick fit']
    },
    {
      label: 'Número de Quantum',
      name: 'quantum',
      type: 'text',
      placeholder: 'Número de Quantum'
    },
    {
      label: 'Número de Processos',
      name: 'processesNumber',
      type: 'text',
      placeholder: 'Número de Processos'
    },
    {
      label: 'Número de Cores',
      name: 'coresNumber',
      type: 'text',
      placeholder: 'Número de Cores'
    },
    {
      label: 'Número de listas do quick fit',
      name: 'numberQuickList',
      type: 'text',
      placeholder: '2'
    },
    {
      label: 'Número de chamadas de memoria',
      name: 'numberMemoryCalls',
      type: 'text',
      placeholder: '2'
    },
    {
      label: 'Tamanho da memoria',
      name: 'totalInstalledMemory',
      type: 'text',
      placeholder: '2'
    }
  ])

  return (
    <Form>
      {fields.map((field, index) => (
        <Container key={index}>
          <Label>{field.label}</Label>
          {field.isSelect
            ? (
              <SelectSimple
                onChange={onSelectAlg}
                name={field.name}
                placeholder='Selecione uma opção'
                data={field.selectFields}
                noPosition
                isLeft={false}
              />
            )
            : (
              <Input
                name={field.name}
                placeholder={field.placeholder}
                onChange={onChange}
                value={state[field.name]}
              />
            )}
        </Container>
      ))}
      <ButtonsContainer>
        <Button
          onClick={onClose}
          style={{ marginRight: 8 }}
        >
          Fechar
        </Button>
        <ButtonsWrapper>
          <Button
            onClick={onClose}
            style={{ marginRight: 8 }}
          >
            Limpar
          </Button>
          <Button onClick={onStartSimulation} type='primary'>
            Iniciar Simulação
          </Button>
        </ButtonsWrapper>
      </ButtonsContainer>
    </Form>
  )
}

export default withLogic(DataForm)
