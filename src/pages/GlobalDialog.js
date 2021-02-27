import React, { useCallback, useEffect, useState, createContext } from "react"
import { useDispatch } from "react-redux"
import "shared/style/globalDialog.scss"
import { clearMessage } from "actions/message"

const DialogContext = createContext()

export default DialogContext

export const GlobalDialog = ({ children }) => {
  const [dialogs, setDialogs] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (dialogs.length > 0) {
      const timer = setTimeout(() => setDialogs((dialogs) => dialogs.slice(1)), 50000)
      return () => clearTimeout(timer)
    }
  }, [dialogs])

  const addDialog = useCallback(
    function (dialog) {
      setDialogs((dialogs) => [...dialogs, dialog])
      dispatch(clearMessage())
    },
    [setDialogs]
  )

  return (
    <DialogContext.Provider value={addDialog}>
      <div className={"dialog-wrapper"}>
        {dialogs.map((dialog, index) => (
          <div className={`dialog`} key={index}>
            {dialog}
          </div>
        ))}
      </div>
      {children}
    </DialogContext.Provider>
  )
}
