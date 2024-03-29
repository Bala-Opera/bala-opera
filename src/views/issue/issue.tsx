// @ts-nocheck
import { CSSTransition } from 'react-transition-group'
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'

import Window from '../../components/Window/window'
import Button from '../../components/Button/button'
import MobileLoading from '../../components/MobileLoading/mobileLoading'

import styles from './issue.module.scss'
import Issue_0 from '../../copy/issue/0'
import useBrowserSize from '../../common/hooks/useWindowSize'
import { animated, useSprings } from 'react-spring'

type Overview = {
  concept: string,
  participants: Array<string>,
}

type IssueView = { state: "info" | "rotate" | "project", transitionTo?: number }

export default function Issue({ name, overview }: {
  name: string,
  overview: Overview,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const windowDimension = useBrowserSize()

  const initialState = location.state?.enter === 'rotate' ? 'rotate' : 'info'
  const [isOpen, setIsOpen] = useState(true)
  const [issueState, setIssueState] = useState<IssueView>({ state: initialState })
  const tooNarrow = windowDimension && windowDimension.width < 540

  const handleMinimize = () => {
    setIsOpen(false)
    navigate('/')
  }
  const handleEnter = () => {
    setIssueState(tooNarrow ? { state: "rotate" } : { state: "project" })
  }
  const handleTransitionDone = () => {
    if ("transitionTo" in issueState) {
      navigate(Issue_0_entries[issueState.transitionTo][1].path, { replact: true })
    }
  }

  useEffect(() => {
    if (issueState.state === "rotate" && !tooNarrow) {
      setIssueState({ state: "project" })
    }
  }, [issueState, tooNarrow])

  return (
    <>
      <CSSTransition classNames={{ enter: styles.enter, enterActive: styles.enterActive }}
        in={issueState.state === "project" && !("transitionTo" in issueState) && !tooNarrow} timeout={1000} mountOnEnter unmountOnExit appear>
        {windowDimension ? <div>
          <OverviewGraphics
            width={windowDimension.width}
            height={windowDimension.height}
            setTransitionTo={i => setIssueState({ state: "project", transitionTo: i })}
            transitionTo={issueState.transitionTo}
          />
          <div className={styles.exitbutton} style={{ position: "absolute", left: 0, bottom: 0, margin: 32 }}>
            <Button text="Exit" clickHandler={() => setIssueState({ state: "info" })} />
          </div>
        </div> : <></>}
      </CSSTransition>
      <CSSTransition classNames={{ enter: styles.enter, enterActive: styles.enterActive }}
        in={"transitionTo" in issueState} timeout={0}>
        {"transitionTo" in issueState ? <TransitionGraphics onDone={handleTransitionDone} /> : <></>}
      </CSSTransition>
      <CSSTransition
        classNames={{ exit: styles.exit }}
        in={issueState.state === "info"}
        timeout={200}
        unmountOnExit
      >
        <div className={styles.windowwrapper}>
          <Window
            title={name}
            clickHandler={handleMinimize}
            isOpen={isOpen}
            isFullscreen
            hasContentPadding={false}
            animationDuration={50}
          >
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.concept}>
                  <h3>[  CONCEPT  ]</h3>
                  <p>{overview.concept}</p>
                </div>
                <div className={styles.line}>
                  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                </div>
                <div className={styles.participants}>
                  <h3>[  PARTICIPANTS  ]</h3>
                  <p>
                    {overview.participants.map((participant, index) => (
                      <span key={participant} className={styles[`color-${index + 1}`]}>
                        {index > 0 ? (<span className={styles.separator}> / </span>) : ''}{participant}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className={styles.button}>
                <Button text="Enter" clickHandler={handleEnter} />
              </div>
            </div>
          </Window>
        </div>
      </CSSTransition>
      {(issueState.state === "rotate" || (issueState.state === "project" && tooNarrow)) && (
        <MobileLoading />
      )}
    </>
  )
}

const RadialStripes = () => (
  <path id="Vector_3" d="M736.222 -329.524C745.863 -329.524 755.323 -329.342 764.601 -329.16L736.222 645.631C735.676 645.631 736.767 645.631 736.222 645.631L707.297 -329.16C716.938 -329.342 726.58 -329.524 736.222 -329.524ZM821.724 -325.877C840.643 -324.236 859.927 -321.865 878.664 -319.129L736.04 645.631C735.494 645.631 736.586 645.631 736.04 645.631L821.724 -325.877ZM650.174 -325.695L736.222 645.631C735.858 645.631 736.586 645.631 736.222 645.631L592.869 -318.947C611.971 -321.682 631.072 -324.053 650.174 -325.695ZM935.787 -308.916C954.525 -304.904 973.444 -300.527 992 -295.42L736.222 645.631C735.858 645.449 736.586 645.631 736.222 645.631L935.787 -308.916ZM536.111 -308.734L736.222 645.631C735.858 645.631 736.586 645.449 736.222 645.631L479.898 -295.056C498.453 -300.162 517.373 -304.722 536.111 -308.734ZM1047.3 -278.46C1065.5 -272.259 1083.69 -265.511 1101.52 -258.216L736.222 645.631C735.858 645.449 736.586 645.813 736.222 645.631L1047.3 -278.46ZM424.594 -278.277L736.222 645.449C735.858 645.631 736.586 645.266 736.222 645.449L370.382 -258.034C388.21 -265.146 406.402 -272.077 424.594 -278.277ZM1154.64 -234.872C1171.92 -226.665 1189.2 -217.729 1205.94 -208.428L736.222 645.631C735.858 645.449 736.586 645.813 736.222 645.631L1154.64 -234.872ZM317.626 -234.69L736.222 645.449C735.858 645.631 736.586 645.266 736.222 645.449L266.325 -208.246C283.061 -217.547 300.343 -226.301 317.626 -234.69ZM1255.78 -179.066C1271.97 -168.853 1287.98 -157.91 1303.63 -146.785L736.222 645.631C735.858 645.449 736.586 645.813 736.222 645.631L1255.78 -179.066ZM216.661 -178.701L736.222 645.631C735.858 645.813 736.586 645.266 736.222 645.631L169.18 -146.603C184.643 -157.728 200.652 -168.488 216.661 -178.701ZM1349.29 -111.77C1364.21 -99.7328 1378.76 -86.9666 1392.95 -74.018L736.222 645.631C735.858 645.266 736.586 645.996 736.222 645.631L1349.29 -111.77ZM123.518 -111.587L736.222 645.631C735.858 645.813 736.586 645.266 736.222 645.631L79.8574 -73.8356C93.8652 -86.7842 108.601 -99.5504 123.518 -111.587ZM1434.06 -33.8957C1447.34 -20.2176 1460.44 -5.81006 1472.99 8.59753L736.222 645.631C735.858 645.266 736.586 645.996 736.222 645.631L1434.06 -33.8957ZM38.5617 -33.7133L736.222 645.631C735.858 645.996 736.586 645.266 736.222 645.631L-0.187027 8.77991C12.1835 -5.81003 25.2816 -20.0352 38.5617 -33.7133ZM1509.01 53.2792C1520.66 68.5987 1531.94 84.2829 1542.67 100.149L736.222 645.631C736.04 645.266 736.586 645.996 736.222 645.631L1509.01 53.2792ZM-36.5709 53.4616L736.04 645.449C735.676 645.813 736.404 645.084 736.04 645.449L-70.2259 100.149C-59.3107 84.4652 -48.0318 68.7811 -36.5709 53.4616ZM1573.41 148.843C1583.24 165.257 1592.52 182.4 1601.25 199.361L736.222 645.631C736.04 645.266 736.404 645.996 736.222 645.631L1573.41 148.843ZM-100.97 149.208L736.222 645.631C736.04 645.996 736.404 645.266 736.222 645.631L-128.804 199.908C-120.072 182.765 -110.612 165.804 -100.97 149.208ZM1626.17 251.52C1633.99 269.028 1641.27 287.083 1648 305.138L736.222 645.631C736.04 645.266 736.404 645.996 736.222 645.631L1626.17 251.52ZM-153.727 252.25L736.222 645.631C736.04 645.996 736.404 645.266 736.222 645.631L-175.557 306.05C-168.826 287.995 -161.549 269.758 -153.727 252.25ZM1666.56 360.033C1672.2 378.453 1677.29 397.237 1681.84 416.022L736.222 645.631C736.222 645.266 736.404 645.996 736.222 645.631L1666.56 360.033ZM-194.113 361.127L736.222 645.631C736.04 645.996 736.404 645.266 736.222 645.631L-209.212 416.934C-204.846 398.331 -199.752 379.547 -194.113 361.127ZM1693.66 472.74C1697.12 491.707 1699.85 510.856 1702.21 530.006L736.222 645.631C736.222 645.266 736.222 645.996 736.222 645.631L1693.66 472.74ZM-221.037 473.652L736.222 645.631C736.222 645.996 736.222 645.266 736.222 645.631L-229.587 530.917C-227.404 511.768 -224.493 492.619 -221.037 473.652ZM1707.31 587.271C1708.4 606.238 1708.94 625.57 1708.94 644.537L736.04 645.631C736.04 645.084 736.04 646.178 736.04 645.631L1707.31 587.271ZM-234.681 588.183L736.04 645.631C736.04 646.178 736.04 645.084 736.04 645.631L-236.5 646.725V645.631C-236.318 626.482 -235.772 607.15 -234.681 588.183ZM736.222 645.631L1707.49 701.802C1706.4 720.952 1704.76 740.283 1702.58 759.25L736.222 645.631C736.222 645.084 736.222 645.996 736.222 645.631ZM736.222 645.631C736.222 646.178 736.222 645.084 736.222 645.631L-229.223 762.351C-231.406 743.384 -233.225 724.052 -234.317 704.903L736.222 645.631ZM736.222 645.631L1694.21 816.516C1690.93 835.483 1686.93 854.632 1682.38 873.234L736.222 645.631C736.222 645.266 736.222 645.996 736.222 645.631ZM736.222 645.631C736.222 645.996 736.04 645.266 736.222 645.631L-208.848 876.152C-213.396 857.55 -217.399 838.401 -220.855 819.434L736.222 645.631ZM736.222 645.631L1667.28 929.223C1661.64 947.643 1655.46 966.245 1648.73 984.3L736.222 645.631C736.404 645.266 736.04 645.996 736.222 645.631ZM736.222 645.631C736.222 645.996 736.04 645.266 736.222 645.631L-174.829 987.036C-181.56 968.981 -187.746 950.561 -193.385 932.141L736.222 645.631ZM736.222 645.631L1626.9 1038.1C1619.26 1055.79 1610.89 1073.3 1601.97 1090.44L736.222 645.631C736.404 645.266 736.04 645.996 736.222 645.631ZM736.222 645.631C736.404 645.996 736.04 645.266 736.222 645.631L-128.076 1092.81C-136.808 1075.85 -145.177 1058.16 -152.999 1040.65L736.222 645.631ZM736.222 645.631L1574.32 1141.14C1564.68 1157.74 1554.31 1174.15 1543.58 1190.02L736.222 645.631C736.404 645.266 736.04 645.996 736.222 645.631ZM736.222 645.631C736.404 645.996 735.858 645.266 736.222 645.631L-69.3163 1192.02C-80.0495 1176.16 -90.4189 1159.74 -100.061 1143.33L736.222 645.631ZM736.222 645.631L1509.92 1236.89C1498.28 1252.03 1486.27 1267.16 1473.72 1281.57L736.222 645.631C736.586 645.266 735.858 645.996 736.222 645.631ZM736.222 645.631C736.586 645.996 735.858 645.266 736.222 645.631L0.722565 1283.39C-11.6479 1268.99 -24.0184 1254.03 -35.4793 1238.71L736.222 645.631ZM736.222 645.631L1434.97 1324.25C1421.69 1337.92 1407.87 1351.42 1393.86 1364.37L736.222 645.631C736.586 645.266 735.858 645.996 736.222 645.631ZM736.222 645.631C736.586 645.996 735.858 645.266 736.222 645.631L80.767 1366.01C66.7592 1353.06 52.7514 1339.57 39.4713 1325.89L736.222 645.631ZM736.222 645.631L1350.2 1402.12C1335.46 1414.16 1320 1426.01 1304.54 1437.14L736.222 645.631C736.586 645.266 735.858 645.813 736.222 645.631ZM736.222 645.631C736.586 645.813 735.858 645.266 736.222 645.631L170.089 1438.41C154.626 1427.29 139.163 1415.43 124.428 1403.4L736.222 645.631ZM736.222 645.631L1256.87 1469.42C1240.68 1479.63 1223.95 1489.66 1207.21 1498.96L736.222 645.631C736.586 645.449 735.858 645.813 736.222 645.631ZM736.222 645.631C736.586 645.813 735.858 645.449 736.222 645.631L267.78 1500.24C251.043 1490.94 234.307 1481.09 218.116 1470.87L736.222 645.631ZM736.222 645.631C736.586 645.813 735.858 645.449 736.222 645.631L372.02 1549.84C354.192 1542.73 336.545 1534.89 319.081 1526.5L736.222 645.631ZM736.222 645.631L1156.09 1525.4C1138.81 1533.61 1120.98 1541.64 1103.33 1548.75L736.222 645.631C736.586 645.449 735.858 645.813 736.222 645.631ZM736.222 645.631C736.586 645.631 735.858 645.449 736.222 645.631L481.899 1586.86C463.343 1581.76 444.787 1576.1 426.595 1570.09L736.222 645.631ZM736.222 645.631L1049.12 1568.99C1030.93 1575.19 1012.38 1580.85 993.819 1585.95L736.222 645.631C736.586 645.449 735.858 645.631 736.222 645.631ZM736.222 645.631L937.788 1599.63C919.051 1603.64 899.949 1607.11 880.847 1609.84L736.222 645.631C736.586 645.449 735.858 645.631 736.222 645.631ZM736.222 645.631C736.586 645.631 735.858 645.449 736.222 645.631L594.87 1610.39C575.951 1607.66 556.667 1604.19 537.93 1600.36L736.222 645.631ZM736.222 645.631L823.725 1616.77C804.805 1618.42 785.522 1619.69 766.42 1620.24L736.222 645.631C736.767 645.631 735.676 645.631 736.222 645.631ZM736.222 645.631C736.767 645.631 735.676 645.631 736.222 645.631L709.298 1620.24C690.196 1619.69 670.913 1618.6 651.993 1616.96L736.222 645.631Z" fill="#21763B" />
)
const holeOffsets = [
  [526, 371],
  [736, 493],
  [945, 614],
  [1156, 735],
  [422, 553],
  [631, 674],
  [841, 795],
]
const Issue_0_entries = Object.entries(Issue_0.data)
const lerp = (a: number, b: number, k: number) => a + k * (b - a)
const unit = (a: number, b: number, x: number) => (x - a) / (b - a)
const OverviewGraphics = ({ width, height, setTransitionTo, transitionTo }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const [hoverId, setHoverId] = useState(-1)

  const w = Math.max(0, unit(1160, 1472, width))
  const h = Math.max(0, unit(700, 1080, height))
  const aspect = height / width
  const viewBox = [lerp(200, 0, w), lerp(320, 0, h) - 400 * Math.max(0, aspect - 1), Math.max(1160, width), Math.max(700, height)]

  // let isSlidingMenu = width < 608 || height < 930 || (height < 970 && width < 1100)
  // let isSlidingMenu = width < 768 || height < 790
  let dimensionFactor = 6000 - (width + 6 * height)
  let isSlidingMenu = dimensionFactor > -100
  // isSlidingMenu = false

  const menuStyle = {
    color: "white",
    fontFamily: "NON-Natural-Grotesk-Regular",
    fontSize: "20px",
    lineHeight: "28px",
    padding: isSlidingMenu ? "1.2em" : "2em",
    lineHeight: isSlidingMenu ? "1.8em" : dimensionFactor > -500 ? "1.6em" : "2em"
  }
  const menu = (
    <div style={menuStyle}>
      {
        Issue_0_entries.map(([name, data], i) =>
          <div key={i} >
            <a
              className={`${styles.menulink} ${i === hoverId ? styles.hover : ''}`}
              onMouseEnter={() => setHoverId(i)}
              onMouseLeave={() => setHoverId(-1)}
              onClick={() => {
                setMenuOpen(false)
                setTransitionTo(i)
              }}
            >
              {i === 0 ? <span style={{ color: "#BBBBBB" }}>&#x63a8;</span> : <span style={{ color: "#FF6666" }}>&#x2192;</span>}
              <span style={{ color: "#FFFF66" }}> {name}</span>
              <span style={{ color: "#999900" }}> :{data.title}</span>
            </a>
          </div>
        )
      }
    </div>
  )

  const N = 10
  const springs = useSprings(N, Array(N).fill(0).map((_, i) => ({
    from: {
      transform: "translateY(1080px)"
    },
    to: {
      transform: "translateY(0)"
    },
    delay: 200 + i / N * 800,
    config: {
      tension: 50,
      friction: 6
    }
  })))

  return (
    <div>

      <svg style={{ position: "absolute", width: "100vw", height: "100vh" }} preserveAspectRatio="xMidYMid slice" width="1472" height="1080" viewBox="0 0 1472 1080" fill="none">
        <defs>
          <filter id="filter2_df_5143_15939" x="452" y="-800" width="299.102" height="1800" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="7.5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.983333 0 0 0 0 0.940714 0 0 0 0 0.417917 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5143_15939" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5143_15939" result="shape" />
            <feGaussianBlur stdDeviation="7.5" result="effect2_foregroundBlur_5143_15939" />
          </filter>
          <linearGradient id="paint11_linear_5143_15939" x1="303.5" y1="373.894" x2="1031.88" y2="326.235" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E42A2A" />
            <stop offset="0.279676" stopColor="#F3B72F" />
            <stop offset="0.489446" stopColor="#F9EA31" />
            <stop offset="0.747858" stopColor="#7EC219" />
            <stop offset="0.912025" stopColor="#009900" />
          </linearGradient>
          <filter xmlns="http://www.w3.org/2000/svg" id="filter1_f_5143_15016" x="200" y="320" width="1160" height="700" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="12.5" result="effect1_foregroundBlur_5143_15016" />
          </filter>
          <radialGradient id="paint0_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(736 786) rotate(-90) scale(952.5 1257.14)">
            <stop stopColor="#F9EA31" />
            <stop offset="0.279485" stopColor="#A6D671" />
            <stop offset="0.529916" stopColor="#0DB3D7" />
            <stop offset="0.649348" stopColor="#A6D671" />
            <stop offset="0.761672" stopColor="#F9EA31" />
            <stop offset="0.866497" stopColor="#F3AF2F" />
            <stop offset="0.909123" stopColor="#EE832D" />
            <stop offset="1" stopColor="#E42A2A" />
          </radialGradient>
          <radialGradient id="paint1_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(138.994 556.043) scale(95.0314)">
            <stop stopColor="#D6DE23" />
            <stop offset="0.386" stopColor="#D4DD23" />
            <stop offset="0.525" stopColor="#CDD924" />
            <stop offset="0.6242" stopColor="#C1D325" />
            <stop offset="0.7043" stopColor="#B1C927" />
            <stop offset="0.773" stopColor="#9BBD29" />
            <stop offset="0.8338" stopColor="#7FAE2B" />
            <stop offset="0.8888" stopColor="#5F9C2F" />
            <stop offset="0.9393" stopColor="#398832" />
            <stop offset="0.9843" stopColor="#107136" />
            <stop offset="1" stopColor="#006838" />
          </radialGradient>
          <radialGradient id="paint2_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(735.389 560.038) rotate(-92.3304) scale(441.986 646.562)">
            <stop stopColor="#378EAB" />
            <stop offset="0.1472" stopColor="#358AA6" />
            <stop offset="0.3268" stopColor="#2F7E97" />
            <stop offset="0.5232" stopColor="#25697E" />
            <stop offset="0.7315" stopColor="#174D5C" />
            <stop offset="0.9472" stopColor="#052A30" />
            <stop offset="1" stopColor="#002024" />
          </radialGradient>
          <radialGradient id="paint3_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(396.064 711.502) scale(131.953 132.453)">
            <stop stopColor="#8BC53F" />
            <stop offset="0.421" stopColor="#89C43F" />
            <stop offset="0.5726" stopColor="#82BF3F" />
            <stop offset="0.6807" stopColor="#77B73E" />
            <stop offset="0.7681" stopColor="#66AC3D" />
            <stop offset="0.843" stopColor="#509D3C" />
            <stop offset="0.9092" stopColor="#348B3B" />
            <stop offset="0.9677" stopColor="#157639" />
            <stop offset="1" stopColor="#006838" />
          </radialGradient>
          <radialGradient id="paint4_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1321.51 561.474) scale(127.469)">
            <stop stopColor="#F9EC31" />
            <stop offset="0.4168" stopColor="#F9EA31" />
            <stop offset="0.567" stopColor="#F8E330" />
            <stop offset="0.674" stopColor="#F8D830" />
            <stop offset="0.7606" stopColor="#F7C72F" />
            <stop offset="0.8347" stopColor="#F5B12D" />
            <stop offset="0.9003" stopColor="#F4952C" />
            <stop offset="0.9582" stopColor="#F2762A" />
            <stop offset="1" stopColor="#F05A28" />
          </radialGradient>
          <radialGradient id="paint5_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(51.9502 698.453) rotate(-92.3265) scale(339.627 496)">
            <stop offset="0.2158" stopColor="#709FBD" />
            <stop offset="0.3116" stopColor="#5F96B2" />
            <stop offset="0.5003" stopColor="#347D94" />
            <stop offset="0.7013" stopColor="#005F70" />
          </radialGradient>
          <radialGradient id="paint6_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1426.06 721.55) rotate(-104.013) scale(373.446 473.265)">
            <stop offset="0.2158" stopColor="#AAD5FF" />
            <stop offset="0.2831" stopColor="#99C8EF" />
            <stop offset="0.4157" stopColor="#6EA6C6" />
            <stop offset="0.5992" stopColor="#297085" />
            <stop offset="0.7013" stopColor="#004F5E" />
          </radialGradient>
          <radialGradient id="paint7_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(729.844 716.331) rotate(29.9978) scale(649.654 460.024)">
            <stop stopColor="white" />
            <stop offset="0.0323" stopColor="#FFFCF6" />
            <stop offset="0.0841" stopColor="#FEF2DF" />
            <stop offset="0.1489" stopColor="#FEE3B9" />
            <stop offset="0.2241" stopColor="#FCCD84" />
            <stop offset="0.3073" stopColor="#FBB241" />
            <stop offset="0.314" stopColor="#FBB03B" />
            <stop offset="0.5027" stopColor="#A86E6F" />
            <stop offset="0.649543" stopColor="#74458F" />
            <stop offset="0.68382" stopColor="#73488D" />
            <stop offset="0.723648" stopColor="#6E5188" />
            <stop offset="0.762689" stopColor="#66607E" />
            <stop offset="0.806454" stopColor="#5B7571" />
            <stop offset="0.868974" stopColor="#4C9160" />
            <stop offset="0.921595" stopColor="#3AB24C" />
            <stop offset="1" stopColor="#39B54A" />
          </radialGradient>
          <radialGradient id="paint8_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(949.352 831.7) rotate(29.9978) scale(17.6992 15.3273)">
            <stop stopColor="white" />
            <stop offset="0.0976" stopColor="#F6FCF7" />
            <stop offset="0.254" stopColor="#DFF3E2" />
            <stop offset="0.4496" stopColor="#B9E5BF" />
            <stop offset="0.6768" stopColor="#84D18E" />
            <stop offset="0.9279" stopColor="#41B851" />
            <stop offset="0.9552" stopColor="#39B54A" />
          </radialGradient>
          <radialGradient id="paint9_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(529.817 589.503) rotate(29.9978) scale(17.6992 15.3273)">
            <stop stopColor="white" />
            <stop offset="0.0976" stopColor="#F6FCF7" />
            <stop offset="0.254" stopColor="#DFF3E2" />
            <stop offset="0.4496" stopColor="#B9E5BF" />
            <stop offset="0.6768" stopColor="#84D18E" />
            <stop offset="0.9279" stopColor="#41B851" />
            <stop offset="0.9552" stopColor="#39B54A" />
          </radialGradient>
          <radialGradient id="paint10_radial_5143_13861" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(736.068 712.699) rotate(29.9978) scale(15.6802 13.5789)">
            <stop stopColor="white" />
            <stop offset="0.0887" stopColor="#FFF6F7" />
            <stop offset="0.2308" stopColor="#FFDFE0" />
            <stop offset="0.4086" stopColor="#FFB9BB" />
            <stop offset="0.6151" stopColor="#FF8488" />
            <stop offset="0.8431" stopColor="#FF4147" />
            <stop offset="0.9552" stopColor="#FF1D25" />
          </radialGradient>
          <clipPath id="clip0_5143_13861">
            <rect width="1472" height="1080" fill="white" />
          </clipPath>
          <clipPath id="clip1_5143_13861">
            <rect width="1472" height="432" fill="white" transform="translate(0 648)" />
          </clipPath>
          <clipPath id="clip2_5143_13861">
            <rect width="864" height="433" fill="white" transform="translate(0 130)" />
          </clipPath>
          <clipPath id="clip3_5143_13861">
            <rect width="453" height="292" fill="white" transform="translate(761 721)" />
          </clipPath>
          <clipPath id="clip4_5143_13861">
            <rect width="1030.93" height="546.5" fill="white" transform="matrix(0.866044 0.499967 -0.866044 0.499967 520.077 322)" />
          </clipPath>
        </defs>

        <rect id="Background" width="1472" height="1080" fill="url(#paint0_radial_5143_13861)" />

        <animated.g style={springs[0]}>
          <g id="Bottom" clipPath="url(#clip1_5143_13861)">
            <mask id="mask0_5143_13861" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-376" y="648" width="2224" height="1006">
              <path id="Vector" d="M1847.16 648H-375.163V1653.25H1847.16V648Z" fill="#F3E921" />
            </mask>
            <g mask="url(#mask0_5143_13861)">
              <path id="Vector_2" d="M1847.16 648.545H-375.163V1653.79H1847.16V648.545Z" fill="#F3E921" />
              <g id="Group" className={styles.bgRotate}>
                <RadialStripes />
              </g>
            </g>
          </g>
        </animated.g>
        <animated.g style={springs[1]}>
          <g className={styles.bobbing} style={{ "--bobDelay": 1 } as React.CSSProperties} id="Top Rainbow" clipPath="url(#clip2_5143_13861)">
            <path id="Ellipse 21" d="M834.827 563C834.827 786.044 654.446 966.805 432 966.805C209.554 966.805 29.1733 786.044 29.1733 563C29.1733 339.956 209.554 159.195 432 159.195C654.446 159.195 834.827 339.956 834.827 563Z" stroke="#FF8C1A" strokeWidth="26" />
            <path id="Ellipse 22" d="M810.313 562.504C810.313 771.71 640.92 941.275 432 941.275C223.08 941.275 53.6865 771.71 53.6865 562.504C53.6865 353.297 223.08 183.732 432 183.732C640.92 183.732 810.313 353.297 810.313 562.504Z" stroke="#E492F7" strokeWidth="30" />
            <path id="Ellipse 23" d="M791.942 562.503C791.942 761.578 630.971 922.885 432.496 922.885C234.02 922.885 73.0498 761.578 73.0498 562.503C73.0498 363.429 234.02 202.121 432.496 202.121C630.971 202.121 791.942 363.429 791.942 562.503Z" stroke="#FF1F1F" strokeWidth="35" />
            <path id="Ellipse 24" d="M775.667 563C775.667 753.324 622.001 907.571 432.496 907.571C242.99 907.571 89.3247 753.324 89.3247 563C89.3247 372.676 242.99 218.429 432.496 218.429C622.001 218.429 775.667 372.676 775.667 563Z" stroke="#F7F73C" strokeWidth="12" />
          </g>
        </animated.g>
        <animated.g style={springs[2]}>
          <path className={styles.bobbing} style={{ "--bobDelay": 2 } as React.CSSProperties} id="Small Green Circle" d="M139 651C191.467 651 234 608.467 234 556C234 503.533 191.467 461 139 461C86.5329 461 44 503.533 44 556C44 608.467 86.5329 651 139 651Z" fill="url(#paint1_radial_5143_13861)" />
        </animated.g>
        <animated.g style={springs[3]}>
          <path className={styles.bobbing} style={{ "--bobDelay": 3 } as React.CSSProperties} id="Blue Hill Back" d="M1240 746.378C1240 746.378 1145.48 359 715.668 359C353.696 359 231 761 231 761L1240 746.378Z" fill="url(#paint2_radial_5143_13861)" />
        </animated.g>
        <animated.g style={springs[4]}>
          <path className={styles.bobbing} style={{ "--bobDelay": 4 } as React.CSSProperties} id="Big Green Circle" d="M396 844C468.902 844 528 784.678 528 711.5C528 638.322 468.902 579 396 579C323.098 579 264 638.322 264 711.5C264 784.678 323.098 844 396 844Z" fill="url(#paint3_radial_5143_13861)" />
        </animated.g>
        <animated.g style={springs[5]}>
          <path className={styles.bobbing} style={{ "--bobDelay": 5 } as React.CSSProperties} id="Yellow Circle" d="M1321.5 689C1391.92 689 1449 631.916 1449 561.5C1449 491.084 1391.92 434 1321.5 434C1251.08 434 1194 491.084 1194 561.5C1194 631.916 1251.08 689 1321.5 689Z" fill="url(#paint4_radial_5143_13861)" />
        </animated.g>
        <animated.g style={springs[6]}>
          <path className={styles.bobbing} style={{ "--bobDelay": 6 } as React.CSSProperties} id="Vector_4" d="M439 841.671C439 841.671 366.55 544 36.8313 544C-240.795 544 -335 853 -335 853L439 841.671Z" fill="url(#paint5_radial_5143_13861)" />
        </animated.g>
      </svg>

      {!isSlidingMenu && (
        <div className={styles.staticmenu} style={{
          backgroundColor: "#111111",
          position: "absolute", right: 0, top: 0,
          "--dx": -Math.max(60 * w, 20) + "px",
          "--dy": lerp(20, 100, (h / 2) ** 2) + "px",
          // transform: `translate(${-Math.max(60 * w, 20)}px, ${lerp(20, 100, (h / 2) ** 2)}px)`,
        } as React.CSSProperties}>
          {menu}
        </div>
      )}

      <svg style={{ position: "absolute", width: "100vw", height: "100vh", pointerEvents: "none" }} viewBox={viewBox.join()} fill="none">
        <g id="Desktop">
          <animated.g style={springs[7]}>
            <path className={styles.bobbing} style={{ "--bobDelay": 7 } as React.CSSProperties} id="Hill" d="M1080 852.714C1080 852.714 1088.56 552.68 1450.71 566.461C1761.03 578.194 1772 877 1772 877L1080 852.714Z" fill="url(#paint6_radial_5143_13861)" />
          </animated.g>
          <animated.g style={springs[8]}>
            <g className={styles.bobbing} style={{ "--bobDelay": 8 } as React.CSSProperties} id="Front Rainbow" clipPath="url(#clip3_5143_13861)">
              <path id="Ellipse 21_2" d="M1197.69 947.306C1197.69 1063.67 1103.43 1157.98 987.173 1157.98C870.911 1157.98 776.653 1063.67 776.653 947.306C776.653 830.946 870.911 736.627 987.173 736.627C1103.43 736.627 1197.69 830.946 1197.69 947.306Z" stroke="#7BF752" strokeWidth="15" />
              <path id="Ellipse 22_2" d="M1184.97 947.676C1184.97 1056.88 1096.55 1145.39 987.5 1145.39C878.449 1145.39 790.026 1056.88 790.026 947.676C790.026 838.473 878.449 749.965 987.5 749.965C1096.55 749.965 1184.97 838.473 1184.97 947.676Z" stroke="#B762F4" strokeWidth="20" />
              <path id="Ellipse 23_2" d="M1178.44 947.642C1178.44 1053.15 1092.98 1138.68 987.572 1138.68C882.165 1138.68 796.709 1053.15 796.709 947.642C796.709 842.133 882.165 756.608 987.572 756.608C1092.98 756.608 1178.44 842.133 1178.44 947.642Z" stroke="#4278FC" strokeWidth="8" />
              <path id="Ellipse 24_2" d="M1160.15 947.938C1160.15 1043.47 1082.89 1120.85 987.65 1120.85C892.413 1120.85 815.146 1043.47 815.146 947.938C815.146 852.407 892.413 775.027 987.65 775.027C1082.89 775.027 1160.15 852.407 1160.15 947.938Z" stroke="#FF781D" strokeWidth="34" />
            </g>
          </animated.g>
          <animated.g style={springs[9]}>
            <g id="Top" className={styles.bobbing} style={{ "--bobDelay": 9 } as React.CSSProperties}>
              <path id="Rectangle 63" d="M939.768 1110.66L1413.06 837.43L1413.06 978.221L939.767 1251.45L46.9395 736.024L46.9398 595.232L939.768 1110.66Z" fill="black" />
              <g id="eeee try" clipPath="url(#clip4_5143_13861)">

                <g filter="url(#filter1_f_5143_15016)">
                  {
                    holeOffsets.map(([x, y], i) => (
                      <rect key={i}
                        className={`${styles.glowhole} ${i === hoverId ? styles.hover : ''}`}
                        onMouseEnter={() => setHoverId(i)}
                        onMouseLeave={() => setHoverId(-1)}
                        onClick={() => setTransitionTo(i)}
                        transform={`matrix(0.866044 0.499967 -0.866044 0.499967 ${x} ${y})`}
                        y="7.49951" width="198.001" height="198.001" rx="16.7392" stroke="#FFFF99" strokeWidth="15" />
                    ))
                  }
                </g>

                <g id="Tiles">
                  <path id="Background_2" fillRule="evenodd" clipRule="evenodd" d="M1412.9 837.43L520.077 322L46.7836 595.232L939.611 1110.66L1412.9 837.43ZM541.069 382.802C529.476 376.109 510.679 376.109 499.085 382.802L361.871 462.015C350.278 468.708 350.278 479.56 361.871 486.253L499.085 565.466C510.679 572.159 529.476 572.159 541.069 565.466L678.283 486.253C689.877 479.56 689.877 468.708 678.283 462.015L541.069 382.802ZM750.836 503.9C739.243 497.207 720.446 497.207 708.852 503.9L571.638 583.114C560.045 589.807 560.045 600.658 571.638 607.351L708.852 686.565C720.445 693.258 739.243 693.258 750.836 686.565L888.05 607.351C899.643 600.658 899.644 589.807 888.05 583.114L750.836 503.9ZM918.619 624.999C930.213 618.306 949.01 618.306 960.604 624.999L1097.82 704.212C1109.41 710.905 1109.41 721.757 1097.82 728.45L960.604 807.663C949.01 814.356 930.213 814.356 918.619 807.663L781.406 728.45C769.812 721.757 769.812 710.905 781.406 704.212L918.619 624.999ZM1170.37 746.098C1158.78 739.405 1139.98 739.404 1128.39 746.098L991.173 825.311C979.579 832.004 979.579 842.856 991.173 849.549L1128.39 928.762C1139.98 935.455 1158.78 935.455 1170.37 928.762L1307.58 849.549C1319.18 842.856 1319.18 832.004 1307.58 825.311L1170.37 746.098ZM394.201 564.45C405.795 557.756 424.592 557.757 436.186 564.45L573.399 643.663C584.993 650.356 584.993 661.208 573.399 667.901L436.186 747.114C424.592 753.807 405.795 753.807 394.201 747.114L256.988 667.901C245.394 661.208 245.394 650.356 256.988 643.663L394.201 564.45ZM645.953 685.548C634.359 678.855 615.562 678.855 603.969 685.548L466.755 764.761C455.161 771.455 455.161 782.306 466.755 788.999L603.969 868.213C615.562 874.906 634.359 874.906 645.953 868.213L783.167 788.999C794.76 782.306 794.76 771.455 783.167 764.762L645.953 685.548ZM813.736 806.647C825.329 799.954 844.126 799.954 855.72 806.647L992.933 885.86C1004.53 892.553 1004.53 903.405 992.934 910.098L855.72 989.311C844.126 996.004 825.329 996.004 813.736 989.311L676.522 910.098C664.928 903.405 664.928 892.553 676.522 885.86L813.736 806.647Z" fill="url(#paint7_radial_5143_13861)" />
                  <g id="Fun Borders">
                    <mask id="mask1_5143_13861" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="46" y="322" width="1367" height="789">
                      <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M1412.9 837.43L520.077 322L46.7836 595.232L939.611 1110.66L1412.9 837.43ZM541.069 382.802C529.476 376.109 510.679 376.109 499.085 382.802L361.871 462.015C350.278 468.708 350.278 479.56 361.871 486.253L499.085 565.466C510.679 572.159 529.476 572.159 541.069 565.466L678.283 486.253C689.877 479.56 689.877 468.708 678.283 462.015L541.069 382.802ZM750.836 503.9C739.243 497.207 720.446 497.207 708.852 503.9L571.638 583.114C560.045 589.807 560.045 600.658 571.638 607.351L708.852 686.565C720.445 693.258 739.243 693.258 750.836 686.565L888.05 607.351C899.643 600.658 899.644 589.807 888.05 583.114L750.836 503.9ZM918.619 624.999C930.213 618.306 949.01 618.306 960.604 624.999L1097.82 704.212C1109.41 710.905 1109.41 721.757 1097.82 728.45L960.604 807.663C949.01 814.356 930.213 814.356 918.619 807.663L781.406 728.45C769.812 721.757 769.812 710.905 781.406 704.212L918.619 624.999ZM1170.37 746.098C1158.78 739.405 1139.98 739.404 1128.39 746.098L991.173 825.311C979.579 832.004 979.579 842.856 991.173 849.549L1128.39 928.762C1139.98 935.455 1158.78 935.455 1170.37 928.762L1307.58 849.549C1319.18 842.856 1319.18 832.004 1307.58 825.311L1170.37 746.098ZM394.201 564.45C405.795 557.756 424.592 557.757 436.186 564.45L573.399 643.663C584.993 650.356 584.993 661.208 573.399 667.901L436.186 747.114C424.592 753.807 405.795 753.807 394.201 747.114L256.988 667.901C245.394 661.208 245.394 650.356 256.988 643.663L394.201 564.45ZM645.953 685.548C634.359 678.855 615.562 678.855 603.969 685.548L466.755 764.761C455.161 771.455 455.161 782.306 466.755 788.999L603.969 868.213C615.562 874.906 634.359 874.906 645.953 868.213L783.167 788.999C794.76 782.306 794.76 771.455 783.167 764.762L645.953 685.548ZM813.736 806.647C825.329 799.954 844.126 799.954 855.72 806.647L992.933 885.86C1004.53 892.553 1004.53 903.405 992.934 910.098L855.72 989.311C844.126 996.004 825.329 996.004 813.736 989.311L676.522 910.098C664.928 903.405 664.928 892.553 676.522 885.86L813.736 806.647Z" fill="#C4C4C4" />
                    </mask>
                    <g mask="url(#mask1_5143_13861)">
                      <path id="1 - Fun Border" d="M535.098 379.415C539.578 376.829 546.588 375.643 549.592 377.377C552.596 379.111 550.541 383.158 546.061 385.744L535.098 379.415ZM557.603 392.408C562.083 389.821 564.139 385.775 561.135 384.04C558.078 382.276 551.121 383.493 546.641 386.079L557.603 392.408ZM569.093 399.041C573.626 396.424 575.629 392.408 572.624 390.673C569.62 388.939 562.61 390.126 558.13 392.712L569.093 399.041ZM580.636 405.704C585.115 403.118 587.171 399.071 584.167 397.337C581.11 395.572 574.153 396.789 569.673 399.375L580.636 405.704ZM592.125 412.337C596.658 409.721 598.661 405.704 595.657 403.97C592.652 402.236 585.643 403.422 581.163 406.008L592.125 412.337ZM603.668 419.001C608.148 416.414 610.203 412.368 607.199 410.633C604.195 408.899 597.185 410.086 592.705 412.672L603.668 419.001ZM615.158 425.634C619.69 423.017 621.693 419.001 618.689 417.266C615.632 415.502 608.675 416.719 604.195 419.305L615.158 425.634ZM626.7 432.297C631.18 429.711 633.235 425.664 630.231 423.93C627.227 422.196 620.217 423.382 615.737 425.968L626.7 432.297ZM638.19 438.93C642.722 436.314 644.725 432.297 641.721 430.563C638.664 428.798 631.707 430.015 627.227 432.601L638.19 438.93ZM649.732 445.594C654.265 442.977 656.268 438.961 653.263 437.226C650.259 435.492 643.249 436.679 638.769 439.265L649.732 445.594ZM661.222 452.227C665.755 449.61 667.757 445.594 664.753 443.859C661.749 442.125 654.739 443.312 650.259 445.898L661.222 452.227ZM672.764 458.89C677.297 456.273 679.3 452.257 676.296 450.523C673.291 448.789 666.282 449.975 661.802 452.561L672.764 458.89ZM684.254 465.523C688.734 462.937 690.842 458.921 687.785 457.156C684.729 455.391 677.771 456.608 673.291 459.194L684.254 465.523ZM673.291 489.195C677.824 491.812 684.781 492.968 687.785 491.234C690.79 489.5 688.734 485.453 684.254 482.866L673.291 489.195ZM661.749 495.859C666.282 498.475 673.239 499.632 676.243 497.897C679.247 496.163 677.192 492.116 672.712 489.53L661.749 495.859ZM650.259 502.492C654.792 505.108 661.749 506.265 664.753 504.53C667.81 502.766 665.702 498.749 661.222 496.163L650.259 502.492ZM638.717 509.155C643.249 511.772 650.207 512.928 653.211 511.194C656.268 509.429 654.159 505.413 649.679 502.826L638.717 509.155ZM627.227 515.788C631.76 518.405 638.717 519.561 641.721 517.827C644.725 516.093 642.67 512.046 638.19 509.459L627.227 515.788ZM615.685 522.452C620.217 525.068 627.174 526.225 630.179 524.49C633.183 522.756 631.127 518.709 626.647 516.123L615.685 522.452ZM604.195 529.085C608.727 531.701 615.685 532.858 618.689 531.123C621.746 529.359 619.637 525.342 615.158 522.756L604.195 529.085ZM592.652 535.748C597.185 538.365 604.142 539.521 607.146 537.787C610.151 536.052 608.095 532.006 603.615 529.419L592.652 535.748ZM581.163 542.381C585.695 544.998 592.652 546.154 595.657 544.42C598.713 542.655 596.605 538.639 592.125 536.052L581.163 542.381ZM569.62 549.045C574.153 551.661 581.11 552.818 584.114 551.083C587.118 549.349 585.063 545.302 580.583 542.716L569.62 549.045ZM558.13 555.678C562.663 558.294 569.62 559.451 572.624 557.716C575.629 555.982 573.573 551.935 569.093 549.349L558.13 555.678ZM546.588 562.341C551.121 564.958 558.078 566.114 561.082 564.38C564.086 562.645 562.031 558.599 557.551 556.012L546.588 562.341ZM535.098 568.974C539.631 571.591 546.588 572.747 549.592 571.013C552.649 569.248 550.541 565.232 546.061 562.645L535.098 568.974ZM505.056 379.415C500.576 376.829 493.566 375.643 490.562 377.377C487.505 379.142 489.613 383.158 494.093 385.744L505.056 379.415ZM493.514 386.079C489.034 383.493 482.077 382.276 479.02 384.04C475.963 385.805 478.071 389.821 482.551 392.408L493.514 386.079ZM482.024 392.712C477.544 390.126 470.534 388.939 467.53 390.673C464.473 392.438 466.581 396.454 471.061 399.041L482.024 392.712ZM470.481 399.375C465.949 396.759 458.992 395.603 455.988 397.337C452.931 399.102 455.039 403.118 459.519 405.704L470.481 399.375ZM458.992 406.008C454.512 403.422 447.502 402.236 444.498 403.97C441.441 405.735 443.549 409.751 448.029 412.337L458.992 406.008ZM447.449 412.672C442.917 410.055 435.959 408.899 432.955 410.633C429.898 412.398 432.007 416.414 436.487 419.001L447.449 412.672ZM435.959 419.305C431.427 416.688 424.47 415.532 421.466 417.266C418.409 419.031 420.517 423.047 424.997 425.634L435.959 419.305ZM424.417 425.968C419.937 423.382 412.98 422.165 409.923 423.93C406.866 425.695 408.974 429.711 413.454 432.297L424.417 425.968ZM412.927 432.601C408.395 429.985 401.438 428.829 398.433 430.563C395.429 432.297 397.485 436.344 401.965 438.93L412.927 432.601ZM401.438 439.235C396.905 436.618 389.948 435.462 386.944 437.196C383.887 438.961 385.995 442.977 390.475 445.563L401.438 439.235ZM389.895 445.898C385.362 443.281 378.405 442.125 375.401 443.859C372.344 445.624 374.452 449.64 378.932 452.227L389.895 445.898ZM378.405 452.531C373.873 449.914 366.916 448.758 363.911 450.492C360.854 452.257 362.963 456.274 367.443 458.86L378.405 452.531ZM366.863 459.194C362.33 456.578 355.373 455.422 352.369 457.156C349.312 458.921 351.42 462.937 355.9 465.523L366.863 459.194ZM535.098 379.415C536.732 375.856 535.045 371.778 530.882 371.139C526.718 370.5 521.764 373.543 520.077 377.073L535.098 379.415ZM520.024 377.103C518.391 373.543 513.331 370.5 509.22 371.17C505.109 371.839 503.37 375.886 505.003 379.446L520.024 377.103ZM688.26 474.225C694.426 473.282 699.697 470.361 698.537 467.988C697.378 465.615 690.368 464.61 684.201 465.554L688.26 474.225ZM684.254 482.866C690.421 483.81 697.483 482.836 698.59 480.432C699.697 478.029 694.426 475.169 688.312 474.195L684.254 482.866ZM355.9 482.866C351.367 485.483 349.365 489.5 352.369 491.234C355.426 492.999 362.383 491.782 366.863 489.195L355.9 482.866ZM367.39 489.5C362.857 492.116 360.854 496.133 363.859 497.867C366.916 499.632 373.873 498.415 378.353 495.828L367.39 489.5ZM378.932 496.163C374.4 498.78 372.397 502.796 375.401 504.53C378.458 506.295 385.415 505.078 389.895 502.492L378.932 496.163ZM390.422 502.796C385.889 505.413 383.887 509.429 386.891 511.163C389.948 512.928 396.905 511.711 401.385 509.125L390.422 502.796ZM401.965 509.459C397.432 512.076 395.429 516.093 398.433 517.827C401.49 519.592 408.447 518.375 412.927 515.788L401.965 509.459ZM413.454 516.093C408.922 518.709 406.919 522.726 409.923 524.46C412.927 526.194 419.937 525.008 424.417 522.421L413.454 516.093ZM424.997 522.756C420.464 525.373 418.461 529.389 421.466 531.123C424.522 532.888 431.48 531.671 435.959 529.085L424.997 522.756ZM436.487 529.389C431.954 532.006 429.951 536.022 432.955 537.756C435.959 539.491 442.969 538.304 447.449 535.718L436.487 529.389ZM448.029 536.052C443.496 538.669 441.494 542.686 444.498 544.42C447.555 546.185 454.512 544.968 458.992 542.381L448.029 536.052ZM459.519 542.686C454.986 545.302 452.983 549.319 455.988 551.053C458.992 552.787 466.002 551.601 470.481 549.014L459.519 542.686ZM471.061 549.349C466.529 551.966 464.526 555.982 467.53 557.716C470.534 559.451 477.544 558.264 482.024 555.678L471.061 549.349ZM482.551 555.982C478.018 558.599 476.016 562.615 479.02 564.349C482.024 566.084 489.034 564.897 493.514 562.311L482.551 555.982ZM494.093 562.645C489.561 565.262 487.558 569.279 490.562 571.013C493.619 572.778 500.576 571.561 505.056 568.974L494.093 562.645ZM351.842 474.195C345.675 475.138 340.405 478.059 341.564 480.432C342.671 482.836 349.734 483.81 355.9 482.866L351.842 474.195ZM355.847 465.554C349.681 464.61 342.618 465.584 341.512 467.988C340.405 470.392 345.675 473.252 351.789 474.225L355.847 465.554ZM505.056 568.974C503.422 572.534 505.109 576.611 509.273 577.25C513.436 577.889 518.391 574.847 520.077 571.317L505.056 568.974ZM520.077 571.317C521.711 574.877 526.771 577.92 530.882 577.25C535.045 576.611 536.732 572.534 535.098 568.974L520.077 571.317Z" fill="#009900" />
                      <path id="5 - Fun Border" d="M430.214 561.063C434.694 558.477 441.704 557.29 444.708 559.025C447.713 560.759 445.657 564.806 441.177 567.392L430.214 561.063ZM452.72 574.055C457.199 571.469 459.255 567.422 456.251 565.688C453.194 563.923 446.237 565.14 441.757 567.727L452.72 574.055ZM464.209 580.688C468.742 578.072 470.745 574.055 467.741 572.321C464.736 570.587 457.727 571.773 453.247 574.36L464.209 580.688ZM475.752 587.352C480.232 584.766 482.287 580.719 479.283 578.985C476.226 577.22 469.269 578.437 464.789 581.023L475.752 587.352ZM487.242 593.985C491.774 591.368 493.777 587.352 490.773 585.618C487.769 583.883 480.759 585.07 476.279 587.656L487.242 593.985ZM498.784 600.648C503.264 598.062 505.319 594.015 502.315 592.281C499.311 590.547 492.301 591.733 487.821 594.32L498.784 600.648ZM510.274 607.281C514.806 604.665 516.809 600.648 513.805 598.914C510.748 597.149 503.791 598.366 499.311 600.953L510.274 607.281ZM521.816 613.945C526.296 611.359 528.352 607.312 525.347 605.578C522.343 603.843 515.333 605.03 510.853 607.616L521.816 613.945ZM533.306 620.578C537.839 617.961 539.841 613.945 536.837 612.211C533.78 610.446 526.823 611.663 522.343 614.249L533.306 620.578ZM544.848 627.241C549.381 624.625 551.384 620.608 548.38 618.874C545.375 617.14 538.366 618.326 533.886 620.913L544.848 627.241ZM556.338 633.874C560.871 631.258 562.874 627.241 559.869 625.507C556.865 623.773 549.855 624.959 545.375 627.546L556.338 633.874ZM567.881 640.538C572.413 637.921 574.416 633.905 571.412 632.171C568.408 630.436 561.398 631.623 556.918 634.209L567.881 640.538ZM579.37 647.171C583.85 644.585 585.959 640.568 582.902 638.804C579.845 637.039 572.888 638.256 568.408 640.842L579.37 647.171ZM568.408 670.843C572.94 673.46 579.897 674.616 582.902 672.882C585.906 671.147 583.85 667.1 579.37 664.514L568.408 670.843ZM556.865 677.506C561.398 680.123 568.355 681.279 571.359 679.545C574.363 677.811 572.308 673.764 567.828 671.178L556.865 677.506ZM545.375 684.139C549.908 686.756 556.865 687.912 559.869 686.178C562.926 684.413 560.818 680.397 556.338 677.811L545.375 684.139ZM533.833 690.803C538.366 693.42 545.323 694.576 548.327 692.842C551.384 691.077 549.276 687.06 544.796 684.474L533.833 690.803ZM522.343 697.436C526.876 700.053 533.833 701.209 536.837 699.475C539.841 697.74 537.786 693.693 533.306 691.107L522.343 697.436ZM510.801 704.099C515.333 706.716 522.291 707.872 525.295 706.138C528.299 704.404 526.243 700.357 521.763 697.771L510.801 704.099ZM499.311 710.732C503.844 713.349 510.801 714.505 513.805 712.771C516.862 711.006 514.754 706.99 510.274 704.404L499.311 710.732ZM487.769 717.396C492.301 720.013 499.258 721.169 502.263 719.435C505.267 717.7 503.211 713.653 498.731 711.067L487.769 717.396ZM476.279 724.029C480.811 726.646 487.769 727.802 490.773 726.068C493.83 724.303 491.721 720.286 487.242 717.7L476.279 724.029ZM464.736 730.692C469.269 733.309 476.226 734.465 479.23 732.731C482.234 730.997 480.179 726.95 475.699 724.364L464.736 730.692ZM453.247 737.325C457.779 739.942 464.736 741.098 467.741 739.364C470.745 737.63 468.689 733.583 464.209 730.997L453.247 737.325ZM441.704 743.989C446.237 746.606 453.194 747.762 456.198 746.028C459.202 744.293 457.147 740.246 452.667 737.66L441.704 743.989ZM430.214 750.622C434.747 753.239 441.704 754.395 444.708 752.661C447.765 750.896 445.657 746.879 441.177 744.293L430.214 750.622ZM400.172 561.063C395.692 558.477 388.683 557.29 385.678 559.025C382.621 560.789 384.73 564.806 389.21 567.392L400.172 561.063ZM388.63 567.727C384.15 565.14 377.193 563.923 374.136 565.688C371.079 567.453 373.187 571.469 377.667 574.055L388.63 567.727ZM377.14 574.36C372.66 571.773 365.65 570.587 362.646 572.321C359.589 574.086 361.697 578.102 366.177 580.688L377.14 574.36ZM365.598 581.023C361.065 578.406 354.108 577.25 351.104 578.985C348.047 580.749 350.155 584.766 354.635 587.352L365.598 581.023ZM354.108 587.656C349.628 585.07 342.618 583.883 339.614 585.618C336.557 587.382 338.665 591.399 343.145 593.985L354.108 587.656ZM342.565 594.32C338.033 591.703 331.076 590.547 328.071 592.281C325.015 594.046 327.123 598.062 331.603 600.648L342.565 594.32ZM331.076 600.953C326.543 598.336 319.586 597.18 316.582 598.914C313.525 600.679 315.633 604.695 320.113 607.281L331.076 600.953ZM319.533 607.616C315.053 605.03 308.096 603.813 305.039 605.578C301.982 607.342 304.091 611.359 308.571 613.945L319.533 607.616ZM308.043 614.249C303.511 611.632 296.554 610.476 293.55 612.211C290.545 613.945 292.601 617.992 297.081 620.578L308.043 614.249ZM296.554 620.882C292.021 618.266 285.064 617.109 282.06 618.844C279.003 620.608 281.111 624.625 285.591 627.211L296.554 620.882ZM285.011 627.546C280.479 624.929 273.522 623.773 270.517 625.507C267.46 627.272 269.569 631.288 274.049 633.874L285.011 627.546ZM273.522 634.179C268.989 631.562 262.032 630.406 259.028 632.14C255.971 633.905 258.079 637.921 262.559 640.507L273.522 634.179ZM261.979 640.842C257.446 638.225 250.489 637.069 247.485 638.804C244.428 640.568 246.536 644.585 251.016 647.171L261.979 640.842ZM430.214 561.063C431.848 557.503 430.162 553.426 425.998 552.787C421.834 552.148 416.88 555.191 415.193 558.72L430.214 561.063ZM415.141 558.751C413.507 555.191 408.447 552.148 404.336 552.818C400.225 553.487 398.486 557.534 400.12 561.094L415.141 558.751ZM583.376 655.873C589.542 654.93 594.813 652.009 593.654 649.636C592.494 647.262 585.484 646.258 579.318 647.201L583.376 655.873ZM579.37 664.514C585.537 665.457 592.599 664.484 593.706 662.08C594.813 659.676 589.543 656.816 583.429 655.843L579.37 664.514ZM251.016 664.514C246.484 667.131 244.481 671.147 247.485 672.882C250.542 674.646 257.499 673.429 261.979 670.843L251.016 664.514ZM262.506 671.147C257.973 673.764 255.971 677.78 258.975 679.515C262.032 681.279 268.989 680.062 273.469 677.476L262.506 671.147ZM274.049 677.811C269.516 680.427 267.513 684.444 270.517 686.178C273.574 687.943 280.531 686.726 285.011 684.139L274.049 677.811ZM285.538 684.444C281.006 687.06 279.003 691.077 282.007 692.811C285.064 694.576 292.021 693.359 296.501 690.773L285.538 684.444ZM297.081 691.107C292.548 693.724 290.545 697.74 293.55 699.475C296.606 701.239 303.564 700.022 308.043 697.436L297.081 691.107ZM308.571 697.74C304.038 700.357 302.035 704.373 305.039 706.108C308.043 707.842 315.053 706.655 319.533 704.069L308.571 697.74ZM320.113 704.404C315.58 707.02 313.578 711.037 316.582 712.771C319.639 714.536 326.596 713.319 331.076 710.732L320.113 704.404ZM331.603 711.037C327.07 713.653 325.067 717.67 328.071 719.404C331.076 721.138 338.086 719.952 342.565 717.366L331.603 711.037ZM343.145 717.7C338.613 720.317 336.61 724.333 339.614 726.068C342.671 727.832 349.628 726.615 354.108 724.029L343.145 717.7ZM354.635 724.333C350.102 726.95 348.1 730.966 351.104 732.701C354.108 734.435 361.118 733.248 365.598 730.662L354.635 724.333ZM366.177 730.997C361.645 733.613 359.642 737.63 362.646 739.364C365.65 741.098 372.66 739.912 377.14 737.325L366.177 730.997ZM377.667 737.63C373.135 740.246 371.132 744.263 374.136 745.997C377.14 747.731 384.15 746.545 388.63 743.959L377.667 737.63ZM389.21 744.293C384.677 746.91 382.674 750.926 385.678 752.661C388.735 754.425 395.692 753.208 400.172 750.622L389.21 744.293ZM246.958 655.843C240.792 656.786 235.521 659.707 236.681 662.08C237.787 664.484 244.85 665.457 251.016 664.514L246.958 655.843ZM250.964 647.201C244.797 646.258 237.735 647.232 236.628 649.636C235.521 652.039 240.792 654.899 246.905 655.873L250.964 647.201ZM400.172 750.622C398.538 754.182 400.225 758.259 404.389 758.898C408.552 759.537 413.507 756.494 415.193 752.965L400.172 750.622ZM415.193 752.965C416.827 756.525 421.887 759.567 425.998 758.898C430.162 758.259 431.848 754.182 430.214 750.622L415.193 752.965Z" fill="#000088" />
                      <path id="6 - Fun Border" d="M639.982 682.162C644.462 679.576 651.472 678.389 654.476 680.123C657.48 681.858 655.425 685.904 650.945 688.491L639.982 682.162ZM662.487 695.154C666.967 692.568 669.023 688.521 666.018 686.787C662.961 685.022 656.004 686.239 651.524 688.825L662.487 695.154ZM673.977 701.787C678.51 699.17 680.512 695.154 677.508 693.42C674.504 691.685 667.494 692.872 663.014 695.458L673.977 701.787ZM685.519 708.451C689.999 705.864 692.055 701.818 689.051 700.083C685.994 698.318 679.037 699.536 674.557 702.122L685.519 708.451ZM697.009 715.084C701.542 712.467 703.545 708.451 700.54 706.716C697.536 704.982 690.526 706.169 686.046 708.755L697.009 715.084ZM708.552 721.747C713.032 719.161 715.087 715.114 712.083 713.38C709.079 711.645 702.069 712.832 697.589 715.418L708.552 721.747ZM720.041 728.38C724.574 725.763 726.577 721.747 723.573 720.013C720.516 718.248 713.559 719.465 709.079 722.051L720.041 728.38ZM731.584 735.044C736.064 732.457 738.119 728.411 735.115 726.676C732.111 724.942 725.101 726.129 720.621 728.715L731.584 735.044ZM743.074 741.677C747.606 739.06 749.609 735.044 746.605 733.309C743.548 731.544 736.591 732.762 732.111 735.348L743.074 741.677ZM754.616 748.34C759.149 745.723 761.151 741.707 758.147 739.973C755.143 738.238 748.133 739.425 743.653 742.011L754.616 748.34ZM766.106 754.973C770.638 752.356 772.641 748.34 769.637 746.606C766.633 744.871 759.623 746.058 755.143 748.644L766.106 754.973ZM777.648 761.637C782.181 759.02 784.184 755.004 781.179 753.269C778.175 751.535 771.165 752.722 766.686 755.308L777.648 761.637ZM789.138 768.27C793.618 765.683 795.726 761.667 792.669 759.902C789.612 758.137 782.655 759.355 778.175 761.941L789.138 768.27ZM778.175 791.942C782.708 794.558 789.665 795.715 792.669 793.98C795.673 792.246 793.618 788.199 789.138 785.613L778.175 791.942ZM766.633 798.605C771.165 801.222 778.123 802.378 781.127 800.644C784.131 798.909 782.075 794.863 777.596 792.276L766.633 798.605ZM755.143 805.238C759.676 807.855 766.633 809.011 769.637 807.277C772.694 805.512 770.586 801.496 766.106 798.909L755.143 805.238ZM743.601 811.902C748.133 814.518 755.09 815.675 758.095 813.94C761.151 812.175 759.043 808.159 754.563 805.573L743.601 811.902ZM732.111 818.535C736.644 821.151 743.601 822.308 746.605 820.573C749.609 818.839 747.553 814.792 743.074 812.206L732.111 818.535ZM720.568 825.198C725.101 827.815 732.058 828.971 735.062 827.237C738.067 825.502 736.011 821.456 731.531 818.869L720.568 825.198ZM709.079 831.831C713.611 834.448 720.568 835.604 723.573 833.87C726.629 832.105 724.521 828.089 720.041 825.502L709.079 831.831ZM697.536 838.495C702.069 841.111 709.026 842.268 712.03 840.533C715.034 838.799 712.979 834.752 708.499 832.166L697.536 838.495ZM686.046 845.128C690.579 847.744 697.536 848.901 700.54 847.166C703.597 845.401 701.489 841.385 697.009 838.799L686.046 845.128ZM674.504 851.791C679.037 854.408 685.994 855.564 688.998 853.83C692.002 852.095 689.947 848.049 685.467 845.462L674.504 851.791ZM663.014 858.424C667.547 861.041 674.504 862.197 677.508 860.463C680.512 858.728 678.457 854.682 673.977 852.095L663.014 858.424ZM651.472 865.088C656.004 867.704 662.961 868.861 665.966 867.126C668.97 865.392 666.914 861.345 662.434 858.759L651.472 865.088ZM639.982 871.721C644.515 874.337 651.472 875.494 654.476 873.759C657.533 871.994 655.425 867.978 650.945 865.392L639.982 871.721ZM609.94 682.162C605.46 679.576 598.45 678.389 595.446 680.123C592.389 681.888 594.497 685.904 598.977 688.491L609.94 682.162ZM598.397 688.825C593.918 686.239 586.96 685.022 583.904 686.787C580.847 688.551 582.955 692.568 587.435 695.154L598.397 688.825ZM586.908 695.458C582.428 692.872 575.418 691.685 572.414 693.42C569.357 695.184 571.465 699.201 575.945 701.787L586.908 695.458ZM575.365 702.122C570.833 699.505 563.875 698.349 560.871 700.083C557.814 701.848 559.923 705.864 564.403 708.451L575.365 702.122ZM563.875 708.755C559.396 706.169 552.386 704.982 549.382 706.716C546.325 708.481 548.433 712.497 552.913 715.084L563.875 708.755ZM552.333 715.418C547.8 712.802 540.843 711.645 537.839 713.38C534.782 715.144 536.89 719.161 541.37 721.747L552.333 715.418ZM540.843 722.051C536.311 719.435 529.354 718.278 526.349 720.013C523.292 721.777 525.401 725.794 529.881 728.38L540.843 722.051ZM529.301 728.715C524.821 726.129 517.864 724.911 514.807 726.676C511.75 728.441 513.858 732.457 518.338 735.044L529.301 728.715ZM517.811 735.348C513.278 732.731 506.321 731.575 503.317 733.309C500.313 735.044 502.368 739.09 506.848 741.677L517.811 735.348ZM506.321 741.981C501.789 739.364 494.832 738.208 491.827 739.942C488.77 741.707 490.879 745.723 495.359 748.31L506.321 741.981ZM494.779 748.644C490.246 746.028 483.289 744.871 480.285 746.606C477.228 748.37 479.336 752.387 483.816 754.973L494.779 748.644ZM483.289 755.277C478.756 752.661 471.799 751.504 468.795 753.239C465.738 755.003 467.846 759.02 472.326 761.606L483.289 755.277ZM471.747 761.941C467.214 759.324 460.257 758.168 457.253 759.902C454.196 761.667 456.304 765.683 460.784 768.27L471.747 761.941ZM639.982 682.162C641.616 678.602 639.929 674.525 635.766 673.886C631.602 673.247 626.648 676.289 624.961 679.819L639.982 682.162ZM624.908 679.849C623.274 676.289 618.215 673.247 614.104 673.916C609.993 674.586 608.253 678.632 609.887 682.192L624.908 679.849ZM793.144 776.972C799.31 776.028 804.581 773.107 803.421 770.734C802.262 768.361 795.252 767.357 789.085 768.3L793.144 776.972ZM789.138 785.613C795.305 786.556 802.367 785.582 803.474 783.179C804.581 780.775 799.31 777.915 793.196 776.941L789.138 785.613ZM460.784 785.613C456.251 788.23 454.248 792.246 457.253 793.98C460.31 795.745 467.267 794.528 471.747 791.942L460.784 785.613ZM472.274 792.246C467.741 794.863 465.738 798.879 468.742 800.613C471.799 802.378 478.756 801.161 483.236 798.575L472.274 792.246ZM483.816 798.909C479.283 801.526 477.281 805.542 480.285 807.277C483.342 809.041 490.299 807.824 494.779 805.238L483.816 798.909ZM495.306 805.542C490.773 808.159 488.77 812.175 491.775 813.91C494.832 815.674 501.789 814.457 506.269 811.871L495.306 805.542ZM506.848 812.206C502.316 814.823 500.313 818.839 503.317 820.573C506.374 822.338 513.331 821.121 517.811 818.535L506.848 812.206ZM518.338 818.839C513.805 821.456 511.803 825.472 514.807 827.206C517.811 828.941 524.821 827.754 529.301 825.168L518.338 818.839ZM529.881 825.502C525.348 828.119 523.345 832.135 526.349 833.87C529.406 835.634 536.363 834.417 540.843 831.831L529.881 825.502ZM541.37 832.135C536.838 834.752 534.835 838.768 537.839 840.503C540.843 842.237 547.853 841.05 552.333 838.464L541.37 832.135ZM552.913 838.799C548.38 841.416 546.377 845.432 549.382 847.166C552.438 848.931 559.396 847.714 563.876 845.128L552.913 838.799ZM564.403 845.432C559.87 848.049 557.867 852.065 560.871 853.799C563.876 855.534 570.885 854.347 575.365 851.761L564.403 845.432ZM575.945 852.095C571.412 854.712 569.41 858.728 572.414 860.463C575.418 862.197 582.428 861.01 586.908 858.424L575.945 852.095ZM587.435 858.728C582.902 861.345 580.899 865.361 583.904 867.096C586.908 868.83 593.918 867.643 598.397 865.057L587.435 858.728ZM598.977 865.392C594.445 868.009 592.442 872.025 595.446 873.759C598.503 875.524 605.46 874.307 609.94 871.721L598.977 865.392ZM456.726 776.941C450.559 777.884 445.289 780.805 446.448 783.179C447.555 785.582 454.617 786.556 460.784 785.613L456.726 776.941ZM460.731 768.3C454.565 767.357 447.502 768.33 446.395 770.734C445.289 773.138 450.559 775.998 456.673 776.972L460.731 768.3ZM609.94 871.721C608.306 875.281 609.993 879.358 614.156 879.997C618.32 880.636 623.274 877.593 624.961 874.063L609.94 871.721ZM624.961 874.063C626.595 877.623 631.655 880.666 635.766 879.997C639.929 879.358 641.616 875.281 639.982 871.721L624.961 874.063Z" fill="#009900" />
                      <path id="7 - Fun Border" d="M849.749 803.26C854.228 800.674 861.238 799.487 864.242 801.222C867.247 802.956 865.191 807.003 860.711 809.589L849.749 803.26ZM872.254 816.252C876.734 813.666 878.789 809.619 875.785 807.885C872.728 806.12 865.771 807.337 861.291 809.924L872.254 816.252ZM883.743 822.885C888.276 820.269 890.279 816.252 887.275 814.518C884.271 812.784 877.261 813.97 872.781 816.557L883.743 822.885ZM895.286 829.549C899.766 826.963 901.821 822.916 898.817 821.182C895.76 819.417 888.803 820.634 884.323 823.22L895.286 829.549ZM906.776 836.182C911.308 833.565 913.311 829.549 910.307 827.815C907.303 826.08 900.293 827.267 895.813 829.853L906.776 836.182ZM918.318 842.845C922.798 840.259 924.854 836.212 921.849 834.478C918.845 832.744 911.835 833.93 907.355 836.517L918.318 842.845ZM929.808 849.478C934.341 846.862 936.343 842.845 933.339 841.111C930.282 839.346 923.325 840.563 918.845 843.15L929.808 849.478ZM941.35 856.142C945.83 853.556 947.886 849.509 944.882 847.775C941.877 846.04 934.868 847.227 930.388 849.813L941.35 856.142ZM952.84 862.775C957.373 860.158 959.376 856.142 956.371 854.408C953.314 852.643 946.357 853.86 941.877 856.446L952.84 862.775ZM964.383 869.438C968.915 866.822 970.918 862.805 967.914 861.071C964.91 859.337 957.9 860.523 953.42 863.11L964.383 869.438ZM975.872 876.071C980.405 873.455 982.408 869.438 979.404 867.704C976.399 865.97 969.39 867.156 964.91 869.743L975.872 876.071ZM987.415 882.735C991.947 880.118 993.95 876.102 990.946 874.368C987.942 872.633 980.932 873.82 976.452 876.406L987.415 882.735ZM998.904 889.368C1003.38 886.782 1005.49 882.765 1002.44 881.001C999.379 879.236 992.422 880.453 987.942 883.039L998.904 889.368ZM987.942 913.04C992.474 915.657 999.432 916.813 1002.44 915.079C1005.44 913.344 1003.38 909.297 998.904 906.711L987.942 913.04ZM976.399 919.703C980.932 922.32 987.889 923.476 990.893 921.742C993.897 920.008 991.842 915.961 987.362 913.375L976.399 919.703ZM964.91 926.336C969.442 928.953 976.399 930.109 979.404 928.375C982.46 926.61 980.352 922.594 975.872 920.008L964.91 926.336ZM953.367 933C957.9 935.617 964.857 936.773 967.861 935.039C970.918 933.274 968.81 929.257 964.33 926.671L953.367 933ZM941.877 939.633C946.41 942.25 953.367 943.406 956.371 941.672C959.376 939.937 957.32 935.89 952.84 933.304L941.877 939.633ZM930.335 946.296C934.868 948.913 941.825 950.069 944.829 948.335C947.833 946.601 945.778 942.554 941.298 939.968L930.335 946.296ZM918.845 952.929C923.378 955.546 930.335 956.702 933.339 954.968C936.396 953.203 934.288 949.187 929.808 946.601L918.845 952.929ZM907.303 959.593C911.835 962.21 918.792 963.366 921.797 961.632C924.801 959.897 922.745 955.85 918.265 953.264L907.303 959.593ZM895.813 966.226C900.346 968.843 907.303 969.999 910.307 968.265C913.364 966.5 911.256 962.483 906.776 959.897L895.813 966.226ZM884.27 972.889C888.803 975.506 895.76 976.662 898.764 974.928C901.769 973.194 899.713 969.147 895.233 966.561L884.27 972.889ZM872.781 979.522C877.313 982.139 884.27 983.295 887.275 981.561C890.279 979.827 888.223 975.78 883.743 973.194L872.781 979.522ZM861.238 986.186C865.771 988.803 872.728 989.959 875.732 988.225C878.736 986.49 876.681 982.443 872.201 979.857L861.238 986.186ZM849.748 992.819C854.281 995.436 861.238 996.592 864.242 994.858C867.299 993.093 865.191 989.076 860.711 986.49L849.748 992.819ZM819.707 803.26C815.227 800.674 808.217 799.487 805.213 801.222C802.156 802.986 804.264 807.003 808.744 809.589L819.707 803.26ZM808.164 809.924C803.684 807.337 796.727 806.12 793.67 807.885C790.613 809.65 792.721 813.666 797.201 816.252L808.164 809.924ZM796.674 816.557C792.194 813.97 785.185 812.784 782.18 814.518C779.123 816.283 781.232 820.299 785.712 822.885L796.674 816.557ZM785.132 823.22C780.599 820.603 773.642 819.447 770.638 821.182C767.581 822.946 769.689 826.963 774.169 829.549L785.132 823.22ZM773.642 829.853C769.162 827.267 762.152 826.08 759.148 827.815C756.091 829.579 758.199 833.596 762.679 836.182L773.642 829.853ZM762.1 836.517C757.567 833.9 750.61 832.744 747.606 834.478C744.549 836.243 746.657 840.259 751.137 842.845L762.1 836.517ZM750.61 843.15C746.077 840.533 739.12 839.377 736.116 841.111C733.059 842.876 735.167 846.892 739.647 849.478L750.61 843.15ZM739.067 849.813C734.587 847.227 727.63 846.01 724.573 847.775C721.517 849.539 723.625 853.556 728.105 856.142L739.067 849.813ZM727.578 856.446C723.045 853.829 716.088 852.673 713.084 854.408C710.08 856.142 712.135 860.189 716.615 862.775L727.578 856.446ZM716.088 863.079C711.555 860.463 704.598 859.306 701.594 861.041C698.537 862.805 700.645 866.822 705.125 869.408L716.088 863.079ZM704.545 869.743C700.013 867.126 693.056 865.97 690.051 867.704C686.995 869.469 689.103 873.485 693.583 876.071L704.545 869.743ZM693.056 876.376C688.523 873.759 681.566 872.603 678.562 874.337C675.505 876.102 677.613 880.118 682.093 882.705L693.056 876.376ZM681.513 883.039C676.981 880.422 670.023 879.266 667.019 881.001C663.962 882.765 666.071 886.782 670.551 889.368L681.513 883.039ZM849.749 803.26C851.382 799.7 849.696 795.623 845.532 794.984C841.368 794.345 836.414 797.388 834.728 800.917L849.749 803.26ZM834.675 800.948C833.041 797.388 827.981 794.345 823.87 795.015C819.759 795.684 818.02 799.731 819.654 803.291L834.675 800.948ZM1002.91 898.07C1009.08 897.127 1014.35 894.206 1013.19 891.833C1012.03 889.459 1005.02 888.455 998.852 889.398L1002.91 898.07ZM998.904 906.711C1005.07 907.654 1012.13 906.681 1013.24 904.277C1014.35 901.873 1009.08 899.013 1002.96 898.04L998.904 906.711ZM670.551 906.711C666.018 909.328 664.015 913.344 667.019 915.079C670.076 916.843 677.033 915.626 681.513 913.04L670.551 906.711ZM682.04 913.344C677.508 915.961 675.505 919.977 678.509 921.712C681.566 923.476 688.523 922.259 693.003 919.673L682.04 913.344ZM693.583 920.008C689.05 922.624 687.047 926.641 690.051 928.375C693.108 930.14 700.065 928.923 704.545 926.336L693.583 920.008ZM705.072 926.641C700.54 929.257 698.537 933.274 701.541 935.008C704.598 936.773 711.555 935.556 716.035 932.97L705.072 926.641ZM716.615 933.304C712.082 935.921 710.079 939.937 713.084 941.672C716.141 943.436 723.098 942.219 727.578 939.633L716.615 933.304ZM728.105 939.937C723.572 942.554 721.569 946.57 724.573 948.305C727.578 950.039 734.587 948.852 739.067 946.266L728.105 939.937ZM739.647 946.601C735.114 949.217 733.112 953.234 736.116 954.968C739.173 956.733 746.13 955.516 750.61 952.929L739.647 946.601ZM751.137 953.234C746.604 955.85 744.601 959.867 747.606 961.601C750.61 963.335 757.62 962.149 762.1 959.563L751.137 953.234ZM762.679 959.897C758.147 962.514 756.144 966.53 759.148 968.265C762.205 970.029 769.162 968.812 773.642 966.226L762.679 959.897ZM774.169 966.53C769.636 969.147 767.634 973.163 770.638 974.898C773.642 976.632 780.652 975.445 785.132 972.859L774.169 966.53ZM785.712 973.194C781.179 975.81 779.176 979.827 782.18 981.561C785.185 983.295 792.194 982.109 796.674 979.522L785.712 973.194ZM797.201 979.827C792.669 982.443 790.666 986.46 793.67 988.194C796.674 989.928 803.684 988.742 808.164 986.155L797.201 979.827ZM808.744 986.49C804.211 989.107 802.208 993.123 805.213 994.858C808.269 996.622 815.227 995.405 819.706 992.819L808.744 986.49ZM666.492 898.04C660.326 898.983 655.055 901.904 656.215 904.277C657.321 906.681 664.384 907.654 670.551 906.711L666.492 898.04ZM670.498 889.398C664.331 888.455 657.269 889.429 656.162 891.833C655.055 894.236 660.326 897.096 666.44 898.07L670.498 889.398ZM819.706 992.819C818.073 996.379 819.759 1000.46 823.923 1001.1C828.087 1001.73 833.041 998.691 834.727 995.162L819.706 992.819ZM834.727 995.162C836.361 998.722 841.421 1001.76 845.532 1001.1C849.696 1000.46 851.382 996.379 849.748 992.819L834.727 995.162Z" fill="#FF0000" />
                      <path id="2 - Fun Border" d="M744.865 500.514C749.345 497.928 756.355 496.741 759.359 498.475C762.363 500.21 760.308 504.256 755.828 506.843L744.865 500.514ZM767.37 513.506C771.85 510.92 773.906 506.873 770.902 505.139C767.845 503.374 760.888 504.591 756.408 507.177L767.37 513.506ZM778.86 520.139C783.393 517.522 785.396 513.506 782.391 511.772C779.387 510.037 772.377 511.224 767.897 513.81L778.86 520.139ZM790.403 526.803C794.883 524.216 796.938 520.17 793.934 518.435C790.877 516.67 783.92 517.888 779.44 520.474L790.403 526.803ZM801.892 533.436C806.425 530.819 808.428 526.803 805.424 525.068C802.419 523.334 795.41 524.521 790.93 527.107L801.892 533.436ZM813.435 540.099C817.915 537.513 819.97 533.466 816.966 531.732C813.962 529.997 806.952 531.184 802.472 533.77L813.435 540.099ZM824.925 546.732C829.457 544.115 831.46 540.099 828.456 538.365C825.399 536.6 818.442 537.817 813.962 540.403L824.925 546.732ZM836.467 553.396C840.947 550.809 843.003 546.763 839.998 545.028C836.994 543.294 829.984 544.481 825.504 547.067L836.467 553.396ZM847.957 560.029C852.489 557.412 854.492 553.396 851.488 551.661C848.431 549.897 841.474 551.114 836.994 553.7L847.957 560.029ZM859.499 566.692C864.032 564.075 866.035 560.059 863.031 558.325C860.026 556.59 853.017 557.777 848.537 560.363L859.499 566.692ZM870.989 573.325C875.522 570.708 877.524 566.692 874.52 564.958C871.516 563.223 864.506 564.41 860.026 566.996L870.989 573.325ZM882.531 579.989C887.064 577.372 889.067 573.356 886.063 571.621C883.059 569.887 876.049 571.074 871.569 573.66L882.531 579.989ZM894.021 586.622C898.501 584.035 900.609 580.019 897.553 578.254C894.496 576.49 887.538 577.707 883.059 580.293L894.021 586.622ZM883.059 610.294C887.591 612.91 894.548 614.067 897.552 612.332C900.557 610.598 898.501 606.551 894.021 603.965L883.059 610.294ZM871.516 616.957C876.049 619.574 883.006 620.73 886.01 618.996C889.014 617.261 886.959 613.215 882.479 610.628L871.516 616.957ZM860.026 623.59C864.559 626.207 871.516 627.363 874.52 625.629C877.577 623.864 875.469 619.848 870.989 617.261L860.026 623.59ZM848.484 630.254C853.017 632.87 859.974 634.027 862.978 632.292C866.035 630.527 863.927 626.511 859.447 623.925L848.484 630.254ZM836.994 636.887C841.527 639.503 848.484 640.66 851.488 638.925C854.492 637.191 852.437 633.144 847.957 630.558L836.994 636.887ZM825.452 643.55C829.984 646.167 836.941 647.323 839.946 645.589C842.95 643.854 840.894 639.808 836.414 637.221L825.452 643.55ZM813.962 650.183C818.495 652.8 825.452 653.956 828.456 652.222C831.513 650.457 829.405 646.441 824.925 643.854L813.962 650.183ZM802.419 656.847C806.952 659.463 813.909 660.62 816.913 658.885C819.918 657.151 817.862 653.104 813.382 650.518L802.419 656.847ZM790.93 663.48C795.462 666.096 802.419 667.253 805.424 665.518C808.481 663.753 806.372 659.737 801.892 657.151L790.93 663.48ZM779.387 670.143C783.92 672.76 790.877 673.916 793.881 672.182C796.885 670.447 794.83 666.401 790.35 663.814L779.387 670.143ZM767.897 676.776C772.43 679.393 779.387 680.549 782.391 678.815C785.396 677.08 783.34 673.034 778.86 670.447L767.897 676.776ZM756.355 683.44C760.888 686.056 767.845 687.213 770.849 685.478C773.853 683.744 771.798 679.697 767.318 677.111L756.355 683.44ZM744.865 690.073C749.398 692.689 756.355 693.846 759.359 692.111C762.416 690.346 760.308 686.33 755.828 683.744L744.865 690.073ZM714.823 500.514C710.343 497.928 703.333 496.741 700.329 498.475C697.272 500.24 699.381 504.256 703.861 506.843L714.823 500.514ZM703.281 507.177C698.801 504.591 691.844 503.374 688.787 505.139C685.73 506.903 687.838 510.92 692.318 513.506L703.281 507.177ZM691.791 513.81C687.311 511.224 680.301 510.037 677.297 511.772C674.24 513.537 676.348 517.553 680.828 520.139L691.791 513.81ZM680.249 520.474C675.716 517.857 668.759 516.701 665.755 518.435C662.698 520.2 664.806 524.216 669.286 526.803L680.249 520.474ZM668.759 527.107C664.279 524.521 657.269 523.334 654.265 525.068C651.208 526.833 653.316 530.849 657.796 533.436L668.759 527.107ZM657.216 533.77C652.684 531.154 645.727 529.997 642.722 531.732C639.665 533.496 641.774 537.513 646.254 540.099L657.216 533.77ZM645.727 540.403C641.194 537.787 634.237 536.63 631.233 538.365C628.176 540.13 630.284 544.146 634.764 546.732L645.727 540.403ZM634.184 547.067C629.704 544.481 622.747 543.263 619.69 545.028C616.633 546.793 618.741 550.809 623.221 553.396L634.184 547.067ZM622.694 553.7C618.162 551.083 611.205 549.927 608.2 551.661C605.196 553.396 607.252 557.442 611.732 560.029L622.694 553.7ZM611.205 560.333C606.672 557.716 599.715 556.56 596.711 558.294C593.654 560.059 595.762 564.075 600.242 566.662L611.205 560.333ZM599.662 566.996C595.129 564.38 588.172 563.223 585.168 564.958C582.111 566.723 584.22 570.739 588.699 573.325L599.662 566.996ZM588.172 573.629C583.64 571.013 576.683 569.856 573.678 571.591C570.622 573.356 572.73 577.372 577.21 579.958L588.172 573.629ZM576.63 580.293C572.097 577.676 565.14 576.52 562.136 578.254C559.079 580.019 561.187 584.035 565.667 586.622L576.63 580.293ZM744.865 500.514C746.499 496.954 744.813 492.877 740.649 492.238C736.485 491.599 731.531 494.641 729.844 498.171L744.865 500.514ZM729.792 498.201C728.158 494.641 723.098 491.599 718.987 492.268C714.876 492.938 713.137 496.984 714.771 500.544L729.792 498.201ZM898.027 595.324C904.193 594.38 909.464 591.459 908.304 589.086C907.145 586.713 900.135 585.709 893.969 586.652L898.027 595.324ZM894.021 603.965C900.188 604.908 907.25 603.934 908.357 601.531C909.464 599.127 904.193 596.267 898.08 595.293L894.021 603.965ZM565.667 603.965C561.135 606.582 559.132 610.598 562.136 612.332C565.193 614.097 572.15 612.88 576.63 610.294L565.667 603.965ZM577.157 610.598C572.624 613.215 570.622 617.231 573.626 618.965C576.683 620.73 583.64 619.513 588.12 616.927L577.157 610.598ZM588.699 617.261C584.167 619.878 582.164 623.894 585.168 625.629C588.225 627.394 595.182 626.176 599.662 623.59L588.699 617.261ZM600.189 623.894C595.657 626.511 593.654 630.527 596.658 632.262C599.715 634.027 606.672 632.809 611.152 630.223L600.189 623.894ZM611.732 630.558C607.199 633.175 605.196 637.191 608.2 638.925C611.257 640.69 618.214 639.473 622.694 636.887L611.732 630.558ZM623.221 637.191C618.689 639.808 616.686 643.824 619.69 645.558C622.694 647.293 629.704 646.106 634.184 643.52L623.221 637.191ZM634.764 643.854C630.231 646.471 628.228 650.487 631.233 652.222C634.29 653.987 641.247 652.769 645.727 650.183L634.764 643.854ZM646.254 650.487C641.721 653.104 639.718 657.12 642.722 658.855C645.727 660.589 652.736 659.402 657.216 656.816L646.254 650.487ZM657.796 657.151C653.263 659.768 651.261 663.784 654.265 665.518C657.322 667.283 664.279 666.066 668.759 663.48L657.796 657.151ZM669.286 663.784C664.753 666.401 662.75 670.417 665.755 672.151C668.759 673.886 675.769 672.699 680.249 670.113L669.286 663.784ZM680.828 670.447C676.296 673.064 674.293 677.08 677.297 678.815C680.301 680.549 687.311 679.362 691.791 676.776L680.828 670.447ZM692.318 677.08C687.785 679.697 685.783 683.713 688.787 685.448C691.791 687.182 698.801 685.995 703.281 683.409L692.318 677.08ZM703.861 683.744C699.328 686.361 697.325 690.377 700.329 692.111C703.386 693.876 710.343 692.659 714.823 690.073L703.861 683.744ZM561.609 595.293C555.442 596.236 550.172 599.157 551.331 601.531C552.438 603.934 559.501 604.908 565.667 603.965L561.609 595.293ZM565.615 586.652C559.448 585.709 552.385 586.682 551.279 589.086C550.172 591.49 555.442 594.35 561.556 595.324L565.615 586.652ZM714.823 690.073C713.189 693.633 714.876 697.71 719.04 698.349C723.203 698.988 728.158 695.945 729.844 692.416L714.823 690.073ZM729.844 692.416C731.478 695.975 736.538 699.018 740.649 698.349C744.813 697.71 746.499 693.633 744.865 690.073L729.844 692.416Z" fill="#FF0000" />
                      <path id="3 - Fun Border" d="M954.632 621.612C959.112 619.026 966.122 617.839 969.126 619.574C972.131 621.308 970.075 625.355 965.595 627.941L954.632 621.612ZM977.138 634.604C981.617 632.018 983.673 627.971 980.669 626.237C977.612 624.472 970.655 625.689 966.175 628.276L977.138 634.604ZM988.627 641.238C993.16 638.621 995.163 634.604 992.159 632.87C989.154 631.136 982.145 632.322 977.665 634.909L988.627 641.238ZM1000.17 647.901C1004.65 645.315 1006.71 641.268 1003.7 639.534C1000.64 637.769 993.687 638.986 989.207 641.572L1000.17 647.901ZM1011.66 654.534C1016.19 651.917 1018.19 647.901 1015.19 646.167C1012.19 644.432 1005.18 645.619 1000.7 648.205L1011.66 654.534ZM1023.2 661.197C1027.68 658.611 1029.74 654.564 1026.73 652.83C1023.73 651.096 1016.72 652.282 1012.24 654.869L1023.2 661.197ZM1034.69 667.831C1039.22 665.214 1041.23 661.197 1038.22 659.463C1035.17 657.698 1028.21 658.915 1023.73 661.502L1034.69 667.831ZM1046.23 674.494C1050.71 671.908 1052.77 667.861 1049.77 666.127C1046.76 664.392 1039.75 665.579 1035.27 668.165L1046.23 674.494ZM1057.72 681.127C1062.26 678.51 1064.26 674.494 1061.26 672.76C1058.2 670.995 1051.24 672.212 1046.76 674.798L1057.72 681.127ZM1069.27 687.791C1073.8 685.174 1075.8 681.157 1072.8 679.423C1069.79 677.689 1062.78 678.875 1058.3 681.462L1069.27 687.791ZM1080.76 694.424C1085.29 691.807 1087.29 687.79 1084.29 686.056C1081.28 684.322 1074.27 685.508 1069.79 688.095L1080.76 694.424ZM1092.3 701.087C1096.83 698.47 1098.83 694.454 1095.83 692.72C1092.83 690.985 1085.82 692.172 1081.34 694.758L1092.3 701.087ZM1103.79 707.72C1108.27 705.134 1110.38 701.117 1107.32 699.353C1104.26 697.588 1097.31 698.805 1092.83 701.391L1103.79 707.72ZM1092.83 731.392C1097.36 734.009 1104.32 735.165 1107.32 733.431C1110.32 731.696 1108.27 727.65 1103.79 725.063L1092.83 731.392ZM1081.28 738.056C1085.82 740.672 1092.77 741.828 1095.78 740.094C1098.78 738.36 1096.73 734.313 1092.25 731.727L1081.28 738.056ZM1069.79 744.689C1074.33 747.305 1081.28 748.461 1084.29 746.727C1087.34 744.962 1085.24 740.946 1080.76 738.36L1069.79 744.689ZM1058.25 751.352C1062.78 753.969 1069.74 755.125 1072.74 753.391C1075.8 751.626 1073.69 747.61 1069.21 745.023L1058.25 751.352ZM1046.76 757.985C1051.29 760.602 1058.25 761.758 1061.26 760.024C1064.26 758.289 1062.2 754.243 1057.72 751.656L1046.76 757.985ZM1035.22 764.649C1039.75 767.265 1046.71 768.421 1049.71 766.687C1052.72 764.953 1050.66 760.906 1046.18 758.32L1035.22 764.649ZM1023.73 771.282C1028.26 773.898 1035.22 775.054 1038.22 773.32C1041.28 771.555 1039.17 767.539 1034.69 764.953L1023.73 771.282ZM1012.19 777.945C1016.72 780.562 1023.68 781.718 1026.68 779.984C1029.68 778.249 1027.63 774.203 1023.15 771.616L1012.19 777.945ZM1000.7 784.578C1005.23 787.195 1012.19 788.351 1015.19 786.617C1018.25 784.852 1016.14 780.836 1011.66 778.249L1000.7 784.578ZM989.154 791.242C993.687 793.858 1000.64 795.014 1003.65 793.28C1006.65 791.546 1004.6 787.499 1000.12 784.913L989.154 791.242ZM977.665 797.875C982.197 800.491 989.154 801.647 992.159 799.913C995.163 798.179 993.107 794.132 988.627 791.546L977.665 797.875ZM966.122 804.538C970.655 807.155 977.612 808.311 980.616 806.577C983.62 804.842 981.565 800.796 977.085 798.209L966.122 804.538ZM954.632 811.171C959.165 813.788 966.122 814.944 969.126 813.21C972.183 811.445 970.075 807.429 965.595 804.842L954.632 811.171ZM924.59 621.612C920.11 619.026 913.101 617.839 910.096 619.574C907.039 621.338 909.148 625.355 913.628 627.941L924.59 621.612ZM913.048 628.276C908.568 625.689 901.611 624.472 898.554 626.237C895.497 628.002 897.605 632.018 902.085 634.604L913.048 628.276ZM901.558 634.909C897.078 632.322 890.068 631.136 887.064 632.87C884.007 634.635 886.115 638.651 890.595 641.238L901.558 634.909ZM890.016 641.572C885.483 638.956 878.526 637.799 875.522 639.534C872.465 641.298 874.573 645.315 879.053 647.901L890.016 641.572ZM878.526 648.205C874.046 645.619 867.036 644.432 864.032 646.167C860.975 647.931 863.083 651.948 867.563 654.534L878.526 648.205ZM866.983 654.869C862.451 652.252 855.494 651.096 852.489 652.83C849.433 654.595 851.541 658.611 856.021 661.197L866.983 654.869ZM855.494 661.502C850.961 658.885 844.004 657.729 841 659.463C837.943 661.228 840.051 665.244 844.531 667.831L855.494 661.502ZM843.951 668.165C839.471 665.579 832.514 664.362 829.457 666.127C826.4 667.891 828.509 671.908 832.989 674.494L843.951 668.165ZM832.461 674.798C827.929 672.182 820.972 671.025 817.967 672.76C814.963 674.494 817.019 678.541 821.499 681.127L832.461 674.798ZM820.972 681.431C816.439 678.815 809.482 677.658 806.478 679.393C803.421 681.157 805.529 685.174 810.009 687.76L820.972 681.431ZM809.429 688.095C804.897 685.478 797.939 684.322 794.935 686.056C791.878 687.821 793.987 691.837 798.467 694.424L809.429 688.095ZM797.939 694.728C793.407 692.111 786.45 690.955 783.446 692.689C780.389 694.454 782.497 698.47 786.977 701.057L797.939 694.728ZM786.397 701.391C781.864 698.775 774.907 697.618 771.903 699.353C768.846 701.117 770.954 705.134 775.434 707.72L786.397 701.391ZM954.632 621.612C956.266 618.052 954.58 613.975 950.416 613.336C946.252 612.697 941.298 615.74 939.611 619.269L954.632 621.612ZM939.559 619.3C937.925 615.74 932.865 612.697 928.754 613.367C924.643 614.036 922.904 618.083 924.538 621.643L939.559 619.3ZM1107.79 716.422C1113.96 715.479 1119.23 712.558 1118.07 710.185C1116.91 707.811 1109.9 706.807 1103.74 707.75L1107.79 716.422ZM1103.79 725.063C1109.95 726.007 1117.02 725.033 1118.12 722.629C1119.23 720.225 1113.96 717.365 1107.85 716.392L1103.79 725.063ZM775.434 725.063C770.902 727.68 768.899 731.696 771.903 733.431C774.96 735.195 781.917 733.978 786.397 731.392L775.434 725.063ZM786.924 731.696C782.391 734.313 780.389 738.329 783.393 740.064C786.45 741.828 793.407 740.611 797.887 738.025L786.924 731.696ZM798.467 738.36C793.934 740.976 791.931 744.993 794.935 746.727C797.992 748.492 804.949 747.275 809.429 744.689L798.467 738.36ZM809.956 744.993C805.424 747.61 803.421 751.626 806.425 753.36C809.482 755.125 816.439 753.908 820.919 751.322L809.956 744.993ZM821.499 751.656C816.966 754.273 814.963 758.289 817.968 760.024C821.024 761.788 827.982 760.571 832.461 757.985L821.499 751.656ZM832.989 758.289C828.456 760.906 826.453 764.922 829.457 766.657C832.461 768.391 839.471 767.204 843.951 764.618L832.989 758.289ZM844.531 764.953C839.998 767.569 837.996 771.586 841 773.32C844.057 775.085 851.014 773.868 855.494 771.282L844.531 764.953ZM856.021 771.586C851.488 774.203 849.485 778.219 852.489 779.953C855.494 781.688 862.504 780.501 866.983 777.915L856.021 771.586ZM867.563 778.249C863.031 780.866 861.028 784.882 864.032 786.617C867.089 788.381 874.046 787.164 878.526 784.578L867.563 778.249ZM879.053 784.882C874.52 787.499 872.518 791.515 875.522 793.25C878.526 794.984 885.536 793.797 890.016 791.211L879.053 784.882ZM890.595 791.546C886.063 794.162 884.06 798.179 887.064 799.913C890.068 801.647 897.078 800.461 901.558 797.875L890.595 791.546ZM902.085 798.179C897.553 800.796 895.55 804.812 898.554 806.546C901.558 808.281 908.568 807.094 913.048 804.508L902.085 798.179ZM913.628 804.842C909.095 807.459 907.092 811.475 910.096 813.21C913.153 814.974 920.11 813.757 924.59 811.171L913.628 804.842ZM771.376 716.392C765.209 717.335 759.939 720.256 761.098 722.629C762.205 725.033 769.268 726.007 775.434 725.063L771.376 716.392ZM775.382 707.75C769.215 706.807 762.153 707.781 761.046 710.185C759.939 712.588 765.21 715.448 771.323 716.422L775.382 707.75ZM924.59 811.171C922.956 814.731 924.643 818.808 928.807 819.447C932.971 820.086 937.925 817.043 939.611 813.514L924.59 811.171ZM939.611 813.514C941.245 817.074 946.305 820.117 950.416 819.447C954.58 818.808 956.266 814.731 954.632 811.171L939.611 813.514Z" fill="#000088" />
                      <path id="4 - Fun Border" d="M1164.4 742.711C1168.88 740.125 1175.89 738.938 1178.89 740.672C1181.9 742.407 1179.84 746.453 1175.36 749.04L1164.4 742.711ZM1186.9 755.703C1191.38 753.117 1193.44 749.07 1190.44 747.336C1187.38 745.571 1180.42 746.788 1175.94 749.374L1186.9 755.703ZM1198.39 762.336C1202.93 759.719 1204.93 755.703 1201.93 753.969C1198.92 752.234 1191.91 753.421 1187.43 756.007L1198.39 762.336ZM1209.94 769C1214.42 766.413 1216.47 762.367 1213.47 760.632C1210.41 758.868 1203.45 760.085 1198.97 762.671L1209.94 769ZM1221.43 775.633C1225.96 773.016 1227.96 769 1224.96 767.265C1221.95 765.531 1214.94 766.718 1210.46 769.304L1221.43 775.633ZM1232.97 782.296C1237.45 779.71 1239.5 775.663 1236.5 773.929C1233.5 772.194 1226.49 773.381 1222.01 775.967L1232.97 782.296ZM1244.46 788.929C1248.99 786.312 1250.99 782.296 1247.99 780.562C1244.93 778.797 1237.98 780.014 1233.5 782.6L1244.46 788.929ZM1256 795.593C1260.48 793.006 1262.54 788.96 1259.53 787.225C1256.53 785.491 1249.52 786.678 1245.04 789.264L1256 795.593ZM1267.49 802.226C1272.02 799.609 1274.03 795.593 1271.02 793.858C1267.97 792.094 1261.01 793.311 1256.53 795.897L1267.49 802.226ZM1279.03 808.889C1283.57 806.272 1285.57 802.256 1282.56 800.522C1279.56 798.787 1272.55 799.974 1268.07 802.56L1279.03 808.889ZM1290.52 815.522C1295.06 812.905 1297.06 808.889 1294.05 807.155C1291.05 805.42 1284.04 806.607 1279.56 809.193L1290.52 815.522ZM1302.07 822.186C1306.6 819.569 1308.6 815.553 1305.6 813.818C1302.59 812.084 1295.58 813.271 1291.1 815.857L1302.07 822.186ZM1313.56 828.819C1318.04 826.232 1320.14 822.216 1317.09 820.451C1314.03 818.687 1307.07 819.904 1302.59 822.49L1313.56 828.819ZM1302.59 852.491C1307.13 855.107 1314.08 856.264 1317.09 854.529C1320.09 852.795 1318.04 848.748 1313.56 846.162L1302.59 852.491ZM1291.05 859.154C1295.58 861.771 1302.54 862.927 1305.54 861.193C1308.55 859.458 1306.49 855.412 1302.01 852.825L1291.05 859.154ZM1279.56 865.787C1284.09 868.404 1291.05 869.56 1294.05 867.826C1297.11 866.061 1295 862.045 1290.52 859.458L1279.56 865.787ZM1268.02 872.451C1272.55 875.067 1279.51 876.224 1282.51 874.489C1285.57 872.724 1283.46 868.708 1278.98 866.122L1268.02 872.451ZM1256.53 879.084C1261.06 881.7 1268.02 882.857 1271.02 881.122C1274.03 879.388 1271.97 875.341 1267.49 872.755L1256.53 879.084ZM1244.99 885.747C1249.52 888.364 1256.48 889.52 1259.48 887.786C1262.48 886.051 1260.43 882.005 1255.95 879.418L1244.99 885.747ZM1233.5 892.38C1238.03 894.997 1244.99 896.153 1247.99 894.419C1251.05 892.654 1248.94 888.638 1244.46 886.051L1233.5 892.38ZM1221.95 899.044C1226.49 901.66 1233.44 902.817 1236.45 901.082C1239.45 899.348 1237.4 895.301 1232.92 892.715L1221.95 899.044ZM1210.46 905.677C1215 908.293 1221.95 909.45 1224.96 907.715C1228.01 905.951 1225.91 901.934 1221.43 899.348L1210.46 905.677ZM1198.92 912.34C1203.45 914.957 1210.41 916.113 1213.42 914.379C1216.42 912.644 1214.36 908.598 1209.88 906.011L1198.92 912.34ZM1187.43 918.973C1191.96 921.59 1198.92 922.746 1201.93 921.012C1204.93 919.277 1202.87 915.231 1198.39 912.644L1187.43 918.973ZM1175.89 925.637C1180.42 928.253 1187.38 929.41 1190.38 927.675C1193.39 925.941 1191.33 921.894 1186.85 919.308L1175.89 925.637ZM1164.4 932.27C1168.93 934.886 1175.89 936.043 1178.89 934.308C1181.95 932.544 1179.84 928.527 1175.36 925.941L1164.4 932.27ZM1134.36 742.711C1129.88 740.125 1122.87 738.938 1119.86 740.672C1116.81 742.437 1118.91 746.453 1123.39 749.04L1134.36 742.711ZM1122.81 749.374C1118.33 746.788 1111.38 745.571 1108.32 747.336C1105.26 749.101 1107.37 753.117 1111.85 755.703L1122.81 749.374ZM1111.33 756.007C1106.85 753.421 1099.84 752.234 1096.83 753.969C1093.77 755.734 1095.88 759.75 1100.36 762.336L1111.33 756.007ZM1099.78 762.671C1095.25 760.054 1088.29 758.898 1085.29 760.632C1082.23 762.397 1084.34 766.413 1088.82 769L1099.78 762.671ZM1088.29 769.304C1083.81 766.718 1076.8 765.531 1073.8 767.265C1070.74 769.03 1072.85 773.046 1077.33 775.633L1088.29 769.304ZM1076.75 775.967C1072.22 773.351 1065.26 772.194 1062.26 773.929C1059.2 775.694 1061.31 779.71 1065.79 782.296L1076.75 775.967ZM1065.26 782.6C1060.73 779.984 1053.77 778.827 1050.77 780.562C1047.71 782.327 1049.82 786.343 1054.3 788.929L1065.26 782.6ZM1053.72 789.264C1049.24 786.678 1042.28 785.46 1039.22 787.225C1036.17 788.99 1038.28 793.006 1042.76 795.593L1053.72 789.264ZM1042.23 795.897C1037.7 793.28 1030.74 792.124 1027.73 793.858C1024.73 795.593 1026.79 799.639 1031.27 802.226L1042.23 795.897ZM1030.74 802.53C1026.21 799.913 1019.25 798.757 1016.24 800.491C1013.19 802.256 1015.3 806.272 1019.78 808.859L1030.74 802.53ZM1019.2 809.193C1014.66 806.577 1007.71 805.42 1004.7 807.155C1001.65 808.92 1003.75 812.936 1008.23 815.522L1019.2 809.193ZM1007.71 815.826C1003.17 813.21 996.217 812.053 993.213 813.788C990.156 815.553 992.264 819.569 996.744 822.155L1007.71 815.826ZM996.164 822.49C991.631 819.873 984.674 818.717 981.67 820.451C978.613 822.216 980.721 826.232 985.201 828.819L996.164 822.49ZM1164.4 742.711C1166.03 739.151 1164.35 735.074 1160.18 734.435C1156.02 733.796 1151.06 736.839 1149.38 740.368L1164.4 742.711ZM1149.33 740.398C1147.69 736.839 1142.63 733.796 1138.52 734.465C1134.41 735.135 1132.67 739.181 1134.3 742.741L1149.33 740.398ZM1317.56 837.521C1323.73 836.577 1329 833.657 1327.84 831.283C1326.68 828.91 1319.67 827.906 1313.5 828.849L1317.56 837.521ZM1313.56 846.162C1319.72 847.105 1326.78 846.131 1327.89 843.728C1329 841.324 1323.73 838.464 1317.61 837.49L1313.56 846.162ZM985.201 846.162C980.669 848.779 978.666 852.795 981.67 854.529C984.727 856.294 991.684 855.077 996.164 852.491L985.201 846.162ZM996.691 852.795C992.159 855.412 990.156 859.428 993.16 861.162C996.217 862.927 1003.17 861.71 1007.65 859.124L996.691 852.795ZM1008.23 859.458C1003.7 862.075 1001.7 866.091 1004.7 867.826C1007.76 869.591 1014.72 868.373 1019.2 865.787L1008.23 859.458ZM1019.72 866.091C1015.19 868.708 1013.19 872.724 1016.19 874.459C1019.25 876.224 1026.21 875.006 1030.69 872.42L1019.72 866.091ZM1031.27 872.755C1026.73 875.372 1024.73 879.388 1027.73 881.122C1030.79 882.887 1037.75 881.67 1042.23 879.084L1031.27 872.755ZM1042.76 879.388C1038.22 882.005 1036.22 886.021 1039.22 887.755C1042.23 889.49 1049.24 888.303 1053.72 885.717L1042.76 879.388ZM1054.3 886.051C1049.77 888.668 1047.76 892.684 1050.77 894.419C1053.82 896.184 1060.78 894.966 1065.26 892.38L1054.3 886.051ZM1065.79 892.684C1061.26 895.301 1059.25 899.317 1062.26 901.052C1065.26 902.786 1072.27 901.599 1076.75 899.013L1065.79 892.684ZM1077.33 899.348C1072.8 901.965 1070.79 905.981 1073.8 907.715C1076.86 909.48 1083.81 908.263 1088.29 905.677L1077.33 899.348ZM1088.82 905.981C1084.29 908.598 1082.28 912.614 1085.29 914.348C1088.29 916.083 1095.3 914.896 1099.78 912.31L1088.82 905.981ZM1100.36 912.644C1095.83 915.261 1093.83 919.277 1096.83 921.012C1099.84 922.746 1106.85 921.559 1111.33 918.973L1100.36 912.644ZM1111.85 919.277C1107.32 921.894 1105.32 925.91 1108.32 927.645C1111.33 929.379 1118.34 928.192 1122.81 925.606L1111.85 919.277ZM1123.39 925.941C1118.86 928.558 1116.86 932.574 1119.86 934.308C1122.92 936.073 1129.88 934.856 1134.36 932.27L1123.39 925.941ZM981.143 837.49C974.977 838.434 969.706 841.354 970.866 843.728C971.972 846.131 979.035 847.105 985.201 846.162L981.143 837.49ZM985.149 828.849C978.982 827.906 971.92 828.88 970.813 831.283C969.706 833.687 974.977 836.547 981.09 837.521L985.149 828.849ZM1134.36 932.27C1132.72 935.83 1134.41 939.907 1138.57 940.546C1142.74 941.185 1147.69 938.142 1149.38 934.613L1134.36 932.27ZM1149.38 934.613C1151.01 938.172 1156.07 941.215 1160.18 940.546C1164.35 939.907 1166.03 935.83 1164.4 932.27L1149.38 934.613Z" fill="#009900" />
                    </g>
                  </g>
                  <g id="7">
                    <path id="7_2" d="M842.74 948L838.608 950.386L853.365 958.905L852.996 959.118C835.951 958.479 828.757 960.545 820.05 965.572L824.625 968.213C837.206 960.95 848.016 961.057 858.641 961.184L862.109 959.182L842.74 948Z" fill="#FF0000" />
                    <path id="7 (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M842.74 946.175L865.271 959.182L859.548 962.486L858.594 962.475C853.25 962.411 848.197 962.363 842.944 963.174C837.755 963.975 832.245 965.639 826.206 969.126L824.625 970.039L816.888 965.572L818.469 964.659C822.931 962.083 827.176 960.165 832.625 959.009C836.954 958.09 841.909 957.68 848.144 957.717L835.445 950.386L842.74 946.175ZM853.365 958.905L852.996 959.118C852.118 959.085 851.266 959.06 850.438 959.041C836.201 958.722 829.245 960.54 821.653 964.672C821.123 964.961 820.589 965.261 820.05 965.572L824.625 968.213C837.206 960.95 848.016 961.057 858.641 961.184L862.109 959.182L842.74 948L838.608 950.386L853.365 958.905Z" fill="white" />
                  </g>
                  <g id="6">
                    <path id="6_2" d="M634.294 705.842C627.653 702.222 617.249 703.542 608.284 709.144C600.905 713.744 600.167 718.941 606.661 722.434C612.933 725.799 620.902 725.671 626.546 722.157C631.674 718.941 631.49 714.703 626.325 711.721C622.525 709.527 617.655 709.399 614.482 710.635L614.113 710.422C618.909 707.397 625.919 706.204 630.088 708.398C632.634 709.697 632.966 711.934 630.937 713.957L636.139 716.151C639.976 712.658 639.238 708.526 634.294 705.842ZM610.534 719.687C607.14 717.727 607.03 715.192 610.239 713.34C613.301 711.572 617.618 711.678 621.012 713.638C624.406 715.597 624.591 718.089 621.529 719.857C618.319 721.71 613.929 721.646 610.534 719.687Z" fill="#FF0000" />
                    <path id="6 (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M626.546 722.157C620.901 725.671 612.932 725.799 606.661 722.434C600.167 718.941 600.905 713.744 608.284 709.144C617.249 703.542 627.653 702.222 634.294 705.842C638.707 708.238 639.769 711.788 637.216 715.007C636.909 715.394 636.55 715.776 636.139 716.151L630.937 713.957C631.057 713.837 631.169 713.716 631.273 713.594C632.918 711.671 632.482 709.62 630.088 708.398C626.909 706.726 622.079 707.022 617.838 708.597C617.109 708.868 616.397 709.177 615.714 709.52C615.593 709.581 615.472 709.643 615.353 709.706C614.951 709.918 614.56 710.142 614.182 710.378C614.159 710.392 614.136 710.407 614.113 710.422L614.482 710.635C614.489 710.632 614.495 710.629 614.502 710.627C615.68 710.171 617.092 709.903 618.595 709.858C621.137 709.782 623.941 710.345 626.325 711.721C627.317 712.294 628.126 712.913 628.748 713.563C629.164 713.996 629.496 714.443 629.745 714.899C629.781 714.965 629.815 715.03 629.847 715.096C631.005 717.458 629.937 720.031 626.546 722.157ZM632.472 716.203L636.748 718.007L638.027 716.842C642.39 712.87 641.614 708.045 635.828 704.903C631.913 702.769 626.875 702.114 621.68 702.774C616.559 703.424 611.336 705.335 606.642 708.267C602.709 710.719 600.382 713.432 600.04 716.109C599.693 718.824 601.412 721.375 605.136 723.378L605.138 723.38C608.636 725.256 612.744 726.226 616.895 726.166C621.051 726.105 625.005 725.015 628.186 723.035L628.191 723.031C631.105 721.204 632.592 719.028 632.531 716.83C632.526 716.621 632.506 716.411 632.472 716.203ZM629.84 712.137C630.341 710.972 629.774 709.961 628.607 709.365L628.594 709.359L628.582 709.352C627.18 708.615 625.21 708.379 622.862 708.708C622.638 708.739 622.411 708.776 622.183 708.817C624.192 709.149 626.168 709.804 627.906 710.808C628.634 711.228 629.279 711.673 629.84 712.137ZM613.954 712.155C612.62 712.305 611.348 712.7 610.239 713.339C607.029 715.192 607.14 717.727 610.534 719.686C613.929 721.646 618.319 721.71 621.529 719.857C624.591 718.089 624.406 715.597 621.012 713.638C619.082 712.523 616.853 712.008 614.726 712.096C614.467 712.107 614.21 712.127 613.954 712.155ZM610.146 716.439C610.179 717.165 610.752 717.987 612.116 718.774C613.479 719.561 614.902 719.892 616.16 719.911C617.403 719.93 618.727 719.649 619.948 718.944C621.071 718.296 621.514 717.576 621.458 716.879C621.401 716.168 620.809 715.346 619.431 714.55C618.053 713.755 616.629 713.413 615.397 713.38C614.19 713.348 612.944 713.604 611.82 714.252C610.6 714.957 610.113 715.721 610.146 716.439Z" fill="white" />
                  </g>
                  <g id="5">
                    <path id="5_2" d="M426.489 707.091L409.112 714.183L413.687 716.824C416.38 716.505 419.442 717.037 421.287 718.102C424.681 720.062 424.939 722.468 421.619 724.385C418.077 726.43 413.576 726.473 410.182 724.513C406.824 722.575 406.824 720.019 409.997 718.017L404.758 715.844C399.778 719.316 400.257 723.768 405.865 727.005C411.842 730.455 420.143 730.434 426.12 726.984C431.875 723.661 432.244 719.444 427.042 716.441C424.054 714.716 419.774 715.056 417.302 715.376L416.933 715.163L425.751 711.436L438.332 718.698L442.464 716.313L426.489 707.091Z" fill="#FF0000" />
                    <path id="5 (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M426.736 705.408L445.625 716.312L438.331 720.524L425.524 713.13L423.54 713.969C425.287 714.176 427.074 714.633 428.622 715.527C431.634 717.266 433.118 719.419 432.922 721.657C432.728 723.879 430.892 726.053 427.7 727.896C424.339 729.837 420.218 730.866 415.997 730.872C411.775 730.879 407.65 729.861 404.283 727.917C397.893 724.228 397.289 719.026 403.035 715.02L404.367 714.092L409.428 716.191L405.654 714.013L426.736 705.408ZM412.818 718.148L411.646 718.888C410.384 719.684 409.86 720.517 409.876 721.273C409.891 722.025 410.442 722.837 411.762 723.6C413.093 724.368 414.501 724.673 415.803 724.659C417.115 724.645 418.597 724.303 420.037 723.472C421.33 722.725 421.781 721.98 421.736 721.31C421.689 720.622 421.105 719.823 419.705 719.014C418.404 718.264 416.11 717.854 414.136 718.088L412.956 718.228L412.818 718.148ZM420.828 715.116C419.5 715.123 418.264 715.251 417.301 715.375L416.932 715.162L425.75 711.435L438.331 718.698L442.463 716.312L426.488 707.09L409.111 714.183L413.686 716.824C414.63 716.712 415.62 716.704 416.586 716.788C416.59 716.788 416.594 716.789 416.598 716.789C418.384 716.945 420.091 717.412 421.286 718.102C424.68 720.061 424.938 722.468 421.618 724.385C418.076 726.429 413.575 726.472 410.181 724.512C407.383 722.897 406.917 720.853 408.675 719.058C409.027 718.699 409.468 718.35 409.996 718.016L404.758 715.844C399.777 719.316 400.257 723.767 405.864 727.004C411.841 730.455 420.142 730.434 426.119 726.983C431.874 723.661 432.243 719.443 427.041 716.44C425.216 715.387 422.91 715.104 420.828 715.116Z" fill="white" />
                  </g>
                  <g id="4">
                    <path id="4_2" d="M1162.3 768.58L1130.68 770.816L1127.62 772.584L1140.76 780.166L1135 783.489L1139.35 786.002L1145.11 782.68L1149.39 785.15L1153.56 782.743L1149.28 780.273L1165.92 770.667L1162.3 768.58ZM1137.73 773.606L1153.89 772.584L1144.93 777.76L1137.73 773.606Z" fill="#FF0000" />
                    <path id="4 (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M1163.11 767.222L1169.08 770.667L1152.44 780.273L1156.72 782.743L1149.39 786.976L1145.11 784.505L1139.35 787.828L1131.84 783.489L1137.59 780.166L1124.46 772.584L1129.65 769.589L1163.11 767.222ZM1130.68 770.816L1162.3 768.58L1165.92 770.667L1149.28 780.273L1153.56 782.743L1149.39 785.15L1145.11 782.68L1139.35 786.002L1135 783.489L1140.76 780.166L1127.62 772.584L1130.68 770.816ZM1137.73 773.606L1144.93 777.76L1153.89 772.584L1137.73 773.606ZM1142.61 774.596L1144.93 775.934L1147.81 774.267L1142.61 774.596Z" fill="white" />
                  </g>
                  <g id="3">
                    <path id="3_2" d="M939.064 771.026L942.68 774.136C946.627 772.24 951.276 772.113 954.301 773.859C957.105 775.478 957.696 777.309 955.777 778.417C953.305 779.844 948.693 779.056 944.229 776.479L940.282 778.758C945.115 781.548 947.07 784.125 944.229 785.765C941.721 787.213 937.736 786.873 934.342 784.913C930.616 782.762 930.985 780.164 934.563 778.098L929.398 775.84C923.643 779.205 923.864 783.848 930.025 787.405C936.15 790.941 943.455 791.409 948.804 788.321C952.383 786.255 951.866 783.401 947.956 780.888L948.325 780.675C952.457 782.634 957.29 782.741 960.278 781.015C964.779 778.417 964.115 774.541 958.618 771.367C952.715 767.959 944.893 767.832 939.064 771.026Z" fill="#FF0000" />
                    <path id="3 (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M936.154 770.84L937.523 770.09C940.824 768.281 944.8 767.36 948.878 767.43C952.948 767.499 956.902 768.551 960.198 770.454C963.225 772.201 965.069 774.228 965.421 776.279C965.778 778.358 964.578 780.357 961.858 781.928C959.418 783.336 956.208 783.766 953.013 783.399C953.223 783.819 953.36 784.244 953.417 784.673C953.639 786.351 952.613 787.946 950.384 789.233C947.275 791.028 943.47 791.843 939.499 791.632C935.588 791.424 931.77 790.238 928.443 788.317C925.025 786.344 923.132 783.994 923.006 781.589C922.88 779.176 924.541 776.841 927.805 774.932L929.183 774.127L937.958 777.962L936.143 779.01C934.651 779.871 933.995 780.744 933.946 781.519C933.899 782.277 934.417 783.131 935.922 784C937.373 784.838 938.801 785.241 939.946 785.34C941.029 785.433 941.928 785.267 942.647 784.852C943.302 784.474 943.555 783.986 943.025 783.125C942.45 782.191 941.023 781.011 938.699 779.67L937.118 778.757L942.049 775.91L936.154 770.84ZM944.636 774.888L945.809 775.565C947.878 776.76 949.834 777.45 951.376 777.71C952.88 777.964 953.71 777.783 954.194 777.504C954.567 777.289 954.751 777.001 954.611 776.566C954.457 776.092 953.9 775.453 952.719 774.771C950.855 773.695 947.799 773.535 944.636 774.888ZM950.303 782.895C949.764 782.224 948.988 781.555 947.989 780.909C947.977 780.902 947.966 780.894 947.954 780.887L948.323 780.674C948.33 780.678 948.338 780.681 948.345 780.684C949.503 781.232 950.716 781.633 951.928 781.89C955.034 782.548 958.131 782.254 960.277 781.015C964.778 778.416 964.114 774.54 958.616 771.367C952.713 767.959 944.892 767.831 939.063 771.026L942.678 774.135C943.276 773.848 943.89 773.602 944.512 773.396C947.997 772.244 951.733 772.376 954.3 773.858C957.104 775.477 957.694 777.309 955.776 778.416C953.304 779.843 948.692 779.055 944.228 776.478L940.28 778.757C945.113 781.547 947.069 784.124 944.228 785.764C941.719 787.213 937.735 786.872 934.34 784.913C931.191 783.095 930.967 780.957 933.133 779.092C933.53 778.75 934.007 778.417 934.562 778.097L929.397 775.839C923.641 779.204 923.863 783.848 930.024 787.404C936.148 790.94 943.453 791.409 948.803 788.32C951.452 786.791 951.857 784.83 950.303 782.895Z" fill="white" />
                  </g>
                  <g id="2">
                    <path id="2_2" d="M832.599 590.717L836.436 593.657C839.977 591.442 844.552 591.229 847.836 593.124C850.64 594.743 850.935 596.702 848.647 598.023C845.216 600.004 841.638 598.79 835.439 598.065C829.868 597.448 821.899 596.127 817.878 598.449L814.594 600.344L834.517 611.846L838.649 609.46L823.965 600.983L824.334 600.77C825.146 600.302 826.253 600.6 837.579 601.729C841.232 602.091 848.057 603.56 853.111 600.643C858.018 597.81 857.539 593.742 851.931 590.504C846.36 587.288 838.612 587.373 832.599 590.717Z" fill="#FF0000" />
                    <path id="2 (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M829.621 590.581L831.047 589.788C834.395 587.926 838.355 586.905 842.388 586.86C846.436 586.816 850.337 587.759 853.512 589.591C856.618 591.385 858.444 593.491 858.695 595.638C858.949 597.806 857.577 599.89 854.693 601.555C851.601 603.34 847.954 603.761 844.753 603.706C842.538 603.668 840.245 603.377 838.622 603.171C838.056 603.099 837.572 603.038 837.201 603.001L837.199 603.001C834.323 602.714 832.138 602.485 830.45 602.307C829.997 602.26 829.579 602.216 829.193 602.176L841.812 609.46L834.517 613.671L811.432 600.344L816.297 597.536C819.013 595.968 822.857 595.743 826.22 595.867C828.845 595.963 831.633 596.297 833.973 596.577C834.644 596.657 835.278 596.733 835.861 596.798L835.872 596.799L835.883 596.8C837.283 596.964 838.56 597.152 839.679 597.317C839.851 597.342 840.02 597.367 840.186 597.391C841.457 597.578 842.462 597.715 843.349 597.777C844.216 597.837 844.853 597.816 845.384 597.727C845.893 597.642 846.44 597.471 847.066 597.11C847.75 596.715 848 596.271 847.924 595.805C847.845 595.312 847.376 594.684 846.255 594.037C845.034 593.332 843.698 593.075 842.413 593.135C841.09 593.197 839.555 593.609 838.079 594.532L836.262 595.668L829.621 590.581ZM823.965 600.983L824.334 600.77C824.696 600.561 825.117 600.505 826.475 600.606C827.41 600.676 828.789 600.821 830.899 601.042C832.601 601.221 834.777 601.449 837.579 601.729C838.108 601.781 838.703 601.857 839.35 601.939C843.17 602.424 848.789 603.138 853.112 600.642C858.018 597.81 857.539 593.742 851.931 590.504C846.36 587.288 838.612 587.373 832.599 590.717L836.436 593.657C836.971 593.322 837.53 593.033 838.104 592.79C841.331 591.425 845.048 591.515 847.836 593.124C850.64 594.743 850.935 596.702 848.647 598.023C845.959 599.575 843.179 599.165 839.12 598.567C837.999 598.402 836.78 598.222 835.439 598.065C834.793 597.994 834.114 597.913 833.413 597.829C828.072 597.19 821.433 596.397 817.878 598.449L814.595 600.344L834.517 611.846L838.649 609.46L823.965 600.983Z" fill="white" />
                  </g>
                  <g id="1">
                    <path id="1_2" d="M546.573 535.435L542.109 532.858C538.604 534.498 534.435 533.667 530.561 531.431L526.06 534.029C529.639 536.095 533.882 536.5 536.944 535.371L537.313 535.584L515.509 548.172L520.01 550.77L546.573 535.435Z" fill="#FF0000" />
                    <path id="1 (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M549.735 535.435L520.01 552.596L512.346 548.172L531.388 537.179C528.962 536.912 526.55 536.138 524.479 534.942L522.898 534.029L530.561 529.605L532.142 530.518C533.926 531.548 535.593 532.141 537.013 532.345C538.315 532.532 539.509 532.413 540.701 531.855L542.266 531.123L549.735 535.435ZM533.454 535.986C534.706 535.965 535.894 535.758 536.944 535.371L537.313 535.584L515.509 548.172L520.01 550.77L546.573 535.435L542.109 532.858C538.604 534.498 534.435 533.667 530.561 531.431L526.06 534.029C526.615 534.35 527.185 534.63 527.765 534.871C529.644 535.651 531.618 536.018 533.454 535.986Z" fill="white" />
                  </g>
                </g>
                <g id="Stars">
                  <g id="Right Star">
                    <path id="Vector_5" d="M974.727 816.929L966.271 831.335L982.03 843.526L955.674 843.331L940.464 855.751L932.639 841.226L907.479 836.709L928.993 827.928L928.661 812.716L949.778 821.814L974.727 816.929Z" fill="#999900" />
                    <path id="Vector_6" d="M970.016 819.53L963.136 831.238L975.944 841.148L954.534 840.991L942.166 851.086L935.808 839.278L915.354 835.608L932.841 828.468L932.569 816.107L949.736 823.502L970.016 819.53Z" fill="#FFF800" />
                    <path id="Vector_7" d="M964.291 823.077L959.308 831.557L968.584 838.731L953.075 838.619L944.119 845.928L939.516 837.379L924.703 834.719L937.365 829.549L937.169 820.596L949.602 825.954L964.291 823.077Z" fill="url(#paint8_radial_5143_13861)" />
                  </g>
                  <g id="Left Star">
                    <path id="Vector_8" d="M555.192 574.732L546.737 589.138L562.496 601.329L536.14 601.134L520.93 613.554L513.105 599.029L487.945 594.512L509.459 585.731L509.127 570.519L530.244 579.617L555.192 574.732Z" fill="#999900" />
                    <path id="Vector_9" d="M550.482 577.333L543.602 589.04L556.41 598.951L535 598.794L522.632 608.889L516.274 597.081L495.82 593.411L513.307 586.27L513.035 573.91L530.201 581.304L550.482 577.333Z" fill="#FFF800" />
                    <path id="Vector_10" d="M544.756 580.88L539.773 589.36L549.049 596.534L533.54 596.421L524.584 603.731L519.982 595.182L505.168 592.522L517.83 587.352L517.634 578.399L530.068 583.757L544.756 580.88Z" fill="url(#paint9_radial_5143_13861)" />
                  </g>
                  <g id="Middle Star">
                    <path id="Vector_11" d="M759.887 698.988L751.971 709.513L769.525 714.892L750.341 717.884L753.998 729.163L737.983 722.37L724.992 731.048L724.208 719.585L704.352 719.132L719.385 711.633L707.618 702.387L727.155 704.499L732.332 693.421L741.651 703.555L759.887 698.988Z" fill="#000088" />
                    <path id="Vector_12" d="M752.307 703.416L746.651 710.938L759.197 714.784L745.485 716.924L748.098 724.98L736.655 720.128L727.37 726.331L726.809 718.136L712.618 717.815L723.364 712.455L714.955 705.846L728.909 707.354L732.615 699.439L739.278 706.681L752.307 703.416Z" fill="#FFFF66" />
                    <path id="Vector_13" d="M749.475 704.958L744.787 711.201L755.189 714.391L743.814 716.164L745.982 722.851L736.489 718.823L728.782 723.971L728.317 717.173L716.54 716.905L725.462 712.458L718.481 706.975L730.064 708.226L733.136 701.659L738.666 707.667L749.475 704.958Z" fill="url(#paint10_radial_5143_13861)" />
                  </g>
                </g>
                <g id="Dashed Borders">
                  <rect id="7 - Dashed Border" y="1.61584" width="203.684" height="203.684" rx="22.6233" transform="matrix(0.866044 0.499967 -0.866044 0.499967 836.127 795.336)" stroke="white" strokeWidth="3.2319" strokeDasharray="8.08 4.04" />
                  <rect id="6 - Dashed Border" y="1.61584" width="203.684" height="203.684" rx="22.6233" transform="matrix(0.866044 0.499967 -0.866044 0.499967 626.36 674.237)" stroke="white" strokeWidth="3.2319" strokeDasharray="8.08 4.04" />
                  <rect id="5 - Dashed Border" y="1.61584" width="203.684" height="203.684" rx="22.6233" transform="matrix(0.866044 0.499967 -0.866044 0.499967 416.593 553.139)" stroke="white" strokeWidth="3.2319" strokeDasharray="8.08 4.04" />
                  <rect id="4 - Dashed Border" y="1.61584" width="203.684" height="203.684" rx="22.6233" transform="matrix(0.866044 0.499967 -0.866044 0.499967 1150.78 734.787)" stroke="white" strokeWidth="3.2319" strokeDasharray="8.08 4.04" />
                  <rect id="3 - Dashed Border" y="1.61584" width="203.684" height="203.684" rx="22.6233" transform="matrix(0.866044 0.499967 -0.866044 0.499967 941.011 613.688)" stroke="white" strokeWidth="3.2319" strokeDasharray="8.08 4.04" />
                  <rect id="2 - Dashed Border" y="1.61584" width="203.684" height="203.684" rx="22.6233" transform="matrix(0.866044 0.499967 -0.866044 0.499967 731.244 492.589)" stroke="white" strokeWidth="3.2319" strokeDasharray="8.08 4.04" />
                  <rect id="1 - Dashed Border" y="1.61584" width="203.684" height="203.684" rx="22.6233" transform="matrix(0.866044 0.499967 -0.866044 0.499967 521.477 371.491)" stroke="white" strokeWidth="3.2319" strokeDasharray="8.08 4.04" />
                </g>
                <g id="Red/Yellow Border">
                  <rect id="Rectangle 54" y="4.84753" width="1021.23" height="536.805" transform="matrix(0.866044 0.499967 -0.866044 0.499967 524.275 324.424)" stroke="#FFFF66" strokeWidth="9.6957" />
                  <rect id="Rectangle 55" y="4.84753" width="1021.23" height="536.805" transform="matrix(0.866044 0.499967 -0.866044 0.499967 524.275 324.424)" stroke="#FF0000" strokeWidth="9.6957" strokeMiterlimit="1.41421" strokeDasharray="9.7 9.7" />
                </g>
              </g>

              {transitionTo != null && (
                <g id="Favorite Water" transform={`translate(${holeOffsets[transitionTo][0] - 631} ${holeOffsets[transitionTo][1] - 674})`}>
                  <mask id="mask2_5143_15939" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="478" y="702" width="255" height="153">
                    <path id="Vector 34" d="M582.472 710.586L569.008 705.731L579.956 702.001L594.546 703.616L644.467 729.517L647.543 739.074L662.977 738.582L686.812 753.963L704.471 771.938L732.234 787.966L724.372 792.505L729.978 798.659L722.393 806.275L710.046 806.28L726.024 821.988L697.677 827.02L683.076 835.449L646.875 837.244L642.376 845.346L622.169 848.593L612.902 854.914L586.821 839.858L576.445 833.868L563.261 829.499L543.914 815.088L544.201 810.066L509.137 798.253L478.289 780.444L492.044 776.389L514.226 763.584L545.387 751.098L583.833 748.979L597.311 741.198L587.776 735.693L582.161 738.935L566.446 738.941L577.393 736.183L586.659 730.834L588.358 716.902L582.472 710.586Z" fill="#C4C4C4" />
                  </mask>
                  <g className={styles.holeCrack} mask="url(#mask2_5143_15939)">
                    <rect id="Background_3" width="206.916" height="206.916" transform="matrix(0.866044 0.499967 -0.866044 0.499967 624.961 673.429)" fill="black" />
                  </g>
                  <g id="Mask Group" filter="url(#filter2_df_5143_15939)">
                    <mask x={467} y={-800} id="mask3_5143_15939" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" width="270" height="1700">
                      <path id="Union" fillRule="evenodd" clipRule="evenodd" d="
                  M 736 787.905
                  L 727.326 792.971
                  L 732.507 798.658
                  L 722.167 809.042
                  L 715.54 809.044
                  L 730.324 823.579
                  L 697.219 829.456
                  L 682.214 838.117
                  L 647.483 839.84
                  L 643.174 847.6
                  L 621.873 851.023
                  L 610.14 859.026
                  L 570.38 836.072
                  L 556.921 831.612
                  L 535.898 815.953
                  L 536.147 811.597
                  L 503.059 800.45
                  L 467 779.633
                  L 486 774.013
                  L 486 -800
                  L 736 -800
                  Z " fill="black" />
                    </mask>
                    <g mask="url(#mask3_5143_15939)">
                      <rect className={styles.holeLaser} x={450} y={-840 + 1800} width={350} height={1700} fill="url(#paint11_linear_5143_15939)" />
                    </g>
                  </g>
                </g>
              )}
            </g>
          </animated.g>
          <g>
            {[
              [1269.42, 569.509],
              [267.4, 381.614],
              [1282.45, 662.526],
              [137.401, 376.963],
              [1078.74, 630.901],
              [360.643, 507.187],
              [1388.55, 652.295],
              [328.152, 428.123],
              [1205.31, 635.552],
              [205.125, 354.639],
              [1142.85, 675.549],
              [1227.5, 714.616],
              [159.66, 478.352],
              [1330.68, 634.621],
              [367.088, 376.963],
              [70.3628, 454.167],
              [1055.35, 698.803],
              [251.678, 474.631],
              [1158.6, 607.646],
              [220.982, 420.681],
              [399.575, 452.307],
            ].map(([x, y], i) => <g key={i} transform={`translate(${x}, ${y}) scale(${i * 0.15 + 3})`}>
              <path className={styles.sparkle} style={{ "--sparkle": i }}
                d="M0,0 Q5,5 0,10 Q5,5 10,10 Q5,5 10,0 Q5,5 0,0" fill="#FFEDF5" />
            </g>)}
          </g>
        </g>
      </svg>

      {isSlidingMenu && <>
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, overflowX: "hidden", pointerEvents: "none" }}>
          <div className={`${styles.drawer} ${menuOpen ? "" : styles.closed}`} style={{ position: "absolute", top: 0, right: 0, display: "flex", alignItems: "flex-start" }}>
            <div className={styles.drawerButton} onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="16" height="16" viewBox="-3 0 16 16" fill="white">
                {menuOpen ? (
                  <path d="M9.43982 8.00047L2.27084 0.280029L0.56543 1.98544L6.07921 8.00047L0.56543 14.0155L2.27084 15.7209L9.43982 8.00047Z" />
                ) : (
                  <path d="M9.43982 1.98544L7.73441 0.280029L0.56543 8.00047L7.73441 15.7209L9.43982 14.0155L3.92603 8.00047L9.43982 1.98544Z" />
                )}
              </svg>
            </div>
            <div className={styles.menudrawer}>
              {menu}
            </div>
          </div>
        </div>
        <div className={styles.drawerButtonAnimation}></div>
      </>}
    </div>
  )
}

const ease = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1
const TransitionGraphics = ({ onDone }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  useEffect(() => {
    // const onScroll = () => {
    //   const el = document.documentElement
    //   const c = el.scrollTop / (el.scrollHeight - el.clientHeight);
    //   if (c > 0.95) {
    //     onDone()
    //   }

    //   setScrollPosition(c)
    // }
    // onScroll()
    let t0 = Date.now()
    let timer = setInterval(() => {
      let t = Date.now()
      const dt = t - t0

      let k = ease(Math.max(0, dt / 4000 / 1.7))
      // k = k ** 1.2
      k *= 1.7

      if (k != scrollPosition) {
        setScrollPosition(k)
      }

      if (k > 1) {
        clearInterval(timer)
        onDone()
      }
    }, 1000 / 60)
    // window.addEventListener('scroll', onScroll)
    return () => {
      clearInterval(timer)
      // window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // const rScale = lerp(1, 3, scrollPosition)
  const rScale = 1

  return (
    <div id="height-ref">
      <svg style={{ position: "fixed", width: "100vw", height: "100vh" }} preserveAspectRatio="xMidYMid slice" width="1472" height="1080" viewBox="0 0 1472 1080" fill="none">
        <defs>
          <linearGradient id="paint0_linear_5251_111" x1="-198.967" y1="540" x2="1985.87" y2="417.418" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E42A2A" />
            <stop offset="0.260417" stopColor="#F3B72F" />
            <stop offset="0.461004" stopColor="#F9EA31" />
            <stop offset="0.739583" stopColor="#7EC219" />
            <stop offset="1" stopColor="#009900" />
          </linearGradient>

          <filter id="filter0_f_5252_158" x="635" y="438" width="204" height="204" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="14" result="effect1_foregroundBlur_5252_158" />
          </filter>
        </defs>
        <rect className={styles.laserCover} width="1472" height="1080" fill="url(#paint0_linear_5251_111)" />

        <mask id="mask0_5252_158" maskUnits="userSpaceOnUse" x="-100" y="0" width="1672" height="1080">
          <ellipse cx="736" cy="540" rx="836" ry="540" fill="#C4C4C4" />
        </mask>

        <mask id="circleMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1472" height="1080">
          <circle className={styles.circleMask} cx="736" cy="540" r="800" fill="#C4C4C4" />
        </mask>

        <g mask="url(#circleMask)">
          <g mask="url(#mask0_5252_158)">
            <g className={styles.transitionStripes}>
              <g transform="translate(0, -108)">
                <RadialStripes />
              </g>
            </g>
          </g>
        </g>
      </svg>

      <div className={styles.ringContainer} style={{ position: "fixed", width: "100vw", height: "100vh" }}>
        <div style={{ willChange: "transform", transform: `translateZ(0) scale(${rScale * 2})`, width: "100vw", height: "100vh" }}>
          {[1, 0.72, 0.49, 0.32, 0.205, 0.115].map((scale, i) => (
            <div key={i} style={{ position: "absolute", "--ringIndex": 5 - i, "--ringDir": i % 2 === 0 ? 1 : -1, "--ringScale": scale * 0.9 }}>
              <svg style={{ width: "100vw", height: "100vh" }} preserveAspectRatio="xMidYMid slice" width="1472" height="1080" viewBox="0 0 1472 1080" fill="none">
                <g className={styles.ring}>
                  <g className={styles.ringPulse}>
                    <g style={{ transformOrigin: "center", transform: "scale(0.5)" }}>
                      <path d="M736 -311.394C265.788 -311.394 -115.394 69.788 -115.394 540C-115.394 1010.21 265.788 1391.39 736 1391.39C1206.21 1391.39 1587.39 1010.21 1587.39 540C1587.39 69.788 1206.21 -311.394 736 -311.394ZM-141 540C-141 55.6463 251.646 -337 736 -337C1220.35 -337 1613 55.6463 1613 540C1613 1024.35 1220.35 1417 736 1417C251.646 1417 -141 1024.35 -141 540Z" fill="#FF8C1A" />
                      <path d="M735.888 -261.267C293.425 -261.267 -65.2621 97.4204 -65.2621 539.884C-65.2621 982.347 293.425 1341.03 735.888 1341.03C1178.35 1341.03 1537.04 982.347 1537.04 539.884C1537.04 97.4204 1178.35 -261.267 735.888 -261.267ZM-103.412 539.884C-103.412 76.3507 272.356 -299.417 735.888 -299.417C1199.42 -299.417 1575.19 76.3507 1575.19 539.884C1575.19 1003.42 1199.42 1379.18 735.888 1379.18C272.356 1379.18 -103.412 1003.42 -103.412 539.884Z" fill="#E492F7" />
                      <path d="M735.988 -219.36C316.598 -219.36 -23.3855 120.623 -23.3855 540.013C-23.3855 959.404 316.598 1299.39 735.988 1299.39C1155.38 1299.39 1495.36 959.404 1495.36 540.013C1495.36 120.623 1155.38 -219.36 735.988 -219.36ZM-56.9932 540.013C-56.9932 102.062 298.037 -252.968 735.988 -252.968C1173.94 -252.968 1528.97 102.062 1528.97 540.013C1528.97 977.965 1173.94 1332.99 735.988 1332.99C298.037 1332.99 -56.9932 977.965 -56.9932 540.013Z" fill="#FF1F1F" />
                      <path d="M736.776 -178.561C339.482 -178.561 17.4124 143.509 17.4124 540.803C17.4124 938.097 339.482 1260.17 736.776 1260.17C1134.07 1260.17 1456.14 938.097 1456.14 540.803C1456.14 143.509 1134.07 -178.561 736.776 -178.561ZM-1.79199 540.803C-1.79199 132.903 328.876 -197.765 736.776 -197.765C1144.68 -197.765 1475.34 132.903 1475.34 540.803C1475.34 948.703 1144.68 1279.37 736.776 1279.37C328.876 1279.37 -1.79199 948.703 -1.79199 540.803Z" fill="#F7F73C" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          ))}
        </div>
        <div style={{ "--scroll": scrollPosition ** 4 }} className={styles.shadowCircle}></div>
        <div style={{ opacity: 1 - (scrollPosition ** 3) }}>
        </div>
      </div>

    </div>
  )
}