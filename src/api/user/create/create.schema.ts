import * as asyncHandler from 'express-async-handler'

import { UserModel } from '../../../models/user.model'

export const userCreateSchema = {
  name: {
    in: 'body',
    isLength: {
      errorMessage: 'name should be at least 3 chars long and max of 100 chars long',
      options: { min: 3, max: 100 },
    },
  },
  email: {
    isEmail: true,
    in: 'body',
    trim: true,
    errorMessage: 'Email already exists',
    custom: {
      options: asyncHandler(async (value) => {
        return await UserModel.emailAvailable(value)
      }),
    },
  },
  password: {
    in: 'body',
    isLength: {
      errorMessage: 'Password should be at least 5 chars long and max of 10 chars long',
      options: { min: 5, max: 10 },
    },
  },
}
