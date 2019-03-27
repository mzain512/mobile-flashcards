import logger from './logger'
import  persistence from "./persistence";
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  logger,
  persistence,
)