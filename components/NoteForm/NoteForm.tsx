'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CreateNoteDto, NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSubmit: (values: CreateNoteDto) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  tag: Yup.string().oneOf(['Work', 'Personal', 'Home', 'Important', 'Other']).required('Required'),
  content: Yup.string(), // Опціонально
});

const NoteForm = ({ onSubmit, onCancel, isSubmitting }: NoteFormProps) => {
  const initialValues: CreateNoteDto = { title: '', tag: 'Other', content: '' };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className={css.form}>
        <Field name="title" placeholder="Title" className={css.input} />
        <ErrorMessage name="title" component="div" className={css.error} />

        <Field as="select" name="tag" className={css.select}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Home">Home</option>
          <option value="Important">Important</option>
          <option value="Other">Other</option>
        </Field>

        <Field
          name="content"
          as="textarea"
          placeholder="Content (Optional)"
          className={css.textarea}
        />

        <div className={css.actions}>
          <button type="submit" disabled={isSubmitting}>
            Save
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
