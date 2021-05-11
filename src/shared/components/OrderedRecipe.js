import React from "react"
import { Col, Row } from "react-bootstrap"
import styled from "styled-components"

import color from "shared/style/color"
import { splitToRows } from "shared/utility/common"
import { StrokeLabel } from "shared/components/styled"
import { recipeVersionOptions as versionOptions } from "shared/constants/options"
// import { allPaths, recipe as recipePath } from "shared/constants/pathName"

const ItemBlock = styled.div`
  width: inherit;
  height: 100%;
  border-radius: 15px;
  padding: 25px 15px;
  text-align: left;
`

const ItmeImg = styled.img`
  width: 100%;
  border-radius: 13px;
  height: 140px;
  object-fit: cover;
`

const BottomLine = styled.div`
  padding-bottom: 10px;
  margin-bottom: 8px;
  border-bottom: solid ${(props) => props.theme.fifthColor} 2px;
`

const FloatRight = styled.div`
  float: right;
`

const IngredientsTable = styled.table`
  width: 100%;
  margin-top: 5px;
`

const IngredientTd = styled.td`
  ${(props) => props.theme.font}
  color: ${(props) => props.theme.secondaryColor};
  font-size: 0.9rem;
  padding: 4px 0 !important;

  &.quantitiy-zero {
    color: ${(props) => props.theme.forthColor};
  }
  border: none !important;
`

const StyledFont = styled.span`
  ${(props) => props.theme.font}
  color: ${(props) => props.color || props.theme.secondaryColor};
  font-weight: ${(props) => props.weight || "normal"};
  font-size: ${(props) => props.size || "1rem"};
`

const OrderedRecipe = ({
  recipe,
  customize,
  sum,
  recipeImage,
  isCustomize,
}) => {
  const styled = customize.map((ingredient, index) => (
    <IngredientTd
      key={index}
      className={`${ingredient.quantityRequired === 0 ? "quantitiy-zero" : ""}`}
    >
      {ingredient.ingredient.name + " "}
      {ingredient.quantityRequired + " "}
      {ingredient.ingredient.unit}
    </IngredientTd>
  ))

  const splited = splitToRows(styled, 5).map((gredients, index) => (
    <tr className="g-row" key={index}>
      {gredients}
    </tr>
  ))

  return (
    <ItemBlock className="ordered-recipe">
      <Row>
        <Col sm="2">
          {/* <a href={allPaths[recipePath] + recipe.id}> */}
          <ItmeImg
            src={recipeImage ? recipeImage : "pic/noImage.jpg"} // TODO: 目前後端沒塞好image
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "pic/noImage.jpg"
            }}
          />
          {/* </a> */}
        </Col>
        <Col sm="10">
          <BottomLine>
            {/* <a href={`/recipe/${recipe.id}`}> */}
            <StyledFont weight="bold">{recipe.name}</StyledFont>
            {/* </a> */}
            <StrokeLabel
              color={recipe.version.toLowerCase() + "Color"}
              borderColor={recipe.version.toLowerCase() + "Color"}
            >
              {versionOptions[recipe.version]}
            </StrokeLabel>
            {isCustomize && <StrokeLabel>客製化</StrokeLabel>}
            <FloatRight>
              <StyledFont color={color.accent}>NT. {sum}</StyledFont>
            </FloatRight>
          </BottomLine>

          <StyledFont color={color.third} weight="bold" size="0.9rem">
            食材
          </StyledFont>
          <IngredientsTable>
            <tbody>{splited}</tbody>
          </IngredientsTable>
        </Col>
      </Row>
    </ItemBlock>
  )
}

export default OrderedRecipe
