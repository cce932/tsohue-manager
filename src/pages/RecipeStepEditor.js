import React, { useEffect, useRef, useState } from "react"
import { Player, BigPlayButton, ControlBar } from "video-react"
import { Link } from "react-router-dom"
import {
  BsChevronLeft,
  BsFolderCheck,
  BsChevronDoubleLeft,
} from "react-icons/bs"
import _ from "lodash"

import "shared/style/recipeStepEditor.scss"
import { ExpandDiv } from "shared/components/styled"
import { useDispatch } from "react-redux"
import { transMSecToMin, insertIndexToArray } from "shared/utility/common"
import "shared/style/recipeStepEditor.scss"
import Table from "shared/components/Table"
import {
  allPaths,
  recipeEditor,
  recipeImageEditor,
  recipeManager,
} from "shared/constants/pathname"
import { getRecipeById } from "actions/loadData"
import { createRecipeStep } from "actions/addData"
import { deleteRecipeStep } from "actions/deleteData"
import StyledSpinner from "shared/components/StyledSpinner"

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

  const removeTableItem = (rowData, e, data = steps) => {
    e.preventDefault()

    dispatch(deleteRecipeStep(id, rowData.id)).then((data) => {
      setRecipe(data)
      setSteps(data.recipeSteps)
    })
  }

  return steps && recipe ? (
    <ExpandDiv className={`recipe-editor recipe-step-editor`}>
      <div>
        <p>標注食譜步驟</p>
        <div className="content">
          <Player src={recipe.link} fluid={false} ref={videoRef} width={700}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} />
          </Player>

          <div className="step-adder">
            <label className="sub-title">第{steps.length + 1}步驟時間</label>
            {player && transMSecToMin(_.floor(player.currentTime, 3) * 1000)}

            <div className="step-note">
              <label className="sub-title">步驟說明</label>
              <textarea
                cols="50"
                rows="3"
                value={note}
                onChange={noteOnChange}
              />
            </div>
            <label className="sub-title">計時 (秒)</label>
            <input value={timer} onChange={timerOnChange} type="number"></input>
            <button
              className="ts-default right top-adjust"
              onClick={handleAddStep}
            >
              新增步驟
            </button>
          </div>

          <Table
            data={insertIndexToArray(transStartTimeToMinInSteps(steps))}
            columns={tableColumns}
            remove={removeTableItem}
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
