import color from "shared/style/color"
import styled from "styled-components"

export const ExpandDiv = styled.div`
  width: 100%;
  height: max-content;
`

export const AlertMsg = styled.div`
  font-family: sans-serif;
  font-weight: ${(props) => props.fontWeight || "bold"};
  font-size: ${(props) => props.fontSize || "0.8rem"};
  text-decoration: none;
  letter-spacing: 0.03em;
  color: ${(props) => props.color || color.accent};

  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
`

export const SolidSpan = styled.span`
  font-family: sans-serif;
  font-weight: normal;
  font-size: ${(props) => props.fontSize || "1rem"};
  text-decoration: none;
  letter-spacing: 0.03em;

  color: ${(props) => props.color || "white"};
  background-color: ${(props) => props.backgroundColor || color.prime};
  border: ${(props) => props.border || "none"};

  height: fit-content;
  padding: ${(props) => props.padding || "5px 15px"};
  margin: ${(props) => props.margin || "5px"};
  border-radius: 25px;
  display: inline-block;
  transition: all 0.3s ease 0s;

  &:hover {
    color: ${(props) => props.hoverColor || props.color || "white"};
    background-color: ${(props) =>
      props.hoverBackgroundColor || props.backgroundColor || color.prime};
    border: ${(props) => props.hoverBorder || props.border || "none"};
  }
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
  transition: all 0.3s ease 0s;
`

export const SecondaryBtn = styled.button`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 1rem;
  color: white;
  text-decoration: none;
  letter-spacing: $spacing;

  height: fit-content;
  background-color: rgb(86, 90, 95);
  border: none;
  border-radius: 3px;
  padding: 5px 15px;
  margin: 5px;
  transition: all 0.3s ease 0s;
`

export const ThirdBtn = styled.button`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 1rem;
  color: white;
  text-decoration: none;
  letter-spacing: $spacing;

  height: fit-content;
  background-color: rgb(179, 183, 188);
  border: none;
  border-radius: 3px;
  padding: 5px 15px;
  margin: 5px;
  transition: all 0.3s ease 0s;
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
  transition: all 0.3s ease 0s;
`

export const SecondaryStrokeBtn = styled.button`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 1rem;
  color: rgb(86, 90, 95);
  text-decoration: none;
  letter-spacing: $spacing;

  background-color: white;
  border: rgb(86, 90, 95) solid 1px;
  border-radius: 3px;
  padding: 5px 15px;
  margin: 5px;
  transition: all 0.3s ease 0s;
`
