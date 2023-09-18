const ENDPOINT = `${process.env.REACT_APP_API_HOST}/tracks/`;

function useTracks() {
  const getAll = () =>
    fetch(ENDPOINT, { mode: "cors" }).then((res) => res.json());

  return { getAll };
}

export default useTracks;
