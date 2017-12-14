import React from 'react'
import { connect } from 'react-redux'
import { find, propEq, prop, propOr, map, path } from 'ramda'
import Header from '../../components/header'
import Footer from '../../components/footer'
import '../../styles/build.css'

class ShowBuild extends React.Component {
  componentDidMount() {}
  render() {
    const buildObj =
      find(propEq('_id', path(['props', 'match', 'params', 'id'], this)))(
        path(['props', 'builds'], this)
      ) || []
    //console.log('buildObj', buildObj)
    const productIdArr = map(prop('_id'), propOr([], 'products', buildObj))
    //console.log('productIdArr', productIdArr)
    const productsArr = map(
      id => find(propEq('_id', id), path(['props', 'products'], this)),
      productIdArr
    )
    console.log('productsArr', productsArr)

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
                  src="../../img/products/product-3-intel.png"
                  data-action="zoom"
                  draggable="false"
                />
                <div className="full-content" style={{ display: 'table' }}>
                  <img
                    className="quarter-content product-thumb no-select fleft"
                    style={{ marginLeft: 0 }}
                    src="../../img/products/gskill-trident-z.png"
                    alt="G.Skill Ripjaws V Series Memory"
                    draggable="false"
                  />
                  <img
                    className="quarter-content product-thumb no-select fleft"
                    src="../../img/products/xfx-gpu.png"
                    alt="XFX XXX OC Video Card"
                    draggable="false"
                  />
                  <img
                    className="quarter-content product-thumb no-select fleft"
                    src="../../img/products/ocz-ssd.png"
                    alt="OCZ Trion Solid State Drive"
                    draggable="false"
                  />
                  <img
                    className="quarter-content product-thumb no-select fleft"
                    src="../../img/products/seagate-hd.png"
                    alt="Seagate Barracuda Hard Drive"
                    draggable="false"
                  />
                </div>
              </div>
              <div id="product-info" className="fleft">
                <p className="product-title">Ultimate Intel Desktop Kit</p>

                <p className="product-price">
                  $<b>1167</b>
                  <span className="decimal">.38</span>
                </p>

                <div className="full-content pli-wrap">
                  <i
                    className="fa fa-caret-right"
                    style={{
                      fontSize: '10px',
                      position: 'absolute',
                      marginTop: '4px'
                    }}
                  />
                  <p className="product-list-item">
                    Intel i7-6700K 4.0GHz Quad-Core Processor
                  </p>
                  <i
                    className="fa fa-caret-right"
                    style={{
                      fontSize: '10px',
                      position: 'absolute',
                      marginTop: '4px'
                    }}
                  />
                  <p className="product-list-item">
                    G.Skill Trident Z 32GB (2 x 16GB) Memory
                  </p>
                  <i
                    className="fa fa-caret-right"
                    style={{
                      fontSize: '10px',
                      position: 'absolute',
                      marginTop: '4px'
                    }}
                  />
                  <p className="product-list-item">
                    XFX Radeon RX 480 8GB Graphics
                  </p>
                  <i
                    className="fa fa-caret-right"
                    style={{
                      fontSize: '10px',
                      position: 'absolute',
                      marginTop: '4px'
                    }}
                  />
                  <p className="product-list-item">
                    OCZ Trion 480GB Solid State Drive
                  </p>
                  <i
                    className="fa fa-caret-right"
                    style={{
                      fontSize: '10px',
                      position: 'absolute',
                      marginTop: '4px'
                    }}
                  />
                  <p className="product-list-item">
                    Seagate Barracuda 2TB Hard Drive
                  </p>
                  <i
                    className="fa fa-caret-right"
                    style={{
                      fontSize: '10px',
                      position: 'absolute',
                      marginTop: '4px'
                    }}
                  />
                  <p className="product-list-item">
                    Phanteks Enthoo Full Tower
                  </p>
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

                <div id="more-info-titles">
                  <h3 id="mit-1" className="ease-in no-select selected">
                    Description
                  </h3>
                </div>
                <p id="mi-1" className="product-text">
                  This budget build really packs a punch - it can handle HD
                  gaming, video editing and much more with ease. The Cooler
                  Master case and Gigabyte motherboard provide plenty of room
                  for expansion. All parts come in original packaging,
                  unassembled.
                </p>
              </div>
            </div>
          </div>

          <div id="specifications">
            <h2 id="spec-head">Specifications</h2>

            <div id="specs-inner" className="inner-content">
              <div className="half-content" style={{ marginLeft: 0 }}>
                <h3 className="specs-title">
                  <img
                    className="specs-icon no-select"
                    src="../../img/cpu_icon_small.png"
                    alt=""
                    draggable="false"
                  />Processor
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">Intel Core i7-6700K</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Speed
                  </span>
                  <span className="half-content">4.0GHz</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Cores
                  </span>
                  <span className="half-content">4</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Socket
                  </span>
                  <span className="half-content">LGA1151</span>
                </p>

                <h3 className="specs-title">
                  <img
                    className="specs-icon no-select"
                    src="../../img/cooler_icon_small.png"
                    alt=""
                    draggable="false"
                  />CPU Cooler
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">
                    Cooler Master Hyper 212 EVO
                  </span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Type
                  </span>
                  <span className="half-content">Sleeve Bearing</span>
                </p>

                <h3 className="specs-title">
                  <img
                    className="specs-icon no-select"
                    src="../../img/motherboard_icon_invert_small.png"
                    alt=""
                    draggable="false"
                  />Motherboard
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">ASRock Z170</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Socket
                  </span>
                  <span className="half-content">LGA1151</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Memory Slots
                  </span>
                  <span className="half-content">4 x 288-pin DIMM</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Memory Type
                  </span>
                  <span className="half-content">
                    DDR4-2133 / 2400 / 2800 / 2933 / 3200
                  </span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Max Memory
                  </span>
                  <span className="half-content">64GB</span>
                </p>

                <h3 className="specs-title">
                  <img
                    id="specs-mem"
                    className="specs-icon no-select"
                    style={{ opacity: 0.6 }}
                    src="../../img/memory_icon_invert_small.png"
                    alt=""
                    draggable="false"
                  />Memory
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">G.Skill Trident Z</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Size
                  </span>
                  <span className="half-content">32GB (2 x 16GB)</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Speed
                  </span>
                  <span className="half-content">DDR4-3200</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Type
                  </span>
                  <span className="half-content">288-pin DIMM</span>
                </p>

                <h3 className="specs-title">
                  <img
                    className="specs-icon no-select"
                    src="../../img/storage_icon_small.png"
                    alt=""
                    draggable="false"
                  />Storage #1
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">OCZ Trion 150 SSD</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Size
                  </span>
                  <span className="half-content">480GB</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Type
                  </span>
                  <span className="half-content">{`2.5" Internal Drive`}</span>
                </p>

                <h3 className="specs-title">
                  <img
                    className="specs-icon no-select"
                    src="../../img/storage_icon_small.png"
                    alt=""
                    draggable="false"
                  />Storage #2
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">Seagate Barracuda</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Size
                  </span>
                  <span className="half-content">2TB</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Speed
                  </span>
                  <span className="half-content">7200RPM</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Type
                  </span>
                  <span className="half-content">{`3.5" Internal Drive`}</span>
                </p>
              </div>
              <div className="half-content">
                <h3 className="specs-title">
                  <img
                    className="specs-icon no-select"
                    src="../../img/gpu_icon_small.png"
                    alt=""
                    draggable="false"
                  />Video Card
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">XFX</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Chipset
                  </span>
                  <span className="half-content">Radeon RX 480</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Size
                  </span>
                  <span className="half-content">8GB</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Crossfire Capable
                  </span>
                  <span className="half-content">Yes</span>
                </p>

                <h3 className="specs-title">
                  <img
                    id="specs-case"
                    className="specs-icon no-select"
                    style={{ opacity: 0.55 }}
                    src="../../img/case_icon_small.png"
                    alt=""
                    draggable="false"
                  />Case
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">Phanteks Enthoo Pro</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Type
                  </span>
                  <span className="half-content">ATX Full Tower</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Dimensions
                  </span>
                  <span className="half-content">{`21.02" x 9.21" x 21.61"`}</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    {`External 5.25" Bays`}
                  </span>
                  <span className="half-content">3</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    {`Internal 2.5" Bays`}
                  </span>
                  <span className="half-content">1</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    {`Internal 3.5" Bays`}
                  </span>
                  <span className="half-content">6</span>
                </p>

                <h3 className="specs-title">
                  <img
                    id="specs-psu"
                    className="specs-icon no-select"
                    src="../../img/power_supply_icon_small.png"
                    alt=""
                    draggable="false"
                  />Power Supply
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">SeaSonic</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Wattage
                  </span>
                  <span className="half-content">520 Watts</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Efficiency
                  </span>
                  <span className="half-content">80+ Bronze Certified</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Type
                  </span>
                  <span className="half-content">Fully-Modular ATX</span>
                </p>

                <h3 className="specs-title">
                  <img
                    className="specs-icon no-select"
                    src="../../img/network_icon_small.png"
                    draggable="false"
                  />Network
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">TP-Link Wifi</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Protocols
                  </span>
                  <span className="half-content">802.11a/b/g/n</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Interface
                  </span>
                  <span className="half-content">PCI-Express x1</span>
                </p>

                <h3 className="specs-title">
                  <img
                    className="specs-icon no-select"
                    style={{ opacity: 0.6 }}
                    src="../../img/optical_icon_small.png"
                    draggable="false"
                  />Optical Drive
                </h3>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Brand Name
                  </span>
                  <span className="half-content">LG DVD/CD Writer</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Type
                  </span>
                  <span className="half-content">{`5.25" External Drive`}</span>
                </p>
                <p className="product-text">
                  <span className="half-content" style={{ marginLeft: 0 }}>
                    Interface
                  </span>
                  <span className="half-content">SATA 3 Gb/s</span>
                </p>
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
                      src="../../img/link.png"
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
                      src="../../img/video.png"
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
                      src="../../img/pdf.png"
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
          <h2>LOADING...</h2>
        </div>
      )
    }
  }
}

const connector = connect(state => state)
export default connector(ShowBuild)
