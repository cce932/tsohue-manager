import useDialogContext from "hooks/useDialogContext"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { uploadRecipeImage } from "actions/addData"
import { getRecipeById } from "actions/loadData"
import Carousel from "react-bootstrap/Carousel"
import "shared/style/components/uploadImages.scss"

const UploadImages = (props) => {
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState(undefined) // 需要useState 不然無法disable上傳button
  const [progressInfos, setProgressInfos] = useState([])
  const [previewResults, setPreviewResults] = useState([])
  const [index, setIndex] = useState(0)
  const addDialog = useDialogContext()
  const id = props.id

  useEffect(() => {
    dispatch(getRecipeById(id)).then((res) => {
      setPreviewResults(res.photos)
    })
  }, [])

  const selectFiles = (e) => {
    setSelectedFiles(e.target.files)
    setProgressInfos([])
  }

  const upload = () => {
    let _progressInfos = []

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0 })

      // In fact, progress-bar not working except the first one
      dispatch(
        uploadRecipeImage(selectedFiles[i], id, (e) => {
          _progressInfos[i].percentage = Math.round((100 * e.loaded) / e.total)
          setProgressInfos(_progressInfos)
        })
      )
        .then((data) => {
          addDialog(`新增照片「${data.name}」成功`)
        })
        .catch(() => {
          _progressInfos[i].percentage = 0
          setProgressInfos(_progressInfos)
          addDialog(`新增照片「${selectedFiles[i].name}」失敗`)
        })
        .then(() => {
          if (i === selectedFiles.length - 1) {
            setTimeout(() => {
              dispatch(getRecipeById(id)).then((res) => {
                const _previewLength = previewResults.length
                setPreviewResults(res.photos)
                setIndex(_previewLength + selectFiles.length - 1)
                setSelectedFiles(undefined)
              })
            }, 1000) // getImages after waiting 1 sec because of the time of uploading
          }
        })
    }
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
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

        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
          {previewResults.length ? (
            previewResults.map((img, i) => {
              return (
                <Carousel.Item key={i}>
                  <img
                    className="d-block w-100"
                    src={`data:image/jpg;base64, ${img.picByte}`}
                    alt={"image-" + i}
                  />
                </Carousel.Item>
              )
            })
          ) : (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/pic/noPhoto.png"
                alt={"on-photo"}
              />
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default UploadImages
