import axios from 'axios'
import { CourseCreateModel, CourseGetModel, CourseListModel } from '../models/course.model'

const apiUrl= `${import.meta.env.VITE_BASE_URL}/courses`

const CourseService = {
  getCourses: async (): Promise<CourseListModel[]> => {
    try {
      const response = await axios.get(`${apiUrl}/`)
      if (response.status >= 200 && response.status < 300 ) {
        return response.data.data
      }
      return []
    } catch (error) {
      throw new Error('Error')
    }
  },

  getCourse: async (id: number): Promise<CourseGetModel> => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Error')
    }
  },

  createCourse: async (course: CourseCreateModel) => {
    try {
      const response = await axios.post(`${apiUrl}/`, course)
      return response
    } catch (error) {
      throw new Error('Error')
    }
  },

};

export default CourseService
