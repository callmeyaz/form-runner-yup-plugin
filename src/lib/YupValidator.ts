import { IFormValidator } from 'form-runner';
import * as Yup from 'yup';
import { IYupValidationMessage } from './IYupValidationMessage';

export class YupValidator<T extends Yup.Maybe<Yup.AnyObject>> 
  implements IFormValidator<IYupValidationMessage> {
  
  constructor(private validationSchema: Yup.Schema<T>) { }

  public validate(data: T): Promise<IYupValidationMessage[]> {
    return this.validationSchema.validate(data, { abortEarly: false })
      .then((_) => [])
      .catch((err) => {
        if (err instanceof Yup.ValidationError) {
          var errors = err.inner;
        
          if (Array.isArray(errors)) {
            return errors.map((item) => {
              return {
                key: item.path,
                message: item.message
              } as IYupValidationMessage;
            });
          }
        }
        throw err;
      });
  }
}