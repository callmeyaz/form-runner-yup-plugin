import { IFormValidator } from 'form-runner';
import * as Yup from 'yup';
import { IYupValidationMessage } from './IYupValidationMessage';

export class YupValidator<T extends Yup.Maybe<Yup.AnyObject>> 
  implements IFormValidator<IYupValidationMessage> {
  
  constructor(private validationSchema: Yup.ObjectSchema<T>) { }

  public validate(data: T): Promise<IYupValidationMessage[]> {
    return this.validationSchema.validate(data, { abortEarly: false })
      .then((_) => [])
      .catch((err) => {
        return err.errors as IYupValidationMessage[];
      });
  }
}