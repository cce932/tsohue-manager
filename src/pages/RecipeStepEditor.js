import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Player, BigPlayButton, ControlBar } from "video-react"
import { Link } from "react-router-dom"
import {
  BsChevronLeft,
  BsFolderCheck,
  BsChevronDoubleLeft,
} from "react-icons/bs"
import _ from "lodash"

import "shared/style/recipeStepEditor.scss"
import RecipeStepItemEditor from "shared/components/RecipeStepItemEditor"
import Table from "shared/components/Table"
import StyledSpinner from "shared/components/StyledSpinner"
import { ExpandDiv } from "shared/components/styled"
import { transMSecToMin, insertIndexToArray } from "shared/utility/common"
import {
  allPaths,
  recipeEditor,
  recipeImageEditor,
  recipeManager,
} from "shared/constants/pathname"
import { getRecipeById } from "actions/loadData"
import { createRecipeStep } from "actions/addData"
import { deleteRecipeStep } from "actions/deleteData"

const transStartTimeToMinInSteps = (steps) =>
  steps.map((step) => ({
    ...step,
    startTime: transMSecToMin(step.startTime),
    timer: step.timer / 1000,
  }))

const RecipeStepEditor = (props) => {
  const dispatch = useDispatch()
  const videoRef = useRef()
  const [steps, setSteps] = useState([])
  const [note, setNote] = useState("")
  const [timer, setTimer] = useState(0)
  const [player, setPlayer] = useState(undefined)
  const [recipe, setRecipe] = useState({})
  const [stepRadio, setStepRadio] = useState("true")
  const [modalShow, setModalShow] = useState(false)
  const [rowDataForEdit, setRowDataForEdit] = useState({})
  const id = props.match.params.id
  const tableColumns = {
    index: "順序",
    startTime: "起始時間",
    note: "說明",
    timer: "計時 (秒)",
  }

  useEffect(() => {
    videoRef.current.subscribeToStateChange(handleStateChange)
    dispatch(getRecipeById(id)).then((res) => {
      setRecipe(res)
      setSteps(res.recipeSteps)
    })
  }, [dispatch, id])

  const handleStateChange = (state) => {
    // copy player state to this component's state
    setPlayer(state)
  }

  const handleAddStep = () => {
    const startTime = timer > 0 ? null : _.floor(player.currentTime, 3) * 1000 // pass millisecond to back-end

    dispatch(createRecipeStep(id, startTime, timer * 1000, note)).then(
      (res) => {
        setSteps([
          ...steps,
          {
            id: res.id,
            startTime: res.startTime,
            timer: res.timer,
            note: res.note,
          },
        ])
      }
    )

    setTimer(0)
  }

  const noteOnChange = (e) => {
    setNote(e.target.value)
  }

  const timerOnChange = (e) => {
    setTimer(e.target.value)
  }

  const removeTableItemOnClick = (rowData) => {
    dispatch(deleteRecipeStep(id, rowData.id)).then((data) => {
      setRecipe(data)
      setSteps(data.recipeSteps)
    })
  }

  const editTableItemOnClick = (rowData) => {
    const { startTime, note, timer, id } = rowData

    setRowDataForEdit({ startTime, note, timer, stepId: id })
    setModalShow(true)
  }

  const editedTableItemOnClick = (itemData) => {
    const { id, note, timer, startTime } = itemData
    console.log("itemData", itemData)

    setSteps(
      steps.map((step) => {
        if (step.id === id) {
          return { id, note, timer, startTime }
        }
        return step
      })
    )
  }

  return steps && recipe ? (
    <ExpandDiv className={`recipe-editor recipe-step-editor`}>
      <div>
        <p>標注料理步驟</p>
        <div className="content">
          <Player src={recipe.link} fluid={false} ref={videoRef} width={700}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} />
          </Player>

          <div className="step-adder">
            <label className="sub-title">第{steps.length + 1}步驟時間</label>
            {player && transMSecToMin(_.floor(player.currentTime, 3) * 1000)}

            <fieldset id="radio-group">
              <div className="step-note">
                <input
                  type="radio"
                  id="step-radio"
                  name="radio-group"
                  checked={stepRadio}
                  onClick={(e) => setStepRadio(e.target.checked)}
                />
                <label className="sub-title" for="step-radio">
                  步驟說明
                </label>
                <textarea
                  cols="50"
                  rows="3"
                  value={note}
                  onChange={noteOnChange}
                  disabled={!stepRadio}
                />
              </div>

              <input
                type="radio"
                id="timer-radio"
                name="radio-group"
                checked={!stepRadio}
                onClick={(e) => setStepRadio(!e.target.checked)}
              />
              <label className="sub-title" for="timer-radio">
                計時 (秒)
              </label>
              <input
                value={timer}
                onChange={timerOnChange}
                type="number"
                disabled={stepRadio}
              ></input>
              <button
                className="ts-default right top-adjust"
                onClick={handleAddStep}
              >
                新增步驟
              </button>
            </fieldset>
          </div>

          <Table
            data={insertIndexToArray(transStartTimeToMinInSteps(steps))}
            columns={tableColumns}
            remove={removeTableItemOnClick}
            editable={true}
            edit={editTableItemOnClick}
          />

          <RecipeStepItemEditor
            show={modalShow}
            onHide={(e) => {
              e?.preventDefault()
              setModalShow(false)
            }}
            {...{
              id: recipe.id,
              name: recipe.name,
              version: recipe.version,
              ...rowDataForEdit,
              updateTableItem: editedTableItemOnClick,
            }}
          />
        </div>
      </div>
      <div className="back">
        <Link className="back" to={allPaths[recipeManager]}>
          完成
          <BsFolderCheck />
        </Link>
      </div>
      <div className="next">
        <Link className="next" to={allPaths[recipeEditor] + id}>
          <BsChevronDoubleLeft />
          基本資料
        </Link>
        <Link className="next" to={allPaths[recipeImageEditor] + id}>
          <BsChevronLeft />
          相片
        </Link>
        <button disabled className="this-page" to="#">
          教學步驟
        </button>
      </div>
    </ExpandDiv>
  ) : (
    <StyledSpinner />
  )
}

export default RecipeStepEditor
