import { useDispatch } from "react-redux"
import { Modal } from "react-bootstrap"
import { Formik } from "formik"

import "shared/style/components/recipeStepItemEditor.scss"
import useDialogContext from "hooks/useDialogContext"
import { editRecipeStep } from "actions/editData"
import { transMinToMSec } from "shared/utility/common"
import color from "shared/style/color"

const RecipeStepItemEditor = ({
  id,
  name,
  version,
  stepId,
  startTime,
  note,
  timer,
  updateTableItem,
  show,
  onHide,
}) => {
  const dispatch = useDispatch()
  const addDialog = useDialogContext()

  const editOnClick = (values) => {
    const { startTime, note, timer } = values
    const stepData = {
      name,
      version,
      recipeSteps: [
        {
          startTime: transMinToMSec(startTime),
          note,
          timer: timer * 1000,
          id: stepId,
        },
      ],
    }

    dispatch(editRecipeStep(id, stepData))
      .then((data) => {
        updateTableItem(data.recipeSteps)
        addDialog("成功更新食譜步驟", color.success)
      })
      .catch(() =>
        addDialog("更新食譜步驟失敗，請刷新，並在試一次", color.accent)
      )
  }

  return (
    <Modal
      {...{ show, onHide }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="recipe-step-item-editor"
    >
      <Formik
        initialValues={{
          startTime,
          note,
          timer,
        }}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          editOnClick(values)
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form>
            <Modal.Body>
              <p className="title">編輯步驟</p>

              <div className="block">
                <label>起始時間</label>
                <input
                  type="text"
                  id="startTime"
                  name="startTime"
                  onChange={handleChange}
                  value={values.startTime}
                />
              </div>
              <div className="block">
                <label>說明</label>
                <input
                  type="text"
                  id="note"
                  name="note"
                  onChange={handleChange}
                  value={values.note}
                />
              </div>
              <div className="block">
                <label>計時（秒）</label>
                <input
                  type="text"
                  id="timer"
                  name="timer"
                  onChange={handleChange}
                  value={values.timer}
                />
              </div>

              <div className="right">
                <button
                  type="submit"
                  className="submit"
                  onClick={(e) => {
                    handleSubmit(e)
                    onHide(e)
                  }}
                  // disabled={!_.isEmpty(errors)}
                >
                  確定
                </button>
                <button className="hide" onClick={onHide}>
                  取消
                </button>
              </div>
            </Modal.Body>
          </form>
        )}
      </Formik>
    </Modal>
  )
}

export default RecipeStepItemEditor
