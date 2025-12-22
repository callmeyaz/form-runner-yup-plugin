import * as Yup from 'yup';
import { YupValidator } from '../src/lib/YupValidator';
import { FormRunner } from 'form-runner';

var user = {
    name: {
        firstname: "John",
        lastname: "Doe"
    },
    address: "123 Main Street"
}

const userSchema: Yup.Schema = Yup.object({
    name: Yup.object({
        firstname: Yup.string().required("First name not provided"),
        lastname: Yup.string().required("Last name is not provided")
    }),
    address: Yup.string().required("Address not provided")
});

// Create instance of FormRunner
var validator = new YupValidator(userSchema);
var runner = new FormRunner<typeof user>(validator, user);

// Track form fields state using form events.
runner.setFieldDirty(true, "name.firstname");
runner.setFieldTouched(true, "name.lastname");

// Validate form when needed (may be on click of a submit button)
runner.validateAsync(user)
    .then((response) => {
        var isValid = response;

        // Validation passed or failed?
        console.log("Form Validation: ", isValid ? "passed" : "failed");

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

