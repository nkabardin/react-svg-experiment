import assert from 'power-assert'
import sinon from 'sinon'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import Experiment from '../experiment'

describe('Experiment', () => {
  let component

  function renderComponent() {
    component = TestUtils.renderIntoDocument(
      <Experiment />
    )
  }

  function findSVGContainer() {
    return TestUtils.findRenderedDOMComponentWithTag(component, 'svg')
  }

  beforeEach(() => {
    localStorage.clear()
    renderComponent()
  })

  context('without initial state', () => {
    it('has logo', () => {
      const logo = TestUtils.findRenderedDOMComponentWithClass(component, 'logo')
      assert(React.findDOMNode(logo).textContent === 'React SVG Experiment')
    })

    it('has SVG container', () => {
      assert(React.findDOMNode(findSVGContainer()).tagName === 'svg')
    })

    it('has no points by default', () => {
      const svg = findSVGContainer()
      const circles = TestUtils.scryRenderedDOMComponentsWithTag(svg, 'circle')
      assert(circles.length === 0)
    })

    it('creates first point after click', () => {
      const svg = findSVGContainer()
      TestUtils.Simulate.click(svg, {nativeEvent: {clientX: 200, clientY: 300}})
      const circles = TestUtils.scryRenderedDOMComponentsWithTag(svg, 'circle')
      assert(circles.length === 1)
      const circle = React.findDOMNode(circles[0])
      assert(circle.getAttribute('cx') === '200')
      assert(circle.getAttribute('cy') === '300')
    })

    it('creates two points after two clicks', () => {
      const svg = findSVGContainer()
      TestUtils.Simulate.click(svg, {nativeEvent: {clientX: 200, clientY: 300}})
      TestUtils.Simulate.click(svg, {nativeEvent: {clientX: 400, clientY: 600}})

      const circles = TestUtils.scryRenderedDOMComponentsWithTag(svg, 'circle')
      assert(circles.length === 2)

      const circle0 = React.findDOMNode(circles[0])
      assert(circle0.getAttribute('cx') === '200')
      assert(circle0.getAttribute('cy') === '300')

      const circle1 = React.findDOMNode(circles[1])
      assert(circle1.getAttribute('cx') === '400')
      assert(circle1.getAttribute('cy') === '600')
    })

    it('creates five circles and two figures after three clicks', () => {
      const svg = findSVGContainer()
      TestUtils.Simulate.click(svg, {nativeEvent: {clientX: 200, clientY: 200}})
      TestUtils.Simulate.click(svg, {nativeEvent: {clientX: 200, clientY: 400}})
      TestUtils.Simulate.click(svg, {nativeEvent: {clientX: 400, clientY: 400}})

      const circles = TestUtils.scryRenderedDOMComponentsWithTag(svg, 'circle')
      assert(circles.length === 5)

      const circle0 = React.findDOMNode(circles[0])
      assert(circle0.getAttribute('cx') === '300')
      assert(circle0.getAttribute('cy') === '300')
      assert(parseInt(circle0.getAttribute('r')) === 112)

      const circle1 = React.findDOMNode(circles[1])
      assert(circle1.getAttribute('cx') === '200')
      assert(circle1.getAttribute('cy') === '200')

      const circle2 = React.findDOMNode(circles[2])
      assert(circle2.getAttribute('cx') === '200')
      assert(circle2.getAttribute('cy') === '400')

      const circle3 = React.findDOMNode(circles[3])
      assert(circle3.getAttribute('cx') === '400')
      assert(circle3.getAttribute('cy') === '400')

      const circle4 = React.findDOMNode(circles[4])
      assert(circle4.getAttribute('cx') === '400')
      assert(circle4.getAttribute('cy') === '200')

      const polygon = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(svg, 'polygon'))
      assert(polygon.getAttribute('points') === '200,200,200,400,400,400,400,200')
    })
  })
})
