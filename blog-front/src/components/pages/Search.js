import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../ui/Loading';

export default function Search(props) {
  const { term } = useParams();

  useEffect(() => {}, []);
  return (
    <>
      <h1>
        Searching term:
        {term}
      </h1>
      <Loading />
    </>
  );
}
