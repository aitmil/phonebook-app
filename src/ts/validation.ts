import * as Yup from "yup";

export const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Is too short - should be 3 chars minimum")
    .max(20, "Is too long - should be 20 chars maximum")
    .required("Required"),

  phoneNumber: Yup.string()
    .matches(
      /^(\+)?(\d{1,4})?[-.●]?((\d{1,3})?[-.●]?){1,4}\d{1,4}$/,
      "Invalid phone number"
    )
    .min(3, "Is too short - should be 3 chars minimum")
    .max(20, "Is too long - should be 20 chars maximum")
    .required("Required"),

  email: Yup.string().email("Invalid email"),

  photo: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "File size is too large, must be less than 2MB",
      (value) => {
        if (!value) return true;
        return (value as File).size <= 2 * 1024 * 1024;
      }
    )
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/gif"].includes(
        (value as File).type
      );
    }),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(10, "Email is too short - should be 10 chars minimum")
    .required("No email provided"),
  password: Yup.string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum")
    .max(20, "Password is too long - should not exceed 20 chars")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password can only contain Latin letters and numbers"
    ),
});

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too short - should be 3 chars minimum")
    .max(20, "Name is too long - should be 20 chars minimum")
    .required("No name provided"),
  email: Yup.string()
    .email("Invalid email")
    .min(10, "Email is too short - should be 10 chars minimum")
    .required("No email provided"),
  password: Yup.string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password can contain only Latin letters and numbers"
    ),
});
