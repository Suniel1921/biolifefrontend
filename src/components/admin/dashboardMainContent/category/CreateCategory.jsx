// import React, { useState, useEffect } from 'react';
// import SideMenu from '../sideMenu/SideMenu';
// import { Input, Button, Table, Modal, Space, Pagination } from 'antd'; 
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import '../category/createCategory.css'

// const CreateCategory = () => {
//     const [categoryName, setCategoryName] = useState('');
//     const [categoryData, setCategoryData] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//     const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
//     const [pagination, setPagination] = useState({ current: 1, pageSize: 6 }); 

//     useEffect(() => {
//         getAllCategory();
//     }, []);

//     const getAllCategory = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/getAllCategory`);
//             if (response.data.success) {
//                 setCategoryData(response.data.allCategory);
//             }
//         } catch (error) {
//             handleApiError(error);
//         }
//     };

//     const createCategoryHandler = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/createCategory`, { categoryName });
//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 setCategoryName('');
//                 getAllCategory();
//             }
//         } catch (error) {
//             handleApiError(error);
//         }
//     };

//     const updateCategoryHandler = async () => {
//         try {
//             const response = await axios.put(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/updateCategory/${selectedCategory._id}`, selectedCategory);
//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 setIsEditModalVisible(false);
//                 getAllCategory();
//             }
//         } catch (error) {
//             handleApiError(error);
//         }
//     };

//     const deleteCategoryHandler = async () => {
//         try {
//             const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/deleteCategory/${selectedCategory._id}`);
//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 setIsDeleteModalVisible(false);
//                 getAllCategory();
//             }
//         } catch (error) {
//             handleApiError(error);
//         }
//     };

//     const handleApiError = (error) => {
//         if (error.response) {
//             toast.error(error.response.data.message);
//         } else {
//             toast.error('Something went wrong');
//         }
//     };

//     const columns = [
//         {
//             title: 'Name',
//             dataIndex: 'categoryName',
//             key: 'categoryName',
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (text, record) => (
//                 <Space size="middle">
//                     <Button onClick={() => handleEditClick(record)} style={{ backgroundColor: '#3d82c5', color: '#ffffff' }}>Edit</Button>
//                     <Button onClick={() => handleDeleteClick(record)} style={{ backgroundColor: '#FF3B59', color: '#ffffff' }}>Delete</Button>
//                 </Space>
//             ),
//         },
//     ];

//     const handleEditClick = (category) => {
//         setSelectedCategory(category);
//         setIsEditModalVisible(true);
//     };

//     const handleDeleteClick = (category) => {
//         setSelectedCategory(category);
//         setIsDeleteModalVisible(true);
//     };

//     const handleEditModalOk = () => {
//         updateCategoryHandler();
//     };

//     const handleEditModalCancel = () => {
//         setIsEditModalVisible(false);
//     };

//     const handleDeleteModalOk = () => {
//         deleteCategoryHandler();
//     };

//     const handleDeleteModalCancel = () => {
//         setIsDeleteModalVisible(false);
//     };

//     const handlePaginationChange = (page, pageSize) => {
//         setPagination({ ...pagination, current: page, pageSize });
//     };

//     return (
//         <>
//             <div className="adminDashboard">
//                 <div className="sideMenuContainer"><SideMenu /></div>
//                 <div className="adminChartContainer">
//                     <h3>Create Category Here</h3>
//                     <div className='categoryFormContainer'>
//                         <form className='categoryForm'>
//                             <input
//                                 value={categoryName}
//                                 onChange={(e) => setCategoryName(e.target.value)}
//                                 type="text"
//                                 name="category"
//                                 placeholder='Category Name'
//                                 style={{ borderColor: '#3dc547', marginRight: '10px' }}
//                             />
//                             <Button onClick={createCategoryHandler} type='button' style={{ backgroundColor: '#3dc547', color: '#ffffff', marginLeft: '10px' }}>Submit</Button>
//                         </form>
//                     </div>
//                     <div className="categoryTable" style={{ marginTop: '20px' }}>
//                         <Table className='table'
//                             dataSource={categoryData}
//                             columns={columns}
//                             rowKey="_id"
//                             pagination={{ ...pagination, total: categoryData.length, onChange: handlePaginationChange }}
//                         />
//                     </div>
//                 </div>
//             </div>

//             <Modal
//                 title="Edit Category"
//                 open={isEditModalVisible}
//                 onOk={handleEditModalOk}
//                 onCancel={handleEditModalCancel}
//             >
//                 <Input
//                     placeholder="Enter Category Name"
//                     value={selectedCategory?.categoryName}
//                     onChange={(e) => setSelectedCategory({ ...selectedCategory, categoryName: e.target.value })}
//                     style={{ borderColor: '#3dc547' }}
//                 />
//             </Modal>

//             <Modal
//                 title="Delete Category"
//                 open={isDeleteModalVisible}
//                 onOk={handleDeleteModalOk}
//                 onCancel={handleDeleteModalCancel}
//             >
//                 <p>Are you sure you want to delete this category?</p>
//             </Modal>
//         </>
//     );
// };

// export default CreateCategory;






import React, { useState, useEffect } from 'react';
import SideMenu from '../sideMenu/SideMenu';
import { Input, Button, Table, Modal, Space, Upload } from 'antd'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import '../category/createCategory.css';

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        getAllCategory();
    }, []);

    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/getAllCategory`);
            if (response.data.success) {
                setCategoryData(response.data.allCategory);
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const createCategoryHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('categoryName', categoryName);
            if (imageFile) {
                formData.append('images', imageFile);
            }
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/createCategory`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setCategoryName('');
                setImageFile(null);
                getAllCategory();
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const updateCategoryHandler = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/updateCategory/${selectedCategory._id}`, { categoryName: selectedCategory.categoryName });
            if (response.data.success) {
                toast.success(response.data.message);
                setIsEditModalVisible(false);
                getAllCategory();
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const deleteCategoryHandler = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/deleteCategory/${selectedCategory._id}`);
            if (response.data.success) {
                toast.success(response.data.message);
                setIsDeleteModalVisible(false);
                getAllCategory();
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

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setIsEditModalVisible(true);
    };

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalVisible(true);
    };

    const handleEditModalOk = () => {
        updateCategoryHandler();
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleDeleteModalOk = () => {
        deleteCategoryHandler();
    };

    const handleDeleteModalCancel = () => {
        setIsDeleteModalVisible(false);
    };

    // Define columns for the Table component
    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditClick(record)}>Edit</Button>
                    <Button onClick={() => handleDeleteClick(record)} danger>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="adminDashboard">
                <div className="sideMenuContainer"><SideMenu /></div>
                <div className="adminChartContainer">
                    <h3>Create Category Here</h3>
                    <div className='categoryFormContainer'>
                        <form className='categoryForm'>
                            <input
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                type="text"
                                name="category"
                                placeholder='Category Name'
                                style={{ borderColor: '#3dc547', marginRight: '10px' }}
                            />
                            <Upload 
                                beforeUpload={(file) => {
                                    setImageFile(file);
                                    return false;
                                }}
                                maxCount={1}
                            >
                                <Button>Upload Image</Button>
                            </Upload>
                            <Button onClick={createCategoryHandler} type='button' style={{ backgroundColor: '#3dc547', color: '#ffffff', marginLeft: '10px' }}>Submit</Button>
                        </form>
                    </div>
                    <div className="categoryTable" style={{ marginTop: '20px' }}>
                        <Table className='table'
                            dataSource={categoryData}
                            columns={columns}  // Use the defined columns here
                            rowKey="_id"
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
                    placeholder="Enter Category Name"
                    value={selectedCategory?.categoryName}
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, categoryName: e.target.value })}
                    style={{ borderColor: '#3dc547' }}
                />
            </Modal>

            <Modal
                title="Delete Category"
                open={isDeleteModalVisible}
                onOk={handleDeleteModalOk}
                onCancel={handleDeleteModalCancel}
            >
                <p>Are you sure you want to delete this category?</p>
            </Modal>
        </>
    );
};

export default CreateCategory;
