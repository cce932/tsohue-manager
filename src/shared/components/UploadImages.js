import useDialogContext from "hooks/useDialogContext"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Carousel from "react-bootstrap/Carousel"
import { getImagesByRecipeId } from "actions/loadData"
import { uploadRecipeImage } from "actions/addData"
import { deleteRecipeImage } from "actions/deleteData"
import "shared/style/components/uploadImages.scss"
import color from "shared/style/color"

const UploadImages = (props) => {
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState(undefined) // 需要useState 不然無法disable上傳button
  const [progress, setProgress] = useState([])
  const [images, setImages] = useState([])
  const [index, setIndex] = useState(0)
  const addDialog = useDialogContext()
  const id = props.id

  useEffect(() => {
    dispatch(getImagesByRecipeId(id)).then((res) => {
      setImages(res)
    })
  }, [dispatch, id])

  const selectFiles = (e) => {
    setSelectedFiles(e.target.files)
    setProgress([])
  }

  const upload = () => {
    // window.alert("[告知測試的同學與師長] 目前不開放測試此上傳功能，因金費限制而無法開通雲端同步服務。")
    // return

    let _progressInfos = []

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0 })

      // In fact, progress-bar not working except the first one
      dispatch(
        uploadRecipeImage(selectedFiles[i], id, (e) => {
          _progressInfos[i].percentage = Math.round((100 * e.loaded) / e.total)
          setProgress(_progressInfos)
        })
      )
        .then((data) => {
          addDialog(`新增照片「${data.name}」成功`, color.success)
        })
        .catch(() => {
          _progressInfos[i].percentage = 0
          setProgress(_progressInfos)
          addDialog(`新增照片「${selectedFiles[i].name}」失敗`, color.accent)
        })
        .then(() => {
          if (i === selectedFiles.length - 1) {
            setTimeout(() => {
              dispatch(getImagesByRecipeId(id)).then((res) => {
                const _previewLength = images.length
                setImages(res)
                setIndex(_previewLength + selectFiles.length - 1)
                setSelectedFiles(undefined)
              })
            }, 1000) // getImages after waiting 1 sec because of the time of uploading
          }
        })
    }
  }

  const remove = () => {
    if (
      window.confirm(
        `確認刪除相片「${images[index].id}: ${images[index].name}」？`
      )
    ) {
      dispatch(deleteRecipeImage(images[index].id))
        .then(({ data }) => {
          images.length > 1 &&
            setIndex(index - 1 > 0 ? index - 1 : images.length - 2)
          addDialog(`成功刪除「${data.id} :${data.name}」`, color.success)
          dispatch(getImagesByRecipeId(id)).then((res) => {
            setImages(res)
          })
        })
        .catch(() => {
          addDialog(
            `刪除相片失敗「${images[index].id}: ${images[index].name}」`, color.accent
          )
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
        <button className="ts-default right  top-adjust" onClick={remove}>
          刪除
        </button>
        <button
          className="upload-btn ts-default right top-adjust"
          disabled={!selectedFiles}
          onClick={upload}
        >
          上傳
        </button>

        <div className="progress-group">
          {progress &&
            progress.map((progressInfo, index) => (
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
          {images.length ? (
            images.map((img, i) => {
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
                src="/pic/waitingUpload.png"
                alt="wait-upload"
              />
            </Carousel.Item>
          )}
        </Carousel>

        <br />
        <div className="file-info">
          {images.length ? (
            <>
              <b>ID:&nbsp;</b>
              {`${images[index].id}`}
              &emsp;&emsp;
              <b>檔名:&nbsp;</b>
              {`${images[index].name}`}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadImages
