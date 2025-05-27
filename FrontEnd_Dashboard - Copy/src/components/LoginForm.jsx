import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

// function LoginForm() {
//   return (
//     <Form>
//       <Form.Group className="mb-3">
//         <Form.Label>Email</Form.Label>
//         <Form.Control type="email" placeholder="Enter email" />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password" />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Login
//       </Button>
//     </Form>
//   );
// }


export default function LoginForm() {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => alert(JSON.stringify(values, null, 2)),
    validate: values => {
      const errors = {};
      if (!values.email) errors.email = 'Required';
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="border p-4 rounded">
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          isInvalid={formik.touched.email && formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" disabled={formik.isSubmitting}>
        Login
      </Button>
    </Form>
  );
}