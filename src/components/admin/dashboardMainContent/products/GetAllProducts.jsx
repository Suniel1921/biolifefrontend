import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import SideMenu from '../sideMenu/SideMenu';

const { Option } = Select;

const GetAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/getAllProduct`);
            if (response.data.success) {
                setProducts(response.data.getAllProducts);
            }
        } catch (error) {
            message.error('Failed to fetch products');
        }
    };

    // Fetch categories and brands for the dropdowns
    const fetchCategoriesAndBrands = async () => {
        try {
            const [categoriesResponse, brandsResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/getAllCategory`),
                axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/brand/getAllBrand`)
            ]);

            if (categoriesResponse.data.success) {
                setCategories(categoriesResponse.data.allCategory);
            }
            if (brandsResponse.data.success) {
                setBrands(brandsResponse.data.allBrand);
            }
        } catch (error) {
            message.error('Failed to fetch categories and brands');
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategoriesAndBrands();
    }, []);

    // Handle delete product
    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/deleteProduct/${deletingProduct._id}`);
            message.success('Product deleted successfully');
            setIsDeleteModalVisible(false);
            fetchProducts();
        } catch (error) {
            message.error('Failed to delete product');
        }
    };

    // Show delete confirmation modal
    const showDeleteConfirm = (product) => {
        setDeletingProduct(product);
        setIsDeleteModalVisible(true);
    };

    // Handle edit button click
    const handleEdit = (product) => {
        setEditingProduct(product);
        setFileList(product.images.map((url, index) => ({
            uid: index,
            name: `image-${index}`,
            status: 'done',
            url: url,
        })));
        form.setFieldsValue({
            name: product.name,
            realPrice: product.realPrice,
            salePrice: product.salePrice,
            brand: product.brand._id,
            category: product.category._id,
            description: product.description,
        });
        setIsModalVisible(true);
    };

    // Handle modal form submission
    const handleUpdate = async () => {
        try {
            message.loading({ content: 'Updating image, please wait...', key: 'updating' });
            const updatedData = form.getFieldsValue();
            const formData = new FormData();

            formData.append('name', updatedData.name);
            formData.append('realPrice', updatedData.realPrice);
            formData.append('salePrice', updatedData.salePrice);
            formData.append('brand', updatedData.brand);
            formData.append('category', updatedData.category);
            formData.append('description', updatedData.description);

            fileList.forEach((file) => {
                if (file.originFileObj) {
                    formData.append('images', file.originFileObj);
                }
            });

            const response = await axios.put(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/updateProduct/${editingProduct._id}`, formData);

            if (response.data.success) {
                message.success({ content: 'Product updated successfully', key: 'updating', duration: 2 });
                setIsModalVisible(false);
                fetchProducts();
            } else {
                message.error({ content: 'Failed to update product', key: 'updating', duration: 2 });
            }
        } catch (error) {
            message.error({ content: 'Failed to update product', key: 'updating', duration: 2 });
        }
    };

    // Handle image upload change
    const handleImageChange = ({ fileList }) => setFileList(fileList);

    // Table columns
    const columns = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (images) => <img src={images[0]} alt="product" width={50} />,
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Real Price', dataIndex: 'realPrice', key: 'realPrice' },
        { title: 'Sale Price', dataIndex: 'salePrice', key: 'salePrice' },
        {
            title: 'Brand',
            key: 'brand',
            render: (text, record) => {
                const brand = brands.find(b => b._id === record.brand._id);
                return brand ? brand.brandName : 'Unknown';
            },
        },
        {
            title: 'Category',
            key: 'category',
            render: (text, record) => {
                const category = categories.find(c => c._id === record.category._id);
                return category ? category.categoryName : 'Unknown';
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="danger" onClick={() => showDeleteConfirm(record)} style={{ marginLeft: 8 }}>Delete</Button>
                </>
            ),
        },
    ];
    

    return (
        <div className="adminDashboard">
            <div className="sideMenuContainer">
                <SideMenu />
            </div>
            <div className="adminChartContainer">
                <h4>All Products</h4>
                <Table 
                    dataSource={products} 
                    columns={columns} 
                    rowKey="_id"
                    pagination={{ pageSize: 6 }} 
                />
            </div>

            {/* Edit Product Modal */}
            <Modal
                title="Edit Product"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleUpdate}
                okText="Update"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Product Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="realPrice" label="Real Price">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="salePrice" label="Sale Price">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="brand" label="Brand">
                        <Select>
                            {brands.map((brand) => (
                                <Option key={brand._id} value={brand._id}>{brand.brandName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="category" label="Category">
                        <Select>
                            {categories.map((category) => (
                                <Option key={category._id} value={category._id}>{category.categoryName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Images">
                        <Upload
                            listType="picture"
                            fileList={fileList}
                            onChange={handleImageChange}
                            beforeUpload={() => false}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Are you sure you want to delete this product?"
                visible={isDeleteModalVisible}
                onCancel={() => setIsDeleteModalVisible(false)}
                onOk={handleDelete}
                okText="Yes"
                cancelText="No"
            >
                <p>This action cannot be undone. Do you want to proceed?</p>
            </Modal>
        </div>
    );
};

export default GetAllProducts;
