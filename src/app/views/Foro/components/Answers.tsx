import { formatDate } from "src/utils/formartters.utils";

type PropsAnswer = {
  response_text: string;
  creation_date: string;
  user: {
    user_name: string;
  }
}

const Answers = (props: PropsAnswer) => {
  const icon_url = 'https://empworkstore.s3.us-east-2.amazonaws.com/1713824285515-logo-short.jpeg'
  const { response_text, creation_date, user } = props
  return (
    <div className='mx-4 mb-2'>
      <div className='flex'>
        <img className='w-8 h-8 rounded-full' src={`${icon_url}`} alt='icon_user' />
        <p className='self-center mx-3 text-tiny font-bold tracking-tight text-gray-900 dark:text-white'>{user.user_name}</p>
        <p className='self-center ml-auto text-tiny'>{formatDate(creation_date)}</p>
      </div>
      <p className='text-gray-500 dark:text-gray-400'>
        {response_text}
      </p>
    </div>
  )
}

export default Answers;