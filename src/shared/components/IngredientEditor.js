import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import Button from "react-validation/build/button"
import CheckButton from "react-validation/build/button"

import Table from "shared/components/Table"
import { getAllIngredients } from "actions/loadData"
import { ingredientCategoryOptions as categoryOptions } from "shared/constants/options"
import { extractKeyFromArray } from "shared/utility/common"

const isPositive = (value) => {
  if (value < 1) {
    return <div className="note">需大於0</div>
  }
}

const required = (value) => {
  if (!value.length) {
    return <div className="note">需輸入值</div>
  }
}

const IngredientEditor = (props) => {
  const dispatch = useDispatch()
  const { allIngredients } = useSelector((state) => state.ingredients)
  const form = useRef()
  const checkBtn = useRef()
  const [id, setId] = useState("")
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [quentity, setQuentity] = useState("")
  const [recipeIngredients, setRecipeIngredients] = useState([])
  const [idExtractedIngredients, setIdExtractedIngredients] = useState(
    undefined
  )

  useEffect(() => {
    if (allIngredients) {
      setIdExtractedIngredients(extractKeyFromArray(allIngredients))
    }
  }, [allIngredients])

  useEffect(() => {
    dispatch(getAllIngredients())

    let _recipeIngredients = []

    props.recipe.recipeIngredients.map((recipeIngredient) => {
      _recipeIngredients.push({
        id: recipeIngredient.ingredient.id,
        category: recipeIngredient.ingredient.category,
        name: recipeIngredient.ingredient.name,
        quantityRequired: recipeIngredient.quantityRequired,
      })
    })

    setRecipeIngredients(_recipeIngredients)

    return () => {
      setIdExtractedIngredients(undefined)
      setRecipeIngredients([])
    }
  }, [])

  const idOnChange = (e) => {
    const _id = e.target.value.trim()

    if (_id) {
      if (id !== _id) {
        if (idExtractedIngredients[_id]) {
          setId(_id.toString())
          setCategory(idExtractedIngredients[_id].category) // extracting id is more convenient to find id in ingredients
          setName(idExtractedIngredients[_id].name)
        } else {
          window.alert("無此ID")
        }
      }
    } else {
      setId("")
      setCategory("")
      setName("")
    }
  }

  const categoryOnChange = (e) => {
    const _category = e.target.value.trim()

    if (_category) {
      if (category !== _category) {
        if (Object.keys(categoryOptions).includes(_category)) {
          setCategory(_category)
          setId("")
          setName("")
        } else {
          window.alert("無此種類")
        }
      }
    } else {
      setId("")
      setName("")
      setCategory("")
    }
  }
  const nameOnChange = (e) => {
    const _name = e.target.value.trim()
    if (_name) {
      if (name !== _name) {
        const target = allIngredients.filter((ii) => ii.name === _name)[0]

        if (target) {
          setName(_name)
          setId(target.id.toString()) // need `toString` otherwise validator would show "can not empty"
          setCategory(target.category)
        } else {
          window.alert("無此名稱")
        }
      }
    } else {
      setId("")
      setName("")
      setCategory("")
    }
  }

  const quentityOnChange = (e) => {
    setQuentity(e.target.value)
  }

  const tableCompareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    }
  }

  const tableSortBy = (key) => {
    let arrayCopy = [...recipeIngredients]
    arrayCopy.sort(tableCompareBy(key))
    setRecipeIngredients(arrayCopy)
  }

  const remove = (rowId, e, data = recipeIngredients) => {
    e.preventDefault()

    const arrayCopy = data.filter((row) => row.id !== rowId)
    setRecipeIngredients(arrayCopy)
  }

  const tableColumns = {
    id: "ID",
    category: "種類",
    name: "名稱",
    quantityRequired: "數量",
  }

  const handleAddIngredient = (e) => {
    e.preventDefault()

    if (checkBtn.current.context._errors.length === 0) {
      let isDuplicated = false

      const _recipeIngredients = [...recipeIngredients]
      for (const [index, ingredient] of _recipeIngredients.entries()) {
        if (ingredient.id.toString() === id) {
          isDuplicated = true
          _recipeIngredients[index].quantityRequired =
            parseInt(_recipeIngredients[index].quantityRequired) +
            parseInt(quentity)
          break
        }
      }

      isDuplicated
        ? setRecipeIngredients(_recipeIngredients)
        : setRecipeIngredients(
            recipeIngredients.concat({
              id: id,
              category: category,
              name: name,
              quantityRequired: quentity,
            })
          )
    }
  }

  return idExtractedIngredients ? (
    <div>
      <p>食材</p>
      <div className="content">
        <Form
          name="addIngredient"
          id="addIngredient"
          onSubmit={handleAddIngredient}
          ref={form}
        >
          <label>ID</label>
          <Input
            id="ingredient-id"
            type="text"
            list="idList"
            name="id"
            onBlur={idOnChange}
            value={id}
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
            name="category"
            onBlur={categoryOnChange}
            value={category}
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
            name="name"
            onBlur={nameOnChange}
            value={name}
            validations={[required]}
          />
          <datalist id="nameList">
            {Object.values(idExtractedIngredients).map((value, index) =>
              category ? (
                value.category === category && (
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
            name="quentity"
            value={quentity}
            validations={[required, isPositive]}
            onChange={quentityOnChange}
          />
          <Button className={"ts-default right"}>加入</Button>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        <Table
          data={recipeIngredients}
          columns={tableColumns}
          sortBy={tableSortBy}
          remove={remove}
        />
      </div>
    </div>
  ) : (
    <div>
      <p>載入中...</p>
    </div>
  )
}

export default IngredientEditor
