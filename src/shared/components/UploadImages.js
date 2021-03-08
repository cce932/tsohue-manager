import useDialogContext from "hooks/useDialogContext"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addRecipeImages } from "actions/addData"

const UploadImages = () => {
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState(undefined)
  const [progressInfos, setProgressInfos] = useState([])
  const [imageInfos, setImageInfos] = useState([])
  const [previewResults, setPreviewResults] = useState([])
  const addDialog = useDialogContext()

  const selectFiles = (e) => {
    setSelectedFiles(e.target.files)
    setProgressInfos([])
  }

  const upload = async () => {
    let _progressInfos = []
    let _previewResult = []

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0 })

      await dispatch(
        addRecipeImages(selectedFiles[i], "3", (e) => { // ! id要改
          _progressInfos[i].percentage = Math.round((100 * e.loaded) / e.total)
          setProgressInfos(_progressInfos)
        })
      )
        .then(({ data }) => {
          setImageInfos([...imageInfos, data])
          _previewResult.push(URL.createObjectURL(selectedFiles[i]))
          addDialog(`新增照片「${data.name}」成功`)
        })
        .catch(() => {
          _progressInfos[i].percentage = 0
          setProgressInfos(_progressInfos)
          addDialog(`新增照片「${selectedFiles[i].name}」失敗`)
        })
    }

    setPreviewResults([...previewResults, ..._previewResult]) // 不可用[...old, new] 因為new為array
    setSelectedFiles(undefined)
  }

  return (
    <div>
      <div>
        <input type="file" multiple accept="image/*" onChange={selectFiles} />
        <button
          className="upload-image"
          disabled={!selectedFiles}
          onClick={upload}
        >
          上傳圖片
        </button>
      </div>

      {progressInfos &&
        progressInfos.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressInfo.percentage + "%" }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}

      <div className="card mt-3">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {previewResults &&
            previewResults.map((img, i) => {
              return (
                <img
                  className="preview"
                  src={img}
                  alt={"image-" + i}
                  key={i}
                  style={{ width: "200px" }}
                />
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default UploadImages
