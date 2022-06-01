import React from 'react';
import CommentCard from './CommentCard';

const CommentDisplay = ({ comment, post, replyComments }) => {
    return (
        <div className="comment_display">
           <CommentCard comment={comment} post={post} 
           commentId={comment._id}
           >  
           <div className='pl-4'>
           {
               replyComments.map((item, index) => (
                   item.reply &&
                   <CommentCard 
                   key={index}
                   post={post}
                   comment={item}
                   commentId={comment._id}
                   />
               ))
           }
           </div>
           </CommentCard>
           
          
        </div>
    )
}

export default CommentDisplay;
