import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import { handleErrors } from '../utils/errors';
export default function Home() {
  const fetcher = (url) => fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  }).then(handleErrors);
  const {data} = useSWR(
      `/api/invoices`,
      fetcher
  );
  return (
    <div clasName={styles.container}>
      <pre>{data && JSON.stringify(data, null, 2) }</pre>
    </div>
  )
}
