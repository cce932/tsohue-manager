import { Spinner } from "react-bootstrap"
import styled from "styled-components"

const AlignCenter = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 48vh;
`

const StyledSpinner = ({ size = "lg" }) => (
  <AlignCenter>
    <Spinner size={size} animation="border" variant="warning" />
  </AlignCenter>
)

export default StyledSpinner
