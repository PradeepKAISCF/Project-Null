import React from 'react'
import Quetions from './Quetions'

const QuetionList = ({questionList}) => {
  return (
    <>
        {questionList.map((quetion) => (
        <Quetions quetion = {quetion} key = {quetion}/>
        ))
        }
    </>
  )
}

export default QuetionList