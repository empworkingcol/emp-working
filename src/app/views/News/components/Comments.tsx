import { formatDate } from 'src/utils/formartters.utils';

type PropsComment = {
  comment_text: string;
  creation_date: string;
  user: {
    user_name: string;
  }
}

const Comments = (props: PropsComment) => {
  const icon_url = 'https://empworkstore.s3.us-east-2.amazonaws.com/1713824285515-logo-short.jpeg'
  const { comment_text, creation_date, user } = props
  return (
    <>
      <h5 className='mx-4 my-2 text-s tracking-tight text-gray-900 dark:text-white'> Comentarios: </h5>
      <div className='mx-4 mb-2'>
        <div className='flex'>
          <img className='w-8 h-8 rounded-full' src={`${icon_url}`} alt='icon_user' />
          <p className='self-center mx-3 text-tiny font-bold tracking-tight text-gray-900 dark:text-white'>{user.user_name}</p>
          <p className='self-center ml-auto text-tiny'>{formatDate(creation_date)}</p>
        </div>
        <p className='text-gray-500 dark:text-gray-400'>
          {comment_text}
        </p>
      </div>
    </>
  )
}

export default Comments;