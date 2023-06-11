import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const EditContact = () => {

    const navigate = useNavigate();
    const { accountID, contactID } = useParams();
    const [contact, setContact] = useState({});
    const [message, setMessage] = useState('');


    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/contacts/${accountID}/${contactID}`);
                setContact(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchContact();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: value });
    };


    const onSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        try {
            const response = await axios.put(`http://localhost:3001/contacts/editContact/{accountID}/${contactID}`, { updatedContact: contact });
            setMessage("Contact updated successfully");
        } catch (err) {
            setMessage("Edit failed");
        }
    };

    return (
        <div className='px-[80px] py-[40px]'>
            {/* Header */}
            <div className='pb-[20px] text-[#3cb8c5]'>
                EDIT CONTACT
            </div>

            {
                message ?
                    (message === "Contact updated successfully" ? <p className='py-3 text-green-600 text-sm'>{message}</p> : <p className='py-3 text-red-600 text-sm'>{message}</p>)
                    : null
            }
            <form className='flex flex-col gap-2' onSubmit={onSubmit}>
                <input type="text"
                    name='firstName'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="First name *"
                    value={contact["firstName"]}
                    onChange={handleChange}
                />
                <input type="text"
                    name='lastName'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Last name"
                    value={contact["lastName"]}
                    onChange={handleChange} />
                <input type="text"
                    name='title'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Title/Job"
                    value={contact["title"]}
                    onChange={handleChange} />
                <input type="text"
                    name='phone'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Phone number"
                    value={contact["phone"]}
                    onChange={handleChange} />
                <input type="text"
                    name='email'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Email"
                    value={contact["email"]}
                    onChange={handleChange} />
                <input type="text"
                    name='fax'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Fax"
                    value={contact["fax"]}
                    onChange={handleChange} />
                <input type="text"
                    name='company'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Company"
                    value={contact["company"]}
                    onChange={handleChange} />
                <input type="text"
                    name='address'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Address"
                    value={contact["address"]}
                    onChange={handleChange} />
                <input type="text"
                    name='birthday'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Birthday"
                    value={contact["birthday"]}
                    onChange={handleChange} />

                <div className='flex flex-row gap-2 pt-6 '>
                    <button type='submit' className='bg-[#3cb8c5] w-[65px] h-[30px] rounded-sm text-white text-sm '>Update</button>
                    <button
                        className='bg-gray-700 w-[65px] h-[30px] rounded-sm text-white text-sm '
                        onClick={() => navigate(`/${accountID}/contacts`)} >
                        Back
                    </button>
                </div>
            </form>
        </div>

    )
}
