import React from "react";
// import { CanvasJSChart } from "canvasjs-react-charts";
import Paper from "@material-ui/core/Paper";
import {
	Chart,
	BarSeries,
	Title,
	ArgumentAxis,
	ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const GraphReport = () => {
	const chartData = [
		{ label: "Servicios", number: 10 },
		{ label: "SVL", number: 15 },
		{ label: "SVP", number: 15 },
		{ label: "SPV", number: 15 },
		{ label: "SPB", number: 15 },
	];

	return (
		<Paper>
			<Chart data={chartData}>
				<ArgumentAxis />
				<ValueAxis max={50} />
				
				<BarSeries valueField="number" argumentField="label" />
				<Title text="Indicadores" />
				<Animation />
			</Chart>
		</Paper>
	);
};

export default GraphReport;
