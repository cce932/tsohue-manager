import useDialogContext from "hooks/useDialogContext"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addRecipeImages } from "actions/addData"
import "shared/style/components/uploadImages.scss"

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
        addRecipeImages(selectedFiles[i], "3", (e) => {
          // ! id要改
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
    <div className="upload-images">
      <p>上傳圖片</p>
      <div className="content">
        <input type="file" multiple accept="image/*" onChange={selectFiles} />
        <button
          className="upload-image"
          disabled={!selectedFiles}
          onClick={upload}
        >
          上傳
        </button>

        <div className="progress-group">
          {progressInfos &&
            progressInfos.map((progressInfo, index) => (
              <div className="progress" key={index}>
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
            ))}
        </div>

        {previewResults.length ? (
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {previewResults.map((img, i) => {
                console.log("imgggg", img)
                return (
                  <div
                    className={
                      i == previewResults.length - 1
                        ? "carousel-item active"
                        : "carousel-item"
                    }
                    key={i}
                  >
                    <img
                      className="d-block w-100"
                      src={img}
                      alt={"image-" + i}
                    />
                  </div>
                )
              })}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default UploadImages
