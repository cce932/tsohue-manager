import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import Button from "react-validation/build/button"
import { Form as BSForm } from "react-bootstrap"

import {
  allPaths,
  recipeImageEditor,
  recipeEditor,
} from "shared/constants/pathname"
import { getMeunName, transRecipeToAddVersionData } from "shared/utility/common"
import CheckButton from "react-validation/build/button"
import isEmpty from "lodash.isempty"

import "shared/style/recipeEditor.scss"
import { ExpandDiv } from "shared/components/styled"
import { getRecipeById } from "actions/loadData"
import IngredientEditor from "shared/components/IngredientEditor"
import { createRecipe } from "actions/addData"
import { recipeVersionOptions } from "shared/constants/options"
import { updateRecipe } from "actions/editData"

const required = (value) => {
  if (!value.length) {
    return <div className="note">需輸入值</div>
  }
}

const RecipeEditor = (props) => {
  const dispatch = useDispatch()
  const form = useRef()
  const checkBtn = useRef()
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [name, setName] = useState("")
  const [version, setVersion] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(undefined)
  const [link, setLink] = useState("")
  const [recipe, setRecipe] = useState({})
  const id = props.match.params.id

  useEffect(() => {
    dispatch(getRecipeById(id)).then((data) => {
      setRecipe(data)
      setVersion(recipeVersionOptions[data.version])
      setName(data.name)
      setDescription(data.description)
      setPrice(data.price)
      setLink(data.link)
    })

    return () => {
      setRecipe({})
    }
  }, [])

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onVersionChange = (e) => {
    setVersion(e.target.value)
  }

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const onLinkChange = (e) => {
    setLink(e.target.value)
  }

  const onPriceChange = (e) => {
    setPrice(e.target.value)
  }

  const handleUpdateRecipe = (e) => {
    e.preventDefault()
    if (
      recipe.name !== name ||
      recipe.version !== version ||
      recipe.description !== description ||
      recipe.link !== link
    ) {
      let _recipe = Object.assign({}, recipe)
      _recipe = {
        ..._recipe,
        name,
        version: Object.keys(recipeVersionOptions).find(
          (key) => recipeVersionOptions[key] === version
        ),
        description,
        link,
        price: parseInt(price),
      }
      delete _recipe["id"]
      dispatch(updateRecipe(id, _recipe))
    }
    // window.location = allPaths[recipeImageEditor] + id
  }

  const handleAddVersion = () => {
    dispatch(createRecipe(transRecipeToAddVersionData(recipe))).then((data) => {
      window.open(`${allPaths[recipeEditor]}${data.id}`)
    })
  }

  return isLoggedIn ? (
    !isEmpty(recipe) ? (
      <ExpandDiv className="recipe-editor">
        <Form name="all" id="all" onSubmit={handleUpdateRecipe} ref={form}>
          <div>
            <p>食譜名稱</p>
            <div className="content">
              <Input
                id="name"
                type="text"
                value={name}
                validations={[required]}
                onChange={onNameChange}
              />
            </div>
          </div>

          <div>
            <p>版本</p>
            <div className="content ii-version">
              <BSForm.Control
                as="select"
                custom
                value={version}
                onChange={onVersionChange}
              >
                {Object.keys(recipeVersionOptions).map((version) => {
                  return (
                    <option key={version}>
                      {recipeVersionOptions[version]}
                    </option>
                  )
                })}
              </BSForm.Control>
            </div>
          </div>

          <div>
            <p>描述</p>
            <div className="content">
              <textarea
                cols="50"
                rows="3"
                id="description"
                type="name"
                value={description}
                validations={[required]}
                onChange={onDescriptionChange}
              />
            </div>
          </div>

          <div>
            <p>影片</p>
            <div className="content">
              <input
                id="link"
                type="text"
                value={link}
                validations={[required]}
                placeholder="請貼上影片網址"
                onChange={onLinkChange}
              />
            </div>
          </div>

          <div>
            <p>價格</p>
            <div className="content">
              <input
                id="price"
                type="number"
                value={price}
                validations={[required]}
                onChange={onPriceChange}
              />{" "}
              NTD
            </div>
          </div>

          <p className="next">
            <Button className="save-all ts-default">下一步</Button>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </p>
        </Form>

        <IngredientEditor recipe={recipe} />
        <div className="add-version">
          <button
            className={"ts-default add-version"}
            onClick={handleAddVersion}
          >
            新增版本
          </button>
        </div>
      </ExpandDiv>
    ) : (
      <h1>Loading</h1>
    )
  ) : (
    <>
      {window.alert(
        `欲前往「${getMeunName(
          allPaths,
          window.location.pathname
        )}」 請先登入喔`
      )}
      <Redirect to="/login" />
    </>
  )
}

export default RecipeEditor
