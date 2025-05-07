import Button from "src/components/atoms/Button";
import { formatDate } from "src/utils/formartters.utils";

type PropsCourseCard = {
  course_id: string;
  imagen_url: string,
  course_name: string,
  course_date: string,
  course_description: string,
  category_course: {
    category_name: string
  },
}

const CourseCard = (props: PropsCourseCard) => {

  const { 
    course_id,
    imagen_url,
    course_name,
    course_date,
    course_description,
    category_course } = props;

  const handleEnroll = () => {

  }
  
  return (
    <article className='mb-10 mx-4 max-w-4xl items-center flex justify-between flex-col-reverse sm:mx-8 md:flex-row md:mx-12 lg:mx-16 xl:mx-20  bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='grid gap-3 w-full md:w-1/2 p-6'>
        <div className='justify-self-end px-4 rounded-xl bg-yellow-300'>Categoria: {category_course.category_name}</div>
        <h4 className='text-m font-bold tracking-tight text-gray-900 dark:text-white'>{course_name}</h4>
        <p>{course_description}</p>
        <p>{formatDate(course_date)}</p>
        <Button
          className=''
          type='submit'
          variant='primary'
          onClick={handleEnroll}
        >
          Inscribirse
        </Button>
      </div>
      <figure className='w-full rounded-r-xl bg-slate-500 content-center md:w-1/2'>
        <img className='rounded-r-xl' src={imagen_url} alt='' />
      </figure>
    </article>
  );
};

export default CourseCard;
