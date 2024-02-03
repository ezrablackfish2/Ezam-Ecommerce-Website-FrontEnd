import styles from "./Footer.module.css";


const Footer = () => {

	return (
		<div className={styles.footer}>
			<table className={styles.table}>
				<tr>
					<td className={styles.cell}>Resources</td>
					<td className={styles.cell}>Help</td>
					<td className={styles.cell}>Company</td>
					<td className={styles.cell}>Promotion & Discounts</td>
				</tr>
			</table>
		</div>	
	);
}

export default Footer;
