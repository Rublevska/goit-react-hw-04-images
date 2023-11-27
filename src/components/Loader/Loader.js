import { Dna } from 'react-loader-spinner';
import { LoaderSection } from './Loader.styled';

export const Loader = () => (
  <LoaderSection>
    <Dna
      visible={true}
      height="50"
      width="80"
      marginLeft="auto"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  </LoaderSection>
);
