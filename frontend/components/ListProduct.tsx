import useSWR, { useSWRConfig } from 'swr'
import Link from 'next/link'
import { List, Card, Descriptions } from 'antd';
import { get, reject } from 'lodash'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const fetcher = (url: string) => fetch(url, { mode: 'cors' }).then((res) => res.json())
export const DOMAIN = 'http://localhost:3000'
export const URL_PRODUCTS = `${DOMAIN}/products`

const requestDeleteProduct = async (id: Number) => {
  const response = await fetch(`${URL_PRODUCTS}/${id}`, { method: 'DELETE' })
  console.log('🚀 ~ file: List.tsx ~ line 12 ~ requestDeleteProduct ~ response', response)
}


function ListProduct() {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR(URL_PRODUCTS, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const actionDelete = async (id: Number) => {
    mutate(URL_PRODUCTS, reject(data, ['id', id]), false)
    await requestDeleteProduct(id)
    mutate(URL_PRODUCTS)
  }

  const actions = ({ id }: { id: Number}) => [
    <Link href={`/form/${id}`}><EditOutlined key="edit" /></Link>,
    <DeleteOutlined key="delete" onClick={() => actionDelete(id)} />
  ]
  return (
    <div>
      Total Items: {get(data, 'length', 0)}
      <List
        grid={{ gutter: 16, xs: 1, md: 2 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card 
              key={get(item, 'id', 0)}
              title={get(item, 'name', '')}
              actions={actions(item)}
            >
              <Descriptions size="small" column={1}>
                <Descriptions.Item key={1} label="Id">{get(item, 'id', '')}</Descriptions.Item>
                <Descriptions.Item key={2} label="Name">{get(item, 'name', '')}</Descriptions.Item>
                <Descriptions.Item key={3} label="Price">{get(item, 'price', '')}</Descriptions.Item>
                {!!get(item, 'category.name') && <Descriptions.Item key={4} label="Category">{get(item, 'category.name', '')}</Descriptions.Item>}
              </Descriptions>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}
export default ListProduct