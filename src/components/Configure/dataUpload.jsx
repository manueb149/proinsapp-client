import React, { useState, useEffect } from "react";
import FileUpload from "../utils/fileUpload";
// import axios from "axios";
import axios from '../../http-common';

const UploadFiles = () => {
	const [selectedFiles, setSelectedFiles] = useState(undefined);
	const [currentFile, setCurrentFile] = useState(undefined);
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState("");
	const [fileInfos, setFileInfos] = useState([]);

	useEffect(() => {
		FileUpload.getFiles().then((response) => {
			setFileInfos(response.data);
		});
	}, [fileInfos]);

	const selectFile = (event) => {
		setSelectedFiles(event.target.files);
	};

	const upload = () => {
		let currentFile = selectedFiles[0];

		setProgress(0);
		setCurrentFile(currentFile);

		FileUpload.upload(currentFile, (event) => {
			setProgress(Math.round((100 * event.loaded) / event.total));
		})
			.then((response) => {
				setMessage(response.data.message);
				return FileUpload.getFiles();
			})
			.then((files) => {
				setFileInfos(files.data);
			})
			.catch(() => {
				setProgress(0);
				setMessage("Could not upload the file!");
				setCurrentFile(undefined);
			});

		setSelectedFiles(undefined);
    };

    const handleDelete = async (url) =>{
        await axios.get(url)
            .then(res => setMessage(res.data.message))
            .catch(err => setMessage(err));
    }

	return (
		<>
			{currentFile && (
				<div className="progress">
					<div
						className="progress-bar progress-bar-info progress-bar-striped"
						role="progressbar"
						aria-valuenow={progress}
						aria-valuemin="0"
						aria-valuemax="100"
						style={{ width: progress + "%" }}
					>
						{progress}%
					</div>
				</div>
			)}

			<label className="btn btn-default">
				<input type="file" onChange={selectFile} />
			</label>
            <br></br>
			<button
				className="btn btn-sm btn-success mr-2"
				disabled={!selectedFiles}
				onClick={upload}
			>
				Cargar
			</button>
            <button
				className="btn btn-sm btn-danger"
				onClick={() => setCurrentFile(undefined)}
			>
				Limpiar
			</button>

			<div className="alert alert-light mt-2" role="alert">
				{message}
			</div>

			<div className="card mt-2">
				<div className="card-header">Lista de archivos</div>
				<ul className="list-group list-group-flush">
					{fileInfos &&
						fileInfos.map((file, index) => (
							<li className="list-group-item" key={index}>
								<a href="!#" onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(file.url);
                                }}>{file.name}</a>
							</li>
						))}
				</ul>
			</div>
		</>
	);
};

export default UploadFiles;
