import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import axios from 'axios';
const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const token=localStorage.getItem('token');
  const mail=localStorage.getItem('mail');
  useEffect(()=>{
    if(token==null){
      alert('Login, to continue!')
      window.location.href='/';
    }
    else{
      setEmail(mail)
    }
  })
  // useEffect(() => {
  //   setPrevLocation(location.state.data);
  // }, [location]);

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");
  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============
  const [successMsg, setSuccessMsg] = useState("");
  const[form,setForm]=useState({
     'name':'',
     'email':mail,
     'message':'',
  })
  // const handleName = (e) => {
  //   setclientName(e.target.value);
  //   setErrClientName("");
  // };
  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  //   setErrEmail("");
  // };
  // const handleMessages = (e) => {
  //   setMessages(e.target.value);
  //   setErrMessages("");
  // };
  const handle = (e) =>{
    const tmp ={...form};
    tmp[e.target.name]=e.target.value;
    setForm(tmp);
    if (e.target.name === "name") {
      setclientName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value );
    } else if (e.target.name === "message") {
      setMessages(e.target.value);
    }
  }
  async function submit(){
    if(form.name=='' || form.message=='' || form.email==''){
      alert('Please fill the appropriate data');
    }
    else{
    
    const res=await axios.post('https://cmmhampers-production.up.railway.app/hamper/querysubmission',form);
    alert('The query has been submitted,the Owner will contact you soon by your mail! Thankyou!')
    }
  }
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Enter a Valid Email");
      }
    }
    if (!messages) {
      setErrMessages("Enter your Messages");
    }
    if (clientName && email && EmailValidation(email) && messages) {
      setSuccessMsg(
        `Thank you dear ${clientName}, Your messages has been received successfully. Futher details will sent to you by your email at ${email}.`
      );
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Contact" prevLocation={prevLocation} />
      
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
      ) : (
        <form className="pb-20">
          <h1 className="font-titleFont font-semibold text-3xl">
            Fill up a Form
          </h1>
          <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Name
              </p>
              <input
                onChange={(e)=>handle(e)}
                value={clientName}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter your name here"
                name="name"
              />
              {errClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Email
              </p>
              <input
                onChange={(e)=>handle(e)}
                value={email}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="email"
                placeholder="Enter your email here"
                name="email"
              />
              {errEmail && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errEmail}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
               Raise Your Query
              </p>
              <textarea
                onChange={(e)=>handle(e)}
                value={messages}
                cols="30"
                rows="3"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                type="text"
                placeholder="Enter your query here"
                name="message"
              ></textarea>
              {errMessages && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errMessages}
                </p>
              )}
            </div>
            <button
              onClick={submit}
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;
