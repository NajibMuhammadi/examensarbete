'use client'
import Form from "@/components/Form"
import { useState } from 'react'

const page = () => {
  const [propertyImage, setPropertyImage] = useState({name: '', url: ''});
  const [formData, setFormData] = useState({
    propertyType: 'apartment', // Sätt ett initialt värde
    title: '',
    description: '',
    price: '',
    location: ''
  });

  const register = (name) => ({
    name,
    value: formData[name], // Se till att value inte är undefined, ge det ett standardvärde
    onChange: (e) => setFormData({ ...formData, [name]: e.target.value }),
  });

  const onFinishHandler = (file) => {
    const reader = (readFile) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPropertyImage({name: readFile.name, url: reader.result});
      };
      reader.readAsDataURL(readFile);
    };
    reader(file);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    if (!propertyImage.name) return alert('Please select an image');

    // Skicka formdata efter att vi har hanterat bilden
    onFinish({ ...formData, photo: propertyImage.url, email: user.email });
  };

  return (
    <Form
      type="create"
      register={register}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
      formData={formData}
    />
  );
}

export default page;
