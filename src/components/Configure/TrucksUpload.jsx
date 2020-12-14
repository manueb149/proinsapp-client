import React, { useState, useEffect } from "react";
import FileUpload from "../utils/fileUpload";
import { Table, Card } from "react-bootstrap";
import File from "./File";

const TrucksUpload = () => {
	const [selectedFiles, setSelectedFiles] = useState(undefined);
	const [currentFile, setCurrentFile] = useState(undefined);
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState("");
	const [fileInfos, setFileInfos] = useState([]);
	const [updateList, setUpdateList] = useState(false);

	useEffect(() => {
		FileUpload.getTrucks().then((response) => {
			setFileInfos(response.data);
		});
	}, [updateList]);

	const selectFile = (e) => {
		setSelectedFiles(e.target.files);
	};

	const upload = () => {
		let file = selectedFiles[0];

		setProgress(0);
		setCurrentFile(file);
		try {
			FileUpload.upload(file, (e) => {
				setProgress(Math.round((100 * e.loaded) / e.total));
			},'trucks')
				.then((response) => {
					setMessage(response.data.message);
					return FileUpload.getTrucks();
				})
				.then((files) => {
					setFileInfos(files.data);
				})
				.catch(() => {
					setProgress(0);
					setMessage(
						"No se pudo cargar el archivo, verifique si ya esta cargado."
					);
					setCurrentFile(undefined);
				});
		} catch (err) {
			console.log(err);
		}
		setSelectedFiles(undefined);
	};

	return (
		<>
			<Card className="text-center">
				<Card.Header>
					<h5>Cargar datos de los Grueros</h5>
				</Card.Header>
				<Card.Body>
					<Card.Title>
						Favor seleccionar el archivo a cargar
					</Card.Title>
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
				</Card.Body>
				<Card.Footer className="text-muted">
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
							setMessage("");
						}}
					>
						LIMPIAR
					</button>
				</Card.Footer>
			</Card>
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
								fileInfos.map((file) => (
									<File
										file={file}
										setMessage={setMessage}
										key={file._id}
										setUpdateList={setUpdateList}
										updateList={updateList}
										type={'trucks'}
									/>
								))}
						</tbody>
					</Table>
				</ul>
			</div>
		</>
	);
};

export default TrucksUpload;
