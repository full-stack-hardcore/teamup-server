import { BadRequestError } from 'error-middleware/errors'
import * as asyncHandler from 'express-async-handler'

import { UserModel } from '../models/user'

export const userSchema = {
  email: {
    isEmail: true,
    in: 'body',
    trim: true,
    errorMessage: 'Invalid email',
  },
  password: {
    in: 'body',
    isLength: {
      errorMessage: 'Password should be at least 5 chars long and max of 10 chars long',
      options: { min: 5, max: 10 },
    },
  },
}

export const userEditSchema = {
  name: {
    in: 'body',
    isLength: {
      errorMessage: 'name should be at least 3 chars long and max of 100 chars long',
      options: { min: 3, max: 100 },
    },
    optional: true,
  },
  email: {
    isEmail: true,
    in: 'body',
    trim: true,
    errorMessage: 'Invalid email',
    optional: true,
  },
  password: {
    in: 'body',
    isLength: {
      errorMessage: 'Password should be at least 5 chars long and max of 10 chars long',
      options: { min: 5, max: 10 },
    },
    optional: true,
  },
}

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
        const user = await UserModel.getByEmail(value)
        if (user) {
          return false
        }

        return
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
