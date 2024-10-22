import { Copy, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { add_to_value, update_value } from '../redux/pasteSlice';


const Homepage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [searchparams, setSearchparams] = useSearchParams(); // Destructure useSearchParams
    //fetch id from query selector which is of form /pastes/id:
    const pasteid = searchparams.get("pasteid");
    const dispatch = useDispatch();
    const pastes = useSelector((state) => state.paste.value);

    function createpaste() {
        const data = {
            title: title,
            text: content,
            _id: pasteid || Date.now().toString(36) + Math.random().toString(36).substring(2),
            createdAt: new Date().toISOString(),

        }


        if (pasteid) {
            //update the paste
            dispatch(update_value(data));
        }
        else {
            //create new paste
            dispatch(add_to_value(data));
        }
        //after creation and updation title or textfield clear hojaye
        setTitle("");
        setContent("");
        setSearchparams({}); // Remove the pasteId from the URL after creating/updating a paste
    };

    const resetPaste = () => {
        setTitle("");
        setContent("");
        setSearchparams({});
        // navigate("/");
    };

    useEffect(() => {
        if (pasteid) {
            const data = pastes.find((p) => p._id === pasteid);
            if (data) {
                setTitle(data.title);
                setContent(data.text);
            }
        }

    }, [pasteid, pastes])
    return (
        <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
            <div className="flex flex-col gap-y-5 items-start">
                <div className="w-full flex flex-row gap-x-4 justify-between items-center" >
                    <input type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`${pasteid ? "w-[80%]" : "w-[85%]"
                            } text-black border border-input rounded-md p-2`}

                    />

                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={createpaste}>
                        {
                            pasteid ? "Update Note" : "Create a Note"
                        }
                    </button>
                    {pasteid && <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={resetPaste}
                    >
                        <PlusCircle size={20} />
                    </button>}
                </div>
                <div
                    className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
                >
                    <div
                        className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
                    >
                        <div className="w-full flex gap-x-[6px] items-center select-none group">
                            <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

                            <div
                                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
                            />

                            <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
                        </div>
                        {/* Circle and copy btn */}
                        <div
                            className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
                        >
                            {/*Copy  button */}
                            <button
                                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                                onClick={() => {
                                    navigator.clipboard.writeText(content);
                                    toast.success("Copied to Clipboard", {
                                        position: "top-right",
                                    });
                                }}
                            >
                                <Copy className="group-hover:text-sucess-500" size={20} />
                            </button>
                        </div>
                    </div>

                    {/* TextArea */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your note content..."
                        className="w-full p-3  focus-visible:ring-0"
                        style={{
                            caretColor: "#000",
                        }}
                        rows={20}
                    />
                </div>
            </div>
        </div>
    )
}

export default Homepage
