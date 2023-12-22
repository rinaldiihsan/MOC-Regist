import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    noHandphone: '',
    kabupaten: '',
    kecamatan: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Password harus memiliki minimal 8 karakter, terdiri dari huruf dan angka.');
    } else {
      setPasswordError('');
    }

    setFormData((prevData) => ({
      ...prevData,
      password: newPassword,
    }));
  };

  const generateRandomText = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomText += characters.charAt(randomIndex);
    }

    return randomText;
  };

  const sendOTP = async () => {
    const token = 'XjhGkWLRp5sqivC0yaT6';

    const sentCount = parseInt(localStorage.getItem('otpSentCount')) || 0;
    if (sentCount >= 5) {
      alert('Anda telah mencapai batas maksimal pengiriman OTP.');
      return;
    }

    const lastSentTime = parseInt(localStorage.getItem('lastSentTime')) || 0;
    const minTimeDifference = 5 * 60 * 1000;
    const currentTime = new Date().getTime();

    if (currentTime - lastSentTime < minTimeDifference) {
      alert('Harap tunggu 5 menit sebelum mengirim OTP lagi.');
      return;
    }
    const text = generateRandomText(6);
    const { noHandphone } = formData;

    try {
      const response = await axios.get(`https://wa.ikutan.my.id/send/${token}/${noHandphone}?text=${text}`);

      if (response.status === 200) {
        console.log(`Sending text to ${noHandphone} with text = ${text}`);

        localStorage.setItem('otpSentCount', (sentCount + 1).toString());
        localStorage.setItem('lastSentTime', currentTime.toString());
      } else {
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      alert('Password tidak valid!');
      return;
    }
    sendOTP();
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-5 box-border min-w-[300px]">
      <img src="./logo-moc.png" alt="logo moc" width={100} className="mb-2" />
      <h1 className="font-medium text-lg">Selamat Datang di,</h1>
      <h2 className="font-semibold text-[26px]">Form Registrasi Akun</h2>
      <p className="text-zinc-400 text-sm font-medium my-3">Silahkan isi form untuk membuat akun anda! </p>
      <form onSubmit={handleSubmit} className="flex flex-col w-fullx">
        <div className="flex gap-x-3">
          <div>
            <label htmlFor="namaLengkap" className="mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="namaLengkap"
              name="namaLengkap"
              required
              placeholder="cth: budi"
              className="px-9 py-3 rounded-[14px] bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-primaryOrange focus:border-transparent w-full"
              style={{ border: '2px solid #F1ECEC' }}
            />
          </div>
          <div>
            <label htmlFor="noHandphone" className="my-2">
              Nomor Handphone
            </label>
            <input
              type="text"
              id="noHandphone"
              name="noHandphone"
              required
              placeholder="cth: 081233445566"
              className="px-9 py-3 rounded-[14px] bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-primaryOrange focus:border-transparent w-full"
              style={{ border: '2px solid #F1ECEC' }}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <label htmlFor="email" className="my-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="cth: budi@gmail.com"
          className="px-9 py-3 rounded-[14px] bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-primaryOrange focus:border-transparent w-full"
          style={{ border: '2px solid #F1ECEC' }}
        />

        <label htmlFor="kabupaten" className="my-2">
          Kabupaten / Kota
        </label>
        <input
          type="text"
          id="kabupaten"
          name="kabupaten"
          required
          placeholder="cth: Kota Medan"
          className="px-9 py-3 rounded-[14px] bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-primaryOrange focus:border-transparent w-full"
          style={{ border: '2px solid #F1ECEC' }}
        />

        <label htmlFor="kecamatan" className="my-2">
          Kecamatan
        </label>
        <input
          type="text"
          id="kecamatan"
          name="kecamatan"
          required
          placeholder="cth: Medan Amplas"
          className="px-9 py-3 rounded-[14px] bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-primaryOrange focus:border-transparent w-full"
          style={{ border: '2px solid #F1ECEC' }}
        />

        <label htmlFor="password" className="my-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Kata Sandi"
          value={formData.password}
          onChange={handlePasswordChange}
          className={`px-9 py-3 rounded-[14px] bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-primaryOrange focus:border-transparent w-full`}
          style={{ border: '2px solid #F1ECEC' }}
        />
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

        <button type="submit" className="w-fit bg-gradient-to-r from-primaryOrange to-secondaryOrange font-semibold text-white py-4 px-10 rounded-[18px] mt-5 transition-all duration-200 ease-in-out flex items-center justify-center gap-2">
          Submit
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6802 14.62L14.2402 12.06L11.6802 9.5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12.0601H14.17" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Form;
