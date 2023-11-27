import { Formik } from 'formik';
import { Field, Form, SearchBtn, SearchSection } from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

export const Search = ({ onSubmitSearch }) => (
  <SearchSection>
    <Formik
      initialValues={{
        query: '',
      }}
      onSubmit={(values, actions) => {
        onSubmitSearch(values.query);
        actions.resetForm();
      }}
    >
      <Form>
        <Field name="query" placeholder="Search images and photos" />
        <SearchBtn type="submit">
          <AiOutlineSearch />
        </SearchBtn>
      </Form>
    </Formik>
  </SearchSection>
);
