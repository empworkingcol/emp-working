type Video = {
  video_url: string;
  postion: number;
}

type Test = {
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  position: number;
  correct_answer: string;
}

interface GeneralCourseModel {
  course_name: string;
  course_description: string;
  course_type: string;
  course_date: string;
  total_steps: number;
  img_url: string;
}

export interface CourseCreateModel extends GeneralCourseModel {
  category_id: string;
  videos: Video[];
  tests: Test[];
}

export interface CourseGetModel extends GeneralCourseModel {
  CategoryCourse: {
    category_name: string;
  }
  Video: Video[];
  Test: Test[];
}

export interface CourseListModel extends GeneralCourseModel {
  course_id: string;
  CategoryCourse: {
    category_name: string;
  }
}
