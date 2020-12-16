import React, { Fragment } from "react";
import { Typeahead, Highlighter } from "react-bootstrap-typeahead";

const SelectRowsTable = ({options, onChange}) => {

	const props = {};

	props.renderMenuItemChildren = (option, { text }, index) => (
		<Fragment>
			<h6>{option.asegurado}</h6>
			<div className="row">
				<small>CHASSIS: <em><Highlighter search={text}>{option.chassis}</Highlighter></em></small><br></br>
				<small>, PLACA: <em><Highlighter search={text}>{option.placa}</Highlighter></em></small><br></br>
                <small>, MARCA: {option.marca}</small>
                <small>, MODELO: {option.modelo}</small>
				<small>, AÑO: {option.anio}</small>
			</div>
		</Fragment>
	);

	return (
		<Fragment>
			<Typeahead
                {...props}
                filterBy={['chassis', 'placa', 'marca', 'modelo', 'anio']}
                size={"small"}
				id="rendering-example"
				labelKey="asegurado"
                options={options}
                onChange={onChange}
				placeholder="Eliga un vehículo"
			/>
		</Fragment>
	);
};

export default SelectRowsTable;
