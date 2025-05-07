import Button from "src/components/atoms/Button";
import VideoStep from "./VideoStep";

const Course = () => {

  return (
    <article className='m-4 sm:m-8 md:m-12 lg:m-16 xl:mx-20'>
      <div className='mb-5 flex justify-between gap-5'>
        <Button className=''> {'<<'} </Button>
        <ul className='flex gap-x-2'>
          <li className='shrink basis-0 flex-1 group'>
            <div className='min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle'>
              <span className='size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white'>
                1
              </span>
              <div className='ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700'></div>
            </div>
          </li>
          <li className='shrink basis-0 flex-1 group'>
            <div className='min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle'>
              <span className='size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white'>
                2
              </span>
              <div className='ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700'></div>
            </div>
          </li>
          <li className='shrink basis-0 flex-1 group'>
            <div className='min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle'>
              <span className='size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white'>
                3
              </span>
              <div className='ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700'></div>
            </div>
          </li>
        </ul>
        <Button className=''> {'>>'} </Button>
      </div>
      <VideoStep video_id='11_cEfiXX8k'/>
    </article>
  );
};

export default Course;
