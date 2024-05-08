import { formatDate } from "src/utils/formartters.utils";

type PropsJobCard = {
  job_offer_id: string;
  user_name: string;
  city_name: string;
  country_name: string;
  offer_title: string;
  offer_text: string;
  creation_date: string;
  handleJob: (arg0: string) => void;
}

const JobCard = (props: PropsJobCard) => {

  const { 
    job_offer_id,
    user_name,
    city_name,
    country_name,
    offer_title,
    offer_text,
    creation_date,
    handleJob
  } = props;

  const icon_url = 'https://empworkstore.s3.us-east-2.amazonaws.com/1713824285515-logo-short.jpeg'
  
  return (
    <article onClick={() => handleJob(job_offer_id)} 
      className='p-4 grid gap-3 w-full  bg-white border border-gray-200'>
      <h4 className='text-m font-bold tracking-tight text-gray-900 dark:text-white'>{offer_title}</h4>
      <div className='flex'>
        <img className='w-8 h-8 rounded-full' src={`${icon_url}`} alt='icon_user' />
        <p className='self-center mx-3 text-tiny font-bold tracking-tight text-gray-900 dark:text-white'>{user_name}</p>
        <p className='self-center ml-auto text-tiny'>{formatDate(creation_date)}</p>
      </div>
      <p className='flex mt-2 md:hidden'>{offer_text}</p>
      <p>{`${city_name}, ${country_name}`}</p>
    </article>
  );
};

export default JobCard;
