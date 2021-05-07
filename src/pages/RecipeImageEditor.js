import { Link } from "react-router-dom"
import { BsChevronLeft, BsChevronRight, BsFolderCheck } from "react-icons/bs"
import { ExpandDiv } from "shared/components/styled"
import UploadImages from "shared/components/UploadImages"
import {
  allPaths,
  recipeEditor,
  recipeManager,
  recipeStepEditor,
} from "shared/constants/pathname"

const RecipeImageEditor = (props) => {
  const id = props.match.params.id

  return (
    <ExpandDiv className={`recipe-editor recipe-image-editor`}>
      <UploadImages id={id} />
      <div className="back">
        <Link className="back" to={allPaths[recipeManager]}>
          完成
          <BsFolderCheck />
        </Link>
      </div>
      <div className="next">
        <Link className="next" to={allPaths[recipeEditor] + id}>
          <BsChevronLeft />
          基本資料
        </Link>
        <button disabled className="this-page" to="#">
          相片
        </button>
        <Link className="next" to={allPaths[recipeStepEditor] + id}>
          教學步驟
          <BsChevronRight />
        </Link>
      </div>
    </ExpandDiv>
  )
}

export default RecipeImageEditor
