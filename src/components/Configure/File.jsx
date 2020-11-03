import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from '../../http-common';

const File = ({file, setMessage, updateList, setUpdateList}) => {

    const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
            axios.post('/data/upload',{id: file._id})
            .then( res => {
				setMessage(res.data.message);
				setLoading(false);
				setUpdateList(!updateList);
			}).catch( err => console.log(err));
		}
	// eslint-disable-next-line 
	}, [isLoading, file._id]);

	const handleClick = () => {
		setLoading(true);
    };
    
    const handleDelete = async () => {
        await axios.delete(`/files/delete/${file._id}`)
        .then(res => {
			setMessage(res.data.message)
			setUpdateList(!updateList)
		})
        .catch(err => setMessage(err.data.message));
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
