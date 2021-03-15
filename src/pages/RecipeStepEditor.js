import React, { useEffect, useRef, useState } from "react"
import { Player, BigPlayButton, ControlBar } from "video-react"
import { Link } from "react-router-dom"
import "shared/style/recipeStepEditor.scss"
import { ExpandDiv } from "shared/components/styled"
import { useDispatch } from "react-redux"
import { transSecToMin, insertIndexToArray } from "shared/utility/common"
import "shared/style/recipeStepEditor.scss"
import Table from "shared/components/Table"
import { allPaths, recipeManager } from "shared/constants/pathname"

const RecipeStepEditor = (props) => {
  const dispatch = useDispatch()
  const videoRef = useRef()
  const [steps, setSteps] = useState([])
  const [note, setNote] = useState("")
  const [timer, setTimer] = useState(0)
  const [player, setPlayer] = useState(undefined)
  const id = props.match.params.id
  const tableColumns = {
    id: "順序",
    startTime: "起始時間 (秒)",
    note: "說明",
    timer: "計時 (秒)",
  }

  useEffect(() => {
    videoRef.current.subscribeToStateChange(handleStateChange)
  }, [])

  const handleStateChange = (state) => {
    // copy player state to this component's state
    setPlayer(state)
  }

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        startTime: timer > 0 ? null : Math.floor(player.currentTime, 0),
        note,
        timer,
      },
    ])
  }

  const noteOnChange = (e) => {
    setNote(e.target.value)
  }

  const timerOnChange = (e) => {
    setTimer(e.target.value)
  }

  const removeTableItem = (rowId, data = steps) => {
    data.splice(rowId - 1, 1)
    setSteps(data)
  }

  return (
    <ExpandDiv className={`recipe-editor recipe-step-editor`}>
      <div>
        <p>標注食譜步驟</p>
        <div className="content">
          <Player
            src="http://media.w3.org/2010/05/video/movie_300.webm"
            fluid={false}
            ref={videoRef}
            width={700}
          >
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} />
          </Player>

          <div className="step-adder">
            <label className="sub-title">第{steps.length + 1}步驟時間</label>
            {player && transSecToMin(Math.floor(player.currentTime, 0))}

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
            data={insertIndexToArray(steps)}
            columns={tableColumns}
            remove={removeTableItem}
          />
        </div>
      </div>
      <Link className="next" to={allPaths[recipeManager]}>
        儲存
      </Link>
    </ExpandDiv>
  )
}

export default RecipeStepEditor
