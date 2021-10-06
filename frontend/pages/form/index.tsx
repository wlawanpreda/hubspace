import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import FormProduct from '../../components/FormProduct'
import { PageHeader, Button, Layout } from 'antd';

const Form: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Form Product</title>
        <meta name="description" content="form product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Layout className={styles.main} style={{ minWidth: '80%' }}>
        <Layout.Content style={{ minWidth: '80%' }}>

          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Form Product"
          >
            <FormProduct />
          </PageHeader>
        </Layout.Content>
        <Layout.Footer> 🤖 🎃 🎃 🎃 🤖 </Layout.Footer>
      </Layout>
    </div>
  )
}

export default Form
