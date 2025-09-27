import axios from 'axios'
import { JobCreateModel, JobGetModel } from '../models/job.model'

const apiUrl= `${import.meta.env.VITE_BASE_URL}/jobs`

const config = (token: string) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

const JobService = {
  getJobs: async (): Promise<JobGetModel[]> => {
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

  createJob: async (job: JobCreateModel, token: string | undefined) => {
    try {
      let response;
      if (token) {
        response = await axios.post(`${apiUrl}/`, job, config(token) );
      }
      return response
    } catch (error) {
      throw new Error('Error')
    }
  },

};

export default JobService
