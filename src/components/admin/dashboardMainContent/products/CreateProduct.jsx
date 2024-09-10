// import React, { useEffect, useState, useRef } from 'react';
// import SideMenu from '../sideMenu/SideMenu';
// import '../products/createProduct.css';
// import { RxCrossCircled } from "react-icons/rx";
// import { RiUploadCloud2Fill } from "react-icons/ri";
// import { TbWorldUpload } from "react-icons/tb";
// import toast, { Toaster } from 'react-hot-toast';
// import axios from 'axios';
// import JoditEditor from 'jodit-react';

// const CreateProduct = () => {
//     const [category, setCategory] = useState([]);
//     const [brand, setBrand] = useState([]);
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         realPrice: '',
//         salePrice: '',
//         brand: '',
//         category: '',
//         images: []
//     });

//     const editor = useRef(null);

//     // Fetch all categories
//     const getAllCategory = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/getAllCategory`);
//             if (response.data.success) {
//                 setCategory(response.data.allCategory);
//             }
//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.message);
//             }
//         }
//     };

//     // Fetch all brands
//     const getAllBrand = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/brand/getAllBrand`);
//             if (response.data.success) {
//                 setBrand(response.data.allBrand);
//             }
//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.message);
//             }
//         }
//     };

//     useEffect(() => {
//         getAllCategory();
//         getAllBrand();
//     }, []);

//     // Handle input change
//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle description change using Jodit Editor
//     const handleDescriptionChange = (newDescription) => {
//         setFormData({ ...formData, description: newDescription });
//     };

//     // Handle file change
//     const handleFileChange = (e) => {
//         setFormData({ ...formData, images: e.target.files });
//     };

//     // Handle form submission
//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         const form = new FormData();
//         Object.keys(formData).forEach(key => {
//             if (key === 'images') {
//                 Array.from(formData.images).forEach(file => {
//                     form.append('images', file);
//                 });
//             } else {
//                 form.append(key, formData[key]);
//             }
//         });

//         const toastId = toast.loading('Please wait, image is uploading...', { duration: 0 });

//         try {
//             console.log(formData);  // Debug: Check formData before submission

//             const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/createProduct`, form, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 setFormData({
//                     name: '',
//                     description: '',
//                     realPrice: '',
//                     salePrice: '',
//                     brand: '',
//                     category: '',
//                     images: []
//                 });
//             }
//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.message);
//             } else {
//                 toast.error('Something went wrong. Please try again.');
//             }
//         } finally {
//             toast.dismiss(toastId);
//         }
//     };

//     return (
//         <div className="adminDashboard">
//             <div className="sideMenuContainer">
//                 <SideMenu />
//             </div>
//             <div className="adminChartContainer">
//                 <h3>Create Product here</h3>
//                 <form className='createProductForm' onSubmit={handleFormSubmit}>
//                     <div className="createProductDetails">
//                         <label>Product Title</label>
//                         <input className='input' type="text" name="name" placeholder='Write a title here...' value={formData.name} onChange={handleInputChange} />
//                         <label>Product Description</label>
//                         <JoditEditor className='textEditor'
//                             ref={editor}
//                             value={formData.description}
//                             onChange={handleDescriptionChange}
//                             tabIndex={1} // tabIndex of textarea
//                         />
//                         <label>Product Images</label>
//                         <input className='input' type="file" name="images" multiple onChange={handleFileChange} />
//                     </div>

//                     <div className="productOrganize">
//                         <div>
//                             <label>Real Price</label>
//                             <input className='input' type="number" name="realPrice" placeholder='Enter real price...' value={formData.realPrice} onChange={handleInputChange} />
//                             <label>Sale Price</label>
//                             <input className='input' type="number" name="salePrice" placeholder='Enter sale price...' value={formData.salePrice} onChange={handleInputChange} />
//                         </div>
//                         <label>Select Category</label>
//                         <select className='select' name="category" value={formData.category} onChange={handleInputChange}>
//                             <option value="">Select Category</option>
//                             {category.map((c) => (
//                                 <option key={c._id} value={c._id}>{c.categoryName}</option>
//                             ))}
//                         </select>
//                         <label>Select Brand</label>
//                         <select className='select' name="brand" value={formData.brand} onChange={handleInputChange}>
//                             <option value="">Select Brand</option>
//                             {brand.map((b) => (
//                                 <option key={b._id} value={b._id}>{b.brandName}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className='createButtonContainer'>
//                         <div className="discardBtn">
//                             <p className='createIcon'><RxCrossCircled /></p>
//                             <p className='createText'>Discard</p>
//                         </div>
//                         <div className="saveDraftBtn">
//                             <p className='createIcon'><RiUploadCloud2Fill /></p>
//                             <p className='createText'>Save Draft</p>
//                         </div>
//                         <button type="submit" className="publishedtBtn">
//                             <p className='createIcon'><TbWorldUpload /></p>
//                             <p className='createText'>Published</p>
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateProduct;





import React, { useState, useEffect, useRef } from 'react';
import SideMenu from '../sideMenu/SideMenu';
import '../products/createProduct.css';
import { RxCrossCircled } from "react-icons/rx";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { TbWorldUpload } from "react-icons/tb";
import toast from 'react-hot-toast';
import axios from 'axios';
import JoditEditor from 'jodit-react';

const CreateProduct = () => {
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        realPrice: '',
        salePrice: '',
        brand: '',
        category: '',
        images: [],
        isTrending: false,
        isBestSeller: false
    });

    const editor = useRef(null);

    // Fetch all categories
    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/getAllCategory`);
            if (response.data.success) {
                setCategory(response.data.allCategory);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    };

    // Fetch all brands
    const getAllBrand = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/brand/getAllBrand`);
            if (response.data.success) {
                setBrand(response.data.allBrand);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    };

    useEffect(() => {
        getAllCategory();
        getAllBrand();
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    // Handle description change using Jodit Editor
    const handleDescriptionChange = (newDescription) => {
        setFormData({ ...formData, description: newDescription });
    };

    // Handle file change
    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                Array.from(formData.images).forEach(file => {
                    form.append('images', file);
                });
            } else {
                form.append(key, formData[key]);
            }
        });

        const toastId = toast.loading('Please wait, image is uploading...', { duration: 0 });

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/createProduct`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setFormData({
                    name: '',
                    description: '',
                    realPrice: '',
                    salePrice: '',
                    brand: '',
                    category: '',
                    images: [],
                    isTrending: false,
                    isBestSeller: false
                });
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="adminDashboard">
            <div className="sideMenuContainer">
                <SideMenu />
            </div>
            <div className="adminChartContainer">
                <h3>Create Product here</h3>
                <form className='createProductForm' onSubmit={handleFormSubmit}>
                    <div className="createProductDetails">
                        <label>Product Title</label>
                        <input
                            className='input'
                            type="text"
                            name="name"
                            placeholder='Write a title here...'
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <label>Product Description</label>
                        <JoditEditor
                            className='textEditor'
                            ref={editor}
                            value={formData.description}
                            onChange={handleDescriptionChange}
                            tabIndex={1} // tabIndex of textarea
                        />
                        <label>Product Images</label>
                        <input
                            className='input'
                            type="file"
                            name="images"
                            multiple
                            onChange={handleFileChange}
                        />
                        <label>Is Trending</label>
                        <input
                            type="checkbox"
                            name="isTrending"
                            checked={formData.isTrending}
                            onChange={handleInputChange}
                        />
                        <label>Is Best Seller</label>
                        <input
                            type="checkbox"
                            name="isBestSeller"
                            checked={formData.isBestSeller}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="productOrganize">
                        <div>
                            <label>Real Price</label>
                            <input
                                className='input'
                                type="number"
                                name="realPrice"
                                placeholder='Enter real price...'
                                value={formData.realPrice}
                                onChange={handleInputChange}
                            />
                            <label>Sale Price</label>
                            <input
                                className='input'
                                type="number"
                                name="salePrice"
                                placeholder='Enter sale price...'
                                value={formData.salePrice}
                                onChange={handleInputChange}
                            />
                        </div>
                        <label>Select Category</label>
                        <select
                            className='select'
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Category</option>
                            {category.map((c) => (
                                <option key={c._id} value={c._id}>{c.categoryName}</option>
                            ))}
                        </select>
                        <label>Select Brand</label>
                        <select
                            className='select'
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Brand</option>
                            {brand.map((b) => (
                                <option key={b._id} value={b._id}>{b.brandName}</option>
                            ))}
                        </select>
                    </div>

                    <div className='createButtonContainer'>
                        <div className="discardBtn">
                            <p className='createIcon'><RxCrossCircled /></p>
                            <p className='createText'>Discard</p>
                        </div>
                        <div className="saveDraftBtn">
                            <p className='createIcon'><RiUploadCloud2Fill /></p>
                            <p className='createText'>Save Draft</p>
                        </div>
                        <button type="submit" className="publishedtBtn">
                            <p className='createIcon'><TbWorldUpload /></p>
                            <p className='createText'>Published</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
