import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiFillEye } from 'react-icons/ai';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useBaseUrl } from '../context/BaseUrlContext';

export const Home = () => {


    const baseUrl = useBaseUrl();

    const { accountID } = useParams();
    const [contactList, setContactList] = useState([]);

    useEffect(() => {
        const fetchContactList = async () => {
            try {
                const response = await axios.get(`${baseUrl}/contacts/${accountID}`);
                setContactList(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchContactList();
    }, [contactList]);


    const deleteContact = async (contactID) => {
        try {
            await axios.delete(`${baseUrl}/contacts/deleteContact/${accountID}/${contactID}`);
            setContactList((prevState) => prevState.filter((contact) => contact._id !== contactID));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='p-[40px]'>
            {/* Header */}
            <div className='pb-[20px]'>
                MY CONTACTS
            </div>

            {/* Search bar */}
            <div className='flex flex-row justify-between pb-[20px]'>
                <div className='flex flex-row'>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search contact"></input>
                    <button className='w-[100px] h-[40px] bg-[#55c7d4] text-sm rounded-lg ml-[10px] text-gray-900'>Search</button>
                </div>
                <div className='flex flex-row'>
                    {/* <button className='text-sm w-[80px] h-[40px] bg-gray-300 rounded-lg mr-[10px]'>Select</button> */}
                    <Link to={`/${accountID}/contacts/addContact`}>
                        <AiOutlinePlus className='bg-[#55c7d4] w-[40px] h-[40px] border-none p-[8px] rounded-lg text-gray-900' />
                    </Link>

                </div>
            </div>

            <div className='flex flex-row pb-[40px]'>
                <div className='text-sm'>{contactList.length} contacts</div>
            </div>

            <div className='grid grid-cols-3 pt-4 justify-between gap-[20px]'>
                {
                    contactList.map((contact, id) =>
                        <ContactCard
                            key={id}
                            firstName={contact.firstName}
                            lastName={contact.lastName}
                            title={contact.title}
                            phone={contact.phone}
                            email={contact.email}
                            contactID={contact._id}
                            accountID={accountID}
                            onDelete={() => deleteContact(contact._id)}
                        />)
                }
            </div>
        </div>
    )
}

const ContactCard = ({ firstName, lastName, title, phone, email, contactID, accountID, onDelete }) => {

    const [color, setColor] = useState(() => getColor(firstName, lastName, email));

    const deleteContact = async (event) => {
        event.preventDefault();
        try {
            await onDelete();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='max-w-[500px] h-[180px] border border-gray-300 grid grid-cols-8'>
            <div className='col-span-2 flex justify-center'>
                <div className={`w-[70px] h-[70px] rounded-full mt-[20px] flex justify-center items-center text-white text-2xl ${color}`}>
                    {getInitials(firstName, lastName)}
                </div>
            </div>
            <div className='col-span-5 pl-[10px]'>
                <div className='font-bold text-xl mt-[20px] '>
                    {firstName + " " + lastName}
                </div>
                <div className='text-sm text-gray-700 pb-[30px]'>
                    {title}
                </div>
                <div className='text-sm text-gray-700'>
                    {phone}
                </div>
                <div className='text-sm text-gray-700'>
                    {email}
                </div>
            </div>
            <div className='col-span-1 flex flex-col justify-center items-center gap-2'>
                <Link to={`/${accountID}/contacts/${contactID}`}>
                    <AiFillEye className='bg-gray-300 w-[30px] h-[30px] p-[5px] rounded-md' />
                </Link>
                <Link to={`/${accountID}/contacts/${contactID}/edit`}>
                    <FaEdit className='bg-gray-300 w-[30px] h-[30px] p-[6px] rounded-md' />
                </Link>
                <FaTrash className='bg-gray-300 w-[30px] h-[30px] p-[7px] rounded-md cursor-pointer' onClick={deleteContact} />

            </div>
        </div>
    );
}

function getInitials(firstName, lastName = '') {
    if (lastName)
        return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    else
        return firstName[0].toUpperCase();
}

function getColor(firstName, lastName = "", email = "") {
    const options = ["bg-[#f57162]", "bg-[#ffc46b]", "bg-[#2a9c72]", "bg-[#369eba]", "bg-[#8627cf]", "bg-[#1a5dba]", "bg-[#91095d]", "bg-[#db1d30]"];
    const number = (firstName.length + lastName.length + email.length) % options.length;
    return options[number];
}

