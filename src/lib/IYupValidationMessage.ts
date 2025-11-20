import { IValidationMessage } from "form-runner";

export interface IYupValidationMessage 
  extends IValidationMessage, Record<string, unknown> {
}