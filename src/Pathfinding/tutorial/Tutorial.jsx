import React, { Component } from 'react'
import './Tutorial.css'
import { Button, Modal } from 'antd'
import tutorialPage1 from './tutorial-page2.jpg'
import tutorialPage2 from './tutorial-page2.jpg'
import tutorialPage3 from './tutorial-page2.jpg'
import tutorialPage4 from './tutorial-page2.jpg'
import tutorialPage5 from './tutorial-page2.jpg'
import store from '../reducer/store.js'
import { SET_VISIBLE_FALSE, SET_VISIBLE_TRUE } from '../constant/constants'

export default class Tutorial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNo: 1,
    }
  }

  handlePrevious() {
    let { pageNo } = this.state
    if (pageNo >= 2) {
      pageNo -= 1
    }
    this.setState({ pageNo: pageNo })
  }

  handleNext() {
    let { pageNo } = this.state
    if (pageNo <= 5) {
      pageNo += 1
    }
    this.setState({ pageNo: pageNo })
  }

  handleClose() {
    setVisibleFalse()
    this.setState({ pageNo: 1 })
  }

  render() {
    const { pageNo } = this.state
    console.log({pageNo});
    if (pageNo === 1) {
      return (
        <>
          <Modal
            title={
              <h1 className='tutorial-title'>
                {'Welcome to Pathfinding Visualizer!'}
              </h1>
            }
            centered='true'
            visible={store.getState().visible}
            width={700}
            maskClosable={false}
            onCancel={() => {
              this.handleClose()
            }}
            footer={[
              <Button
                key='skip'
                className='tutorial-skip-button'
                type='default'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handleClose()
                }}>
                Skip
              </Button>,
              <Button
                key='previous'
                className='tutorial-button'
                type='primary'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handlePrevious()
                }}>
                Previous
              </Button>,
              <Button
                key='next'
                className='tutorial-button'
                type='primary'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handleNext()
                }}>
                Next
              </Button>,
            ]}>
            <div className='tutorial-content'>
              <p className='tutorial-subtitle'>
                This short Toturial will walk you through all of the features of
                this application.
              </p>
              <p className='tutorial-detail'>
                If you want to dive right in, feel free to press the "skip"
                button below. Otherwise, press "Next"!
              </p>
              <div className='logo-container1'>
                <img src={tutorialPage1} alt='' className='page1-logo' />
              </div>
            </div>
          </Modal>
          </>
        
      )
    } else if (pageNo === 2) {
      return (
        <>
          <Modal
            title={
              <h1 className='tutorial-title'>
                {'What is a pathfinding algorithm?'}
              </h1>
            }
            centered='true'
            visible={store.getState().visible}
            width={700}
            maskClosable={false}
            onCancel={() => {
              this.handleClose()
            }}
            footer={[
              <Button
                key='skip'
                className='tutorial-skip-button'
                type='default'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handleClose()
                }}>
                Skip
              </Button>,
              <Button
                key='previous'
                className='tutorial-button'
                type='primary'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handlePrevious()
                }}>
                Previous
              </Button>,
              <Button
                key='next'
                className='tutorial-button'
                type='primary'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handleNext()
                }}>
                Next
              </Button>,
            ]}>
            <div className='tutorial-content'>
              <p className='tutorial-subtitle'>
                A pathfinding algorithm seeks to find the shortest path between
                two points.
              </p>
              <p className='tutorial-detail'>
                The algorithms on this application are adapted for a 2D grid,
                where movements from a node to another have a "cost" of 1.
              </p>
              <div className='logo-container2'>
                <img src={tutorialPage2} alt='' className='page2-logo' />
              </div>
            </div>
          </Modal>
        </>
      )
    } else if (pageNo === 3) {
      return (
        <>
          <Modal
            title={<h1 className='tutorial-title'>{'Adding walls'}</h1>}
            centered='true'
            visible={store.getState().visible}
            width={700}
            maskClosable={false}
            onCancel={() => {
              this.handleClose()
            }}
            footer={[
              <Button
                key='skip'
                className='tutorial-skip-button'
                type='default'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handleClose()
                }}>
                Skip
              </Button>,
              <Button
                key='previous'
                className='tutorial-button'
                type='primary'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handlePrevious()
                }}>
                Previous
              </Button>,
              <Button
                key='next'
                className='tutorial-button'
                type='primary'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handleNext()
                }}>
                Next
              </Button>,
            ]}>
            <div className='tutorial-content'>
              <p className='tutorial-subtitle'>
                Click on the grid to add a wall.
              </p>
              <p className='tutorial-detail'>
                Walls are impenetrable, meaning that a path cannot cross through
                them.
              </p>
              <div className='logo-container3'>
                <img src={tutorialPage3} alt='' className='page2-logo' />
              </div>
            </div>
          </Modal>
        </>
      )
    } else if (pageNo === 4) {
      return (
        <>
          <Modal
            title={<h1 className='tutorial-title'>{'Dragging nodes'}</h1>}
            centered='true'
            visible={store.getState().visible}
            width={700}
            maskClosable={false}
            onCancel={() => {
              this.handleClose()
            }}
            footer={[
              <Button
                key='skip'
                className='tutorial-skip-button'
                type='default'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handleClose()
                }}>
                Skip
              </Button>,
              <Button
                key='previous'
                className='tutorial-button'
                type='primary'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handlePrevious()
                }}>
                Previous
              </Button>,
              <Button
                key='next'
                className='tutorial-button'
                type='primary'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handleNext()
                }}>
                Next
              </Button>,
            ]}>
            <div className='tutorial-content'>
              <p className='tutorial-subtitle'>
                Click and drag the start and stop node to move them.
              </p>
              <p className='tutorial-detail'>
                <br></br>
              </p>
              <div className='logo-container3'>
                <img src={tutorialPage4} alt='' className='page2-logo' />
              </div>
            </div>
          </Modal>
        </>
      )
    } else if (pageNo === 5) {
      return (
        <>
          <Modal
            title={
              <h1 className='tutorial-title'>{'Visualizing and reset'}</h1>
            }
            centered='true'
            visible={store.getState().visible}
            width={700}
            maskClosable={false}
            onCancel={() => {
              this.handleClose()
            }}
            footer={[
              <Button
                key='skip'
                className='tutorial-skip-button'
                type='default'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handleClose()
                }}>
                Skip
              </Button>,
              <Button
                key='previous'
                className='tutorial-button'
                type='primary'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handlePrevious()
                }}>
                Previous
              </Button>,
              <Button
                key='next'
                className='tutorial-button'
                type='primary'
                shape='round'
                size='middle'
                onClick={() => {
                  this.handleNext()
                }}>
                Next
              </Button>,
            ]}>
            <div className='tutorial-content'>
              <p className='tutorial-subtitle'>
                Select the name of the algorithm to visualize it!
              </p>
              <p className='tutorial-detail'>
                You can clear the entire board with the reset button.
              </p>
              <div className='logo-container5'>
                <img src={tutorialPage5} alt='' className='page2-logo' />
              </div>
            </div>
          </Modal>
        </>
      )
    } else if (pageNo === 6) {
      return (
        <Modal
          title={<h1 className='tutorial-title'>{'Enjoy!'}</h1>}
          centered='true'
          visible={store.getState().visible}
          width={700}
          maskClosable={false}
          onCancel={() => {
            this.handleClose()
          }}
          footer={[
            <Button
              key='skip'
              className='tutorial-skip-button'
              type='default'
              shape='round'
              size='middle'
              onClick={() => {
                this.handleClose()
              }}>
              Skip
            </Button>,
            <Button
              key='previous'
              className='tutorial-button'
              type='primary'
              shape='round'
              size='middle'
              onClick={() => {
                this.handlePrevious()
              }}>
              Previous
            </Button>,
            <Button
              key='finish'
              className='tutorial-button'
              type='primary'
              shape='round'
              size='middle'
              onClick={() => {
                this.handleClose()
              }}>
              Finish
            </Button>,
          ]}>
          <div className='tutorial-content'>
            <p className='tutorial-subtitle page6-subtitle'>
              I hope you have just as much fun playing around with this
              visualization tool as I had building it!
            </p>
            <p className='tutorial-detail page6-detail'>
              If you want to access this tutorial again, click on Tutorial icon
              in the top left corner of your screen. If you want to see the
              source code for this application, check out my
              <a href='https://github.com/ashrita-ag'>github</a>.
            </p>
          </div>
        </Modal>
      )
    } else {
      return <></>
    }
  }
}

export const setVisibleTrue = () => {
  const action = {
    type: SET_VISIBLE_TRUE,
  }
  store.dispatch(action)
}

export const setVisibleFalse = () => {
  const action = {
    type: SET_VISIBLE_FALSE,
  }
  store.dispatch(action)
}
