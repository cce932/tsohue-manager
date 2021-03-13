import { Link } from "react-router-dom"
import { ExpandDiv } from "shared/components/styled"
import UploadImages from "shared/components/UploadImages"
import { allPaths, recipeStepEditor } from "shared/constants/pathname"

const RecipeImageEditor = (props) => {
  const id = props.match.params.id

  return (
    <ExpandDiv className={`recipe-editor recipe-image-editor`}>
      <UploadImages id={id} />
      <Link className="next" to={allPaths[recipeStepEditor]+id}>
        下一步
      </Link>
    </ExpandDiv>
  )
}

export default RecipeImageEditor
