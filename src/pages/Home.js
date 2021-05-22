import React from "react"
import { Bar } from "react-chartjs-2"
import CountUp from "react-countup"

import "shared/style/home.scss"
import color from "shared/style/color"

const newsContent = [
  {
    title: "疫情衛生須知",
    department: "秘書室",
    date: "2021-05-20",
    description: "疫情嚴峻，本校調整出入口管制、人員差勤、實驗室防疫相關措施",
  },
  {
    title: "行政人員遠端工作",
    department: "人資部",
    date: "2021-05-08",
    description: "可透過視訊方式、電子郵件往返等方式進行反思回饋並與跨部門溝通",
  },
  {
    title: "賀！獲獎衛生優良標準",
    department: "秘書室",
    date: "2021-05-01",
    description: "通過衛生部審核，各部門防疫表現優良",
  },
  {
    title: "上月銷售分析",
    department: "行銷部",
    date: "2021-04-28",
    description: "共售出1508份烹飪包，感謝全體員工的協力",
  },
  {
    title: "上個月薪資轉帳完成",
    department: "出納組",
    date: "2021-04-25",
    description: "請至新轉帳戶查收，若有錯誤請立即通知本部門",
  },
]

const Item = ({ title, department, date, description }) => (
  <div className="item">
    <div className="header">
      <span className="title">{title}</span>
      <span className="date">{date}</span>
      <span className="department">{department}</span>
    </div>
    <div className="body">{description}</div>
  </div>
)

const genData = () => ({
  labels: ["二月", "三月", "四月", "五月"],
  datasets: [
    {
      type: "line",
      label: "利潤",
      borderColor: color.accentLighter2,
      borderWidth: 2,
      fill: true,
      data: [171119, 205719, 169500, 289929],
    },
    {
      type: "bar",
      label: "收益",
      backgroundColor: color.fifth,
      data: [552121, 604012, 588329, 646321],
    },
    {
      type: "bar",
      label: "成本",
      backgroundColor: "rgb(205, 211, 216)",
      data: [401002, 368293, 408829, 526392],
    },
  ],
})

const data = genData()

const Home = () => (
  <div className="home">
    <div className="news-block left">
      <div className="subject">最新消息</div>
      {newsContent.map((item) => (
        <Item {...{ ...item }} />
      ))}
    </div>

    <div className="right">
      <div>
        <div className="subject">營收統計</div>
        <Bar data={data} />
      </div>

      <div className="order-count-block">
        <div className="subject">累計訂單數</div>
        <CountUp
          start={0}
          end={20623}
          duration={2}
          separator=","
          decimals={0}
          decimal="."
          prefix="# "
        />
      </div>
    </div>
  </div>
)

export default Home
