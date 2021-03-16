import React, { Fragment, useContext, useEffect } from "react";
// import { reportContext } from "../../contexts/ReportContext";
import logo from "../../assets/logo_h.png";
import getDateString from "../utils/getDateString";
import { reportContext } from "../../contexts/ReportContext";
// import printDate from "../utils/printReportDate";
import {
	Document,
	Image,
	Page,
	Text,
	View,
	StyleSheet,
	PDFViewer,
} from "@react-pdf/renderer";
import moment from "moment-timezone";
moment().tz("America/Santo_Domingo").format();

// Create styles
const styles = StyleSheet.create({
	page: {
		backgroundColor: "#ffffff",
	},
	logo: {
		width: "180px",
		height: "100px",
		marginBottom: "5px",
	},
	logo_text: {
		fontSize: 11,
		fontWeight: "thin",
		color: "#4f4f4f",
	},
	table_header: {
		marginTop: 20,
		marginBottom: 10,
		marginLeft: 20,
		marginRight: 20,
		paddingHorizontal: 10,
		paddingVertical: 2,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "#f5f5f5",
		border: 1,
		borderColor: "#000",
		borderStyle: "solid",
	},
	table_header_pol: {
		fontSize: 11,
		fontWeight: "bold",
		flexBasis: "16%",
	},
	table_header_aseg: {
		display: "table",
		fontSize: 11,
		fontWeight: "bold",
		flexBasis: "24%",
	},
	table_header_ope: {
		fontSize: 11,
		fontWeight: "bold",
		flexBasis: "24%",
	},
	table_header_date: {
		fontSize: 11,
		fontWeight: "bold",
		flexBasis: "16%",
	},
	table_header_dist: {
		textAlign: "right",
		fontSize: 11,
		fontWeight: "bold",
		flexBasis: "10%",
	},
	table_header_pre: {
		textAlign: "right",
		fontSize: 11,
		fontWeight: "bold",
		flexBasis: "10%",
	},

	table_body_row: {
		marginTop: 5,
		marginLeft: 20,
		marginRight: 20,
		paddingHorizontal: 10,
		paddingVertical: 2,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		borderBottom: 1,
		borderBottomColor: "#000",
		borderBottomStyle: "solid",
	},
	table_body_pol: {
		fontSize: 8,
		fontWeight: "light",
		flexBasis: "16%",
		paddingLeft: "0px",
	},
	table_body_aseg: {
		fontSize: 8,
		fontWeight: "light",
		flexBasis: "24%",
		paddingLeft: "2px",
	},
	table_body_ope: {
		fontSize: 8,
		fontWeight: "light",
		flexBasis: "24%",
		paddingLeft: "2px",
	},
	table_body_date: {
		fontSize: 8,
		fontWeight: "light",
		flexBasis: "16%",
		paddingLeft: "0px",
	},
	table_body_dist: {
		textAlign: "center",
		fontSize: 8,
		fontWeight: "light",
		flexBasis: "10%",
		paddingRight: "2px",
	},
	table_body_pre: {
		textAlign: "left",
		fontSize: 8,
		fontWeight: "light",
		flexBasis: "10%",
		paddingLeft: "20px",
	},

	table_footer: {
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 20,
		marginRight: 20,
		paddingHorizontal: 10,
		paddingVertical: 2,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "#f5f5f5",
		border: 1,
		borderColor: "#000",
		borderStyle: "solid",
	},
	table_footer_dist: {
		textAlign: "center",
		fontSize: 11,
		fontWeight: "bold",
		flexBasis: "10%",
	},
	table_footer_pre: {
		textAlign: "center",
		fontSize: 11,
		fontWeight: "bold",
		flexBasis: "10%",
	},

	section_data: {
		display: "flex",
		flexDirection: "row",
		alignSelf: "stretch",
		justifyContent: "space-between",
	},
	header: {
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		padding: 5,
		paddingLeft: "20px",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	header_text: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		fontSize: 24,
		fontWeight: "heavy",
		marginRight: "30px",
		marginBottom: "10px",
	},
	header_subtext_title: {
		fontSize: 11,
		color: "#000",
		letterSpacing: 1.5,
		fontWeight: "bold",
		marginTop: "5px",
		marginRight: "30px",
	},
	header_subtext: {
		fontSize: 9.5,
		letterSpacing: 0.5,
		color: "#5b5b5b",
		fontWeight: "light",
	},
});

// Total sum
let TotalPrice = 0;
// Create Document Component
const MyDocument = ({ data, dates }) => (
	<Document>
		<Page size="LETTER" orientation="landscape" style={styles.page}>
			<View style={styles.header}>
				<View wrap>
					<Image src={logo} style={styles.logo}></Image>
					<Text style={styles.logo_text}>Pablo Pumarol No. 13</Text>
					<Text style={styles.logo_text}>(809)-565-7740</Text>
				</View>
				<View wrap>
					<Text style={styles.header_text}>Cuadre de Servicios</Text>
					<Text style={styles.header_subtext_title}>
						Desde:{" "}{dates[0] ? getDateString(dates[0],1) : ""}
						<Text style={styles.header_subtext}> </Text>
					</Text>
					<Text style={styles.header_subtext_title}>
						Hasta:{" "}{dates[1] ? getDateString(dates[1],0) : ""}
						<Text style={styles.header_subtext}> </Text>
					</Text>
				</View>
			</View>
			{/* HEADER */}
			<View style={styles.table_header} fixed>
				<Text style={styles.table_header_pol}>Póliza</Text>
				<Text style={styles.table_header_aseg}>Asegurado</Text>
				<Text style={styles.table_header_ope}>Operador</Text>
				<Text style={styles.table_header_date}>Fecha</Text>
				<Text style={styles.table_header_dist}>Distancia (Km)</Text>
				<Text style={styles.table_header_pre}>Precio (RD$)</Text>
			</View>
			{/* BODY*/}
			{data.map((report, index) => {
				TotalPrice += report.precio
				return (
					<View key={report.serviceNo} style={styles.table_body_row} wrap>
						<Text style={styles.table_body_pol}>
							{report.poliza ? report.poliza : ""}
						</Text>
						<Text style={styles.table_body_aseg}>
							{report.asegurado ? report.asegurado : ""}
						</Text>
						<Text style={styles.table_body_ope}>
							{report.datosGruero.gruaDeServicio
								? report.datosGruero.gruaDeServicio
								: ""}
						</Text>
						<Text style={styles.table_body_date}>
							{report.fechaSiniestro ? report.fechaSiniestro : ""}
						</Text>
						<Text style={styles.table_body_dist}>
							{report.distancia ? report.distancia : ""}
						</Text>
						<Text style={styles.table_body_pre}>
							{report.precio ? Number(report.precio).toLocaleString(undefined, {maximumFractionDigits:2}) : ""}
						</Text>
					</View>
				);
			})}
			{/* FOOTER */}
			<View style={styles.table_footer}>
				<Text style={styles.table_header_pol}> </Text>
				<Text style={styles.table_header_aseg}> </Text>
				<Text style={styles.table_header_ope}> </Text>
				<Text style={styles.table_header_date}> </Text>
				<Text style={styles.table_footer_dist}>TOTAL</Text>
				<Text style={styles.table_footer_pre}>
					{Number(TotalPrice).toLocaleString(undefined, {maximumFractionDigits:2})}
				</Text>
			</View>
			{/* </View> */}
		</Page>
	</Document>
);

const PrintBalanceReport = () => {
	const ReportContext = useContext(reportContext);
	const {
		filteredReports,
		filteredDates,
	} = ReportContext;

	useEffect(() => {
		TotalPrice = 0;
	}, [])

	return (
		<Fragment>
			{filteredReports ? (
				<PDFViewer
					style={{
						width: "100%",
						height: "84vh",
						borderRadius: "10px",
						borderColor: "#555555",
					}}
				>
					<MyDocument
						data={filteredReports}
						dates={filteredDates}
					/>
				</PDFViewer>
			) : null}
		</Fragment>
	);
};

export default PrintBalanceReport;
