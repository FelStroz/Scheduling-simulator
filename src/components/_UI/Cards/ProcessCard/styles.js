import styled from 'styled-components/macro'
import theme from '../../../../utils/theme'

export const Container = styled.div`
  cursor: pointer;
  width: 220px;
  height: 87px;
  background-color: ${theme.dark.black};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin: 10px;

  &:hover {
    /* justify-content: center;
    background-color: #fff;
    & div{
      width: 50px;
      height: 50px;
      border-radius: 60px;
      & div{
        display: none
      }
    } */
  }

  &:active {
    justify-content: center;
    background-color: #fff;
    & div{
      width: 50px;
      height: 50px;
      border-radius: 60px;
      & div{
        display: none
      }
    }
  }
`

export const StatusBar = styled.div`
  ${({ state }) => {
    switch (state) {
      case 'ready':
        return `background-color: ${theme.dark.green};`
      case 'running':
        return `background-color: ${theme.dark.blue};`
      case 'terminated':
        return `background-color: ${theme.dark.red};`
      default:
        return `background-color: ${theme.dark.yellow};`
    }
  }}
  width: 5%;
  height: 100%;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 7px;
  padding-right: 7px;
  width: 95%;
`

export const TopWrapper = styled.div`
  ${({ state }) => {
    switch (state) {
      case 'ready':
        return `border-bottom: 1px solid ${theme.dark.green};`
      case 'running':
        return `border-bottom: 1px solid ${theme.dark.blue};`
      case 'terminated':
        return `border-bottom: 1px solid ${theme.dark.red};`
      default:
        return `border-bottom: 1px solid ${theme.dark.green};`
    }
  }}
  padding: 10px 0 10px 5px;
  display: flex;
  justify-content: space-between;
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: white;
`

export const SubTitle = styled(Title)`
  font-size: 10px;
  line-height: 12px;
`

export const StatusText = styled(Title)`
  font-size: 8px;
  line-height: 10px;
`

export const BottomWrapper = styled.div`
  display: flex;
  padding: 6px 0;
  justify-content: space-between;
`

export const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;

  ${({ state, isRight }) => {
    if (isRight) {
      switch (state) {
        case 'ready':
          return `border-left: 1px solid ${theme.dark.green};`
        case 'running':
          return `border-left: 1px solid ${theme.dark.blue};`
        case 'terminated':
          return `border-left: 1px solid ${theme.dark.red};`
        default:
          return `border-left: 1px solid ${theme.dark.green};`
      }
    }
  }}
`

export const TimeText = styled(Title)`
  font-size: 10px;
  line-height: 6px;
  text-align: center;
`

export const TimeCount = styled(TimeText)`
  font-size: 16px;
  line-height: 20px;
  width: 100%;
`
