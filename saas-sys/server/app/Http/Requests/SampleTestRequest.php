<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class SampleTestRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'first_name.required' => 'First Name is required',
            'last_name.required' => 'Last Name is required',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $method = $this->method();

        return [
            'first_name' => 'required',
            'last_name' => 'required',

            ...match ($method) {
                'PUT' => [
                    'address' => 'required',
                    'mobile' => 'numeric',

                ],
                'POST' => [
                    'mobile' => 'required|numeric',
                ],
                default => [],
            }
        ];
    }

}

/**
 * All Validation Rules for reference
 *
 *
 *  accepted: The field must be "yes", "on", or "1".
 *  active_url: The field must be a valid URL.
 *  after:date: The field must be a date after the specified date.
 *  after_or_equal:date: The field must be a date equal to or after the specified date.
 *  alpha: The field must contain only letters (a-z, A-Z).
 *  alpha_dash: The field may contain letters, numbers, dashes, and underscores.
 *  alpha_num: The field may contain only letters and numbers.
 *  array: The field must be an array.
 *  before:date: The field must be a date before the specified date.
 *  before_or_equal:date: The field must be a date equal to or before the specified date.
 *  boolean: The field must be a boolean value (true or false).
 *  confirmed: The field must have a matching field of confirmation.
 *  date: The field must be a valid date.
 *  date_equals:date: The field must be a date equal to the specified date.
 *  date_format:format: The field must match the specified date format.
 *  different:field: The field must have a different value than the specified field.
 *  digits:value: The field must be numeric and have an exact length of the specified value.
 *  digits_between:min,max: The field must be numeric and have a length between the specified minimum and maximum values.
 *  dimensions: The file must be an image and have the specified dimensions.
 *  distinct: The field must not have any duplicate values.
 *  email: The field must be a valid email address.
 *  exists:table,column: The field must exist in the specified database table and column.
 *  file: The field must be a file.
 *  filled: The field must not be empty when it is present.
 *  gt:value: The field must be greater than the specified value.
 *  gte:value: The field must be greater than or equal to the specified value.
 *  image: The field must be an image (jpeg, png, bmp, gif, or svg).
 *  in:foo,bar,...: The field must be one of the specified values.
 *  in_array:anotherfield: The field must exist in anotherfield.
 *  integer: The field must be an integer.
 *  ip: The field must be a valid IP address.
 *  ipv4: The field must be a valid IPv4 address.
 *  ipv6: The field must be a valid IPv6 address.
 *  json: The field must be a valid JSON string.
 *  lt:value: The field must be less than the specified value.
 *  lte:value: The field must be less than or equal to the specified value.
 *  max:value: The field must have a value less than or equal to the specified maximum.
 *  mimes:foo,bar,...: The field must be a file of the specified MIME type(s).
 *  mimetypes:foo,bar,...: The field must be a file of the specified MIME type(s).
 *  min:value: The field must have a value greater than or equal to the specified minimum.
 *  not_in:foo,bar,...: The field must not be one of the specified values.
 *  not_regex:pattern:
*/
