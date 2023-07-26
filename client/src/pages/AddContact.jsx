import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useBaseUrl } from "../context/BaseUrlContext"

export const AddContact = () => {

    const baseUrl = useBaseUrl();

    const navigate = useNavigate();
    const { accountID } = useParams();
    const [message, setMessage] = useState('');
    const [contactID, setContactID] = useState('');
    const [complete, setComplete] = useState(false);
    const location = useLocation();

    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        title: "",
        phone: "",
        email: "",
        fax: "",
        company: "",
        address: "",
        brithday: ""
    });

    useEffect(() => {
        setComplete(false);
    }, [location]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: value });
    };


    const onSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        try {
            const res = await axios.post(`${baseUrl}/contacts/addContact`,
                {
                    accountID,
                    contactObject: contact
                });
            setMessage("New contact added successfully");
            setComplete(true);
            setContactID(res.data["contactID"]);
        } catch (error) {
            setMessage(error.response.data["message"]);
        }
    };

    return (
        <div className='px-[80px] py-[40px]'>
            {/* Header */}
            <div className='pb-[20px] text-green-700 font-bold'>
                ADD NEW CONTACT
            </div>
            <div>
                {
                    message ?
                        (message === "New contact added successfully" ? <p className='py-3 text-green-600 text-sm'>{message}</p> : <p className='py-3 text-red-600 text-sm'>{message}</p>)
                        : null
                }
                <form className='flex flex-col gap-2' onSubmit={onSubmit}>
                    <input type="text"
                        name='firstName'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="First name *"
                        onChange={handleChange} />
                    <input type="text"
                        name='lastName'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Last name"
                        onChange={handleChange} />
                    <input type="text"
                        name='title'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Title/Job"
                        onChange={handleChange} />
                    <input type="text"
                        name='phone'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Phone number"
                        onChange={handleChange} />
                    <input type="text"
                        name='email'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Email"
                        onChange={handleChange} />
                    <input type="text"
                        name='fax'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Fax"
                        onChange={handleChange} />
                    <input type="text"
                        name='company'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Company"
                        onChange={handleChange} />
                    <input type="text"
                        name='address'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Address"
                        onChange={handleChange} />
                    <input type="text"
                        name='birthday'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Birthday"
                        onChange={handleChange} />
                    {
                        complete ?
                            <div className='flex flex-row gap-2 pt-6 '>
                                <button
                                    className='bg-green-700 w-[65px] h-[30px] rounded-sm text-white text-sm '
                                    onClick={() => navigate(`/${accountID}/contacts/${contactID}/edit`)}>
                                    Edit
                                </button>
                                <button
                                    className='bg-gray-700 w-[65px] h-[30px] rounded-sm text-white text-sm '
                                    onClick={() => navigate(`/${accountID}/contacts`)} >
                                    Back
                                </button>
                            </div>
                            :
                            <div className='flex flex-row gap-2 pt-6 '>
                                <button type='submit' className='bg-green-700 w-[65px] h-[30px] rounded-sm text-white text-sm '>Add</button>
                                <button
                                    className='bg-gray-700 w-[65px] h-[30px] rounded-sm text-white text-sm '
                                    onClick={() => navigate(`/${accountID}/contacts`)} >
                                    Cancel
                                </button>
                            </div>
                    }
                </form >
            </div>
        </div >

    )
}
