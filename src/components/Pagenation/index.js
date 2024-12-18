import {Component} from 'react'

import './index.css'

class Pagenation extends Component {
  state = {
    pageNo: 1,
  }

  onPrevPage = () => {
    const {apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {pageNo: prevState.pageNo - 1}
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  onNextPage = () => {
    const {totalPages, apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {pageNo: prevState.pageNo + 1}
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    return (
      <>
        <button type="button" className="page-btn" onClick={this.onPrevPage}>
          Prev
        </button>
        <p className="page-no">{pageNo}</p>
        <button type="button" className="page-btn" onClick={this.onNextPage}>
          Next
        </button>
      </>
    )
  }
}

export default Pagenation
