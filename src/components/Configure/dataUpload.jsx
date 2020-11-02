import React, { useState, useEffect } from "react";
import FileUpload from "../utils/fileUpload";
import { Table, Button } from "react-bootstrap";
// import axios from "axios";
import axios from "../../http-common";

const UploadFiles = () => {
	const [selectedFiles, setSelectedFiles] = useState(undefined);
	const [currentFile, setCurrentFile] = useState(undefined);
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState("");
	const [fileInfos, setFileInfos] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [fileToLoad, setFileToLoad]= useState("")

	useEffect(() => {
		FileUpload.getFiles().then((response) => {
			setFileInfos(response.data);
		});
		if(isLoading){
			buttonLoading(fileToLoad);
		}
	}, [fileInfos, isLoading]);

	const handleClick = (id) => {
		setFileToLoad(id)
		setLoading(true);
	}
	const buttonLoading = async (id) => {
		await axios.post("/data/upload",{id})
		.then(res => {
			setMessage(res);
			setLoading(false);
		})
		.catch(err => {
			setMessage(err);
			setLoading(false);
		});
	}

	const selectFile = (event) => {
		setSelectedFiles(event.target.files);
	};

	const upload = () => {
		let file = selectedFiles[0];

		setProgress(0);
		setCurrentFile(file);

		FileUpload.upload(file, (event) => {
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

	return (
		<>
			<div className="card text-center">
				<h2>
					<span className="badge badge-secondary mt-2">
						Favor seleccionar el archivo a cargar
					</span>
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
				</h2>
				<div className="card-body">
					<label className="btn btn-default">
						<input type="file" onChange={selectFile} />
					</label>
				</div>
				<div className="card-footer text-muted">
					<button
						className="btn btn-sm btn-success mr-2"
						disabled={!selectedFiles}
						onClick={upload}
					>
						CARGAR
					</button>
					<button
						className="btn btn-sm btn-danger"
						onClick={() => {
							setCurrentFile(undefined);
							setSelectedFiles(undefined);
						}}
					>
						ELIMINAR
					</button>
				</div>
			</div>
			<br></br>

			{message ? (
				<div className="alert alert-light mt-2" role="alert">
					{message}
				</div>
			) : null}

			<div className="card mt-2">
				<div className="card-header">Lista de archivos</div>
				<ul className="list-group list-group-flush">
					<Table className="archivo" striped bordered hover>
						<tbody>
							{fileInfos &&
								fileInfos.map((file, index) => (
									<>
										<tr>
											<td>{file.name}</td>
											<td className="text-center">
												<Button
													className="m-1"
													variant="outline-info"
													size="sm"
													disabled={(file.status || isLoading) ? true : false }
													onClick={!isLoading ? handleClick : null}
												>
													{isLoading ? "CARGANDO..." : "CARGAR"}
												</Button>
												<Button
													className="m-1"
													variant="outline-danger"
													size="sm"
												>
													ELIMINAR
												</Button>
											</td>
										</tr>
									</>
								))}
						</tbody>
					</Table>
				</ul>
			</div>
		</>
	);
};

export default UploadFiles;
