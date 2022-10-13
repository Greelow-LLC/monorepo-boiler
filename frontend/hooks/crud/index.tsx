import useAuth from 'hooks/crud/useAuth';
import useCountry from 'hooks/crud/useCountry';

const useCrud = (entity: string) => {
  const crud = {
    countries: () => useCountry(),
    auth: () => useAuth(),
  }[entity];

  return crud && crud();
};

export default useCrud;
