'use client'
import Form from "@/components/Form"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast, ToastContainer} from "react-toastify";

const page = () => {
  const [imageFile, setImageFile] = useState();
  const [imageUrl, setImageUrl] = useState("");
  /* const [error, setError] = useState(); */
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.isAdmin) {
      router.push('/dashboard');
    }
    
  }, [session]);

  if(!session?.user?.isAdmin) {
    return null;
  }

  const [formData, setFormData] = useState({
    propertytype: 'apartment', 
    title: '',
    description: '',
    price: '',
    location: ''
  });

  const register = (name) => ({
    name,
    value: formData[name],
    onChange: (e) => setFormData({ ...formData, [name]: e.target.value }),
  });

  function handleImageChange(e) {
    if (e.target.files) {
      console.log(e.target.files);
      setImageFile(e.target.files[0]);
    }

  }

  async function handleUpload() {
    if (imageFile) {
      try {
        const imageData = new FormData();
        imageData.append('file', imageFile);
        const response = await fetch('https://b80j614np5.execute-api.eu-north-1.amazonaws.com/upload', {
          method: 'POST',
          body: imageData,
        });
        const data = await response.json();
        console.log(data);
  
        if (response.ok) {
          return data.url;  // Retur URL när bilduppladdningen lyckas
        } else {
          toast.error("Fel vid uppladdning:", data.message);
          return null;
        }
      } catch (error) {
        toast.error("Fel vid uppladdning:", error);
        return null;
      }
    } 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kontrollera om alla nödvändiga fält är ifyllda
    if (!formData.title ){
      toast.error("title is required");
      return;
    } else if (!formData.description){
      toast.error("description is required");
      return;
    } else if (!formData.price){
      toast.error("price is required");
      return;
    } else if (!formData.location){
      toast.error("location is required");
      return;
    }

    console.log("Formulärdata:", formData);

    // Kontrollera om en bild är vald
    if (!imageFile) {
      toast.error("Ingen bild vald.");
      return;
    }

    // Försök att ladda upp bilden innan formuläret skickas
    const uploadedImageUrl = await handleUpload();

    // Om bilduppladdningen misslyckas, avbryt och visa felmeddelande
    if (!uploadedImageUrl) {
      toast.error("Bilduppladdning misslyckades.");
      return;
    }

    // Lägg till den uppladdade bildens URL i formulärdata
    const formDataWithImage = { ...formData, photo: uploadedImageUrl };

    try {
      // Skicka formulärdata inklusive bilden till backend
      const response = await fetch('/api/auth/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithImage),
      });

      const data = await response.json();

      // Kontrollera om servern svarade med ett fel
      if (!response.ok) {
        toast.error(data.message || "Fel vid inlämning.");
        return;
      }

      if(response.ok) {
        router.push('/dashboard/properties');
      }
    } catch (error) {
      console.error(error);
      console.log("Fel vid kommunikation med servern.");
    }
  };



  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        />
      <Form
        type="create"
        register={register}
        formData={formData}
        handleUpload={handleUpload}
        handleImageChange={handleImageChange}
        imageUrl={imageUrl}
        handleSubmit={handleSubmit}
      />
    </>
    
  );
}

export default page;
