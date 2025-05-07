import axios from 'axios'
import { UserCreateModel, LoginModel } from '../models/user.model'

const apiUrl= `${import.meta.env.VITE_BASE_URL}`

const UserService = {
  authUser: async (user: LoginModel) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, user );
      if (response.status) 
        return response
    } catch (error) {
      throw new Error('Error')
    }
  },

  createUser: async (userCreate: UserCreateModel) => {
    try {
      const response = await axios.post(`${apiUrl}/users`, userCreate );
      return response
    } catch (error) {
      throw new Error('Error')
    }
  }
};

export default UserService
