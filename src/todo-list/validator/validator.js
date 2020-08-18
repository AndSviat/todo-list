import { removeExtraSpaces } from '../helpers/helpers';

export class Validator {
    static validateTitle = text => removeExtraSpaces(text).length >= 6

    static validateTaskDescription = text => removeExtraSpaces(text).length >= 12
}
