import { formatDate } from "src/utils/formartters.utils"
import Comments from "./Comments";
import Input from "src/components/atoms/Input";
import Button from "src/components/atoms/Button";
import NewService from "src/services/new.service";
import { useEffect, useState } from "react";
import { NewCommentModel } from "src/models/new.model";

type PropComment = {
  comment_text: string;
  creation_date: string;
  user: {
    user_name: string;
  }
}

type PropsCardGeneral = {
  new_id: string;
  imagen_url: string,
  user_name: string,
  icon_url: string,
  new_text: string,
  new_title: string,
  creation_date: string,
  comments: PropComment[],
}

const CardGeneral = (props: PropsCardGeneral) => {

  const { imagen_url, user_name, icon_url, new_text, new_title, creation_date, comments, new_id } = props

  const [ commentControl, setComment ] = useState('');
  const [ error, setError ] = useState(false);
  
  const newComment: NewCommentModel = {
    comment_text: commentControl,
    user_id: '',
    new_id: new_id,
  };

  useEffect(() => {}, [error])

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const handleComment = (e) => {
    e.preventDefault();
    if (commentControl?.length !== 0) {
      setError(false);
      NewService.addComment(newComment)
    } else {
      setError(true);
    }
  }

  return (
    <article className='max-w-lg mb-5 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700'>
      <figure className='h-1/2'> 
        <img className='rounded-t-xl w-full object-contain' src={`${imagen_url}`} alt='' loading='lazy'/>
      </figure>

      <h4 className='mx-4 my-2 text-m font-bold tracking-tight text-gray-900 dark:text-white'>{new_title}</h4>
      <div className='mx-4 flex'>
        <img className='w-8 h-8 rounded-full' src={`${icon_url}`} alt='icon_user' />
        <p className='self-center mx-3 text-tiny font-bold tracking-tight text-gray-900 dark:text-white'>{user_name}</p>
        <p className='self-center ml-auto text-tiny'>{formatDate(creation_date)}</p>
      </div>
      <p className='mx-4 my-2 mb-4 text-normal'>{new_text}</p>
      <hr />
      {
        comments.map((comment) => (
          <Comments
            key={`#`+`${comment.creation_date}`}
            user={comment.user}
            comment_text={comment.comment_text}
            creation_date={comment.creation_date}
          />
        ))
      }
      <hr />
      <form className='m-4 flex justify-between items-baseline' onSubmit={handleComment}>
        <Input
          label='Nuevo comentario'
          type='text'
          name='comment'
          id='comment'
          helpText={'No puede estar vacio'}
          error={error}
          value={commentControl}
          onChange={handleChange}
        />
        <Button
          className='flex-none'
          type='submit'
          variant='primary'
          onClick={handleComment}
        >
          Agregar
        </Button>
      </form>
    </article>
  )
}

export default CardGeneral;
