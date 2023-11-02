import './Footer.css'
import { FaUserAlt, FaEdit } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { BsInfoLg } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa6'
import { BiLogoLinkedin } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next'
const Footerr = () => {
    const {t}= useTranslation()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [subject,setSubject] = useState('')
    const [message,setMessage] = useState('')
    const [sending, setSending] = useState(false)

    const sendEmail = async (e: FormEvent) => {
        e.preventDefault();
        // Validation check
    if (!name || !email || !subject || !message) {
        toast.error('Please fill in all fields before sending.');
        return;
    }

        try {
            setSending(true);

            const formData = {
                name,
                email,
                subject,
                message,
            };

            // Using the Fetch API to send form data to the server
            const response = await fetch('http://localhost:8000/sendmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Message sent successfully!');
            } else {
                toast.error('Failed to send message. Please try again.');
                setSending(false);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setSending(false);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setSending(false);
        }
    };
    return (
        <div>
            <footer>
                <div className="container-fluid footer-contact  d-flex  flex-column align-items-center">
                    <div className="py-5">
                        <h5 className='h5 fw-bold display-6 text-white text-center pt-5'>{t('appointment.title')} <br />
                        {t('appointment.withus')}</h5>
                        <p className='p text-center ' style={{ color: '#909090' }}>{t('appointment.subtitle')}</p>
                        <form  onSubmit={sendEmail} className="form-horizontal py-5">
                            <div className="form-group ">
                                <span className="input-icon"><FaUserAlt /></span>
                                <input onChange={(e)=> setName(e.target.value)} className="form-control border-0" type="text" placeholder="Name" value={name} name='name' />
                            </div>
                            <div className="form-group my-3">
                                <span className="input-icon"><MdAlternateEmail /></span>
                                <input onChange={(e)=> setEmail(e.target.value)} className="form-control" type="email" placeholder="Email" value={email} name='email' />
                            </div>
                            <div className="form-group my-3">
                                <span className="input-icon"><BsInfoLg /></span>
                                <input onChange={(e)=> setSubject(e.target.value)} className="form-control" type="text" placeholder="Subject" value={subject} name='subject' />
                            </div>
                            <div className="textare">
                                <span className="input-icon pt-1"><FaEdit /></span>
                                <textarea onChange={(e)=> setMessage(e.target.value)} className="form-control " placeholder="Message" rows={4} value={message} name='message' ></textarea>
                            </div>

                            {/* <span className="forgot-pass"><a href="#">Forgot Password ?</a></span> */}
                            {sending ? (
                                <button className="sendMessage text-center mt-5">Sending...</button>
                            ) : (
                                <button className="sendMessage text-center mt-5">Send Message</button>
                            )}

                        </form>
                    </div>
                </div>





                <div className="container-fluid footer-links py-5 d-flex justify-content-center align-items-center">
                    <div className="content">
                        <div className="logo">

                            <img className='w-100 h-100 img-fluid' src={'../assets/images/logo-001.png'}  alt="BlueCascade" />
                        </div>
                        <div className="links d-flex justify-content-center align-items-center">
                            <Link to='https://www.facebook.com/blucascascade'><FaFacebookF /></Link>
                            <Link to='https://www.linkedin.com/company/blue-cascade/'><BiLogoLinkedin /></Link>
                        </div>
                    </div>
                </div>
                <div className="container-fluid copyright py-3">
                    <div className='p text-center'>Copyright © 2019 Blue Cascade All Rights Reserved.</div>
                </div>
            </footer>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </div>
    )
}

export default Footerr