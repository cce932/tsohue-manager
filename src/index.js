import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import store from "./store"
import { GlobalDialog } from "pages/GlobalDialog"
import { ThemeProvider, css } from "styled-components"

const theme = {
  primeColor: "rgb(52, 58, 64)",
  secondaryColor: "rgb(86, 90, 95)",
  thirdColor: "rgb(123, 127, 131)",
  forthColor: "rgb(161, 163, 165)",
  fifthColor: "rgb(232, 235, 240)",
  sixthColor: "rgb(249, 250, 252)",
  accentColor: "rgb(231, 104, 69)",
  accentLighterColor: "rgb(253, 221, 132)",
  accentLighter2Color: "rgb(248, 203, 80)",
  accentDeeperColor: "rgb(165, 90, 70)",
  normalColor: "#9e8568",
  lowfatColor: "#8093b5",
  meatColor: "#f09797",
  vageColor: "#7ca390",
  font: css`
    font-family: sans-serif;
    text-decoration: none;
    letter-spacing: 0.03em;
  `,
  defaultShadow: "0px 0px 15px rgba(183, 186, 191, 0.3)",
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalDialog>
        <App />
      </GlobalDialog>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
