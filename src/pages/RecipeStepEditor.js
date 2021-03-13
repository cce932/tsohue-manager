import React from "react"
import { Player, BigPlayButton } from "video-react"


const RecipeStepEditor = (props) => {
  const id = props.match.params.id
  return (
    <>
    {id}
    <Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
      <BigPlayButton position="center" />
    </Player>
    </>
  )
}

export default RecipeStepEditor