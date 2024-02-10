import styles from "./Footer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setResourceOn, setHelpOn, setCompanyOn } from "../features/footerSlice";
import twitter from "../public/twitter.png";
import facebook from "../public/facebook.png";
import youtube from "../public/youtube.png";
import instagram from "../public/instagram.png";
import location from "../public/location.png";



const Footer = () => {
	const footerData = [
      ['RESOURCES', 'HELP', 'COMPANY'],
      ['Find a store', 'Get Help', 'About EZam'],
      ['EZam JOURNAL', 'Order Status', 'News'],
      ['Site Feedback', 'Order Cancellation', 'Sustainability']
    ];
	const socials = [
		{ image: twitter,
		   link : "https://twitter.com/ezrablackfish"
		},

		{ image : facebook,
		  link : "https://www.facebook.com/profile.php?id=61556500766435",
		},
		{ image : youtube,
		   link: "https://www.youtube.com/channel/UCXpdb_-yQph5_A06MUTfqWw",
		},
		{ image : instagram,
		  link: "https://www.instagram.com/ezrablackfish",
		}]

	const dispatch = useDispatch();
	const resourceOn = useSelector((state) => state.footers.resourceOn);
	const helpOn = useSelector((state) => state.footers.helpOn);
	const companyOn = useSelector((state) => state.footers.companyOn);

	return (
		<div className={styles.footer}>
			<table className={styles.table}>
				<tbody>
			          {footerData.map((row, rowIndex) => (
			            <tr key={rowIndex} className={ rowIndex === 0 ? styles.title : styles.body}>
			              {row.map((cell, cellIndex) => (
			                <td className={styles.cell}key={cellIndex}>{cell}</td>
			              ))}
			            </tr>
			          ))}
			        </tbody>
			</table>

		
		<div className={styles.footersAll}>
		{
			<div className={styles.footers}>
				<div className={styles.footerOne} onClick={() => dispatch(setResourceOn(!resourceOn))}>RESOURCES</div>
			{
				resourceOn &&
				footerData.slice(1).map((footer) => <div className={styles.footerEach}>{footer[0]}</div>)
			}
			</div>
		}

{
			<div className={styles.footers}>
				<div className={styles.footerOne} onClick={() => dispatch(setHelpOn(!helpOn))}>HELP</div>
			{
				helpOn &&
				footerData.slice(1).map((footer) => <div className={styles.footerEach}>{footer[1]}</div>)
			}
			</div>
		}
{
			<div className={styles.footers}>
				<div className={styles.footerOne} onClick={() => dispatch(setCompanyOn(!companyOn))}>COMPANY</div>
			{
				companyOn &&
				footerData.slice(1).map((footer) => <div className={styles.footerEach}>{footer[2]}</div>)
			}
			</div>
		}
		</div>
		<div className={styles.social}>
		{
			socials.map((social) => (
				<a href={social.link}>
				<img 
					src={social.image} 
					className={styles.socialImage}
				/>
				</a>
			))
		}
		</div>
		<div className={styles.copyright}>
			<img 
				src={location}
				className={styles.locationImage}/>
				<span className={styles.country}>
		Ethiopia </span> @2024 EZam,   inc     All Rights Reserved
		</div>
		</div>	
	);
}

export default Footer;
