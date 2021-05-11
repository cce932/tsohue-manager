import color from "shared/style/color"
import styled from "styled-components"

const StyledDiv = styled.div`
  text-align: center;
  margin-top: 20vh;
  width: 100%;
`

const StyledP = styled.div`
  font-family: sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${color.secondary};
  text-decoration: none;
  letter-spacing: 0.03em;
`

const NotFound = ({ message }) => (
  <StyledDiv className="pages">
    <img src="/pic/notFound.gif" alt="not-found" width="400px"></img>
    <StyledP>{message}</StyledP>
  </StyledDiv>
)

export default NotFound
