import { useEffect, useState } from "react";

import { CourseListModel } from "src/models/course.model";
import CourseCard from "./components/CourseCard";
import CourseService from "src/services/course.service";


const Courses = () => {

  const[coursesList, coursesNewsList] = useState<CourseListModel[]>()

  useEffect(()=> {
    CourseService.getCourses()
      .then((data) => {
        coursesNewsList(data)
      })
  }, [])


  return (
    <section className='grid place-content-center m-4 sm:m-6 md:m-8 lg:m-10 xl:mx-16'>
      {
        coursesList?.map((courses) => (
          <CourseCard
            course_id = {courses.course_id}
            imagen_url = {courses.img_url}
            course_name = {courses.course_name}
            course_date = {courses.course_date}
            course_description = {courses.course_description}
            category_course = {courses.category_course}
          />
        ))
      }
    </section>
  );
};

export default Courses;
