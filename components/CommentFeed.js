import React from 'react'
import CommentItem from './CommentItem'

function CommentFeed({data}) {

  return (
    <div>
      {data?.map((comment)=>{
        return <CommentItem key={comment?.id} data={comment}/>
      })}
    </div>
  )
}

export default CommentFeed