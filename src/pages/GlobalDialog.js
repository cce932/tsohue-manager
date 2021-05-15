import React, { useCallback, useEffect, useState, createContext } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { IoClose } from "react-icons/io5"

import { clearMessage } from "actions/message"
import { CLEAR_DIALOG } from "shared/constants/types"
import colorOptions from "shared/style/color"

const DialogContext = createContext()

export default DialogContext

const DialogWrapper = styled.div`
  ${(props) => props.theme.font}
  font-weight: bold;
  color: white;

  z-index: 99999999;
  position: fixed;
  bottom: 1rem;
  right: 2rem;
`

const StyledDialog = styled.div`
  background-color: ${(props) => props.color};
  box-shadow: $default-shadow;
  min-width: 200px;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
  backdrop-filter: blur(10px);

  button {
    background-color: transparent;
    border: none;
    margin-left: 20px;
    float: right;
  }
`

export const GlobalDialog = ({ children }) => {
  const [dialogs, setDialogs] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (dialogs.length > 0) {
      const timer = setTimeout(
        () => setDialogs((dialogs) => dialogs.slice(1)),
        5000
      )
      return () => clearTimeout(timer)
    }
  }, [dialogs])

  const addDialog = useCallback(
    function (message, color = colorOptions.accentLighter2) {
      if (message === CLEAR_DIALOG) {
        setDialogs([])
        return
      }

      setDialogs((dialogs) => [...dialogs, { message, color }])
      dispatch(clearMessage())
    },
    [dispatch]
  )

  const onClose = (thisMessage) => () => {
    setDialogs((dialogs) =>
      dialogs.filter((dialog) => dialog.message !== thisMessage)
    )
  }

  return (
    <DialogContext.Provider value={addDialog}>
      <DialogWrapper>
        {dialogs.map((dialog, index) => (
          <StyledDialog color={dialog.color} key={index}>
            {dialog.message}
            <button onClick={onClose(dialog.message)}>
              <IoClose fill="white" size="20px" />
            </button>
          </StyledDialog>
        ))}
      </DialogWrapper>
      {children}
    </DialogContext.Provider>
  )
}
