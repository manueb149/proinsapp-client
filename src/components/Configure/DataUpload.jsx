import React, { useState, useEffect, Fragment } from "react";
import FileUpload from "../utils/fileUpload";
import SelectOptions from "./DataUploadOptions";
import { Table, Card } from "react-bootstrap";
import File from "./File";

const DataUpload = () => {
	const [selectedFiles, setSelectedFiles] = useState(undefined);
	const [currentFile, setCurrentFile] = useState(undefined);
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState("");
	const [fileInfos, setFileInfos] = useState([]);
	const [updateList, setUpdateList] = useState(false);
	const [aseguradora, setAseguradora] = useState('');
  const [plan, setPlan] = useState('');

	useEffect(() => {
		FileUpload.getFiles().then((response) => {
			setFileInfos(response.data);
		});
	}, [updateList]);

	const selectFile = (event) => {
		setSelectedFiles(event.target.files);
	};

	const upload = () => {
		let file = selectedFiles[0];

		setProgress(0);
		setCurrentFile(file);

		if(!aseguradora || !plan){
			setMessage("Seleccione correctamente las opciones");
			return;
		}
		try {
			FileUpload.upload(
				file,
				(event) => {
					setProgress(Math.round((100 * event.loaded) / event.total));
				},
				"files",
				{aseguradora, plan}
			)
				.then((response) => {
					setMessage(response.data.message);
					return FileUpload.getFiles();
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
		setAseguradora('');
		setPlan('');
	};

	return (
		<Fragment>
			<Card className="text-center">
				<Card.Header>
					<h5>Cargar datos de las Aseguradoras</h5>
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
					<Card.Title style={{marginTop: "20px"}}>
						Favor seleccionar Aseguradora y Plan
					</Card.Title>
					<SelectOptions 
						aseguradora={aseguradora}
						setAseguradora={setAseguradora}
						plan={plan}
						setPlan={setPlan}
					/>
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
										type={"files"}
									/>
								))}
						</tbody>
					</Table>
				</ul>
			</div>
		</Fragment>
	);
};

export default DataUpload;
