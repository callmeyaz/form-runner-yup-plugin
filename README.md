# Form Runner - Yup Plugin 1.0
This Plugin provides integration of [Yup](https://github.com/jquense/yup) Validation library with [Form Runner](https://github.com/callmeyaz/form-runner).

When using Form Runner, install this package and use as explained in next section.

# Usage

Consider the HTML below:

In a browser:

```browser
<input type="text" id="firstname" />
<input type="text" id="lastname" />
<textarea id="address"></textarea>
```

The JSON object below represents the form HTML form above:

```javascript

var user = {
  name: {
    firstname: "John",
    lastname: "Doe"
  }
  address: "123 Main Street"
}

```

Below is an example Yup validation Schema for the above sample JSON:

```javascript

  const userSchema: Yup.ObjectSchema<typeof user> = Yup.object({
    name: Yup.object({
      firstname: Yup.string().defined().test(function(val) { return !val ?
        this.createError({ 
          message: { key: this.path, message: "First name not provided" } as 
            Yup.Message<IYupValidationMessage> })
        : true 
      }),
      lastname: Yup.string().defined().test(function(val) { return !val ?
        this.createError({ 
          message: { key: this.path, message: "Last name not provided" } as 
            Yup.Message<IYupValidationMessage> })
        : true 
      })
    }),
    address: Yup.string().defined().test(function(val) { return !val ?
      this.createError({ 
        message: { key: this.path, message: "Address not provided" } as 
            Yup.Message<IYupValidationMessage> })
      : true 
    })
  });

```

Finally, below is how we would use the above setup with Form Runner:


```javascript

// Create instance of FormRunner
var validator = new YupValidator(userSchema);
var runner = new FormRunner<typeof user>(validator, user);

console.log("User: ", JSON.stringify(user))

// Track form fields state using form events.
runner.setFieldDirty(true, "name.firstname");
runner.setFieldTouched(true, "name.lastname");

// Validate form when needed (may be on click of a submit button)
runner.validateAsync(user)
.then((response) => {
  // Validation passed or failed?
    console.log("Form Validation: ", isValid ? "passed": "failed");

  // Log state of the form
  console.log("Dirty: ", JSON.stringify(runner.dirty))
  console.log("Touched: ", JSON.stringify(runner.touched))
  console.log("Errors: ", JSON.stringify(runner.errors))

  console.log("name.firstname: ", JSON.stringify(runner.dirty.name?.firstname));
  console.log("name.firstname: ", JSON.stringify(runner.touched.name?.firstname));
  console.log("name.firstname: ", JSON.stringify(runner.errors.name?.firstname));

  console.log("name.lastname: ", JSON.stringify(runner.dirty.name?.lastname))
  console.log("name.lastname: ", JSON.stringify(runner.touched.name?.lastname))
  console.log("name.lastname: ", JSON.stringify(runner.errors.name?.lastname));

  console.log("name.address: ", JSON.stringify(runner.dirty.address));
  console.log("name.address: ", JSON.stringify(runner.touched.address));
  console.log("name.address: ", JSON.stringify(runner.errors.address));
});

```

# Documentation

Form Runner Yup Plugin is light weight plugin that required the use of following two components:

## IYupValidationMessage
IYupValidationMessage is an interface that extends IValidationMessage and strong typing to the Yup Validation Messages.

| Members  | Type |  Description |
| ------------ | ----- | ------------ |
|  key | string | A unique string to identifiy the element the message is for. |
|  message | string | The error message to be displayed |


## YupValidator
YupValidator is extension of IFormValidator<IValidationMessage> and integrates Yup Validation to Form Runner.

| Members  | Type |  Description |
| ------------ | ----- | ------------ |
|  validate(data: T): Promise<IYupValidationMessage[]> | function | Requires JSON object to validate passed as a paramenter. Returns Promise of type array of IYupValidationMessage objects |

