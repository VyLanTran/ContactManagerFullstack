import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import { useBaseUrl } from '../context/BaseUrlContext';

export const ViewContact = () => {

    const baseUrl = useBaseUrl();

    const { contactID, accountID } = useParams();
    const [contact, setContact] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [title, setTitle] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [fax, setFax] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [color, setColor] = useState('');
    const [initials, setInitials] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`${baseUrl}/contacts/${accountID}/${contactID}`);
                setContact(response.data);


            } catch (err) {
                console.error(err);
            }
        };

        fetchContact();
    }, []);

    useEffect(() => {
        setFirstName(contact["firstName"]);
        setLastName(contact["lastName"]);
        setTitle(contact["title"]);
        setPhone(contact["phone"]);
        setEmail(contact["email"]);
        setFax(contact["fax"]);
        setCompany(contact["company"]);
        setAddress(contact["address"]);
        setBirthday(contact["birthday"]);
    }, [contact]);

    useEffect(() => {
        if (firstName)
            setColor(getColor(firstName, lastName, email))
    }, [firstName, lastName, email]);

    useEffect(() => {
        if (firstName)
            setInitials(getInitials(firstName, lastName))
    }, [firstName, lastName]);


    const deleteContact = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.delete(`${baseUrl}/contacts/deleteContact/${accountID}/${contactID}`);
            navigate(`/${accountID}/contacts`);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div className='flex flex-col items-center  h-[200px]'>
                <div className={`${color} h-[100px] w-full`}>
                </div>
                <div className={`${color} w-[80px] h-[80px] rounded-full  mt-[-40px]  border-white border-[3px] flex justify-center items-center text-white text-xl`}>
                    {initials}
                </div>
                <div className='text-lg pt-2'>
                    {firstName} {" "} {lastName}
                </div>
            </div>

            <div className='flex'>
                <div className='col-span-1 flex flex-row justify-center items-center gap-2 ml-auto px-[40px]'>
                    <Link to={`/${accountID}/contacts`}>
                        <TiArrowBack className='text-green-500 w-[32px] h-[32px] p-[1px] mr-2' />
                    </Link>
                    <Link to={`/${accountID}/contacts/${contactID}/edit`}>
                        <FaEdit className='text-[#48c6d4] w-[32px] h-[32px] p-[5px]' />
                    </Link>
                    <FaTrash className='w-[32px] h-[32px] p-[7px] text-red-500 cursor-pointer' onClick={deleteContact} />
                </div>
            </div>

            <div className='bg-gray-200 w-full grid grid-cols-2 h-[300px] gap-[50px] p-[40px] '>
                <div className='col-span-1 bg-white'>
                    <div className='font-bold text-lg text-[#48c6d4]  px-6 py-4 '>General Info</div>
                    <div className='w-full bg-gray-300 h-[1px] mt-[-10px] '></div>
                    <div className='grid grid-cols-2'>
                        <div className='col-span-1 text-md px-6 py-4 '>
                            {title && <div className='pb-6'>
                                <div className=' pb-1 text-md'>Title/Job</div>
                                <div className='font-light text-sm'>{title}</div>
                            </div>}
                            {birthday && <div>
                                <div className=' pb-1 text-md'>Birthday</div>
                                <div className='font-light text-sm'>{birthday}</div>
                            </div>}
                        </div>
                        <div className='col-span-1 text-md px-6 py-4 '>
                            {company && <div>
                                <div className=' pb-1 text-md'>Company</div>
                                <div className='font-light text-sm'>{company}</div>
                            </div>}
                        </div>
                    </div>
                </div>

                <div className='col-span-1 bg-white'>
                    <div className='font-bold text-lg text-[#48c6d4]  px-6 py-4 '>Contact</div>
                    <div className='w-full bg-gray-300 h-[1px] mt-[-10px] '></div>
                    <div className='grid grid-cols-2'>
                        <div className='col-span-1 text-md px-6 py-4 '>
                            {phone && <div className='pb-6'>
                                <div className=' pb-1 text-md'>Phone number</div>
                                <div className='font-light text-sm'>{phone}</div>
                            </div>}
                            {fax && <div>
                                <div className=' pb-1 text-md'>Fax</div>
                                <div className='font-light text-sm'>{fax}</div>
                            </div>}
                        </div>
                        <div className='col-span-1 text-md px-6 py-4 '>
                            {email && <div className='pb-6'>
                                <div className=' pb-1 text-md'>Email</div>
                                <div className='font-light text-sm'>{email}</div>
                            </div>}
                            {address && <div>
                                <div className=' pb-1 text-md'>Address</div>
                                <div className='font-light text-sm'>{address}</div>
                            </div>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
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