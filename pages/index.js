import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

async function fetchData() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVERLESS_FUNCTIONS_BASE_URL;

  const response = await fetch(baseUrl + '/api/performance');

  var myFetchedDataPre = await response.json();
  const myFetchedData = myFetchedDataPre.performanceEntries.name;

  return { myFetchedData };
}

export default function Home(props) {

  const [
    myFetchedData,
    setMyFetchedData
  ] = useState(props.myFetchedData);

  async function refresh() {
    const refreshedProps = await fetchData();
    setMyFetchedData(refreshedProps.myFetchedData);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>App Title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">my App</a>
        </h1>

        <strong>{myFetchedData}</strong>

        <Button
          variant="contained"
          color="secondary"
          onClick={refresh}
        >
        {"Perfrom"}
        </Button>

        <p className={styles.description}>
          <h2>Get started by editing{' '}</h2>
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        Vercel  
        </a>
      </footer>
    </div>
  )
}

{/*Home.getInitialProps = fetchData;*/}