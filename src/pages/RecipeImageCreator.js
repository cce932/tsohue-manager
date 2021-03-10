import { Link } from "react-router-dom"
import { ExpandDiv } from "shared/components/styled"
import UploadImages from "shared/components/UploadImages"
import { allPaths, recipeStepCreator } from "shared/constants/pathname"

const RecipeImageCreator = () => {
  return (
    <ExpandDiv className={`recipe-creator recipe-image-creator`}>
      <UploadImages />
      <Link className="next" to={allPaths[recipeStepCreator]}>下一步</Link>
    </ExpandDiv>
  )
}

export default RecipeImageCreator
