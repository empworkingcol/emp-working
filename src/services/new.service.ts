import axios from 'axios'
import { NewCommentModel, NewCreateModel, NewGetModel } from '../models/new.model'

const apiUrl= `${import.meta.env.VITE_BASE_URL}/news`

const config = (token: string) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  };
};

const NewService = {
  getNews: async (): Promise<NewGetModel[]> => {
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

  getNew: async (id: number): Promise<NewGetModel> => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`)
      return response.data.data
    } catch (error) {
      throw new Error('Error')
    }
  },

  createNew: async (newCreate: NewCreateModel, token: string | undefined) => {
    try {
      let response;
      if (token) {
        response = await axios.post(`${apiUrl}/`, newCreate, config(token) );
      }
      return response
    } catch (error) {
      throw new Error('Error')
    }
  },

  addComment: async (newCreate: NewCommentModel) => {
    try {
      const response = await axios.post(`${apiUrl}/comments`, newCreate );
      return response
    } catch (error) {
      throw new Error('Error')
    }
  }
};

export default NewService
