import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import Button from "react-validation/build/button"

import { allPaths, recipeImageEditor } from "shared/constants/pathname"
import { getMeunName } from "shared/utility/common"
import CheckButton from "react-validation/build/button"

import "shared/style/recipeEditor.scss"
import { ExpandDiv } from "shared/components/styled"
import { getAllIngredients, getRecipeById } from "actions/loadData"
import { extractKeyFromArray } from "shared/utility/common"
import { ingredientCategoryOptions as categoryOptions } from "shared/constants/options"
import Table from "shared/components/Table"

const required = (value) => {
  if (!value.length) {
    return <div className="note">需輸入值</div>
  }
}

const isPositive = (value) => {
  if (value < 1) {
    return <div className="note">需大於0</div>
  }
}

const RecipeEditor = (props) => {
  const dispatch = useDispatch()
  const IIForm = useRef()
  const form = useRef()
  const checkBtn = useRef()
  const IICheckBtn = useRef()
  const { allIngredients } = useSelector((state) => state.ingredients)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [IIId, setIIId] = useState("")
  const [IICategory, setIICategory] = useState("")
  const [IIName, setIIName] = useState("")
  const [IIQuentity, setIIQuentity] = useState("")
  const [II, setII] = useState([])
  const [link, setLink] = useState("")
  const [idExtractedIngredients, setIdExtractedIngredients] = useState()
  const id = props.match.params.id

  useEffect(() => {
    if (allIngredients) {
      setIdExtractedIngredients(extractKeyFromArray(allIngredients))
    }
  }, [allIngredients])

  useEffect(() => {
    dispatch(getAllIngredients())
    let _II = []
    dispatch(getRecipeById(id)).then((data) => {

      data.recipeIngredients.map((recipeIngredient) => {
        _II.push({
          id: recipeIngredient.ingredient.id,
          category: recipeIngredient.ingredient.category,
          name: recipeIngredient.ingredient.name,
          quantityRequired: recipeIngredient.quantityRequired,
        })
      })

      setII(_II)
    })
  }, [])

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const onLinkChange = (e) => {
    setLink(e.target.value)
  }
  const IIIdOnChange = (e) => {
    const id = e.target.value.trim()

    if (id) {
      if (IIId !== id) {
        if (idExtractedIngredients[id]) {
          setIIId(id.toString())
          setIICategory(idExtractedIngredients[id].category)
          setIIName(idExtractedIngredients[id].name)
        } else {
          window.alert("無此id")
        }
      }
    } else {
      setIIId("")
      setIICategory("")
      setIIName("")
    }
  }
  const IICategoryOnChange = (e) => {
    const category = e.target.value.trim()
    if (category) {
      if (category !== IICategory) {
        setIICategory(category)
        setIIId("")
        setIIName("")
      }
    } else {
      setIIId("")
      setIIName("")
      setIICategory("")
    }
  }
  const IINameOnChange = (e) => {
    const name = e.target.value.trim()
    if (name) {
      if (name !== IIName) {
        const targetII = allIngredients.filter((ii) => ii.name === name)[0]
        if (targetII) {
          setIIName(name)
          setIIId(targetII.id.toString()) // bug卡很久 要toString 不然id的input會顯示未輸入值的errMsg
          setIICategory(targetII.category)
        } else {
          window.alert("無此name")
        }
      }
    } else {
      setIIId("")
      setIIName("")
      setIICategory("")
    }
  }

  const IIQuentityOnChange = (e) => {
    setIIQuentity(e.target.value)
  }

  const handleAddIngredient = (e) => {
    e.preventDefault()

    if (IICheckBtn.current.context._errors.length === 0) {
      let isDuplicated = false

      const IICopy = [...II]
      for (const [index, ii] of IICopy.entries()) {
        if (ii.id === IIId) {
          isDuplicated = true
          IICopy[index].quantityRequired =
            parseInt(IICopy[index].quantityRequired) + parseInt(IIQuentity)
          break
        }
      }

      isDuplicated
        ? setII(IICopy)
        : setII(
            II.concat({
              id: IIId,
              category: IICategory,
              name: IIName,
              quantityRequired: IIQuentity,
            })
          )
    }
  }

  const handleEditRecipe = (e) => {
    e.preventDefault()
    // dispatch() // 正在這邊/recipe/update有問題
    window.location = allPaths[recipeImageEditor] + id
  }

  const IITableCompareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    }
  }

  const IITableSortBy = (key, data) => {
    let arrayCopy = [...data]
    arrayCopy.sort(IITableCompareBy(key))
    setII(arrayCopy)
  }

  const removeII = (rowId, data = II) => {
    const arrayCopy = data.filter((row) => row.id !== rowId)
    setII(arrayCopy)
  }

  return isLoggedIn ? (
    allIngredients && idExtractedIngredients ? (
      <ExpandDiv className="recipe-editor">
        <Form name="all" id="all" onSubmit={handleEditRecipe} ref={form}>
          <div>
            <p>食譜名稱{id}</p>
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
            <p>描述</p>
            <div className="content">
              <input
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

          <p className="next">
            <Button className="save-all">下一步</Button>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </p>
        </Form>

        <div>
          <p>食材</p>
          <div className="content">
            <Form
              name="addIngredient"
              id="addIngredient"
              onSubmit={handleAddIngredient}
              ref={IIForm}
            >
              <label>ID</label>
              <Input
                id="ingredient-id"
                type="text"
                list="idList"
                name="IIId"
                onBlur={IIIdOnChange}
                value={IIId}
                validations={[required]}
              />
              <datalist id="idList">
                {Object.keys(idExtractedIngredients).map((id) => (
                  <option key={id} value={id} />
                ))}
              </datalist>

              <label>種類</label>
              <Input
                id="ingredient-category"
                type="text"
                list="categoryList"
                name="IICategory"
                onBlur={IICategoryOnChange}
                value={IICategory}
                validations={[required]}
              />
              <datalist id="categoryList">
                {Object.keys(categoryOptions).map((opt, index) => (
                  <option key={index} value={opt} />
                ))}
              </datalist>

              <label>名稱</label>
              <Input
                id="ingredient-name"
                type="text"
                list="nameList"
                name="IIName"
                onBlur={IINameOnChange}
                value={IIName}
                validations={[required]}
              />
              <datalist id="nameList">
                {Object.values(idExtractedIngredients).map((value, index) =>
                  IICategory ? (
                    value.category === IICategory && (
                      <option key={index} value={value.name} />
                    )
                  ) : (
                    <option key={index} value={value.name} />
                  )
                )}
              </datalist>

              <label>數量</label>
              <Input
                id="ingredient-quentity"
                type="number"
                name="IIQuentity"
                value={IIQuentity}
                validations={[required, isPositive]}
                onChange={IIQuentityOnChange}
              />
              <Button>加入</Button>
              <CheckButton style={{ display: "none" }} ref={IICheckBtn} />
            </Form>

            <Table data={II} sortBy={IITableSortBy} remove={removeII} />
          </div>
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
