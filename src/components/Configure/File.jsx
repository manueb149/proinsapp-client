import React, { Fragment, useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import axios from '../../config/http-common';
import AuthContext from "../../contexts/auth/authContext";
import { useHistory } from "react-router-dom";


/*
	type: data -> cargar datos de las aseguradoras
	type: truck -> cargar datos de los grueros
*/
const File = ({file, setMessage, updateList, setUpdateList, type}) => {

	const typeData = (type === 'files') ? 'data' : 'trucksData';
	const [isLoading, setLoading] = useState(false);
	
	const history = useHistory();
    const authContext = useContext(AuthContext);
    const { logout } = authContext;

	useEffect(() => {
		if (isLoading) {
            axios.post(`/${typeData}/upload`, {id: file._id})
            .then( res => {
				setMessage(res.data.message);
				setLoading(false);
				setUpdateList(!updateList);
			})
			.catch((error) => {
				if (error.response) {
					// Request made and server responded
					if (error.response.data.text === "TNV") {
						logout();
						history.push("/");
					}
					// console.log(error.response.status);
					// console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log("Error", error.message);
				}
			});
		}
	// eslint-disable-next-line 
	}, [isLoading, file._id]);

	const handleClick = () => {
		setLoading(true);
    };
    
    const handleDelete = async () => {
        await axios.delete(`/${type}/delete/${file._id}`)
        .then(res => {
			setMessage(res.data.message)
			setUpdateList(!updateList)
		})
		// .catch(err => setMessage(err.data.message));
		.catch((error) => {
			if (error.response) {
				// Request made and server responded
				if (error.response.data.text === "TNV") {
					logout();
					history.push("/");
				}
				// console.log(error.response.status);
				// console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}
		});

    };

	return (
		<Fragment>
			<tr>
				<td>{file.name}</td>
				<td className="text-center">
					<Button
						className="m-1"
						variant="outline-info"
						size="sm"
						disabled={file.status || isLoading ? true : false}
						onClick={!isLoading ? handleClick : null}
					>
						{isLoading ? "CARGANDO..." : "CARGAR"}
					</Button>
					<Button
                        className="m-1"
                        variant="outline-danger" 
                        size="sm"
						onClick={() => handleDelete()}
						disabled={isLoading ? true : false}
                    >
						ELIMINAR
					</Button>
				</td>
			</tr>
		</Fragment>
	);
};

export default File;
