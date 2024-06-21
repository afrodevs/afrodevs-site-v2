import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useForm } from "../../context/FormContext";

const HireForm = () => {
  const { showFormPopup, setShowFormPopup } = useForm();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://formsubmit.co/build@afrodevs.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        phoneNumber: formData.phone,
        email: formData.email,
        message: formData.details,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        toast("Thank you for joining us!", { type: "success" });
        setFormData({
          name: "",
          email: "",
          phone: "",
          details: "",
        });
        setShowFormPopup(false);
      })
      .catch(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          details: "",
        });
        toast("Sorry, an error occured!", { type: "error" });
        setShowFormPopup(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {showFormPopup && (
        <>
          <div
            className="flex fixed inset-0 z-50 items-center bg-black/25"
            onClick={() => setShowFormPopup(false)}
          ></div>
          <div className="fixed w-[90%] max-w-lg p-4 mx-auto bg-white z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
            <div className="flex justify-end items-center text-gray-400">
              <span
                className="p-1.5 text-xl rounded-full cursor-pointer"
                onClick={() => {
                  setShowFormPopup(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    details: "",
                  });
                }}
              >
                <IoMdClose />
              </span>{" "}
            </div>
            <div className="mt-2 mb-7">
              <h3 className="text-lg font-bold text-center sm:text-2xl text-brand-green">
                Tell us more about your project
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <div className="px-2 py-1 rounded-md border border-gray-200 focus-within:border-gray-400">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((formData) => {
                        return {
                          ...formData,
                          name: e.target.value,
                        };
                      });
                    }}
                    required
                    placeholder="Your name"
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <div className="px-2 py-1 rounded-md border border-gray-200 focus-within:border-gray-400">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((formData) => {
                        return {
                          ...formData,
                          email: e.target.value,
                        };
                      });
                    }}
                    id="email"
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone">Phone</label>
                <div className="px-2 py-1 rounded-md border border-gray-200 focus-within:border-gray-400">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData((formData) => {
                        return {
                          ...formData,
                          phone: e.target.value,
                        };
                      });
                    }}
                    required
                    inputMode="numeric"
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message">Message</label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.details}
                  onChange={(e) => {
                    setFormData((formData) => {
                      return {
                        ...formData,
                        details: e.target.value,
                      };
                    });
                  }}
                  rows={5}
                  className="inline-block px-2 py-1 w-full rounded-md border border-gray-200 outline-none focus:border-gray-400"
                  placeholder="Describe your project here..."
                />
              </div>

              <div className="mb-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`block p-2 w-full text-white rounded-[4px] bg-green hover:bg-darkened-green ${
                    loading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default HireForm;
