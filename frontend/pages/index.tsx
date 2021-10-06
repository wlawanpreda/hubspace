import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import List from '../components/ListProduct'
import { PageHeader, Button, Layout } from 'antd';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>List of Products</title>
        <meta name="description" content="list of products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Layout className={styles.main}>
        <Layout.Content>

          <PageHeader
            ghost={false}
            // onBack={() => window.history.back()}
            title="List of Products"
            // subTitle="This is a subtitle"
            extra={[
              <Link href="/form"><Button key="1">Create Product</Button></Link>
            ]}
          >
            <List />
          </PageHeader>
        </Layout.Content>
        <Layout.Footer> 🤖 🎃 🎃 🎃 🤖 </Layout.Footer>
      </Layout>
    </div>
  )
}

export default Home
