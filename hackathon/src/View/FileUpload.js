import React, { useState } from "react";
import axios from "axios";
import csvParser from "..\\Model\\CSVParser.js"

function FileUpload(){
    const [selectedFile, setSelectedFile] = useState();
    const [isFileSelected, setIsFileSelected] = useState(false);
  
    const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsFileSelected(true);
    };
  
    const handleSubmission = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("file", selectedFile);
        if (selectedFile.type.toLowerCase() !== "application/vnd.ms-excel") {
            alert("Please Upload CSV File type");
            return;
        }
        else {
            axios({
                method: "POST",
                url: "http://localhost:3001/upload",
                data: formData,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {       
                alert(res.data.message);
            });
            // axios({
            //     method: "GET",
            //     url: "http://localhost:3000/",
            //     headers: {
            //       "Content-Type": "application/json"
            //     }
            //   }).then(res => {
            //     console.log(res.data.message);
            //   });
        }
    };
  
    return (
        <div className="csvUpload">
            <div>
                <input type="file" name="file" onChange={changeHandler} />
                {isFileSelected ? (<div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>FileType: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    </div>) : (<p>Select a file</p>)}
                <div>
                    <button onClick={handleSubmission}>Submit</button>
                </div>
            </div>
        </div>
    );
  }

export default FileUpload;