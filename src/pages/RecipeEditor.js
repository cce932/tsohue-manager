import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import Button from "react-validation/build/button"
import { Form as BSForm } from "react-bootstrap"
import _ from "lodash"

import {
  allPaths,
  recipeEditor,
  recipeImageEditor,
} from "shared/constants/pathname"
import { getMeunName } from "shared/utility/common"
import CheckButton from "react-validation/build/button"

import "shared/style/recipeEditor.scss"
import { ExpandDiv } from "shared/components/styled"
import { getVersionAndRecipeById } from "actions/loadData"
import IngredientEditor from "shared/components/IngredientEditor"
import { createRecipe } from "actions/addData"
import { recipeVersionOptions } from "shared/constants/options"
import { updateRecipe } from "actions/editData"

const required = (value) => {
  if (!value.length) {
    return <div className="note">需輸入值</div>
  }
}

const transRecipeToAddVersionData = (oldRecipe, newVersion) => {
  const _oldRecipe = Object.assign({}, oldRecipe)

  delete _oldRecipe["id"]
  _oldRecipe["recipeSteps"].map((step) => {
    delete step.id
  })
  _oldRecipe["recipeIngredients"].map((ingredient) => {
    delete ingredient.id
  })
  _oldRecipe["version"] = _.invert(recipeVersionOptions)[newVersion]

  return _oldRecipe
}

const RecipeEditor = (props) => {
  const dispatch = useDispatch()
  const form = useRef()
  const checkBtn = useRef()
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [name, setName] = useState("")
  const [version, setVersion] = useState("")
  const [newVersion, setNewVersion] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [link, setLink] = useState("")
  const [recipe, setRecipe] = useState({})
  const [enabledVersionOptions, setEnabledVersionOptions] = useState([]) // 雖只需初始化一次，不影響後續畫面，但不能用let，因為render時會多次執行此行，所以在useEffect內的init的值會被洗掉。
  const id = props.match.params.id
  let recipeIngredients = []

  useEffect(() => {
    dispatch(getVersionAndRecipeById(id)).then((data) => {
      const currentRecipe = data.currentRecipe

      setRecipe(currentRecipe)
      setVersion(recipeVersionOptions[currentRecipe.version])
      setName(currentRecipe.name)
      setDescription(currentRecipe.description)
      setPrice(currentRecipe.price)
      setLink(currentRecipe.link)
      recipeIngredients = currentRecipe.recipeIngredients

      const _enabledVersionOptions = _.omit(
        recipeVersionOptions,
        data.existedVersions.map((item) => item.version)
      )
      setEnabledVersionOptions(_enabledVersionOptions)
      setNewVersion(Object.values(_enabledVersionOptions)[0])
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

  const onNewVersionChange = (e) => {
    setNewVersion(e.target.value)
  }

  const handleUpdateRecipe = (e) => {
    e.preventDefault()

    const _recipe = {
      ...recipe,
      name,
      version: Object.keys(recipeVersionOptions).find(
        (key) => recipeVersionOptions[key] === version
      ),
      description,
      link,
      price: parseInt(price),
      recipeIngredients,
    }

    delete _recipe["id"] // no difference between deleted it or not, backend doesn't care

    dispatch(updateRecipe(id, _recipe))
    window.location = allPaths[recipeImageEditor] + id.toString()
  }

  const handleAddVersion = () => {
    dispatch(
      createRecipe(transRecipeToAddVersionData(recipe, newVersion))
    ).then((data) => {
      window.open(`${allPaths[recipeEditor]}${data.id}`)
    })
  }

  const passIngredientToEditor = (_tableIngredients) => {
    recipeIngredients = _tableIngredients.map((ingredient) => {
      return {
        id: ingredient.recipeIngredientId,
        ingredient: { id: ingredient.id },
        quantityRequired: ingredient.quantityRequired,
      }
    })
  }

  return isLoggedIn ? (
    !_.isEmpty(recipe) ? (
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
            <div className="content dropdown">
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

        <IngredientEditor
          recipeId={id}
          recipeIngredients={recipe.recipeIngredients}
          passIngredientToEditor={passIngredientToEditor}
        />
        <div className="add-version">
          <div className="dropdown">
            <BSForm.Control
              as="select"
              id="newVersion"
              custom
              value={newVersion}
              onChange={onNewVersionChange}
            >
              {Object.keys(enabledVersionOptions).map((version) => {
                return (
                  <option key={version}>
                    {enabledVersionOptions[version]}
                  </option>
                )
              })}
            </BSForm.Control>
          </div>
          <button
            className={
              _.isEmpty(enabledVersionOptions)
                ? "ts-default add-version disable"
                : "ts-default add-version"
            }
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
