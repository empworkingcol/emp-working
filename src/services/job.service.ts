import axios from 'axios'
import { JobCreateModel, JobGetModel, JobListModel } from '../models/job.model'

const apiUrl= `${import.meta.env.VITE_BASE_URL}/jobs`

const JobService = {
  getJobs: async (): Promise<JobListModel[]> => {
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

  getJob: async (id: number): Promise<JobGetModel> => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Error')
    }
  },

  createJob: async (job: JobCreateModel) => {
    try {
      const response = await axios.post(`${apiUrl}/`, job)
      return response
    } catch (error) {
      throw new Error('Error')
    }
  },

};

export default JobService
