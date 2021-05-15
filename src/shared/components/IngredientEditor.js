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
import { createRecipeIngredient } from "actions/addData"
import { deleteRecipeIngredient } from "actions/deleteData"

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
  const [id, setId] = useState("") // 需是controlled field 因為在選擇新增食材的時候 需要連動
  const [category, setCategory] = useState("") // 需是controlled field
  const [name, setName] = useState("") // 需是controlled field
  const [quantityRequired, setQuantityRequired] = useState("")
  const [tableIngredients, setTableIngredients] = useState([])
  const [cost, setCost] = useState([])
  const [unit, setUnit] = useState([])
  const [idExtractedIngredients, setIdExtractedIngredients] =
    useState(undefined)
  const passIngredientToEditor = props.passIngredientToEditor // 傳最新的tableIngredients至recipeEditor，以供更新
  const recipeId = props.recipeId

  useEffect(() => {
    if (allIngredients) {
      setIdExtractedIngredients(extractKeyFromArray(allIngredients))
    }
  }, [allIngredients])

  useEffect(() => {
    dispatch(getAllIngredients())

    let _tableIngredients = []
    let _cost = 0

    props.recipeIngredients.forEach((recipeIngredient) => {
      _tableIngredients.push({
        recipeIngredientId: recipeIngredient.id,
        id: recipeIngredient.ingredient.id,
        category: recipeIngredient.ingredient.category,
        name: recipeIngredient.ingredient.name,
        quantityRequired: recipeIngredient.quantityRequired,
        price: recipeIngredient.ingredient.price,
        unit: recipeIngredient.ingredient.unit,
      })
      _cost +=
        parseInt(recipeIngredient.quantityRequired) *
        parseInt(recipeIngredient.ingredient.price)
    })

    setCost(_cost)
    setTableIngredients(_tableIngredients)

    return () => {
      setIdExtractedIngredients(undefined)
      setTableIngredients([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const idOnChange = (e) => {
    const _id = e.target.value.trim()

    if (_id) {
      if (id !== _id) {
        if (idExtractedIngredients[_id]) {
          setId(_id.toString())
          setCategory(idExtractedIngredients[_id].category) // extracting id is more convenient to find id in ingredients
          setName(idExtractedIngredients[_id].name)
          setUnit(idExtractedIngredients[_id].unit)
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
          setUnit(target.unit)
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
    setQuantityRequired(e.target.value)
  }

  const tableCompareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    }
  }

  const tableSortBy = (key) => {
    let arrayCopy = [...tableIngredients]
    arrayCopy.sort(tableCompareBy(key))
    setTableIngredients(arrayCopy)
  }

  const remove = (rowData, e, data = tableIngredients) => {
    e.preventDefault()
    const _tableIngredients = data.filter(
      (row) => row.recipeIngredientId !== rowData.recipeIngredientId
    )

    dispatch(deleteRecipeIngredient(recipeId, rowData.recipeIngredientId))

    setCost(cost - parseInt(quantityRequired) * parseInt(rowData.price))
    setTableIngredients(_tableIngredients)
    passIngredientToEditor(_tableIngredients)
  }

  const tableColumns = {
    id: "ID",
    category: "種類",
    name: "名稱",
    price: "價格",
    quantityRequired: "數量",
    unit: "單位",
  }

  const handleAddIngredient = (e) => {
    e.preventDefault()

    if (checkBtn.current.context._errors.length === 0) {
      let isDuplicated = false

      let _tableIngredients = [...tableIngredients]
      for (const [index, ingredient] of _tableIngredients.entries()) {
        if (ingredient.id.toString() === id) {
          isDuplicated = true
          _tableIngredients[index].quantityRequired =
            parseInt(_tableIngredients[index].quantityRequired) +
            parseInt(quantityRequired)

          setCost(
            cost + parseInt(quantityRequired) * parseInt(ingredient.price)
          )
          break
        }
      }

      if (isDuplicated) {
        setTableIngredients(_tableIngredients)
        passIngredientToEditor(_tableIngredients)
      } else {
        dispatch(createRecipeIngredient(recipeId, id, quantityRequired)).then(
          (res) => {
            _tableIngredients = tableIngredients.concat({
              recipeIngredientId: res.id,
              id: res.ingredient.id,
              category: res.ingredient.category,
              name: res.ingredient.name,
              price: res.ingredient.price,
              quantityRequired: res.quantityRequired,
              unit: res.ingredient.unit,
            })

            setCost(
              cost + parseInt(quantityRequired) * parseInt(res.ingredient.price)
            )
            setTableIngredients(_tableIngredients)
            passIngredientToEditor(_tableIngredients)
          }
        )
      }
    }
  }

  return idExtractedIngredients ? (
    <div>
      <label className="ingredient-cost">目前成本: NT.{cost}</label>
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
            value={quantityRequired}
            validations={[required, isPositive]}
            onChange={quentityOnChange}
          />
          <label className="quantity">{unit}</label>
          <Button className={"ts-default right  top-adjust"}>加入</Button>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        <Table
          data={tableIngredients}
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
