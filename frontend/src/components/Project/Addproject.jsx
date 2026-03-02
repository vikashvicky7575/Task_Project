import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddProject.module.css";
import { createProject } from "../../api/projectApi";
import toast from "react-hot-toast";

const AddProject = ({ onProjectAdded }) => {

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Project title is required")
      .min(3, "Minimum 3 characters required"),
    description: Yup.string()
      .max(200, "Maximum 200 characters allowed")
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await createProject(values);

      onProjectAdded(res.data);
      resetForm();

      // Success Toast
      toast.success("Project added successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Add Project</h3>

      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form}>

            {/* Title */}
            <div className={styles.formGroup}>
              <label>Project Title</label>
              <Field
                type="text"
                name="title"
                placeholder="Enter project title"
                className={`${styles.input} ${
                  touched.title && errors.title ? styles.errorInput : ""
                }`}
              />
              <ErrorMessage name="title" component="div" className={styles.error} />
            </div>

            {/* Description */}
            <div className={styles.formGroup}>
              <label>Description</label>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter description"
                className={`${styles.textarea} ${
                  touched.description && errors.description ? styles.errorInput : ""
                }`}
              />
              <ErrorMessage name="description" component="div" className={styles.error} />
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Project"}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProject;