import React, { useState, useEffect } from 'react';
import SideMenu from '../sideMenu/SideMenu';
import { Input, Button, Table, Modal, Space, Pagination } from 'antd'; // Import Pagination from 'antd'
import axios from 'axios';
import toast from 'react-hot-toast';
import '../category/createCategory.css'

const CreateBrand = () => {
    const [brandName, setBrandName] = useState('');
    const [brandData, setBrandData] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 6 }); // Initialize pagination

    useEffect(() => {
        getAllBrand();
    }, []);

    const getAllBrand = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/brand/getAllBrand`);
            if (response.data.success) {
                setBrandData(response.data.allBrand);
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const createBrandHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/brand/createBrand`, { brandName });
            if (response.data.success) {
                toast.success(response.data.message);
                setBrandName('');
                getAllBrand();
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const updateBrandHandler = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/brand/updateBrand/${selectedBrand._id}`, selectedBrand);
            if (response.data.success) {
                toast.success(response.data.message);
                setIsEditModalVisible(false);
                getAllBrand();
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const deleteBrandHandler = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/brand/deleteBrand/${selectedBrand._id}`);
            if (response.data.success) {
                toast.success(response.data.message);
                setIsDeleteModalVisible(false);
                getAllBrand();
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleApiError = (error) => {
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error('Something went wrong');
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditClick(record)} style={{ backgroundColor: '#3d82c5', color: '#ffffff' }}>Edit</Button>
                    <Button onClick={() => handleDeleteClick(record)} style={{ backgroundColor: '#FF3B59', color: '#ffffff' }}>Delete</Button>
                </Space>
            ),
        },
    ];

    const handleEditClick = (category) => {
        setSelectedBrand(category);
        setIsEditModalVisible(true);
    };

    const handleDeleteClick = (category) => {
        setSelectedBrand(category);
        setIsDeleteModalVisible(true);
    };

    const handleEditModalOk = () => {
        updateBrandHandler();
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleDeleteModalOk = () => {
        deleteBrandHandler();
    };

    const handleDeleteModalCancel = () => {
        setIsDeleteModalVisible(false);
    };

    const handlePaginationChange = (page, pageSize) => {
        setPagination({ ...pagination, current: page, pageSize });
    };

    return (
        <>
            <div className="adminDashboard">
                <div className="sideMenuContainer"><SideMenu /></div>
                <div className="adminChartContainer">
                    <h3>Create Brand Here</h3>
                    <div className='categoryFormContainer'>
                        <form className='categoryForm'>
                            <input
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                type="text"
                                name="category"
                                placeholder='Enter Brand Name'
                                style={{ borderColor: '#3dc547', marginRight: '10px' }}
                            />
                            <Button onClick={createBrandHandler} type='button' style={{ backgroundColor: '#3dc547', color: '#ffffff', marginLeft: '10px' }}>Submit</Button>
                        </form>
                    </div>
                    <div className="categoryTable" style={{ marginTop: '20px' }}>
                    <Table
    className='table'
    dataSource={Array.isArray(brandData) ? brandData : []}
    columns={columns}
    rowKey="_id"
    pagination={{ ...pagination, total: Array.isArray(brandData) ? brandData.length : 0, onChange: handlePaginationChange }}
/>

                    </div>
                </div>
            </div>

            <Modal
    title="Edit Category"
    open={isEditModalVisible}
    onOk={handleEditModalOk}
    onCancel={handleEditModalCancel}
>
    <Input
        placeholder="Enter Brand Name"
        value={selectedBrand?.brandName || ''}
        onChange={(e) => setSelectedBrand({ ...selectedBrand, brandName: e.target.value })}
        style={{ borderColor: '#3dc547' }}
    />
</Modal>


            <Modal
                title="Delete Category"
                open={isDeleteModalVisible}
                onOk={handleDeleteModalOk}
                onCancel={handleDeleteModalCancel}
            >
                <p>Are you sure you want to delete this Brand?</p>
            </Modal>
        </>
    );
};

export default CreateBrand;
