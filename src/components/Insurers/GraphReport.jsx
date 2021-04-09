import React from "react";
// import { CanvasJSChart } from "canvasjs-react-charts";
// import Paper from "@material-ui/core/Paper";
// import {
// 	Chart,
// 	BarSeries,
// 	Title,
// 	ArgumentAxis,
// 	ValueAxis,
// } from "@devexpress/dx-react-chart-material-ui";
// import { Animation } from "@devexpress/dx-react-chart";
import {
	VictoryChart,
	VictoryBar,
	VictoryAxis,
} from "victory";

const GraphReport = ({graphData}) => {

	return (
		<VictoryChart
			domainPadding={{ y: 0, x: 20 }}
		>
			<VictoryAxis
				tickValues={[
					...Array.from(
						{ length: graphData.length },
						(_, i) => i + 1
					),
				]}
				tickFormat={graphData.map((value, key) => value.name)}
			/>
			<VictoryAxis dependentAxis />
			<VictoryBar
				barRatio={0.5}
				style={{
					data: { fill: ({ datum }) => datum.fill },
					labels: { fill: "black" },
				}}
				data={graphData}
				fill={({ datum }) => datum.fill}
				labels={({ datum }) => datum.y}
				// labelComponent={<VictoryLabel dy={5} />}
				x="x"
				y="y"
			/>
		</VictoryChart>
	);
};

export default GraphReport;
