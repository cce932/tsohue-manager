import { Link } from "react-router-dom"
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5"
import { ExpandDiv } from "shared/components/styled"
import UploadImages from "shared/components/UploadImages"
import {
  allPaths,
  recipeEditor,
  recipeStepEditor,
} from "shared/constants/pathname"

const RecipeImageEditor = (props) => {
  const id = props.match.params.id

  return (
    <ExpandDiv className={`recipe-editor recipe-image-editor`}>
      <UploadImages id={id} />
      <div className="next">
        <Link className="next" to={allPaths[recipeStepEditor] + id}>
          食譜步驟
          <IoChevronForwardSharp />
        </Link>
        <Link className="next" to={allPaths[recipeEditor] + id}>
          <IoChevronBackSharp />
          基本資訊
        </Link>
      </div>
    </ExpandDiv>
  )
}

export default RecipeImageEditor
