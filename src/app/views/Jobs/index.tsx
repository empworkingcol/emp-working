import { useEffect, useState } from "react";

import { JobGetModel } from "src/models/job.model";
import JobCard from "./components/JobCard";
import JobService from "src/services/job.service";
import JobDetail from "./components/JobDetail";


const Jobs = () => {

  const[jobsList, setJobsList] = useState<JobGetModel[]>()
  const[jobDetail, setJobDetail] = useState<JobGetModel>()

  useEffect(() => {
    JobService.getJobs()
      .then((data) => {
        setJobsList(data)
        setJobDetail(data[0])
      })
  }, [])

  useEffect(() => {}, [jobDetail])

  const handleJob = (job_id: string) => {
    console.log('%%%%%%%%%%%%%%%%%')
    const newJob = jobsList?.find((job) => job.job_offer_id === job_id)
    setJobDetail(newJob)
  }


  return (
    <section className='relative flex w-max-md m-4 sm:m-6 md:m-8 lg:m-10 xl:mx-16'>
      <div className='grid place-content-center'>
      {
        jobsList?.map((jobs) => (
          <JobCard
            key={`&${jobs.job_offer_id}`}
            job_offer_id={jobs.job_offer_id}
            user_name={jobs.user.user_name}
            city_name={jobs.city.city_name}
            country_name={jobs.city.country.country_name}
            offer_title={jobs.offer_title}
            creation_date={jobs.creation_date}
            handleJob={handleJob}
            offer_text={jobs.offer_text}
          />
        ))
      }
      </div>
      {
        jobDetail?.user &&
        <JobDetail 
          user_name={jobDetail.user.user_name}
          country_name={jobDetail.city.country.country_name}
          city_name={jobDetail.city.city_name}
          offer_title={jobDetail.offer_title}
          creation_date={jobDetail.creation_date}
          offer_text={jobDetail.offer_text}
        />
      }
    </section>
  );
};

export default Jobs;
