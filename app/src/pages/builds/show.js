import React from 'react'
import { connect } from 'react-redux'
import {
  find,
  propEq,
  prop,
  propOr,
  map,
  path,
  pathOr,
  compose,
  filter,
  contains,
  slice
} from 'ramda'
import Header from '../../components/header'
import Footer from '../../components/footer'
import '../../styles/build.css'
import LinkIcon from '../../images/link.png'
import PDFIcon from '../../images/pdf.png'
import VideoIcon from '../../images/video.png'
import processorIcon from '../../images/cpu_icon_small.png'
import coolerIcon from '../../images/cooler_icon_small.png'
import motherboardIcon from '../../images/motherboard_icon_invert_small.png'
import memoryIcon from '../../images/memory_icon_invert_small.png'
import storageIcon from '../../images/storage_icon_small.png'
import videoCardIcon from '../../images/gpu_icon_small.png'
import caseIcon from '../../images/case_icon_small.png'
import powerSupplyIcon from '../../images/power_supply_icon_small.png'
import networkIcon from '../../images/network_icon_small.png'
import opticalDriveIcon from '../../images/optical_icon_small.png'
const numeral = require('numeral')

const listBuildProductImg = product => {
  if (
    contains(prop('category', product), [
      'processor',
      'memory',
      'storage',
      'video card'
    ])
  )
    return (
      <img
        className="quarter-content product-thumb no-select fleft"
        src={propOr('', 'image-url', product)}
        alt={propOr('', 'name', product)}
        draggable="false"
      />
    )
}

const listBuildProductShort = product => {
  if (
    contains(prop('category', product), [
      'processor',
      'memory',
      'storage',
      'video card',
      'case'
    ])
  )
    return (
      <div>
        <i
          className="fa fa-caret-right"
          style={{
            fontSize: '10px',
            position: 'absolute',
            marginTop: '4px'
          }}
        />
        <p className="product-list-item">{propOr('', 'name', product)}</p>
      </div>
    )
}

const listBuildProductLong = product => {
  const category = propOr('', 'category', product)
  let iconImg

  switch (category) {
    case 'processor':
      iconImg = processorIcon
      break
    case 'cooler':
      iconImg = coolerIcon
      break
    case 'motherboard':
      iconImg = motherboardIcon
      break
    case 'memory':
      iconImg = memoryIcon
      break
    case 'storage':
      iconImg = storageIcon
      break
    case 'video card':
      iconImg = videoCardIcon
      break
    case 'case':
      iconImg = caseIcon
      break
    case 'power supply':
      iconImg = powerSupplyIcon
      break
    case 'network':
      iconImg = networkIcon
      break
    case 'optical drive':
      iconImg = opticalDriveIcon
      break
    default:
      break
  }

  return (
    <div>
      <h3 className="specs-title">
        <img
          className="specs-icon no-select"
          src={iconImg}
          alt={category}
          draggable="false"
        />
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h3>
      <p className="product-text">
        <span className="half-content" style={{ marginLeft: 0 }}>
          Manufacturer
        </span>
        <span className="half-content">
          {propOr('', 'manufacturer-name', product)}
        </span>
      </p>
      <p className="product-text">
        <span className="half-content" style={{ marginLeft: 0 }}>
          Name
        </span>
        <span className="half-content">{propOr('', 'name', product)}</span>
      </p>
    </div>
  )
}

class ShowBuild extends React.Component {
  componentDidMount() {}
  render() {
    const buildObj =
      find(propEq('_id', path(['props', 'match', 'params', 'id'], this)))(
        path(['props', 'builds'], this)
      ) || []

    const productIdArr = map(prop('_id'), propOr([], 'products', buildObj))

    const productsArr = map(
      id => find(propEq('_id', id), pathOr([], ['props', 'products'], this)),
      productIdArr
    )
    //console.log('productsArr', productsArr)
    const leftProductsArr = slice(
      0,
      Math.ceil(productsArr.length / 2),
      productsArr
    )
    //console.log('leftProductsArr', leftProductsArr)
    const rightProductsArr = slice(
      Math.ceil(productsArr.length / 2),
      Infinity,
      productsArr
    )
    //console.log('rightProductsArr', rightProductsArr)

    let caseImgUrl = ''
    productsArr.forEach(prod => {
      if (propOr('', 'category', prod).toString() === 'case') {
        return (caseImgUrl = propOr('', 'image-url', prod))
      }
    })

    if (
      path(['props', 'match', 'params', 'id'], this) === prop('_id', buildObj)
    ) {
      return (
        <div>
          <Header title={prop('name', buildObj)} />

          <div id="product-display" className="outer-content">
            <div id="product-display-inner" className="inner-content">
              <div id="product-imgs" className="fleft">
                <img
                  id="main-product-img"
                  className="no-select"
                  src={caseImgUrl || ''}
                  data-action="zoom"
                  draggable="false"
                />
                <div className="full-content" style={{ display: 'table' }}>
                  {map(listBuildProductImg, productsArr)}
                </div>
              </div>
              <div id="product-info" className="fleft">
                <p className="product-title">{prop('name', buildObj)}</p>

                <p className="product-price">
                  $<b>{Math.floor(Number(prop('price', buildObj)))}</b>
                  <span className="decimal">
                    {numeral(prop('price', buildObj)).format('.00')}
                  </span>
                </p>

                <div className="full-content pli-wrap">
                  {map(listBuildProductShort, productsArr)}
                </div>

                <div id="add-to-cart">
                  <a
                    id="to-cart-button"
                    className="orange-button fleft ease-in"
                    style={{ cursor: 'pointer' }}
                  >
                    Add to Cart
                  </a>
                </div>
                <div id="in-cart">
                  <a
                    href="/cart/"
                    className="small-grey-button ease-in no-select"
                    style={{ cursor: 'pointer', marginLeft: 0 }}
                  >
                    View Cart
                  </a>
                  <a
                    className="small-grey-button ease-in no-select"
                    style={{ cursor: 'pointer' }}
                  >
                    Remove
                  </a>
                </div>

                <div className="clear" />
              </div>
            </div>
          </div>

          <div id="specifications">
            <h2 id="spec-head">Specifications</h2>

            <div id="specs-inner" className="inner-content">
              <div className="half-content" style={{ marginLeft: 0 }}>
                {map(listBuildProductLong, leftProductsArr)}
              </div>
              <div className="half-content">
                {map(listBuildProductLong, rightProductsArr)}
              </div>
            </div>
          </div>

          <div id="owners-toolkit">
            <h2 id="toolkit-head">{`Owner's Toolkit`}</h2>

            <div className="inner-content">
              <div className="half-content fleft" style={{ marginLeft: 0 }}>
                <div className="toolkit-item">
                  <div className="toolkit-img-wrap fleft">
                    <img
                      className="toolkit-img no-select"
                      src={LinkIcon}
                      alt="link"
                      draggable="false"
                    />
                  </div>
                  <div className="toolkit-info fleft">
                    <a
                      href="https://choosemypc.net/assemblyguide/#"
                      target="_blank"
                    >
                      <h3 className="toolkit-title fleft">Assembly Guide</h3>
                    </a>
                    <a
                      href="https://choosemypc.net/assemblyguide/#"
                      target="_blank"
                      className="toolkit-text fright ease-in"
                    >
                      View at ChooseMyPC.net
                    </a>
                  </div>
                </div>

                <div className="toolkit-item">
                  <div className="toolkit-img-wrap fleft">
                    <img
                      className="toolkit-img no-select"
                      src={VideoIcon}
                      alt="video"
                      draggable="false"
                    />
                  </div>
                  <div className="toolkit-info fleft">
                    <a
                      href="https://www.youtube.com/watch?v=VIF43-0mDk4"
                      target="_blank"
                    >
                      <h3 className="toolkit-title fleft">How to Build a PC</h3>
                    </a>
                    <a
                      href="https://www.youtube.com/watch?v=VIF43-0mDk4"
                      target="_blank"
                      className="toolkit-text fright ease-in"
                    >
                      Watch on Youtube
                    </a>
                  </div>
                </div>
              </div>
              <div className="half-content fleft">
                <div className="toolkit-item">
                  <div className="toolkit-img-wrap fleft">
                    <img
                      className="toolkit-img no-select"
                      src={PDFIcon}
                      alt="pdf file"
                      draggable="false"
                    />
                  </div>
                  <div className="toolkit-info fleft">
                    <a
                      href="../../support/maintenance-guide.pdf"
                      target="_blank"
                    >
                      <h3 className="toolkit-title fleft">Maintenance Guide</h3>
                    </a>
                    <a
                      href="../../support/maintenance-guide.pdf"
                      download="maintenance-guide.pdf"
                      target="_blank"
                      className="toolkit-text fright ease-in"
                    >
                      Download
                    </a>
                    <span className="slash no-select fright">|</span>
                    <a
                      href="../../support/maintenance-guide.pdf"
                      target="_blank"
                      className="toolkit-text fright ease-in"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )
    } else {
      return (
        <div>
          <h2 style={{ marginTop: '38%' }}>LOADING...</h2>
        </div>
      )
    }
  }
}

const connector = connect(state => state)
export default connector(ShowBuild)
