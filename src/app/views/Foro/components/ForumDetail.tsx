import { formatDate } from "src/utils/formartters.utils";
import Answers from "./Answers";

type Answer = {
  response_text: string;
  creation_date: string;
  user: {
    user_name: string;
  }
}

type PropsForumDetail = {
  user_name: string;
  question_text: string;
  question_title: string;
  answers?: Answer[];
  creation_date: string;
}

const ForumDetail = (props: PropsForumDetail) => {

  const { 
    user_name,
    question_text,
    question_title,
    creation_date
  } = props;

  const icon_url = 'https://empworkstore.s3.us-east-2.amazonaws.com/1713824285515-logo-short.jpeg'
  
  return (
    <article className='max-h-[500px] overflow-y-auto hidden p-10 gap-5 w-full md:flex md:flex-col md:w-1/2 bg-white border border-gray-200'>
      <h4 className='text-m font-bold tracking-tight text-gray-900 dark:text-white'>{question_title}</h4>
      <div className='flex'>
        <img className='w-8 h-8 rounded-full' src={`${icon_url}`} alt='icon_user' />
        <p className='self-center mx-3 text-tiny font-bold tracking-tight text-gray-900 dark:text-white'>{user_name}</p>
        <p className='self-center ml-auto text-tiny'>{formatDate(creation_date)}</p>
      </div>
      <p>{question_text}</p>
      {props?.answers?.length !== 0 && 
        <p>Respuestas:</p>
      }
      {props?.answers?.map((answer: Answer) => 
        <Answers 
          response_text={answer.response_text}
          creation_date={answer.creation_date}
          user={answer.user}
        />
      )}
    </article>
  )
}

export default ForumDetail;