import React, { Fragment, useContext } from "react";
import { reportContext } from "../../contexts/ReportContext";
import { defaultValuesContext } from "../../contexts/DefaultValuesContext";
import logo from "../../assets/logo_h.png";
import printDate from "../utils/printReportDate";
import convertToTH from "../utils/convertHoursToTH";
import {
	Document,
	Image,
	Page,
	Text,
	View,
	StyleSheet,
	PDFViewer,
	PDFDownloadLink,
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
	section: {
		marginTop: 3,
		marginLeft: 10,
		marginRight: 10,
		padding: 3,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	section_text: {
		padding: 3,
		marginBottom: 3,
		textAlign: "center",
		alignSelf: "stretch",
		border: 1,
		borderRadius: 50,
		borderColor: "#000",
		borderStyle: "solid",
		paddingLeft: "20px",
		fontSize: 13,
		fontWeight: "heavy",
		backgroundColor: "#f5f5f5",
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

// Create Document Component
const MyDocument = ({ data, timeFormat }) => (
	<Document>
		<Page size="LETTER" style={styles.page}>
			<View style={styles.header}>
				<View>
					<Image src={logo} style={styles.logo}></Image>
					<Text style={styles.logo_text}>Pablo Pumarol No. 13</Text>
					<Text style={styles.logo_text}>(809)-565-7740</Text>
				</View>
				<View>
					<Text style={styles.header_text}>Reporte de Siniestro</Text>
					<Text style={styles.header_subtext_title}>
						Número:
						<Text style={styles.header_subtext}>
							{" "}
							{data.serviceNo}
						</Text>
					</Text>
					<Text style={styles.header_subtext_title}>
						Usuario:
						<Text style={styles.header_subtext}> {data.user}</Text>
					</Text>
					<Text style={styles.header_subtext_title}>
						Fecha Registro:
						<Text style={styles.header_subtext}>
							{" "}
							{printDate(data.registry)[0]}
						</Text>
					</Text>
					<Text style={styles.header_subtext_title}>
						Fecha Siniestro:
						<Text style={styles.header_subtext}>
							{" "}
							{printDate(data.fechaSiniestro)[0]}
						</Text>
					</Text>
					<Text style={styles.header_subtext_title}>
						Hora:
						<Text style={styles.header_subtext}>
							{" "}
							{convertToTH(data.registry, timeFormat)}
						</Text>
					</Text>
				</View>
			</View>
			<View style={styles.section}>
				<Text style={styles.section_text}>Datos del Vehículo</Text>
				<View style={styles.section_data}>
					<View style={{ flexBasis: "50%", marginLeft: "20px" }}>
						<Text style={styles.header_subtext_title}>
							Número Póliza:
							<Text style={styles.header_subtext}>
								{" "}
								{data.poliza}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Chassis:
							<Text style={styles.header_subtext}>
								{" "}
								{data.chassis}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Tipo:
							<Text style={styles.header_subtext}>
								{" "}
								{data.tipoVehiculo}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Marca:
							<Text style={styles.header_subtext}>
								{" "}
								{data.marca}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Modelo:
							<Text style={styles.header_subtext}>
								{" "}
								{data.modelo}
							</Text>
						</Text>
					</View>
					<View style={{ flexBasis: "50%" }}>
						<Text style={styles.header_subtext_title}>
							Aseguradora:
							<Text style={styles.header_subtext}>
								{" "}
								{data.aseguradora}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Plan:
							<Text style={styles.header_subtext}>
								{" "}
								{data.plan}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Placa:
							<Text style={styles.header_subtext}>
								{" "}
								{data.placa}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Color:
							<Text style={styles.header_subtext}>
								{" "}
								{data.color}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Año:
							<Text style={styles.header_subtext}>
								{" "}
								{data.anio}
							</Text>
						</Text>
					</View>
				</View>
			</View>
			<View style={styles.section}>
				<Text style={styles.section_text}>Datos del Asegurado</Text>
				<View>
					<Text style={styles.header_subtext_title}>
						Nombre:
						<Text style={styles.header_subtext}>
							{" "}
							{data.asegurado}
						</Text>
					</Text>
				</View>
				<View style={styles.section_data}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							marginLeft: "20px",
							marginTop: "5px",
						}}
					>
						<Text style={styles.header_subtext_title}>
							Cédula:
							<Text style={styles.header_subtext}>
								{" "}
								{data.cedula}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Teléfono 1:
							<Text style={styles.header_subtext}>
								{" "}
								{data.telAseg1}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Telefóno 2:
							<Text style={styles.header_subtext}>
								{" "}
								{data.telAseg2}
							</Text>
						</Text>
					</View>
				</View>
			</View>
			<View style={styles.section}>
				<Text style={styles.section_text}>Datos del Siniestro</Text>
				<View style={{ alignSelf: "stretch", marginLeft: "20px" }}>
					<Text style={styles.header_subtext_title}>
						Ubicación:
						<Text style={styles.header_subtext}>
							{" "}
							{data.ubicacion}
						</Text>
					</Text>
					<Text style={styles.header_subtext_title}>
						Destino:
						<Text style={styles.header_subtext}>
							{" "}
							{data.destino}
						</Text>
					</Text>
				</View>
			</View>
			<View style={styles.section}>
				<Text style={styles.section_text}>Tipos de Servicios</Text>
				<View style={styles.section_data}>
					<View style={{ flexBasis: "33%", marginLeft: "20px" }}>
						<Text style={styles.header_subtext_title}>
							{data.tipoServicios.servicesType.TG
								? '* '
								: ""}Grúa:
							<Text style={styles.header_subtext}>
								{" "}
								{data.tipoServicios.servicesType.TG
									? `${data.tipoServicios.servicesType.TG} $/Km`
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							{data.tipoServicios.servicesType.SP
								? "* "
								: ""}Sobre peso:
							<Text style={styles.header_subtext}>
								{" "}
								{data.tipoServicios.servicesType.SP
									? `${data.tipoServicios.servicesType.SP} Km`
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							{data.tipoServicios.servicesType.PE
								? "* "
								: ""}
							Peaje:
							<Text style={styles.header_subtext}>
								{" "}
								{data.tipoServicios.servicesType.PE
									? `$${data.tipoServicios.servicesType.PE}`
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							{data.tipoServicios.servicesType.CR
								? "* "
								: ""}
							Cerragería:
							<Text style={styles.header_subtext}>
								{" "}
								{data.tipoServicios.servicesType.CR
									? `$${data.tipoServicios.servicesType.CR}`
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							{data.tipoServicios.servicesType.EX
								? "* "
								: ""}
							Extracción:
							<Text style={styles.header_subtext}>
								{" "}
								{data.tipoServicios.servicesType.EX
									? `$${data.tipoServicios.servicesType.EX}`
									: ""}
							</Text>
						</Text>
					</View>
					<View style={{ flexBasis: "33%" }}>
						<Text style={styles.header_subtext_title}>
							{data.tipoServicios.servicesType.LM
								? "* "
								: ""}
							Loma:
							<Text style={styles.header_subtext}>
								{" "}
								{data.tipoServicios.servicesType.LM
									? `${data.tipoServicios.servicesType.LM} Km`
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							{data.tipoServicios.servicesType.CG
								? "* "
								: ""}
							Gomas:
							<Text style={styles.header_subtext}>
								{" "}
								{data.tipoServicios.servicesType.CG
									? `$${data.tipoServicios.servicesType.CG} Km`
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							{data.tipoServicios.servicesType.CE
								? "* "
								: ""}
							Corriente:
							<Text style={styles.header_subtext}>
								{" "}
								{data.tipoServicios.servicesType.CE
									? `$${data.tipoServicios.servicesType.CE}`
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							{data.tipoServicios.servicesType.SG
								? "* "
								: ""}
							Suministros:
							<Text style={styles.header_subtext}>
								{" "}
								{data.tipoServicios.servicesType.SG
									? `$${data.tipoServicios.servicesType.SG}`
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							{data.detalleSiniestro.detailSinister.VO
								? "* "
								: ""}
							Volcaduras:
							<Text style={styles.header_subtext}>
								{" "}
								{data.detalleSiniestro.detailSinister.VO
									? `$${data.detalleSiniestro.detailSinister.VO}`
									: ""}
							</Text>
						</Text>
					</View>
					<View style={{ flexBasis: "33%" }}>
						<Text style={styles.header_subtext_title}>
							{data.detalleSiniestro.detailSinister.CO
								? "* "
								: ""}
							Colisión:
							<Text style={styles.header_subtext}>
								{" "}
								{data.detalleSiniestro.detailSinister.CO
									? `$${data.detalleSiniestro.detailSinister.CO}`
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							{data.detalleSiniestro.detailSinister.IN
								? "* "
								: ""}
							Incendios:
							<Text style={styles.header_subtext}>
								{" "}
								{data.detalleSiniestro.detailSinister.IN
									? `$${data.detalleSiniestro.detailSinister.IN}`
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							{data.detalleSiniestro.detailSinister.DM
								? "* "
								: ""}
							Daños Mecánicos:
							<Text style={styles.header_subtext}>
								{" "}
								{data.detalleSiniestro.detailSinister.DM
									? `$${data.detalleSiniestro.detailSinister.DM}`
									: ""}
							</Text>
						</Text>
					</View>
				</View>
			</View>
			<View style={styles.section}>
				<Text style={styles.section_text}>Datos de la Grúa</Text>
				<View style={styles.section_data}>
					<View style={{ flexBasis: "50%", marginLeft: "20px" }}>
						<Text style={styles.header_subtext_title}>
							Area:
							<Text style={styles.header_subtext}>
								{" "}
								{data.datosGruero
									? data.datosGruero.region
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Gruero:
							<Text style={styles.header_subtext}>
								{" "}
								{data.datosGruero
									? data.datosGruero.gruaDeServicio
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Contacto:
							<Text style={styles.header_subtext}>
								{" "}
								{data.datosGruero
									? data.datosGruero.contacto
									: ""}
							</Text>
						</Text>
					</View>
					<View style={{ flexBasis: "50%" }}>
						<Text style={styles.header_subtext_title}>
							Teléfono:
							<Text style={styles.header_subtext}>
								{" "}
								{data.datosGruero
									? data.datosGruero.telOficina
									: ""}
							</Text>
						</Text>
						<Text style={styles.header_subtext_title}>
							Celular:
							<Text style={styles.header_subtext}>
								{" "}
								{data.datosGruero
									? data.datosGruero.telCelular
									: ""}
							</Text>
						</Text>
					</View>
				</View>
				<View style={{ alignSelf: "stretch", marginLeft: "20px" }}>
					<Text style={styles.header_subtext_title}>
						Dirección:
						<Text style={styles.header_subtext}>
							{" "}
							{data.datosGruero ? data.datosGruero.direccion : ""}
						</Text>
					</Text>
				</View>
				<View
					style={{
						alignSelf: "stretch",
						marginLeft: "15px",
						marginTop: "5px",
						height: 60,
						border: 1,
						borderStyle: "solid",
						borderColor: "#000",
						borderRadius: 5,
					}}
				>
					<Text
						style={{
							...styles.header_subtext_title,
							marginLeft: "5px",
						}}
					>
						Comentarios:
						<Text style={styles.header_subtext}>
							{" "}
							{data.comentarioGruero}
						</Text>
					</Text>
				</View>
			</View>
			<View
				style={{
					display: "flex",
					flexWrap: "wrap",
					flexDirection: "row",
					marginLeft: "30px",
					marginTop: "5px",
				}}
			>
				<Text style={styles.header_subtext_title}>
					Tiempo Llegada:
					<Text style={styles.header_subtext}>
						{" "}
						{data.tiempoGrua ? data.tiempoGrua : 0} min
					</Text>
				</Text>
				<Text style={styles.header_subtext_title}>
					Distancia:
					<Text style={styles.header_subtext}>
						{" "}
						{data.distancia ? data.distancia : 0} Km
					</Text>
				</Text>
				<Text style={styles.header_subtext_title}>
					Precio Aprox.:
					<Text style={styles.header_subtext}>
						{" $"}
						{data.precio ? data.precio : 0}
					</Text>
				</Text>
				<Text style={styles.header_subtext_title}>
					Tarifa Especial:
					<Text style={styles.header_subtext}>
						{" $"}
						{data.tarifaEspecial !== "" ? data.tarifaEspecial : 0}
					</Text>
				</Text>
			</View>
		</Page>
	</Document>
);

const PrintReport = ({ printData }) => {
	const ReportContext = useContext(reportContext);
	const { selectedReport } = ReportContext;
	const DefaultValuesContext = useContext(defaultValuesContext);
	const { values } = DefaultValuesContext;

	return (
		<Fragment>
			{printData ? (
				<>
					<PDFDownloadLink
						document={<MyDocument data={printData} />}
						fileName="Factura.pdf"
						style={{ color: "blue", fontStyle: "italic" }}
					>
						{({ blob, url, loading, error }) => {
							if (!loading) return "Descargar Factura 📄";
						}}
					</PDFDownloadLink>
				</>
			) : selectedReport && !printData ? (
				<PDFViewer
					style={{
						width: "100%",
						height: "84vh",
						borderRadius: "10px",
						borderColor: "#555555",
					}}
				>
					<MyDocument data={selectedReport} timeFormat={values.TH} />
				</PDFViewer>
			) : null}
		</Fragment>
	);
};

export default PrintReport;
