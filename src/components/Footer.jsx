import styles from "./Footer.module.css";


const Footer = () => {
	const footerData = [
      ['Row 1, Column 1', 'Row 1, Column 2', 'Row 1, Column 3', 'Row 1, Column 4'],
      ['Row 2, Column 1', 'Row 2, Column 2', 'Row 2, Column 3', 'Row 2, Column 4'],
      ['Row 3, Column 1', 'Row 3, Column 2', 'Row 3, Column 3', 'Row 3, Column 4'],
      ['Row 4, Column 1', 'Row 4, Column 2', 'Row 4, Column 3', 'Row 4, Column 4']
    ];

	return (
		<div className={styles.footer}>
			<table className={styles.table}>
				<tbody>
			          {footerData.map((row, rowIndex) => (
			            <tr key={rowIndex}>
			              {row.map((cell, cellIndex) => (
			                <td className={styles.cell}key={cellIndex}>{cell}</td>
			              ))}
			            </tr>
			          ))}
			        </tbody>
			</table>
		</div>	
	);
}

export default Footer;
