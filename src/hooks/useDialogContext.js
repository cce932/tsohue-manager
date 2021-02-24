import { useContext } from "react";
import DialogContext from "pages/GlobalDialog";

const useDialogContext = () => {
  return useContext(DialogContext)
}

export default useDialogContext
