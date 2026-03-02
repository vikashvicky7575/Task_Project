import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddTask.module.css";
import { createTask } from "../../api/taskApi";
import toast from "react-hot-toast";

const AddTask = ({ projectId, refreshTasks }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Task title required"),
    dueDate: Yup.date().required("Due date required"),
  });

  return (
    <div className={styles.card}>
      <h5>Add Task</h5>

      <Formik
        initialValues={{
          title: "",
          status: "Todo",
          dueDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            await createTask({ ...values, projectId });

            toast.success("Task added Sucessfully");
            actions.resetForm();
            refreshTasks();
          } catch (err) {
            toast.error("Failed to add task");
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="title"
              placeholder="Task title"
              className="form-control mb-2"
            />
            <ErrorMessage name="title" component="div" className="text-danger small" />

            <Field
              type="date"
              name="dueDate"
              className="form-control mb-2"
            />
            <ErrorMessage name="dueDate" component="div" className="text-danger small" />

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Task"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTask;