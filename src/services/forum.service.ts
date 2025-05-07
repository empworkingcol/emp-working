import axios from 'axios'
import {
  ForumCreateModel,
  ForumGetModel,
  ForumListModel,
  AnswerForumModel } from '../models/forum.model'

const apiUrl= `${import.meta.env.VITE_BASE_URL}/forum`

const ForumQuestionService = {
  getForumQuestions: async (): Promise<ForumListModel[]> => {
    try {
      const response = await axios.get(`${apiUrl}/questions`)
      if (response.status >= 200 && response.status < 300 ) {
        return response.data.data
      }
      return []
    } catch (error) {
      throw new Error('Error')
    }
  },

  getForumQuestion: async (id: string): Promise<ForumGetModel> => {
    try {
      const response = await axios.get(`${apiUrl}/questions/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Error')
    }
  },

  createForumQuestion: async (forumQuestion: ForumCreateModel) => {
    try {
      const response = await axios.post(`${apiUrl}/questions`, forumQuestion)
      return response
    } catch (error) {
      throw new Error('Error')
    }
  },

  addAnswerForum: async (forumAnswer: AnswerForumModel) => {
    try {
      const response = await axios.post(`${apiUrl}/responses`, forumAnswer)
      return response
    } catch (error) {
      throw new Error('Error')
    }
  },

};

export default ForumQuestionService
