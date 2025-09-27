import { formatDate } from "src/utils/formartters.utils";

type Answer = {
  response_text: string;
  creation_date: string;
  user_name: string;
}

type PropsForumDetail = {
  user_name: string;
  question_id: string;
  question_title: string;
  answers?: Answer[];
  creation_date: string;
  handleForumQuestion: (arg0: string) => void;
}

const ForumCard = (props: PropsForumDetail) => {

  const { 
    user_name,
    question_id,
    question_title,
    creation_date,
    handleForumQuestion
  } = props;

  const icon_url = 'https://empworkstore.s3.us-east-2.amazonaws.com/1713824285515-logo-short.jpeg'
  
  return (
    <article onClick={() => handleForumQuestion(question_id)}
      className='cursor-pointer p-4 grid gap-3 w-full  bg-white border border-gray-200'>
      <h4 className='text-m font-bold tracking-tight text-gray-900 dark:text-white'>{question_title}</h4>
      <div className='flex'>
        <img className='w-8 h-8 rounded-full' src={`${icon_url}`} alt='icon_user' />
        <p className='self-center mx-3 text-tiny font-bold tracking-tight text-gray-900 dark:text-white'>{user_name}</p>
        <p className='self-center ml-auto text-tiny'>{formatDate(creation_date)}</p>
      </div>
    </article>
  )
}

export default ForumCard;
