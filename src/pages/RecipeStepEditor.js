import React, { useEffect, useRef, useState } from "react"
import { Player, BigPlayButton, ControlBar } from "video-react"
import { Link } from "react-router-dom"
import { IoChevronBackSharp } from "react-icons/io5"
import "shared/style/recipeStepEditor.scss"
import _ from "lodash"

import { ExpandDiv } from "shared/components/styled"
import { useDispatch } from "react-redux"
import { transMSecToMin, insertIndexToArray } from "shared/utility/common"
import "shared/style/recipeStepEditor.scss"
import Table from "shared/components/Table"
import {
  allPaths,
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
  }, [])

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
            <button className="ts-default right" onClick={handleAddStep}>
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
      <div className="next">
        <Link className="next" to={allPaths[recipeManager]}>
          儲存
        </Link>
        <Link className="next" to={allPaths[recipeImageEditor] + id.toString()}>
          <IoChevronBackSharp />
          編輯圖片
        </Link>
      </div>
    </ExpandDiv>
  ) : (
    <h1>Loading</h1>
  )
}

export default RecipeStepEditor
