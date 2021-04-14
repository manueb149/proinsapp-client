import React from "react";
import {
	VictoryChart,
	VictoryBar,
	VictoryAxis,
} from "victory";

const GraphReport = ({ graphData, padding }) => {

	return (
		<VictoryChart
			domainPadding={padding}
		>
			<VictoryAxis
				tickValues={graphData.map(value => value.x)}
				tickFormat={graphData.map(value => value.name)}
			/>
			<VictoryAxis dependentAxis />
			<VictoryBar
				// barRatio={0.5}
				style={{
					data: { fill: ({ datum }) => datum.fill },
					labels: { fill: "black" },
				}}
				data={graphData}
				fill={({ datum }) => datum.fill}
				labels={({ datum }) => datum.y}
				x="x"
				y="y"
			/>
		</VictoryChart>
	);
};

export default GraphReport;
