import styled from "styled-components"

export const ExpandDiv = styled.div`
  width: 100%;
  height: max-content;
`

export const PrimaryBtn = styled.button`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 1rem;
  color: white;
  text-decoration: none;
  letter-spacing: $spacing;

  background-color: rgb(231, 104, 69);
  border: none;
  border-radius: 3px;
  padding: 5px 15px;
  margin: 5px;
`

export const PrimaryStrokeBtn = styled.button`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 1rem;
  color: rgb(231, 104, 69);
  text-decoration: none;
  letter-spacing: $spacing;

  background-color: white;
  border: rgb(231, 104, 69) solid 1px;
  border-radius: 3px;
  padding: 5px 15px;
  margin: 5px;
`