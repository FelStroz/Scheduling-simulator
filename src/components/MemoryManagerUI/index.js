import React from 'react'
import styled from 'styled-components'
import MemoryBlockCard from '../_UI/MemoryBlock'

export const Container = styled.div`
  padding: 10px;
`
export const Wrapper = styled.div`
  padding: 10px;
  border: 1px solid green;
`
export const TitleWrapper = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  max-height: 600px;
  width: 14%;
`

export const TitleLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`

export const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 5px;
  ${({ isLeft }) => isLeft
    ? 'text-align: left; color: #2DF489;'
    : 'text-align: right;'
  }
`

export const List = styled.div`
  background: #6D7082;
  display: flex;
  flex-wrap: wrap;
  max-height: 600px;
  width: 85%;
  overflow: hidden;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #282A36;
  border-radius: 2px;
`

export const WrapperInfo = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
`

export const WtfWrapper = styled.div`
  border: 1px solid red;

`

export const TableTitle = styled(Title)`
  font-size: 12px !important;
  color: #2DF489;
`

const MemoryManagerUi = ({ memoryManager }) => {
  return (
    <Container>
      {/* <TitleWrapper>
        <Title>Memory List {memoryManager.totalMemory - memoryManager.availableMemory}/{memoryManager.totalMemory} Bytes</Title>
        <Title>First Free Block {memoryManager.freeBlockList} </Title>
      </TitleWrapper> */}
      <WrapperInfo>
        <List>
          {(memoryManager.memory || []).map((memoryBlock, index) => (
            <MemoryBlockCard
              key={index}
              size={Math.ceil((memoryBlock.totalBlockSize / memoryManager.totalMemory) * 100)}
              {...memoryBlock}
            />
          ))}
        </List>
        <TitleWrapper>
          <TitleLine>
            <Title isLeft>MemoryUsed</Title>
            <Title>{memoryManager.totalMemory - memoryManager.availableMemory}/{memoryManager.totalMemory}</Title>
          </TitleLine>
          {/* <TitleLine>
            <Title isLeft>MemoryUsed</Title>
            <Title>{memoryManager.totalMemory - memoryManager.availableMemory}/{memoryManager.totalMemory}</Title>
          </TitleLine> */}
          <TitleLine>
            <Title isLeft>OccupiedSpace</Title>
            <Title>{memoryManager.occupiedMemory}/{memoryManager.totalMemory}</Title>
          </TitleLine>
          <TitleLine>
            <Title isLeft>Blocks Number</Title>
            <Title>{memoryManager.memory.length}</Title>
          </TitleLine>
          <TitleLine>
            <Title isLeft>First Free Block</Title>
            <Title>{memoryManager.freeBlockList} </Title>
          </TitleLine>
          <Title>
            Statistic Table
          </Title>
          {(memoryManager.statisticTable || []).map((line, index) => (
            <WtfWrapper key={index}>
              <TitleLine>
                <TableTitle isLeft>Occurrences {line.occurrences}</TableTitle>
                <TableTitle> Required Memory {line.requiredMemory}</TableTitle>
              </TitleLine>
            </WtfWrapper>
          ))}
        </TitleWrapper>
      </WrapperInfo>
    </Container>
  )
}

export default MemoryManagerUi
