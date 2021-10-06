import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import FormProduct from '../../components/FormProduct'
import { PageHeader, Layout } from 'antd';
import useSWR, { useSWRConfig } from 'swr'
import { URL_PRODUCTS, fetcher } from '../../components/ListProduct'
import { get, isNil } from 'lodash'

const Form: NextPage = () => {

  const router = useRouter()
  const id = get(router, 'query.id')

  const { data: product, error } = useSWR(`${URL_PRODUCTS}/${id}`, fetcher)

  if (isNil(id)) return <div>loading...</div>
  if (error) return <div>failed to load</div>
  if (!product) return <div>loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Edit Product</title>
        <meta name="description" content="form product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Layout className={styles.main} style={{ minWidth: '80%' }}>
        <Layout.Content style={{ minWidth: '80%' }}>

          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={`Edit Product ${id && `(${id})`}`}
          >
            <FormProduct product={product} />
          </PageHeader>
        </Layout.Content>
        <Layout.Footer> 🤖 🎃 🎃 🎃 🤖 </Layout.Footer>
      </Layout>
    </div>
  )
}

export default Form
