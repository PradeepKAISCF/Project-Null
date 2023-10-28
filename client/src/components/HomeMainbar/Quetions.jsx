import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import './HomeMainbar.css'

const Quetions = ({quetion}) => {
  return (
    <div className='display-quetion-container'>
        <div className='display-votes-ans'>
            <p>{quetion.upVote.length - quetion.downVote.length}</p>
            <p>Votes</p>
        </div>
        <div className='display-votes-ans'>
            <p>{quetion.noOfAnswers}</p>
            <p>Answers</p>
        </div>
        <div className='display-quetion-details'>
            <Link to = {`/Question/${quetion._id}`} className='quetion-title-link'>{quetion.questionTitle}</Link>
            <div className='display-tags-time'>
                <div className='display-tags'>
                    {
                        quetion.questionTags.map((tag)=>(
                            <p key={tag}>{tag}</p>
                        ))
                    }
                </div>
                <p className='display-time'>
                    asked {moment(quetion.postedOn).fromNow()} {quetion.userPosted}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Quetions