import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { get, map, isNil, eq } from 'lodash'
import { Form, Input, Button, Select, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetcher, DOMAIN, URL_PRODUCTS } from './ListProduct';

const URL_CATEGORY = `${DOMAIN}/category`

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
const tailLayout = { wrapperCol: { offset: 8, span: 16 } };

const FormProduct = ({ product }: any) => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig()
  const { data: categories, error } = useSWR(URL_CATEGORY, fetcher)

  if (error) return <div>failed to load</div>
  if (!categories) return <div>loading...</div>


  const isEditMode = !isNil(product) 
  if (isEditMode) {
    form.setFieldsValue({ ...product, category: get(product, 'category.id', null)});
  }

  const onFinish = async (values: any) => {
    setLoading(true);
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    map(values, (v, k) => !isNil(v) && urlencoded.append(k, v))

    const method = isEditMode ? 'PUT' : 'POST'
    const url = isEditMode ? `${URL_PRODUCTS}/${get(product, 'id', 0)}` : `${URL_PRODUCTS}`
    const options = { method, headers, body: urlencoded }
    await fetch(url, options)

    router.push('/')
    setLoading(false);
  };



  const onNameChange = (event: any) => setNewCategory(event.target.value);

  const addItem = async () => {
    if (eq('', newCategory)) return 

    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append('name', newCategory)

    const url = `${URL_CATEGORY}`
    const options = { method: 'POST', headers, body: urlencoded }
    await fetch(url, options)
    mutate(URL_CATEGORY)
    setNewCategory('');
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item key={1} name="name" label="Name" rules={[{ required: true }]}>
        <Input defaultValue={get(product, 'name', '')} />
      </Form.Item>
      <Form.Item key={2} name="price" label="Price" rules={[{ required: true }]}>
        <Input type="number" defaultValue={get(product, 'price', '')} />
      </Form.Item>
      <Form.Item key={3} name="category" label="Category">
        <Select
          placeholder=""
          allowClear
          defaultValue={get(product, 'category.id')} 
          dropdownRender={menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Input style={{ flex: 'auto' }} value={newCategory} onChange={onNameChange} />
                <a
                  style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                  onClick={addItem}
                >
                  <PlusOutlined /> Add item
                </a>
              </div>
            </div>
          )}
        >
          {map(categories, ({ id, name }) => <Select.Option value={id}>{name}</Select.Option>)}
        </Select>
      </Form.Item>

      { loading 
        ? 'loading...' 
        : (
          <Form.Item key={4} {...tailLayout}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        )}
      
    </Form>
  );
};
export default FormProduct