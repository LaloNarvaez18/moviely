import { z } from 'zod';

const name = z.string().max(30);
const lastName = z.string().max(30);
const email = z.email();
const birthdate = z.iso.date('Invalid date format').transform((val) => new Date(val));;
const password = z.string().min(8);
const role = z.enum(["admin", "customer", "employee"], 'Role must be admin, customer or employee');
const phone = z.string().max(15);

export const SignUpSchema = z.object({
  name: name.nonempty(),
  lastName: lastName.nonempty(),
  email: email.nonempty(),
  birthdate: birthdate,
  password: password.nonempty(),
  role: role.optional(),
  phone: phone.optional()
});

export const SignInSchema = z.object({
  email: email.nonempty(),
  password: password.nonempty()
});
