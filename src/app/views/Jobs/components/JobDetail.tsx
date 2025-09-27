import { formatDate } from "src/utils/formartters.utils";

type PropsJobDetail = {
  user_name: string;
  city_name: string;
  country_name: string;
  offer_title: string;
  offer_text: string;
  creation_date: string;
}

const JobDetail = (props: PropsJobDetail) => {

  const { 
    user_name,
    city_name,
    country_name,
    offer_title,
    creation_date,
    offer_text
  } = props;

  const icon_url = 'https://empworkstore.s3.us-east-2.amazonaws.com/1713824285515-logo-short.jpeg'
  
  return (
    <article className='max-h-[500px] overflow-y-auto hidden p-10 gap-5 w-full md:flex md:flex-col md:w-1/2 bg-white border border-gray-200'>
      <h4 className='text-m font-bold tracking-tight text-gray-900 dark:text-white'>{offer_title}</h4>
      <div className='flex'>
        <img className='w-8 h-8 rounded-full' src={`${icon_url}`} alt='icon_user' />
        <p className='self-center mx-3 text-tiny font-bold tracking-tight text-gray-900 dark:text-white'>{user_name}</p>
        <p className='self-center ml-auto text-tiny'>{formatDate(creation_date)}</p>
      </div>
      <p>{offer_text}</p>
      <p>{`${city_name}, ${country_name}`}</p>
    </article>
  )
}

export default JobDetail;