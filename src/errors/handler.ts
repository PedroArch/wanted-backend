import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';


interface ValidationErrors {
  [key:string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {}


    error.inner.forEach(err => {
      errors[err.path!] = err.errors;
    });

    return res.status(400).json({ message: 'Falha na validação', errors})
  }
  
  console.error(error.message);
  
  return res.status(500).json({message: 'Internal Server Error'})
}

export default errorHandler;